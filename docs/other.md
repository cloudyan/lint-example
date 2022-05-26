# 其他

## yaml

关于 yaml 文件扩展名, [官方](https://yaml.org/faq.html) 官方推荐我们使用 `.yaml`。

## patch-package

为第三方包创建补丁

```bash
# 运行后会提示是否创建 issue
npx patch-package package/another-package

# scoped packages
npx patch-package @my/package/@my/other-package
```
