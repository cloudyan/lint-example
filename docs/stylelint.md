# stylelint

  - <https://stylelint.io/>

```bash
npm i -D stylelint stylelint-config-standard stylelint-config-prettier

# .stylelintrc.js
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"]
}

npx stylelint "src/**/*.css"
```

共享配置

  - stylelint-config-standard 标准配置
  - stylelint-config-prettier 解决与 prettier 规则冲突
  - 社区共享配置
    - SCSS
      - stylelint-config-standard-scss
        - `npx stylelint "**/*.scss"`
      - stylelint-config-prettier-scss
    - stylelint-config-css-modules
    - stylelint-config-rational-order
    - stylelint-no-unsupported-browser-features
    - stylelint-config-html
    - stylelint-config-recommended-vue
  - customSyntax 使用自定义语法
    - postcss-lit
    - postcss-markdown
    - postcss-less
    - postcss-scss
    - sugarss
