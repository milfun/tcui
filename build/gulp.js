const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const src = path.resolve(__dirname, '../packages');

const esConfig = path.resolve(__dirname, '../tsconfig.json'); 
const libConfig = path.resolve(__dirname, '../tsconfig.lib.json');
const demoConfig = path.resolve(__dirname, '../tsconfig.demo.json');

const esDir = path.resolve(__dirname, '../dist');
const libDir = path.resolve(__dirname, '../lib');
const demoDir = path.resolve(__dirname, '../demo/dist');

const baseCssPath = path.resolve(__dirname, '../packages/common/index.wxss');


const scssCompiler = (dist) =>
  function compileSass() {
    return gulp
      .src(`${src}/**/*.scss`)
      .pipe(plumber())
      .pipe(sass())
      .pipe(rename({ extname: '.wxss' }))
      .pipe(gulp.dest(dist));
  };

const tsCompiler = (dist, config) =>
  async function compileTs() {
    await exec(`npx tsc -p ${config}`);
    await exec(`npx tscpaths -p ${config} -s ../packages -o ${dist}`);
  };

const copier = (dist, ext) =>
  function copy() {
    return gulp.src(`${src}/**/*.${ext}`).pipe(gulp.dest(dist));
  };

const staticCopier = (dist) =>
  gulp.parallel(
    copier(dist, 'wxml'),
    copier(dist, 'wxs'),
    copier(dist, 'json')
  );

const cleaner = (path) =>
  function clean() {
    return exec(`npx rimraf ${path}`);
  };


const tasks = [
    ['buildEs', esDir, esConfig],
    ['buildLib', libDir, libConfig],
  ].reduce((prev, [name, ...args]) => {
    prev[name] = gulp.series(
      cleaner(...args),
      gulp.parallel(
        tsCompiler(...args),
        scssCompiler(...args),
        staticCopier(...args)
      )
    );
    return prev;
  }, {});
  
  tasks.buildDemo = gulp.series(
    cleaner(demoDir),
    gulp.parallel(
      tsCompiler(demoDir, demoConfig),
      scssCompiler(demoDir),
      staticCopier(demoDir),
      () => {
        gulp.watch(`${src}/**/*.scss`, scssCompiler(demoDir));
        gulp.watch(`${src}/**/*.wxml`, copier(demoDir, 'wxml'));
        gulp.watch(`${src}/**/*.wxs`, copier(demoDir, 'wxs'));
        gulp.watch(`${src}/**/*.json`, copier(demoDir, 'json'));
      }
    )
  );

module.exports = tasks;
  