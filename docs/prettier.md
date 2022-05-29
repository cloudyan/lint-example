# prettier

> An opinionated code formatter.
> 一个"有主观约束性"的代码格式化工具。

- Prettier 郑重提出：大家不要吵！咱们先提高代码的可读性和可维护性再说，具体什么风格我给你们定。
- 这就是 Prettier 的 **opinionated**!

usage

```bash
npm i prettier -D

prettier --write .                              # -w
prettier --write --ignore-unknown "src/**/*.js" # -w -u
prettier --write 'src/**/*.{js,jsx,ts,tsx,json,yml,yaml,css,less,scss}'

prettier --check "src/**/*.js"                  # -c
prettier --list-different "src/**/*.js"         # -l

# prettier diff
prettier --write '**/?(.)*.{js,jsx,ts,tsx,json,yml,yaml,css,less,scss}' && git --no-pager diff && git checkout -- .
```

config

格式化当前目录所有内容时，必须结合 `.prettierignore` 使用

```json
"scripts": {
  "prettier": "prettier .",
  "prettier:ci": "npm run prettier -- --check"
}
```

规则配置详见 [.prettierrc.js](../.prettierrc.js)
