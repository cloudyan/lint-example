# lint-example

lint example

## lint 列表

接入步骤

1. add .npmrc && .nvmrc
2. prettier
3. husky
4. lint-staged
5. commitlint
6. eslint
7. stylelint
8. editorconfig

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
prettier -w 'src/**/*.{js,ts,jsx,tsx,json,md,css,less,scss,html,yaml,yml}'

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
  "*.ts?(x)": [
    "prettier --parser=typescript --write --ignore-unknown"
  ],
  "*": [
    "prettier --write --ignore-unknown"
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

echo 'foo: xxx' | commitlint
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
