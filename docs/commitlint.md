# commitlint

检验提交的说明是否符合规范，不符合则不可以提交

  - [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)
  - 传统提交格式
    - [conventional commit format](https://www.conventionalcommits.org/)
    - [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)

commit msg 规范。

为什么要，好处：

  - 提供更多的历史信息，方便快速浏览
  - 可以过滤某些 `commit`，便于筛选代码 `review`
  - 可以追踪 `commit` 生成更新日志
  - 可以关联 `issues`

## 扩展

### 交互式方案

  - [Guide: Use prompt](https://commitlint.js.org/#/guides-use-prompt)

交互方案 1

  - [`@commitlint/prompt-cli`](https://www.npmjs.com/package/@commitlint/prompt-cli) 29k
    - `npm set-script commit "commit"`
    - `npm run commit`

```bash
# 交互步骤效果如下
# 需要先 git add .
➜  lint-example git:(dev) ✗ npm run commit

> lint-example@0.0.2 commit
> commit

Please enter a type: [optional] [tab-completion] [header]
<type> holds information about the goal of a change.

<type>(<scope>): <subject>
<body>
<footer>

? type: feat  # 输入
Please enter a scope: [optional] [header]
<scope> marks which sub-component of the project is affected

feat(<scope>): <subject>
<body>
<footer>

? scope: commitlint  # 输入
Please enter a subject: [required] [header]
<subject> is a short, high-level description of the change

feat(commitlint): <subject>
<body>
<footer>

? subject: update md  # 输入
Please enter a body: [optional] [multi-line]
<body> holds additional information about the change

feat(commitlint): update md
<body>
<footer>

? body:  # 输入
Please enter a footer: [optional] [multi-line]
<footer> holds further meta data, such as breaking changes and issue ids

feat(commitlint): update md
<footer>

? footer:  # 输入
```

交互方案 2

[`commitizen`](https://www.npmjs.com/package/commitizen) 0.6M 是 `@commitlint/prompt-cli` 的一个替代方案

commitlint 提供了两个 `commitizen` 适配器:

  - [`@commitlint/prompt`](https://www.npmjs.com/package/@commitlint/prompt) 42K 提供了一种交互方式 `@commitlint/prompt-cli`
  - [`@commitlint/cz-commitlint`](https://www.npmjs.com/package/@commitlint/cz-commitlint) 15K 受 [`cz-conventional-changelog`](https://www.npmjs.com/package/cz-conventional-changelog) 1M 启发，它提供了一种更现代的交互方式。

commitizen 可以全局安装，提供 `git cz` 替代 `git commit`

**`@commitlint/prompt`**

交互效果同 `@commitlint/prompt-cli`

```bash
{
  "scripts": {
    "cz": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/prompt"
    }
  }
}
```

`@commitlint/cz-commitlint` 要求 node>12.1.2

让 commitizen 基于 commitlint.config.js 工作，只需要维护一个配置文件

  - commitizen 用于提交
  - commitlint 用于校验
  - 共享配置文件 commitlint.config.js

交互过程的灵感来自 cz-conventional-changelog，交互体验更好

```json
{
  "scripts": {
    "cz": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  }
}
```

如果使用 `cz-conventional-changelog` 适配器

```bash
# 初始化命令
# 本质就是安装该适配器后，修改 "path": "@commitlint/cz-commitlint"
# 变更适配器 "path": "./node_modules/cz-conventional-changelog"
# 交互体验同 "@commitlint/cz-commitlint"，但交互细节略好些
commitizen init cz-conventional-changelog --save --save-exact

# 初始化命令主要做了 2 件事
# 1. 在项目中添加并安装开发依赖 cz-conventional-changelog 适配器
# 2. 在 package.json 中新增配置 config.commitizen，用于配置cz工具的适配器路径
# "config": {
#   "commitizen": {
#     "path": "./node_modules/cz-conventional-changelog"
#   }
# }
#
# config.commitizen 下有很多配置，types: { feat: {} }, 可定义分类
```

### 定制化项目提交说明

上面的提交说明都是英文的，如果想定制项目的提交说明，可以试试 [`cz-customizable`](https://www.npmjs.com/package/cz-customizable) 73K, 它还能与 [semantic-release](https://github.com/semantic-release/semantic-release) 完美配合

该模块还可以全局使用, 推荐使用 [Option 2 - cz-customizable in standalone mode (New)](https://github.com/leoforfree/cz-customizable#option-2---cz-customizable-in-standalone-mode-new) 配置，此时不依赖 `commitzen`

```bash
npm i -D cz-customizable
```

package.json

```json
"scripts" : {
  "czz": "./node_modules/cz-customizable/standalone.js"
}
```

[文档提示](https://github.com/leoforfree/cz-customizable#option-2---no-changes-to-your-git-repository)说，可以仅新增配置在用户根目录(home directory)下 `~/.cz-config.js`, 但验证未通过, 提示 `Unable to find a configuration file`。

通过查看源码，确认了逻辑，目前要使用 `~/.cz-config.js` 配置，还需要在 package.json 中指定配置路径 `pkg.config['cz-customizable'].config = "/xx/xx/.cz-config.js"`。

> 已提交 [PR](https://github.com/leoforfree/cz-customizable/pull/177)
> 项目内可以临时使用 `npx patch-package cz-customizable`
> 注意: 本地验证需要去除 project root 下的 .cz-config.js

```js
{
  "config": {
    "cz-customizable": {
      // 只能填写绝对路径, 不能配置 ~/.cz-config.js
      "config": "/xx/xx/.cz-config.js"
    }
  },
}
```

而放在项目根目录下是直接验证通过的

```js
// 官方示例 https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js
// 汉化版

module.exports = {
  // prettier-ignore
  types: [
    {value: 'feat',     name: '特性: 一个新的特性'},
    {value: 'fix',      name: '修复: 修复一个Bug'},
    {value: 'docs',     name: '文档: 变更的只有文档'},
    {value: 'style',    name: '格式: 空格, 分号等格式修复'},
    {value: 'refactor', name: '重构: 代码重构，注意和特性、修复区分开'},
    {value: 'pref',     name: '性能: 提升性能'},
    {value: 'test',     name: '测试: 添加一个测试'},
    {value: 'chore',    name: '工具: 开发工具变动(构建、脚手架工具等)'},
    {value: 'revert',   name: '回滚: 代码回退'},
    {value: 'WIP',      name: 'WIP: 工作中'}
  ],
  // prettier-ignore
  scopes: [
    {name: 'commitizen'},
    {name: 'react'},
    {name: 'ts'},
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '\n标示这个变更的范围 (可选):',
    // used if allowCustomScopes is true
    customScope: '标示这个变更的范围:',
    subject: '简短说明，命令式的描述:\n',
    body: '详细变更描述 (可选)。可使用 "|" 换行:\n',
    breaking: '非兼容性更新说明 (可选):\n',
    footer: '关联关闭的issue (可选)。例如: #31, #34:\n',
    confirmCommit: '确定提交说明?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
```

### 给 commit 加表情

安装 `gitmoji-cli`

使用：你可以在这个 `gitmoji` 网站找到更多的表情来丰富你的提交记录，只需要在提交记录中加上类型 `:bug:` 的代码就可以显示表情了。

### Git 详细模式

Git 使用详细模式提交 `-v`，也称为 `--verbose`

```bash
# 使用此标志，Git 将在提交消息模板的底部包含更改的差异
git commit --verbose

# 将 Git 配置为始终使用详细模式
git config --global commit.verbose true
```

  - AngularJS team CONTRIBUTING.md [git commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)
