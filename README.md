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
npx husky add .husky/commit-msg 'npx --no commitlint --edit "$1"'

# husky uninstall
npm uninstall husky && git config --unset core.hooksPath
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
