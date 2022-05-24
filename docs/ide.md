# IDE

## VSCode

相关插件

  - [ESLint 插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier - Code formatter 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - 待确认 [Prettier ESLint 插件](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

在项目中新建配置 `.vscode/settings.json`

```js
{
  "editor.formatOnSave": true, // 保存时自动格式化
  "editor.defaultFormatter": "stylelint.vscode-stylelint",
  // 保存代码时，自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true, // 保存时使用eslint校验文件
    "source.fixAll.stylelint": true
  },


  // 以下待确认
  "[css]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "[html]": {
    // "editor.defaultFormatter": "HookyQR.beautify"
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    // "editor.defaultFormatter": "HookyQR.beautify"
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // "[markdown]": {
  //   "editor.defaultFormatter": "esbenp.prettier-vscode"
  // },
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },


  "eslint.workingDirectories": [{ "mode": "auto" }],
  // "eslint.options": {
  //   "overrideConfigFile": "babel.config.js"
  // },
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "eslint.format.enable": true,
  "eslint.probe": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
    // "markdown",
    // 以上是默认, 下面新增 html vue,
    // 因为需要 plugin 包支持，建议这两个添加到 Vue 相关项目的工作区环境配置中
    // "html", // 需要 eslint-plugin-html
    // "vue", // 需要 eslint-plugin-vue
    // ".*ignore"
    // "gitignore"
  ]
  // "eslint.validate": [
  //   "javascript",
  //   "javascriptreact",
  //   "vue"
  // ],

  // "typescript.tsdk": "node_modules/typescript/lib",
  // "jest.jestCommandLine": "yarn jest --watchAll",

  // //自动格式化粘贴的代码
  // "files.autoSave": "afterDelay"
}
```

## Sublime Text

暂未做探究

  - [SublimeLinter](https://github.com/airbnb/javascript/blob/master/linters/SublimeLinter/SublimeLinter.sublime-settings)
