# browserslist

The config to share target browsers and Node.js versions between different front-end tools. It is used in:

- Autoprefixer
- Babel
- postcss-preset-env
- eslint-plugin-compat
- stylelint-no-unsupported-browser-features
- postcss-normalize
- obsolete-webpack-plugin

> [browserslist](https://github.com/browserslist/browserslist): Share target browsers between different front-end tools, like Autoprefixer, Stylelint and babel-preset-env
> 国内情况复杂，如要精准配置，需要用户覆盖统计数据

- browserslist 使用 Can I Use 网站的数据来查询浏览器版本范围。
- browserslist 提供在线的查询条件[练习网站](https://browserslist.dev)
- [browserslist示例](https://github.com/browserslist/browserslist-example) 列举了每个工具是如何使用 browserslist 的。

## browserslist 衍生的工具

- [browserslist-ga](https://github.com/browserslist/browserslist-ga): 该工具能生成访问你运营的网站的浏览器的版本分布数据，以便用于类似> 0.5% in my stats查询条件, 前提是你运营的网站部署有 Google Analytics。
- [browserslist-useragent](https://github.com/browserslist/browserslist-useragent): 检验给定的用户代理 user-agent 字符串是否匹配 browserslist 给出的浏览器范围。
- [caniuse-api](https://www.npmjs.com/package/caniuse-api): 返回支持指定特性的浏览器版本范围
- `npx browserslist`: 在前端工程目录下运行此命令，输出当前工程的目标浏览器列表。

注意: 浏览器分类是大小写不敏感的, [分类列表](https://github.com/browserslist/browserslist#browsers)

如果不想用 browserslsit 的默认设置 `defaults`，推荐使用`last 1 version`, `not dead, > 0.2%` 或 `not dead`，仅使用 `last n versions` 将添加太多的废弃浏览器到工程里面来, 同时也没有有效的覆盖那些占有率仍然很高的老版本浏览器。

`.browserslistrc` 独立配置文件

```conf
# .browserslistrc
# https://github.com/browserslist/browserslist#queries

defaults
last 2 versions
> 0.1%
ios >= 9
android >= 4.4

# npx browserslist "defaults, last 2 versions, > 0.1%, ios >= 9, android >= 4.4"
# https://browserslist.dev
```

如未查询到配置，Browserslist 将使用默认值，取值如下

```conf
# https://github.com/browserslist/browserslist#queries

> 0.5%
last 2 versions
Firefox ESR
not dead

# npx browserslist "> 0.5%, last 2 versions, Firefox ESR, not dead"
```

package.json 中配置

```json
  "browserslist": [
    "last 2 versions",
    "> 0.1%",
    "android >= 4",
    "ios >= 9"
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

独立配置和 package.json 中同时配置，优先级是怎样的

文档

- [Browserslist](https://juejin.cn/post/6844903669524086797) (基于官方文档翻译）
