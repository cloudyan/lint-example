# lint-example

lint example

## lint 接入

  - 项目中如何接入
  - IDE 编辑器如何接入
  - CI 流程如何接入

集成到 vscode, webpack 以及 CI 流程上能有效保证执行落地。

## 进度

  - [x] editorconfig
  - [x] prettier
  - [x] husky
  - [x] lint-staged
  - [x] commitlint
  - [ ] eslint
  - [ ] stylelint

## 项目中接入 lint

接入步骤

  - [lint-example](#lint-example)
    - [如何执行落地？](#如何执行落地)
    - [进度](#进度)
    - [项目中接入 lint](#项目中接入-lint)
      - [版本控制](#版本控制)
      - [editorconfig](#editorconfig)
      - [prettier](#prettier)
      - [husky](#husky)
      - [lint-staged](#lint-staged)
      - [commitlint](#commitlint)
      - [eslint](#eslint)
      - [babel](#babel)
      - [stylelint](#stylelint)
      - [browserlist](#browserlist)
      - [typecheck](#typecheck)
      - [conventional-changelog](#conventional-changelog)
      - [sonarlint](#sonar)
      - [markdownlint](#markdownlint)
    - [IDE 编辑器接入 lint](#ide-编辑器接入-lint)
    - [扩展阅读](#扩展阅读)
      - [知识点](#知识点)

---

### 版本控制

add `.npmrc` && `.nvmrc`, 并且 lock 文件要入库。

```bash
node -v > .nvmrc
```

```ini
engine-strict=true
package-lock=true
registry=https://registry.npmjs.org/
```

package.json

```json
  "engines": {
    "node": "16",
    "npm": "8"
  }
```

CI 流程通过 `npm ci` 校验 lock 文件等

TODO: 应该通过工具检查需要添加的控制，并给出完善指导

### editorconfig

```ini
# .editorconfig
# https://editorconfig.org/

root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,ts}]
quote_type = single
```

在 EditorConfig 文件中设置的约定当前无法在 CI/CD 管道中强制为生成错误或警告。

### prettier

usage

```bash
npm i prettier lint-staged -D

prettier --write .                              # -w
prettier -write --ignore-unknown "src/**/*.js"  # -w -u
prettier -write 'src/**/*.{js,jsx,ts,tsx,json,yml,yaml,css,less,scss,md,html}'

prettier --check "src/**/*.js"                  # -c
prettier --list-different "src/**/*.js"         # -l

# prettier diff
prettier --write '**/?(.)*.{md,css,scss,js,json,yaml,yml}' && git --no-pager diff && git checkout -- .
```

config

格式化当前目录所有内容时，必须结合 `.prettierignore` 使用

```json
"scripts": {
  "prettier": "prettier -w .",
  "prettier:ci": "prettier -c ."
}
```

规则配置详见 [.prettierrc.js](.prettierrc.js)

[vscode 格式化快捷键](https://stackoverflow.com/questions/29973357/how-do-you-format-code-in-visual-studio-code-vscode)

代码格式可通过以下快捷方式在 Visual Studio Code 中使用：

  - 在 Windows <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>
  - 在 Mac <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>F</kbd>
  - 在 Linux <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>

<kbd>Ctrl</kbd> 或者，您可以通过带有++ （或Mac上的<kbd>Shift</kbd> ++ ）的编辑器中提供的“命令面板”找到快捷方式以及其他快捷方式，然后搜索**格式文档**。<kbd>P</kbd> <kbd>Command</kbd> <kbd>Shift</kbd> <kbd>P</kbd>

### husky

usage

```bash
# 自动安装（推荐）
# https://typicode.github.io/husky/#/?id=automatic-recommended
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm

或使用

npx auto-husky
```

config

```bash
# usage 启用 Git 挂钩
npm set-script prepare "husky install"
npm run prepare

# Add a hook:
npx husky add .husky/pre-commit "npm test"
npx husky add .husky/pre-commit "npm run lint-staged"
npx husky add .husky/commit-msg 'npx --no commitlint --edit $1' # 这个执行有问题
yarn husky add .husky/commit-msg 'npx --no -- commitlint --edit "${1}"' # 这个可以

# husky uninstall
npm uninstall husky && git config --unset core.hooksPath
```

### lint-staged

如果对项目中所有文件一次性格式化，大范围的修改很可能出现不可控的情况。

这时可以借助 lint-staged 将处理范围限制在 Git 暂存区内 (staged) 的文件。

config

```bash
npx husky add .husky/pre-commit "npx --no-install lint-staged"
```

package.json

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,vue,json,yml,yaml,css,less,scss,html}": [
    "prettier --write"
  ],
  "*.{js,jsx,ts,tsx,vue,html}": [
    "npm run eslint:fix"
  ],
  "*.ts?(x)": [
    "prettier --parser=typescript --write --ignore-unknown"
  ],
}
```

  - [lint-staged如何做到只lint staged?](https://juejin.cn/post/6844903864722784264)

### commitlint

usage

```bash
npm install @commitlint/cli @commitlint/config-conventional -D
```

config

```bash
# Add hook
cat <<EEE > .husky/commit-msg
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

npx --no -- commitlint --edit "\${1}"
EEE


# Make hook executable
chmod a+x .husky/commit-msg
```

规则配置文件

```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [1, 'always', 100],
    // prettier-ignore
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'enhance',
        'chore',
        'test',
        'doc',
        'refactor',
        'style',
        'revert',
      ],
    ],
  },
}
```

测试

```bash
npx commitlint --from HEAD~1 --to HEAD --verbose

echo 'foo: xxx' | npx commitlint --verbose
```

### eslint

> 查找并修复 JavaScript 代码中的问题

一些原则

  - 按照 prettier 原则，尽量减少格式化对开发的干扰
    - 不应该因为尾分号分心，满篇飘红，而应交给格式化工具自动处理，此时 eslint 应关闭格式化相关规则
    - eslint 更应该关注语法检查

接入之前有必要先熟悉下一些配置和常识

eslint 只检查 `.{js,ts,jsx,tsx,vue,html}` 中的脚本, 不会处理 `.css`, `.less`, `.scss`, or `.json` 这些文件，prettier 可以

  - Parser, 指定解析器, 能帮助 eslint 确定什么是解析错误。
    - eslint 的默认解析器 `espree`, 不支持 babel 提供的实验性（如新功能）语法
    - `@babel/eslint-parser` 支持 eslint 在 babel 转换的源代码上运行
      - `@babel/eslint-plugin`
    - `@typescript-eslint/parser` 支持 eslint 对 typescript 源代码进行 lint
      - `@typescript-eslint/eslint-plugin`
    - `vue-eslint-parser` 支持 eslint 解析 .vue 文件
      - `eslint-plugin-vue`
  - [Airbnb JavaScript Style](https://github.com/airbnb/javascript)
    - `eslint-config-airbnb-base` If you don't need React
      - `eslint`
      - `eslint-plugin-import` 支持对 ES2015+ `import/export` 语法的校验
    - `eslint-config-airbnb` 包含以下五项，不包含 `eslint-config-airbnb/hooks`
      - `eslint`
      - `eslint-plugin-import`
      - `eslint-plugin-react` React 专用的校验规则插件 `plugin:react/recommended`
      - `eslint-plugin-react-hooks`
      - `eslint-plugin-jsx-a11y` 专注于检查 jsx 元素的可访问性
    - `eslint-config-airbnb/hooks`
  - [JavaScript Standard Style](https://standardjs.com/)
    - `eslint-config-standard`
  - AlloyTeam
    - [`eslint-config-alloy`](https://github.com/AlloyTeam/eslint-config-alloy)
  - Prettier
    - `eslint-config-prettier` 解决 eslint 和 prettier 规则冲突问题，以 prettier 规则为准，**关闭所有可能和 prettier 冲突的 eslint 规则**。
    - `prettier-eslint` 将 prettier 首先运行，执行结果给 eslint --fix
    - `prettier-stylelint`
  - typescript
    - `@typescript-eslint/eslint-plugin`
  - vue
    - `eslint-plugin-vue`
  - 其他
    - `eslint-plugin-eslint-comments` 支持 eslint 指令注释，如 `//eslint-disable-line`, 底层没直接支持吗？
    - `eslint-plugin-markdown` 支持 lint markdown 中的 JS、JSX、TypeScript 等
    - `eslint-plugin-promise` 支持 lint promise
    - `eslint-plugin-unicorn` XO, 🦄 独角兽, 一系列 eslint 规则
    - `eslint-formatter-pretty` XO, 格式化 eslint 检查结果
    - `eslint-plugin-compat` Lint 代码的浏览器兼容性，基于 browserslist 配置
    - `eslint-plugin-jest` 仅在与测试相关的文件上运行规则
    - `eslint-plugin-html` 用于检查和修复 HTML 文件中包含的内联脚本

接入 eslint

```bash
# 初始化配置
npm init @eslint/config
# 选择: To check syntax and find problems

# parser
npm i -D @babel/eslint-parser
npm i -D @typescript-eslint/parser

# base
npm i -D eslint eslint-plugin-import
npm i -D eslint-config-airbnb-base
# error  Parsing error: No Babel config file detected for xxx.js. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files
# 报错: 缺少 babel 配置, 添加 babel.config.js 后 OK

# prettier
npm i -D eslint-config-prettier
# 如果不加此项，prettier 规则和 eslint 规则就可能冲突
# 规则不同时，会出现 prettier 去掉尾分号，执行 eslint:fix 又给加上

# eslint-plugin-prettier 不推荐使用
# 推荐使用 prettier-eslint prettier-stylelint
npm i -D prettier-eslint prettier-stylelint
```

关于 `.eslintrc.js`

```js
module.exports = {
  /**
   * 默认情况下，ESLint会在所有父级目录里寻找配置文件，一直到根目录。
   * 为了将ESLint限制在一个特定的项目，设置root: true；
   * ESLint一旦发现配置文件中有 root: true，就会停止在父级目录中寻找。
   */
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    // 插件加载规则 extPlugin = `plugin:${pluginName}/${configName}`
    // plugin 可以省略包名的前缀 `eslint-plugin-`

    'react',
    '@typescript-eslint',
  ],
  rules: {

  },
}
```

package.json

```json
{
  "eslint": "cross-env TIMING=1 eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
  "eslint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
}
```

  - [TIMING=1](https://eslint.org/docs/1.0.0/developer-guide/working-with-rules)
  - [--format=pretty](https://www.npmjs.com/package/eslint-formatter-pretty)

### babel

eslint 需要 babel 配合

```bash
npm i -D @babel/core @babel/preset-env
```

babel.config.js

```js
module.exports = {
  presets: ['@babel/preset-env'],
}
```

### stylelint

接入 stylelint

  - `stylelint-config-standard` stylelint 的推荐配置
  - `stylelint-order` css 属性排序插件，合理的排序加快页面渲染
  - `stylelint-scss` 增加支持 scss 语法

```bash
npm i -D stylelint prettier-stylelint
npm i -D stylelint-config-css-modules stylelint-config-prettier stylelint-config-rational-order stylelint-config-standard stylelint-declaration-block-no-ignored-properties stylelint-no-unsupported-browser-features stylelint-order

# prettier
npm i -D prettier-plugin-jsdoc prettier-plugin-style-order
```

配置 `.stylelintignore` 文件(默认不格式化 node_modules)

vscode 插件

  - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
  - [stylelint-plus](https://marketplace.visualstudio.com/items?itemName=hex-ci.stylelint-plus)

### browserlist

package.json

```json
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "Android >= 4",
    "ios >= 8"
  ],
```

或

```json
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
```

### typecheck

```json
{
  "test:typecheck": "tsc -p .",
  "typecheck": "tsc -p scripts --noEmit && tsc -p playground --noEmit"
}
```

### conventional-changelog

Commit 规范化之后，就可以通过工具把关键信息找出来，自动生成到 CHANGELOG 中。

conventional-changelog 是一款可以根据项目的 commit 和 metadata 信息自动生成 changelogs 和 release notes 的系列工具，并且在辅助 [standard-version](https://github.com/conventional-changelog/standard-version) 工具的情况下，可以自动帮你完成生成 version、打 tag, 生成 CHANGELOG 等系列过程。

```bash
npm i conventional-changelog-cli -D
```

config

```json
"scripts": {
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
}
```

  - [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
  - <https://zhuanlan.zhihu.com/p/51894196>

### sonarlint

接入 SonarQube

### markdownlint

关于 markdown 格式优化

  - <https://github.com/DavidAnson/markdownlint>

## IDE 编辑器接入 lint

这里只涉及到 vscode

在项目中新建配置 `.vscode/settings.json`

```js
{
  // https://github.com/microsoft/vscode-eslint#settings-migration
  "javascript.format.enable": false, // 关闭默认js格式化程序
  "eslint.format.enable": false, // 不用 eslint 做格式化
  "eslint.useESLintClass": true, // 指定使用新 Engine(>8 默认)
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  // 保存代码时，自动修复 fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },

  "editor.formatOnSave": true, // 保存时自动格式化

  // "editor.defaultFormatter": "esbenp.prettier-vscode", // 不能全部用 prettier
  // 需要分类处理, prettier 可以处理以下格式
  // js,jsx, ts,tsx, json,json5, css,less,scss, pug,html
  "[javascript,javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // typescript,typescriptreact 卸载一起保存时未生效
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    // "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json,json5]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css,less,scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    // "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "[pug,html]": {
    // "editor.defaultFormatter": "HookyQR.beautify"
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // "[markdown]": {
  //   "editor.defaultFormatter": "esbenp.prettier-vscode"
  // },

  // vetur
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  }
}
```

## 扩展阅读

  - [全面梳理代码规范化：EditorConfig + Prettier + ESLint](https://juejin.cn/post/6952842182252298248)
  - [ESLint 工作原理探讨](https://zhuanlan.zhihu.com/p/53680918)
  - [自定义 Git - Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
  - [lint-staged如何做到只lint staged?](https://juejin.cn/post/6844903864722784264)

### 知识点

  - [mrm](https://www.npmjs.com/package/mrm) 是配置文件生成工具, Command line tool to help you keep configuration (package.json, .gitignore, .eslintrc, etc.) of your open source projects in sync.
  - [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) 为您的程序搜索并加载配置。
