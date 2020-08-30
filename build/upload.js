const ci = require('miniprogram-ci');
const path = require('path');
const config = require('../demo/project.config.json');
const package = require('../package.json');

const project = new ci.Project({
  appid: config.appid,
  type: 'miniProgram',
  projectPath: path.join(__dirname, '../demo'),
  privateKeyPath: path.join(__dirname, './private.wxadeafd8c77f7d641.key'),
  ignores: ['node_modules/**/*'],
});

ci.upload({
  project,
  version: package.version,
  desc: package.description,
  setting: config.setting,
});
