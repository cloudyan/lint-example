# 其他

## yaml

关于 yaml 文件扩展名, [官方](https://yaml.org/faq.html) 官方推荐我们使用 `.yaml`。

## opinionated vs unopinionated

关于 Opinionated 的译法可以参考 [掘金翻译计划的一个 PR](https://github.com/xitu/gold-miner/pull/7984#issuecomment-782794534)，[Vite 中文文档的一个 PR](https://zhuanlan.zhihu.com/p/357794103) 这两处的讨论。

列出几个 opinionated 和 unopinionated 的软件, 你还能想到哪些

  - Opinionated
    - Prettier
    - Vite
  - Unopinionated
    - eslint
    - styleint
    - webpack?

## patch-package

为第三方包创建补丁

```bash
# 运行后会提示是否创建 issue
npx patch-package package/another-package

# scoped packages
npx patch-package @my/package/@my/other-package
```
