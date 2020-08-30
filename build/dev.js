const path = require('path');
//const serve = require('webpack-serve');
//const config = require('./webpack.doc.dev');
const { exec } = require('child_process');

const gulpConfig = path.resolve(__dirname, './gulp.js');

//serve({}, { config });

const p = exec(`npx gulp -f ${gulpConfig} buildDemo --color`);
p.stdout.on('data', (stdout) => console.info(stdout));
p.stderr.on('data', (stderr) => console.info(stderr));
