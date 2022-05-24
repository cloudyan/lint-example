# commitlint

检验提交的说明是否符合规范，不符合则不可以提交

commit msg 规范。

为什么要，好处：

  - 提供更多的历史信息，方便快速浏览
  - 可以过滤某些 `commit`，便于筛选代码 `review`
  - 可以追踪 `commit` 生成更新日志
  - 可以关联 `issues`

## 扩展

### 交互式方案

`commitizen` 一个格式化 `commit message` 的工具

```bash
commitizen init cz-conventional-changelog --save --save-exact
```

### 定制化项目提交说明

上面的提交说明都是英文的，如果想自定义，可以试试 `cz-customizable`

```bash
npm i -D cz-customizable
```

修改 package.json

```json
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```

新增配置 `.cz.config.js`

```js
'use strict';

module.exports = {

  types: [
    {value: '特性', name: '特性: 一个新的特性'},
    {value: '修复', name: '修复: 修复一个Bug'},
    {value: '文档', name: '文档: 变更的只有文档'},
    {value: '格式', name: '格式: 空格, 分号等格式修复'},
    {value: '重构', name: '重构: 代码重构，注意和特性、修复区分开'},
    {value: '性能', name: '性能: 提升性能'},
    {value: '测试', name: '测试: 添加一个测试'},
    {value: '工具', name: '工具: 开发工具变动(构建、脚手架工具等)'},
    {value: '回滚', name: '回滚: 代码回退'}
  ],

  scopes: [
    {name: '模块1'},
    {name: '模块2'},
    {name: '模块3'},
    {name: '模块4'}
  ],

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
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],

  // limit subject length
  subjectLimit: 100

};
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
