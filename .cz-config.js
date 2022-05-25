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