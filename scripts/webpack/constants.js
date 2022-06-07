const {resolve} = require('path')
const {path: PROJECT_ROOT} = require('app-root-path')

exports.PROJECT_ROOT = PROJECT_ROOT
exports.SOURCE_DIRECTORY = resolve(PROJECT_ROOT, './src')
exports.BUILD_DIRECTORY = resolve(PROJECT_ROOT, './dist')

