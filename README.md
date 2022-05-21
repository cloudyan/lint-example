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

### prettier

install

`npm i prettier lint-staged -D`

command

```bash
prettier -w .                 # --write
prettier -w -u "src/**/*.js"  # --ignore-unknown
prettier -w 'src/**/*.{js,ts,jsx,tsx,json,md,css,less,scss,html,yaml,yml}'

prettier -c "src/**/*.js"     # --check
prettier -l "src/**/*.js"     # --list-different

# prettier diff
prettier --write '**/?(.)*.{md,css,scss,js,json,yaml,yml}' && git --no-pager diff && git checkout -- .
```

config

```json
"scripts": {
  "prettier": "prettier -w .",
  "prettier:ci": "prettier -c ."
}
```

### husky





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
