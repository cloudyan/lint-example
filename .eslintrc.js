const isTsProject = false

module.exports = {
  root: true,
  // project: './tsconfig.json',

  parser: isTsProject ? '@typescript-eslint/parser' : '@babel/eslint-parser',

  // parser: 'vue-eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    // parser: 'babel-eslint',
    // parser: {
    //   // Script parser for `<script>`
    //   js: 'espree', // babel-eslint espree

    //   // Script parser for `<script lang="ts">`
    //   ts: '@typescript-eslint/parser',

    //   // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
    //   // and vue interpolations (e.g. `{{variable}}`).
    //   // If not specified, the parser determined by `<script lang ="...">` is used.
    //   '<template>': 'espree',
    // },
    sourceType: 'module', // 默认 script
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true, // 用于支持 jsx
    },
    // presets: [
    //   '@babel/preset-env',
    //   '@babel/preset-react',
    //   '@babel/preset-typescript',
    // ],
    // plugins: [
    //   // 此处顺序不能变，具体参看文档
    //   // https://babel.dev/docs/en/babel-plugin-proposal-decorators
    //   ['@babel/plugin-proposal-decorators', { legacy: true }],
    //   ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ],
  },

  extends: [
    'eslint-config-airbnb-base',
    // 'prettier',
    // 'prettier/react', // has been merged into "prettier" in eslint-config-prettier 8.0.0
  ],
  // .concat
  // // isTsProject
  // //   ? [
  // //       // 'prettier/@typescript-eslint', // has been merged into "prettier" in eslint-config-prettier 8.0.0
  // //       'plugin:@typescript-eslint/recommended',
  // //     ]
  // //   : ['plugin:react/recommended'],
  // (),
  // plugins: [
  //   'eslint-comments',
  //   // 'import', // 暂不开启
  //   'react',
  //   // 'jsx-a11y', // 这个暂时不必要
  //   // 'promise',
  //   'jest',
  //   'unicorn', // 可强制约束文件命名格式，默认 kebabCase 格式
  //   'react-hooks',
  //   'markdown', // 需要 .eslintrc.js 配置 root: true
  // ],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    // writable readonly off
    window: 'readonly',
    document: 'readonly',
    expect: 'readonly',
    sinon: 'readonly',
    Blob: 'readonly',
    URL: 'readonly',
    isNaN: 'readonly',
    uni: 'readonly',
    Promise: 'readonly',
    getCurrentPages: 'readonly',
    crypto: 'readonly',
    Uint8Array: 'readonly',
    Set: 'readonly',
    bridge: 'readonly',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  // settings: {
  //   // support import modules from TypeScript files in JavaScript files
  //   'import/resolver': {
  //     node: {
  //       extensions: isTsProject ? ['.js', '.jsx', '.ts', '.tsx', '.d.ts'] : ['.js', '.jsx'],
  //     },
  //   },
  //   'import/parsers': {
  //     '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
  //   },
  //   'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
  //   'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  //   polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  // },
  rules: {
    // 'prettier/prettier': 'error',
    // ...(isTsProject ? tsEslintConfig : {}),
    // ...jsEslintConfig,

    // 'vue/multi-word-component-names': 'off',
    // // '@typescript-eslint/no-explicit-any': 'off',
    // // '@typescript-eslint/ban-type': 'off',
    // // https://yepbug.com/2018/08/28/what-is-the-benefit-of-prefer-default-export/
    // // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/README.md
    // 'import/prefer-default-export': 'off', // 输出只有一个变量时使用 export default
    // // 因为 mac 系统默认不区分大小写, 所以建议使用全小写, 包含文件名 文件夹名 组件名(html 特性也不区分大小写)
    // 'vue/component-definition-name-casing': ['error', 'kebab-case'],
    // 'vue/name-property-casing': ['error', 'kebab-case'], // 'PascalCase' |'kebab-case'
    // // 'vue/max-attributes-per-line': ['error', {
    // //   'singleline': 4,
    // //   'multiline': {
    // //     'max': 1,
    // //     'allowFirstLine': false,
    // //   },
    // // }],
    // // 'vue/html-indent': 'error', // 此条与 Prettier 冲突，需要移除
    // 'vue/script-setup-uses-vars': 'error',
    // 'vue/multiline-html-element-content-newline': 'off',
    // 'vue/no-v-html': 'off',
    // 'vue/no-template-shadow': 'off', // temp
    // 'vue/order-in-components': 'off', // temp
    // 'vue/require-default-prop': 'off',
    // // 'vue/no-unused-components': '1',
    // 'vue/singleline-html-element-content-newline': 'off',

    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignorePattern: true,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-else-return': 'off',
    'no-mixed-operators': 'off',
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 1,
      },
    ],
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': [
      'off',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-restricted-syntax': 'off',
    'no-shadow': [
      'error',
      {
        allow: ['res', 'data', 'err', 'cb', 'state', 'resolve', 'reject', 'done'],
      },
    ],
    'no-trailing-spaces': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': 'off',
    // 'no-unused-vars': [
    //   'error',
    //   {
    //     vars: 'all',
    //     // args: 'after-used',
    //     args: 'none',
    //     caughtErrors: 'none',
    //     ignoreRestSiblings: true,
    //   },
    // ],
    'no-use-before-define': 'off',
    'no-useless-escape': 'off',
    'prefer-template': 'off',
    'prefer-arrow-callback': 'off',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'require-yield': [1],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'ignore',
        asyncArrow: 'ignore',
      },
    ],
    semi: ['off', 'never'],
    'func-names': 'off',
    'consistent-return': 'off',
  },
}
