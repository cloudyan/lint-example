// 官方示例 https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js
// 汉化版

module.exports = {
  // prettier-ignore
  types: [
    {value: 'feat',     name: '一个新的特性'},
    {value: 'fix',      name: '修复一个Bug'},
    {value: 'docs',     name: '变更的只有文档'},
    {value: 'style',    name: '空格, 分号等格式修复'},
    {value: 'refactor', name: '代码重构，注意和特性、修复区分开'},
    {value: 'pref',     name: '提升性能'},
    {value: 'test',     name: '添加一个测试'},
    {value: 'build',    name: '编译相关变更(发布版本、依赖改动)'}, // 新增
    {value: 'chore',    name: '开发工具变动(构建、脚手架工具等)'},
    {value: 'revert',   name: '代码回退'},
    {value: 'ci',       name: 'CI 相关变更'}, // 新增
    {value: 'WIP',      name: '工作中'}
  ].map(({value, name}) => ({
    value,
    name: `${value.padEnd(10)}: ${name}`,
  })),
  // prettier-ignore
  scopes: [
    {name: 'editorconfig'},
    {name: 'prettier'},
    {name: 'babel'},
    {name: 'eslint'},
    {name: 'stylelint'},
    {name: 'browserlist'},
    {name: 'lint-staged'},
    {name: 'husky'},
    {name: 'commitlint'},
    {name: 'conventional-changelog'},
    {name: 'sonarlint'},
    {name: 'markdownlint'},
    {name: 'IDE'},
    // 如果选择 custom, 后面会让你再输入一个自定义的 scope,
    // 也可以不设置此项, 把后面的 allowCustomScopes 设置为 true
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
    type: '请确保你的提交遵循了原子提交规范！\n选择你要提交的类型:',
    scope: '\n选择变更范围 scope (可选):',
    // used if allowCustomScopes is true
    customScope: '请输入自定义变更范围 scope:',
    subject: '简短说明，使用命令式的描述:\n',
    body: '尽可能详细的描述 (可选)。可使用 "|" 换行:\n',
    breaking: '非兼容性的更新说明 (可选):\n',
    footer: '列举所有关联的 issues, closed (可选)。例如: #31, #34:\n',
    confirmCommit: '确定提交?',
  },

  // 是否允许自定义填写 scope, 设置为 true, 会自动添加两个 scope 类型
  //    [{ name: 'empty', value: false },{ name: 'custom', value: 'custom' }]
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
