# eslint

ESLint 是一款插件化的 JavaScript 代码静态检查工具，其核心是通过对代码解析得到的 AST（Abstract Syntax Tree，抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力。

  - [eslint](#eslint)
    - [common deps](#common-deps)
      - [babel](#babel)
    - [react](#react)
    - [taro](#taro)
      - [taro react](#taro-react)
      - [taro vue](#taro-vue)
    - [vue](#vue)
    - [uniapp](#uniapp)

## common deps

初始化 `npm init @eslint/config`

```bash
# parser js/ts
# eslint babel
npm i -D @babel/eslint-parser @babel/eslint-plugin
# eslint ts
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# base deps
npm i -D eslint babel-plugin-import
# 等效于
npm i -D eslint-config-airbnb-base
```

### babel

```bash
npm i -D @babel/core @babel/preset-env
```

babel.config.js

```js
module.exports = {
  presets: ['@babel/preset-env'],
}
```

## react

install deps

```bash
# common deps

# airbnb
npm i -D eslint-config-airbnb
# 等效于
npm i -D eslint babel-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y

# react
npm i -D eslint-plugin-react eslint-plugin-react-hooks
```

## taro

### taro react

install deps

> eslint-plugin-taro 已被废弃

```bash
# common deps

# taro deps
npm i -D eslint-plugin-react eslint-plugin-react-hooks
npm i -D eslint-config-taro
# @tarojs/plugin-html
```

.eslintrc.js

```js
module.exports = {
  extends: ['taro/react'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
```

### taro vue

```bash
npm i -D eslint-config-taro
```

```js
// ESLint 检查 .vue 文件需要单独配置编辑器：
// https://eslint.vuejs.org/user-guide/#editor-integrations
{
  extends: ['taro/vue']
}

```

## vue

```bash
# eslint vue
npm i -D vue-eslint-parser eslint-plugin-vue
```

.eslintrc.js

```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // 插件加载规则 extPlugin = `plugin:${pluginName}/${configName}`
    // plugin 可以省略包名的前缀 `eslint-plugin-`
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended',   // vue3.x
    // 'plugin:vue/recommended',        // vue2.x

    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {

    ecmaFeatures: {
      jsx: true, // 用于支持 jsx
    },
    ecmaVersion: 'latest',
    // parser: '@typescript-eslint/parser',
    parser: {
      // Script parser for `<script>`
      js: 'espree', // babel-eslint espree

      // Script parser for `<script lang="ts">`
      ts: '@typescript-eslint/parser',

      // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
      // and vue interpolations (e.g. `{{variable}}`).
      // If not specified, the parser determined by `<script lang ="...">` is used.
      '<template>': 'espree',
    },

    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {

  }
}
```

eslint plugin for vue-cli

  - [`@vue/cli-plugin-eslint`](https://www.npmjs.com/package/@vue/cli-plugin-eslint)

```js
config.module.rule('eslint')
config.module.rule('eslint').use('eslint-loader')
```

## uniapp

同 vue 即可

## 扩展

每个规则有【3】个错误级别

  - "off"或 0: 关闭规则
  - "warn"或 1: 打开规则, 作为警告（不会导致程序退出）
  - "error"或 2: 打开规则, 作为错误（触发时程序会退出，退出代码为 1）

退出码

  - `0`: 检测成功，没有错误。如果 `--max-warnings` 标志被设置为 `n`，那么警告数量最多为`n`。
  - `1`: 检测成功，并且至少有一个错误，或者警告多于 `--max-warnings` 选项所允许的警告。
  - `2`: 由于配置问题或内部错误，检测未能成功。
