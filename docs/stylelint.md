# stylelint

  - <https://stylelint.io/>
  - https://github.com/stylelint/stylelint-demo

```bash
npm i -D stylelint stylelint-config-standard stylelint-config-prettier

# .stylelintrc.js
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"]
}

npx stylelint "src/**/*.css"
```

共享配置

  - stylelint-config-standard 标准配置，[详细](https://stylelint.io/user-guide/configure#extends)
    - stylelint-config-recommended 推荐配置(只打开避免错误的规则)
  - stylelint-config-prettier 解决与 prettier 规则冲突
  - 社区共享配置
    - [SCSS](https://sass-lang.com/)
      - [stylelint-config-standard-scss](https://www.npmjs.com/package/stylelint-config-standard-scss)
        - 此配置包含
          - stylelint-config-standard [build-in rules](https://stylelint.io/user-guide/rules/list) for SCSS以及
          - stylelint-config-recommended-scss
            - customSyntax `postcss-scss`
            - [stylelint-scss](https://www.npmjs.com/package/stylelint-scss) a collection of rules specific to SCSS
            - stylelint-config-recommended
        - `npx stylelint "**/*.scss"`
      - [stylelint-config-prettier-scss](https://www.npmjs.com/package/stylelint-config-prettier-scss)
    - [stylelint-config-css-modules](https://www.npmjs.com/package/stylelint-config-css-modules)
      - 包含 optionalDependencies: stylelint-scss，如不使用 SCSS，安装时可以使用 `--no-optional` 或 `--ignore-optional` 避免安装
    - [stylelint-config-rational-order](https://www.npmjs.com/package/stylelint-config-rational-order) 控制排序
      - 此配置包含
        - [stylelint-order](https://www.npmjs.com/package/stylelint-order)
    - [stylelint-no-unsupported-browser-features](https://www.npmjs.com/package/stylelint-no-unsupported-browser-features)
      - 使用 [doiuse](https://github.com/anandthakker/doiuse) 来检测浏览器支持
      - 底层使用 [caniuse](http://caniuse.com/) 数据库
      - 使用 browserslist 判断浏览器支持列表
    - [stylelint-config-html](https://www.npmjs.com/package/stylelint-config-html)
    - [stylelint-config-recommended-vue](https://www.npmjs.com/package/stylelint-config-recommended-vue)
  - customSyntax 使用自定义语法
    - [postcss-lit](https://www.npmjs.com/package/postcss-lit)
    - [postcss-markdown](https://www.npmjs.com/package/postcss-markdown)
    - [postcss-less](https://www.npmjs.com/package/postcss-less)
    - [postcss-scss](https://www.npmjs.com/package/postcss-sass)
    - [sugarss](https://www.npmjs.com/package/sugarss)
  - 其他

样式属性排序

  - Positioning
  - Box Model
  - Typography
  - Visual
  - Animation
  - Misc

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  /* Box Model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;

  /* Typography */
  color: #888;
  font: normal 16px Helvetica, sans-serif;
  line-height: 1.3;
  text-align: center;

  /* Visual */
  background-color: #eee;
  border: 1px solid #888;
  border-radius: 4px;
  opacity: 1;

  /* Animation */
  transition: all 1s;

  /* Misc */
  user-select: none;
}
```
