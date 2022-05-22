# lint-example

lint example

- 项目中如何接入
- IDE 编辑器如何接入
- CI 流程如何接入

## lint 列表

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
10. conventional-changelog

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
};
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
