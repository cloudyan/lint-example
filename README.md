# lint-example

lint example

## 如何执行落地？

集成到 vscode, webpack 以及 CI 流程上。

  - 项目中如何接入
  - IDE 编辑器如何接入
    - `"editor.formatOnSave": true,`
    - 解决 Prettier 和 ESLint 冲突
  - CI 流程如何接入

分工

  - EditorConfig 统一各种编辑器的配置, 处理编辑器相关配置(行尾、缩进样式、缩进距离...等)
  - Prettier 作为**代码格式化**工具
  - 其余的，也就是**代码质量**方面的语法检查，用 `ESLint` 来做(格式化的事儿，让 Prettier 来做)

## 项目中接入 lint

接入步骤

  - [lint-example](#lint-example)
    - [如何执行落地？](#如何执行落地)
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
      - [sonar](#sonar)
      - [markdownlint](#markdownlint)
    - [IDE 编辑器接入 lint](#ide-编辑器接入-lint)
    - [常见问题](#常见问题)
      - [解决冲突](#解决冲突)
        - [Prettier 与 ESLint 规则冲突](#prettier-与-eslint-规则冲突)
        - [@typescript-eslint/eslint-plugin 与 eslint 规则冲突](#typescript-eslinteslint-plugin-与-eslint-规则冲突)
    - [测试代码](#测试代码)
    - [其他](#其他)

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

为什么要加

> .editorconfig 是可移植自定义编辑器设置。
> 实现跨平台、编辑器和 IDE 统一编程风格, 提高代码阅读质量。
> EditorConfig 设置优先于全局 Visual Studio 文本编辑器设置

即使团队统一编程风格、编辑器，仍不能保证历史遗留代码、第三方开源库等风格一致，还可能存在编码问题，非 utf-8 等

config

> Unix-style newlines with a newline ending every file
> 根目录的配置文件，编辑器会由当前目录向上查找，如果找到 `roor = true` 的文件，则不再查找

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

EditorConfig 解决了编辑器配置层面的编码风格一致性问题。但代码风格的部分并未涉及，比如句尾分号、逗号、多行对象书写规范等

在 EditorConfig 文件中设置的约定当前无法在 CI/CD 管道中强制为生成错误或警告。

### prettier

适用范围: 代码格式化

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
npx husky add .husky/commit-msg 'npx --no commitlint --edit "$1"' # 这个执行有问题

# husky uninstall
npm uninstall husky && git config --unset core.hooksPath
```

git hooks 可以通过 `--no-verify` 跳过检查，所以需要再 CI 流程中卡点

### lint-staged

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

  - <https://juejin.cn/post/6844903864722784264>

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

Git 使用详细模式提交 `-v`，也称为 `--verbose`

```bash
# 使用此标志，Git 将在提交消息模板的底部包含更改的差异
git commit --verbose

# 将 Git 配置为始终使用详细模式
git config --global commit.verbose true
```

TODO

  - 这个如果错误能给中文提示吗？
  - 交互式方案

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

每个规则有【3】个错误级别

  - "off"或 0: 关闭规则
  - "warn"或 1: 打开规则, 作为警告（不会导致程序退出）
  - "error"或 2: 打开规则, 作为错误（触发时程序会退出，退出代码为 1）

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
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {

  },
}
```

package.json

```json
  "eslint": "eslint src --ext .js,.jsx,.ts,.tsx,.vue",
  "eslint:fix": "eslint --fix src --ext .js,.jsx,.ts,.tsx,.vue",

  "eslint": "eslint .",
  "eslint:fix": "eslint --fix .",
```

```bash
npm run eslint:fix -- --ext '.{js,jsx,ts,tsx,json,vue,yml,yaml,css,less,scss,md,html}'
```

### babel

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

配置 .stylelintignore 文件(默认不格式化 node_modules)

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

### sonar

接入 sonar

### markdownlint

关于 markdown 格式优化

  - <https://github.com/DavidAnson/markdownlint>

## IDE 编辑器接入 lint

这里只涉及到 vscode

VSCode 相关插件

  - [ESLint 插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier - Code formatter 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - 待确认 [Prettier ESLint 插件](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

在项目中新建配置 `.vscode/settings.json`

```js
{
  "editor.formatOnSave": true, // 保存时自动格式化
  // 保存代码时，自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true, // 保存时使用eslint校验文件
    "source.fixAll.stylelint": true
  },

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
}
```

关于 Sublime Text，暂未做探究

  - [SublimeLinter](https://github.com/airbnb/javascript/blob/master/linters/SublimeLinter/SublimeLinter.sublime-settings)

## 常见问题

### 解决冲突

#### Prettier 与 ESLint 规则冲突

为什么会产生冲突

vscode 配置了在文件保存时进行 Prettier 格式化 和 ESLint 自动修复，当保存文件时，ESLint 先 fix 了代码，之后 prettier 格式化了代码，导致代码变得不符合 ESLint 规则了。

  - Prettier 插件根据 `.prettierrc` 文件中的配置来美化代码
  - ESLint 插件也根据 `.eslintrc` 文件中的配置对代码进行美化和校验
    - 当使用 `eslint-plugin-prettier` 插件时，会用 prettier 替代了 eslint 本身对于代码美化部分的功能，而其中的配置是官方默认配置，并且不从.prettierrc 文件中读取配置
    - 当.prettierrc 的配置和官方默认配置不一致的时候, 编辑器处理时就冲突了
  - eslint-config-prettier: 解决 ESLint 和 prettier 规则冲突问题，以 prettier 规则为准，**关闭所有可能和 Prettier 冲突的 ESLint 规则**。使用时需要将 prettier 加到 extends 数组的最后。

怎么解决

推荐使用 [`prettier-eslint`](https://github.com/prettier/prettier-eslint), 会用 prettier 先格式化，然后再用 ESLint fix。这和 vscode 保存文件时的流程是相反的。

  - <https://zhuanlan.zhihu.com/p/347339865>
  - <https://zhuanlan.zhihu.com/p/142105418>

#### @typescript-eslint/eslint-plugin 与 eslint 规则冲突

一个配置开，一个配置关，冲突就产生了。

#### prettier 与 markdownlint 冲突

调试为 prettier 对应的规则，或关闭 prettier 格式化

```js
  // "[markdown]": {
  //   "editor.defaultFormatter": "esbenp.prettier-vscode"
  // },
```

## 测试代码

src 包含各类型的测试源代码, 用于测试验证，包括但不限于以下类型

  - js
  - ts
  - jsx
  - tsx
  - json X
  - json5
  - md X
  - css
  - less
  - scss
  - yaml,yml
  - ejs,html
  - vue
  - react

可以使用 jest 结合 lint-staged 只检测发生改动的文件

```json
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": ["npm run test:staged"]
  }
```

`"test:staged": "jest --bail --findRelatedTests",`

  - bail: 只要遇到运行失败的单测用例即退出
  - findRelatedTests: 检测指定的文件路径

```js
// jest.config.js
// https://jestjs.io/docs/cli
module.exports = {
  roots: ['<rootdir>/src'], // 查找src目录中的文件
  collectCoverage: true, // 统计覆盖率
  coverageDirectory: 'coverage', // 覆盖率结果输出的文件夹

  // collectCoverageFrom 会影响输出所有符合要求的文件的覆盖率, 改用排除法，只从被检测的文件中提取覆盖率
  collectCoverageFrom: ['!src/**/*.d.ts', '!src/**/*{.json,.snap,.less,.scss}'],
  coverageThreshold: {
    // 所有文件总的覆盖率要求
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
    // 匹配到的单个文件的覆盖率要求
    // 这里也支持通配符的配置
    './src/**/*.{ts,tsx}': {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40,
    },
  },
  // 匹配单测用例的文件
  testMatch: ['<rootdir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootdir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  // 当前环境是jsdom还是node
  testEnvironment: 'jsdom',
  // 设置别名，若不设置，运行单测时会不认识@符号
  moduleNameMapper: {
    '^@/(.*)$': '<rootdir>/src/$1',
  },
}
```

  - <https://www.cnblogs.com/xumengxuan/p/14921634.html>

## 其他

关于 yaml 文件扩展名, [官方](https://yaml.org/faq.html) 官方推荐我们使用 `.yaml`。

## TODO

  - [ ] .editorconfig 有什么用，是否会对 prettier 有影响
  - [ ] prettier 的适用范围（哪些 ext）
  - [ ] eslint 的适用范围（哪些 ext）
  - [ ] prettier 和 eslint 的规则冲突
  - [ ] prettier 和 eslint 在 VSCode editor.formatOnSave 生效
  - [ ] @typescript-eslint/eslint-plugin 与 eslint 规则冲突
  - [ ] eslint 如何在 webpack 本地开发中卡点
  - [ ] commitlint 如何在 CI 中卡点
  - [ ] 使用 lint-staged 后，prettier 或 eslint 如何在 CI 中卡点
  - [ ] commitlint 如何交互式操作
  - [ ] prettier 和 markdownlint 的规则冲突

解决方案

### prettier 与 editorconfig 配置相交？

有了 Prettier 还需要 EditorConfig 吗？两者配置不同会怎么样？

我们需要重演一下两者的作用过程：

  - EditorConfig 作用于预览和输入阶段
  - Prettier 在保存和提交阶段重新组织代码，Prettier 会成为代码形态的最终决定者。

实际上如 [Prettier 编辑器配置](https://prettier.io/docs/en/configuration.html#editorconfig) 所描述，Prettier 对 `.editorconfig` 文件在特定配置下做了转换。

如果`options.editorconfig`是true并且您的项目中有一个`.editorconfig`文件，Prettier 将解析它并将其属性转换为相应的 Prettier 配置。此配置将被`.prettierrc`等覆盖。目前，支持以下 EditorConfig 属性：

  - `end_of_line`
  - `indent_style`
  - `indent_size/tab_width`
  - `max_line_length`

没发现配置项 `options.editorconfig`，最新的 VSCode 配置项如下 `useEditorConfig: true`, 默认为 true

参见 https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

```js
"prettier.useEditorConfig": true
// 为 true, .editorconfig 优先级更高
// 为 false, .prettierrc.js 优先级更高
// 默认优先级关系是: .editorconfig 配置 > .prettierrc.js 配置 > Prettier 默认值。
```

考虑到 EditorConfig 覆盖所有类型的文件，所以建议是 EditorConfig 管理相交属性，其他属性则由 Prettier 控制。
