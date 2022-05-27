# lint-example

lint example

## 进度

- 项目接入
  - [x] editorconfig
  - [x] prettier
  - [x] eslint
  - [x] babel
  - [x] stylelint
  - [x] browserlist
  - [x] lint-staged
  - [x] husky
  - [x] commitlint
  - [x] conventional-changelog
  - [ ] sonarlint
  - [ ] markdownlint
- IDE 编辑器接入
  - vscode
    - [x] prettier
    - [x] eslint
    - [x] stylelint
- CI 流程接入
  - github-actions
    - [x] prettier
    - [x] eslint
    - [x] stylelint

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
  - [参考文档](#参考文档)
    - [扩展阅读](#扩展阅读)

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
  "prettier": "prettier .",
  "prettier:ci": "npm run prettier -- --check"
}
```

规则配置详见 [.prettierrc.js](.prettierrc.js)

### eslint

> 查找并修复 JavaScript 代码中的问题

一些原则

- 按照 prettier 原则，尽量减少格式化对开发的干扰
  - 不应该因为分号、逗号分心，满篇飘红，应关注代码逻辑，格式化应让工具自动处理
- prettier 专注于 format
- eslint 专注于 check syntax and find problems

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

配置具体参见 [`.eslintrc.js`](./.eslintrc.js)

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

- <https://github.com/stylelint/stylelint-demo>
- 14.x 版本不支持 node@10

```bash
npm i -D stylelint stylelint-config-standard stylelint-config-prettier
```

添加配置 .stylelintrc.js

```js
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"]
}
```

测试

```bash
npx stylelint "src/**/*.css"

# 更多规则
npm i -D stylelint-config-css-modules stylelint-config-rational-order stylelint-no-unsupported-browser-features
# 注意 stylelint-config-rational-order 有多项风险，需要执行 npx audit fix --force

npm i -D stylelint-order stylelint-declaration-block-no-ignored-properties
```

- 完善配置，具体参见 [.stylelintrc.js](./.stylelintrc.js)
- 配置 `.stylelintignore` 文件(默认不格式化 node_modules)

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

- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [eslint-config-sonarqube](https://github.com/SonarSource/eslint-config-sonarqube)

一种实施方案

可以将 ESlint 规则导出为 JSON 以供 Sonar 导入（在构建期间）

> npm run eslint:report
> ./node_modules/.bin/eslint --output-file ./eslint-report.json --ext .js,.jsx,.ts,.tsx --format json ./src

在 `sonar-project.properties` 文件中或通过命令行参数设置此 Sonar 属性（其中 `eslint-report.json` 是上面生成的输出报告）

```conf
sonar.eslint.reportPaths=eslint-report.json
```

ESLint 报告中的任何问题都将出现在标有 EsLint 徽章的 Sonar 问题中。

作为旁注，此命令对于 eslint 也很有用，可以输出任何错误的 HTML 报告，非常适合查看或共享：

```bash
./node_modules/.bin/eslint --output-file ./eslint-report.html --ext .js,.jsx,.ts,.tsx --format html ./src
```

### markdownlint

关于 markdown 格式优化

- prettier 高度符合 [CommonMark 规范](https://commonmark.org/)，并由优秀的[remark-parse](https://github.com/remarkjs/remark)软件包提供支持。

目前未使用 markdownlint, 而是使用 prettier 做格式化

## IDE 编辑器接入

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

## CI 流程接入

目前仅支持全量检测

- prettier
  - [Prettier - Code formatter 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - 待确认 [Prettier ESLint 插件](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- eslint
  - [ESLint 插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- stylelint (以下二选一)
  - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
  - [stylelint-plus](https://marketplace.visualstudio.com/items?itemName=hex-ci.stylelint-plus)

CI 流程需要接入，但因为使用了 list-staged，导致存在了复杂度。（每次 push 会包含多个 commit）

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
- [conventionalcommits](https://www.conventionalcommits.org/)
- [release-please](https://github.com/googleapis/release-please) 维护发布 PR
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
