# 常见问题

  - [常见问题](#常见问题)
    - [x] [分工与适用范围](#分工与适用范围)
    - [x] [prettier 与 editorconfig 配置不同](#prettier-与-editorconfig-配置不同)
    - [x] [prettier 与 eslint 规则冲突](#prettier-与-eslint-规则冲突)
    - [ ] [@typescript-eslint/eslint-plugin 与 eslint 规则冲突](#typescript-eslinteslint-plugin-与-eslint-规则冲突)
    - [x] [prettier 与 markdownlint 规则冲突](#prettier-与-markdownlint-规则冲突)
    - [ ] [commit msg 交互式操作](#commit-msg-交互式操作)
    - [x] [eslint 如何在本地开发运行时中卡点（webpack?）](#eslint-如何在本地开发运行时中卡点webpack)
    - [ ] [prettier 和 eslint 在 VSCode editor.formatOnSave 生效](#prettier-和-eslint-在-vscode-editorformatonsave-生效)
    - [ ] [commitlint 如何在 CI 中卡点](#commitlint-如何在-ci-中卡点)
    - [ ] [使用 lint-staged 后，prettier 或 eslint 如何在 CI 中卡点](#使用-lint-staged-后prettier-或-eslint-如何在-ci-中卡点)

## 分工与适用范围

editorconfig, prettier, eslint 各自适用哪些 ext

  - editorconfig 覆盖所有类型的文件, 仅做基础格式要求
  - prettier 专注于**代码格式化**
    - `.{js,ts,jsx,tsx,css,less,scss,json,json5}` 以及 `.{vue,html,graphql,markdown,yml,yaml}` 等
  - eslint 专注于**代码质量**，做语法检查、查找并修复 JavaScript 代码中的问题（格式化让给 prettier 来做）
    - 针对 `.{js,ts,jsx,tsx}` 以及 `.{vue,html,md}` 中的脚本

prettier 支持自动推断解析器，所以无需手动配置。更多参考 <https://prettier.io/docs/en/options.html#parser>

常见的有

## prettier 与 editorconfig 配置不同

有了 Prettier 还需要 EditorConfig 吗？两者配置不同会怎么样？

对比两者的作用过程：

  - EditorConfig 作用于预览和输入阶段
  - Prettier 在保存和提交阶段重新组织代码，Prettier 会成为代码形态的最终决定者。
  - 要考虑配置优先级

实际上如 [Prettier 编辑器配置](https://prettier.io/docs/en/configuration.html#editorconfig) 所描述，Prettier 对 `.editorconfig` 文件在特定配置下做了转换。

如果`options.editorconfig`是true，并且您的项目中有一个`.editorconfig`文件，Prettier 将解析它并将其属性转换为相应的 Prettier 配置。此配置将被`.prettierrc`等覆盖。目前，支持以下 EditorConfig 属性：

  - `end_of_line`
  - `indent_style`
  - `indent_size/tab_width`
  - `max_line_length`

没发现配置项 `options.editorconfig`，最新的 VSCode 配置项如下 `useEditorConfig: true`, 默认为 true

参见 <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>

```js
"prettier.useEditorConfig": true
// 为 true, .editorconfig 优先级更高
// 为 false, .prettierrc.js 优先级更高
// 默认优先级关系是: .editorconfig 配置 > .prettierrc.js 配置 > Prettier 默认值。
```

考虑到 EditorConfig 覆盖所有类型的文件，所以

  - EditorConfig 配置优先
  - 其他格式化属性由 Prettier 控制

## prettier 与 eslint 规则冲突

为什么会产生冲突, prettier 会对代码做格式化，eslint 也可以做格式化，当配置规则不一致时，冲突就出现了。

此时，IDE vscode 在编辑文件时，ESLint 先 fix 了代码，之后 prettier 格式化了代码，也会代码变得不符合 ESLint 规则了，满篇飘红。

此时规则冲突会出现两个问题

  1. 格式化处理顺序不一致，可能产生非预期行为
    - 先 `eslint --fix`, 后 `prettier`
    - 先 `prettier`，后 `eslint --fix`
  1. 使用 `eslint-plugin-prettier` 插件时, 会用 prettier 替代了 eslint 本身对于代码美化部分的功能，而其中的配置是官方默认配置，并且不从 .prettierrc 文件中读取配置, 出现诡异问题

怎么解决

  - 使用 `eslint-config-prettier` 解决 ESLint 和 prettier 规则冲突问题，以 prettier 规则为准，**关闭所有可能和 Prettier 冲突的 ESLint 规则**。使用时需要将 prettier 加到 extends 数组的最后。
  - 使用 [`prettier-eslint`](https://github.com/prettier/prettier-eslint), 解决格式化先后问题，默认会用 prettier 先格式化，然后再用 ESLint fix。这和 vscode 保存文件时的流程是相反的。

  - <https://zhuanlan.zhihu.com/p/347339865>
  - <https://zhuanlan.zhihu.com/p/142105418>

## @typescript-eslint/eslint-plugin 与 eslint 规则冲突

同样的规则约束两边各有一个配置，一个开，一个关，冲突就产生了。

## prettier 与 markdownlint 规则冲突

基于原则，格式化交给 prettier 处理，就需要适配对应格式对标 prettier。否则对此文件格式，关闭 prettier 格式化

```js
  // "[markdown]": {
  //   "editor.defaultFormatter": "esbenp.prettier-vscode"
  // },
```

## commit msg 交互式操作

## eslint 如何在本地开发运行时中卡点（webpack?）

webpack 是通过引入 eslint-loader 来启动eslint的

```js
const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, 'src')],
        options: {
          fix: true
        }
      }
    ]
}
```

没 webpack？可以通过 [onchange](https://www.npmjs.com/package/onchange) 进行代码的监听，然后自动格式化代码。

```js
"scripts": {
  "format": "onchange 'src/**/*.js' -- prettier --write {{changed}}",
  // "format": "onchange 'test/**/*.js' 'src/**/*.js' 'src/**/*.vue' -- prettier --write {{changed}}"
}
```

## prettier 和 eslint 在 VSCode editor.formatOnSave 生效

## commitlint 如何在 CI 中卡点

## 使用 lint-staged 后，prettier 或 eslint 如何在 CI 中卡点
