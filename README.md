# lint-example

lint example

## 进度

  - 项目接入
    - [x] editorconfig
    - [x] prettier
    - [x] eslint
    - [x] babel
    - [ ] stylelint
    - [x] browserlist
    - [x] lint-staged
    - [x] husky
    - [x] commitlint
    - [x] conventional-changelog
    - [ ] sonarlint
    - [ ] markdownlint
  - IDE 编辑器接入
    - [x] vscode
  - CI 流程接入
    - [ ] format
    - [ ] eslint

## lint 接入

  - 项目中如何接入
  - IDE 编辑器如何接入
  - CI 流程如何接入

集成到 vscode, webpack 以及 CI 流程上能有效保证执行落地。

## 项目接入

接入步骤

  - [lint-example](#lint-example)
    - [进度](#进度)
    - [lint 接入](#lint-接入)
    - [项目接入](#项目接入)
      - [版本控制](#版本控制)
      - [editorconfig](#editorconfig)
      - [prettier](#prettier)
      - [eslint](#eslint)
      - [babel](#babel)
      - [stylelint](#stylelint)
      - [browserlist](#browserlist)
      - [lint-staged](#lint-staged)
      - [husky](#husky)
      - [commitlint](#commitlint)
      - [conventional-changelog](#conventional-changelog)
      - [typecheck](#typecheck)
      - [sonarlint](#sonarlint)
      - [markdownlint](#markdownlint)
    - [IDE 编辑器接入](#ide-编辑器接入)
    - [CI 流程接入](#ci-流程接入)
    - [扩展阅读](#扩展阅读)
      - [知识点](#知识点)

---

### 版本控制

> 保证项目开发维护的稳定性。

项目下 add `.npmrc` && `.nvmrc`, 并且 lock 文件要入库。

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

CI 流程通过 `npm ci` 安装依赖，此时会校验 lock 文件等

TODO: 应该通过工具检查需要添加的控制，并给出完善指导

### editorconfig

> EditorConfig 实现跨平台、编辑器和 IDE 统一编程风格, 提高代码阅读质量。

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

> An opinionated code formatter.
> 一个"有主观约束性"的代码格式化工具。

  - Prettier 郑重提出：大家不要吵！咱们先提高代码的可读性和可维护性再说，具体什么风格我给你们定。
  - 这就是 Prettier 的 **opinionated**!

usage

```bash
npm i prettier lint-staged -D

prettier --write .                              # -w
prettier --write --ignore-unknown "src/**/*.js" # -w -u
prettier --write 'src/**/*.{js,jsx,ts,tsx,json,yml,yaml,css,less,scss}'

prettier --check "src/**/*.js"                  # -c
prettier --list-different "src/**/*.js"         # -l

# prettier diff
prettier --write '**/?(.)*.{js,jsx,ts,tsx,json,yml,yaml,css,less,scss}' && git --no-pager diff && git checkout -- .
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

### eslint

> 查找并修复 JavaScript 代码中的问题

一些原则

  - 按照 prettier 原则，尽量减少格式化对开发的干扰
    - 不应该因为分号、逗号分心，满篇飘红，应关注代码逻辑，格式化应让工具自动处理
  - prettier 专注于 format
  - eslint 专注于 check syntax and find problems

接入之前有必要先熟悉下一些常见的库配置

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

`.eslintrc.js`

```js
// 示例
module.exports = {
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

config package.json

```json
{
  "eslint": "cross-env TIMING=1 eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
  "eslint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
}
```

  - [TIMING=1](https://eslint.org/docs/1.0.0/developer-guide/working-with-rules)
  - [--format=pretty](https://www.npmjs.com/package/eslint-formatter-pretty)

### babel

> eslint 需要 babel 配合, 按需配置

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

> Stylelint 是一个强大、先进的 CSS 代码检查器（linter），可以帮助你规避 CSS 代码中的错误并保持一致的编码风格。

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

> Share target browsers between different front-end tools, like Autoprefixer, Stylelint and babel-preset-env
> 国内情况复杂，如要精准配置，需要用户覆盖统计数据

`.browserslistrc` 独立配置文件

```conf
# .browserslistrc
# https://github.com/browserslist/browserslist#queries

defaults
last 2 versions
> 0.1%
ios >= 9
android >= 4.4

# npx browserslist "defaults, last 2 versions, > 0.1%, ios >= 9, android >= 4.4"
# https://browserslist.dev
```

package.json

```json
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "Android >= 4.4",
    "iOS >= 10"
  ],
```

测试预览

```bash
# 项目中
npx browserslist

# Use CLI tool instead of the website
npx browserslist "last 2 version, >1%"
# pc
npx browserslist "defaults, last 2 versions, > 0.1%, safari >= 9, ie >= 10"
# mobile
npx browserslist "defaults, last 2 versions, > 0.1%, safari >= 9, iOS >= 9, android >= 4.4"
```

### lint-staged

> Run linters against staged git files and don't let 💩 slip into your code base!

  - 如果对项目中所有文件一次性格式化，大范围的修改很可能出现不可控的情况。
  - 借助 lint-staged 可将处理范围限制在 Git 暂存区内 (staged) 的文件。

useage

```bash
npx husky add .husky/pre-commit "npx --no-install lint-staged"
```

package.json

```json
  "scripts": {
    "format": "npm run prettier -- --write",
    "eslint": "cross-env TIMING=1 eslint --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
    "eslint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
    "format": "npm run prettier -- --write",
    "lint-staged": "lint-staged --allow-empty",
    "prettier": "prettier .",
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,yml,yaml,css,less,scss}": [
      "prettier --write"
    ],
    "*.{js,jsx,ts,tsx}": [
      "npm run eslint:fix"
    ]
  },
```

### husky

> Modern native git hooks made easy

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

或手动操作

npm i -D husky
# 手动启用 Git 挂钩
npm set-script prepare "husky install"
npm run prepare
```

config

```bash
# Add a hook:
npx husky add .husky/pre-commit "npm test"
npx husky add .husky/pre-commit "npm run lint-staged"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1' # 这个执行有问题
yarn husky add .husky/commit-msg 'npx --no -- commitlint --edit "${1}"' # 这个可以

# husky uninstall
npm uninstall husky && git config --unset core.hooksPath
```

### commitlint

> Lint commit messages

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

### conventional-changelog

> Generate changelogs and release notes from a project's commit messages and metadata.

  - commit msg 规范化之后，就可以通过工具把关键信息找出来，自动生成到 CHANGELOG 中。
  - conventional-changelog 就是一款可以根据项目的 commit 和 metadata 信息自动生成 changelogs 和 release notes 的工具，并且在辅助工具 [standard-version](https://github.com/conventional-changelog/standard-version) 下，可以自动帮你完成生成 version、打 tag, 生成 CHANGELOG 等系列过程。

```bash
npm i conventional-changelog-cli -D
```

config

```json
"scripts": {
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
}
```

### typecheck

```json
{
  "test:typecheck": "tsc -p .",
  "typecheck": "tsc -p scripts --noEmit && tsc -p playground --noEmit"
}
```

### sonarlint

> SonarLint 在 IDE 编写代码时解决质量和安全问题
> SonarQube 在 CI 流程控制代码质量和安全问题

接入 SonarLint, SonarQube

### markdownlint

关于 markdown 格式优化

## IDE 编辑器接入

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

## CI 流程接入

CI 流程需要接入，但因为使用了 list-staged，导致存在了复杂度。（每次 push 会包含多个 commit）

目前仅支持全量检测

  - format
  - eslint

## 参考文档

  - [editorconfig](https://editorconfig.org/)
  - [prettier](https://prettier.io/)
  - [eslint](https://eslint.org/)
  - [babel](https://babeljs.io/)
  - [stylelint](https://stylelint.io/)
  - [browserslist](https://github.com/browserslist/browserslist)
  - [lint-staged](https://github.com/okonet/lint-staged)
  - [husky](https://typicode.github.io/husky/#/)
  - [commitlint](https://commitlint.js.org/)
  - [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
  - [sonarlint](https://www.sonarlint.org/)
  - [sonarqube](https://www.sonarqube.org/)
  - [markdownlint](https://github.com/DavidAnson/markdownlint)
  - [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
  - [全面梳理代码规范化：EditorConfig + Prettier + ESLint](https://juejin.cn/post/6952842182252298248)
  - [git commit 、CHANGELOG 和版本发布的标准自动化](https://zhuanlan.zhihu.com/p/51894196)

### 扩展阅读

  - [自定义 Git - Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
  - [ESLint 工作原理探讨](https://zhuanlan.zhihu.com/p/53680918)
  - [lint-staged如何做到只lint staged?](https://juejin.cn/post/6844903864722784264)
  - [mrm](https://www.npmjs.com/package/mrm) 是配置文件生成工具, Command line tool to help you keep configuration (package.json, .gitignore, .eslintrc, etc.) of your open source projects in sync.
  - [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) 为您的程序搜索并加载配置。
