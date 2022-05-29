// .prettierrc.js
const { getPrettierConfig } = require('@applint/spec');

// getPrettierConfig(rule: 'common' | 'rax' | 'react' | 'vue', customConfig?: PrettierConfig);
// npm i -D eslint-config-prettier
module.exports = getPrettierConfig('react', {});
