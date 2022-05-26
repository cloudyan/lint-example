# IDE

## VSCode


这里只涉及到 vscode, 相关插件如下

  - prettier
    - [Prettier - Code formatter 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - 待确认 [Prettier ESLint 插件](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
  - eslint
    - [ESLint 插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - stylelint (以下二选一)
    - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
    - [stylelint-plus](https://marketplace.visualstudio.com/items?itemName=hex-ci.stylelint-plus)

在项目中新建配置 [`.vscode/settings.json`](./.vscode/settings.json)

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

**快捷键**

[vscode 格式化快捷键](https://stackoverflow.com/questions/29973357/how-do-you-format-code-in-visual-studio-code-vscode)

代码格式可通过以下快捷方式在 Visual Studio Code 中使用：

  - 在 Windows <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>
  - 在 Mac <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>F</kbd>
  - 在 Linux <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>

<kbd>Ctrl</kbd> 或者，您可以通过带有++ （或Mac上的<kbd>Shift</kbd> ++ ）的编辑器中提供的“命令面板”找到快捷方式以及其他快捷方式，然后搜索**格式文档**。<kbd>P</kbd> <kbd>Command</kbd> <kbd>Shift</kbd> <kbd>P</kbd>

## Sublime Text

暂未做探究

  - [SublimeLinter](https://github.com/airbnb/javascript/blob/master/linters/SublimeLinter/SublimeLinter.sublime-settings)
