// .eslintrc.js
const { getESLintConfig } = require('@applint/spec');

// eslint-disable-next-line
// getESLintConfig(rule: 'common' | 'common-ts' | 'rax' | 'rax-ts' | 'react' | 'react-ts' | 'vue' | 'vue-ts', customConfig?: Linter.Config);
module.exports = getESLintConfig('react-ts', {
  // 自定义配置
  // rules: { 'no-console': 0 }
  extends: ['prettier'],
});
