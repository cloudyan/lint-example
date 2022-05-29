// .stylelintrc.js
const path = require('path');
const { getStylelintConfig } = require('@applint/spec');

// getStylelintConfig(rule: 'common' | 'rax' | 'react' | 'vue',  customConfig?: StylelintConfig);
module.exports = getStylelintConfig('react', {
  // extends: ['prettier'],
  configBasedir: path.dirname(require.resolve('@applint/spec')),
});
