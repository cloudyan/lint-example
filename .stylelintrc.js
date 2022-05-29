// .stylelintrc.js
const { getStylelintConfig } = require('@applint/spec');

// getStylelintConfig(rule: 'common' | 'rax' | 'react' | 'vue',  customConfig?: StylelintConfig);
module.exports = getStylelintConfig('react', {
  // extends: ['prettier'],
});
