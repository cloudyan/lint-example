# lint-example

lint example

- 项目中如何接入
- IDE 编辑器如何接入
  - `"editor.formatOnSave": true,`
  - 解决 Prettier 和 ESLint 冲突
- CI 流程如何接入

## 项目中接入 lint

接入步骤

1. add .npmrc && .nvmrc
2. prettier
3. husky
4. lint-staged
5. commitlint
6. editorconfig
7. typecheck
8. eslint
9. stylelint
10. browserlist
11. conventional-changelog

### 如何执行落地？

集成到 vscode, webpack 以及 CI 流程上。

### .npmrc && .nvmrc

```bash
node -v > .nvmrc
```

```ini
engine-strict=true
package-lock=true
registry=https://registry.npmjs.org/
```

### prettier

usage

```bash
npm i prettier lint-staged -D

prettier -w .                 # --write
prettier -w -u "src/**/*.js"  # --ignore-unknown
prettier -w 'src/**/*.{js,jsx,ts,tsx,json,yml,yaml,css,less,scss,md,html}'

prettier -c "src/**/*.js"     # --check
prettier -l "src/**/*.js"     # --list-different

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

### lint-staged

config

```bash
npx husky add .husky/pre-commit "npx --no-install lint-staged"
```

package.json

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,json,yml,yaml,css,less,scss,md,html}": [
    "prettier --write"
  ],
  "*.ts?(x)": [
    "prettier --parser=typescript --write --ignore-unknown"
  ],
}
```

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

### editorconfig

为什么要加

> .editorconfig 是可移植自定义编辑器设置。
> 实现跨平台、编辑器和 IDE 统一编程风格, 提高代码阅读质量。

即使团队统一编程风格、编辑器，仍不能保证历史遗留代码、第三方开源库等风格一致，还可能存在编码问题，非 utf-8 等

> EditorConfig 设置优先于全局 Visual Studio 文本编辑器设置

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

在 EditorConfig 文件中设置的约定当前无法在 CI/CD 管道中强制为生成错误或警告。

### typecheck

```json
{
  "test:typecheck": "tsc -p .",
  "typecheck": "tsc -p scripts --noEmit && tsc -p playground --noEmit"
}
```

### eslint

接入 eslint

- 按照 prettier 原则，尽量减少格式化对开发的干扰
  - 不应该因为尾分号分心，而交给格式化工具自动处理，此时 eslint 应关闭规则

```bash
# base
npm i -D eslint @babel/eslint-parser
# prettier
npm i -D eslint-config-prettier
npm i -D eslint-plugin-import

# error  Parsing error: No Babel config file detected for xxx.js. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files
# 缺少 babel 配置, 添加 babel.config.js 后 OK

# airbnb
npm i -D eslint-config-airbnb-base
# xo
npm i -D eslint-formatter-pretty

# plugin
npm i -D eslint-plugin-babel eslint-plugin-eslint-comments
npm i -D eslint-plugin-compat eslint-plugin-markdown eslint-plugin-promise eslint-plugin-unicorn
# test
npm i -D eslint-plugin-jest

# ts
# plugin:@typescript-eslint/recommended
npm i -D @typescript-eslint/parser @typescript-eslint/recommended @typescript-eslint/eslint-plugin

# react
# plugin:react/recommended
npm i -D eslint-plugin-jsx-a11y
npm i -D eslint eslint-plugin-react eslint-plugin-react-hooks

# vue
npm i -D eslint-plugin-import eslint-plugin-vue

```

config

```js

```

### babel

```bash
npm i -D @babel/core @babel/preset-env
```

### stylelint

接入 stylelint

```bash
npm i -D stylelint stylelint-config-css-modules stylelint-config-prettier stylelint-config-rational-order stylelint-config-standard stylelint-declaration-block-no-ignored-properties stylelint-no-unsupported-browser-features stylelint-order

# prettier
npm i -D prettier-plugin-jsdoc prettier-plugin-style-order
```

### browserlist

```json5
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "Android >= 4",
    "ios >= 8"
  ],

// 或
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
- https://zhuanlan.zhihu.com/p/51894196

## IDE 编辑器接入 lint

- prettier 是一个校验代码格式化的工具
- ESlint 是校验语法的工具

VSCode 相关插件

- [ESLint 插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier ESLint 插件](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

```json
{
  "eslintConfig": {
    "extends": "react-app",
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
  }
}
```

package.json 中直接添加插件 prettier, 这样 ESlint 的窗口也会直接输出 prettier 的报错信息。

为了自动格式化 prettier 的错误也需要添加相应的规则。

ESlint 集成了 prettier 的校验规则，因此 VSCode 中不需要再单独安装 prettier 插件。

## 常见问题

### 解决 Prettier 和 ESLint 冲突

vscode 配置了在文件保存时进行格式化和 ESLint 自动修复：

```json
  "editor.formatOnSave": true, // 保存时自动格式化
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // 保存时使用eslint校验文件
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 格式化时使用 prettier
```

保存文件时，ESLint 先 fix 了代码，之后 prettier 格式化了代码，导致代码变得不符合 ESLint 规则了。

解决方案，使用 `prettier-eslint`

`prettier-eslint` 是先把代码用 prettier 格式化，然后再用 ESLint fix。这和 vscode 保存文件时的流程是相反的。

eslint-plugin-prettier 插件用 prettier 替代了 eslint 本身对于代码美化部分的功能，而其中的配置是官方默认配置，并且不从.prettierrc 文件中读取配置

当.prettierrc 的配置和官方默认配置不一致的时候，就会出现上面那种问题。

## 源代码

src 包含各类型的源代码, 用于测试验证，包括但不限于以下类型

- js
- ts
- jsx
- tsx
- json
- json5
- md
- css
- less
- scss
- yaml,yml
- ejs,html
- vue
- react

关于 yaml 文件扩展名, [官方](https://yaml.org/faq.html) 官方推荐我们使用 `.yaml`。
