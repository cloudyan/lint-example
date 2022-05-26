# stylelint

> Stylelint 是一个强大、先进的 CSS 代码检查器（linter），可以帮助你规避 CSS 代码中的错误并保持一致的编码风格。

  - <https://stylelint.io/>
  - https://github.com/stylelint/stylelint-demo
  - 14.x 版本不支持 node@10

```bash
npm i -D stylelint stylelint-config-standard stylelint-config-prettier
```

添加配置 .stylelintrc.js

```js
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"]
}
```

测试

```bash
npx stylelint "src/**/*.css"

# 更多规则
npm i -D stylelint-config-css-modules stylelint-config-rational-order stylelint-no-unsupported-browser-features
# 注意 stylelint-config-rational-order 有多项风险，需要执行 npx audit fix --force

npm i -D stylelint-order stylelint-declaration-block-no-ignored-properties
```

  - 完善配置，具体参见 [.stylelintrc.js](./../.stylelintrc.js)
  - 配置 `.stylelintignore` 文件(默认不格式化 node_modules)

共享配置

  - stylelint-config-standard 标准配置，[详细](https://stylelint.io/user-guide/configure#extends)
    - stylelint-config-recommended 推荐配置(只打开避免错误的规则)
  - [stylelint-config-prettier](https://www.npmjs.com/package/stylelint-config-prettier) 解决与 prettier 规则冲突
    - 附带一个 cli 小工具，可以检查规则冲突 `./node_modules/.bin/stylelint-config-prettier-check`
  - [prettier-stylelint](https://github.com/hugomrdias/prettier-stylelint)
    - 灵感来自 prettier-eslint
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
    - [stylelint-config-rational-order](https://www.npmjs.com/package/stylelint-config-rational-order)
      - 13 vulnerabilities (1 moderate, 12 high) 需要 `npm audit fix`
      - 此配置包含
        - [stylelint-order](https://www.npmjs.com/package/stylelint-order) css 属性排序插件，合理的排序加快页面渲染
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
    - [stylelint-find-rules](https://github.com/alexilyaev/stylelint-find-rules) Find stylelint rules that are not configured in your stylelint config
      - 东西挺好的，应该是未升级适配，所以运行报错
      - 灵感来自 [eslint-find-rules](https://github.com/sarbbottam/eslint-find-rules)

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