# lint-staged

避免每次全量检测代码, 仅过滤Git暂存区的代码

原理

lint-staged 由 git 命令获取暂存区的文件 `git diff --staged --diff-filter=ACMR --name-only -z`，整体步骤大致如下

- 通过命令获取暂存区文件名
- 将文件拆分后，进行序列化，获取文件的完整路径
- 获得完整路径后，根据配置的相应执行规则，创建任务，并执行

glob

- `src/**/*.{js,vue}`：匹配 src 目录下所有的 js 和 vue 文件
- 匹配规则为 `glob-pattern`:
  - `**` 表示递归匹配目录
  - `/*.{js,vue}`会展开为 `/*.js /*.vue`

glob-pattern 文章参考

- [A Beginner’s Guide: Glob Patterns](https://www.malikbrowne.com/blog/a-beginners-guide-glob-patterns)
- [node-glob学习](https://www.cnblogs.com/liulangmao/p/4552339.html)

也可以使用 [pretty-quick](https://github.com/azz/pretty-quick#readme) 来替代 lint-staged

```bash
# pre-commit

yarn pretty-quick --staged
```

## 注意

如果项目中配置了 eslint-loader 进行 eslint-on-save, 会和 lint-staged 冲突，需要关闭

因为 eslint-loader 是保存的时候进行检测，如果项目 lint 没通过，无法正常开发，此时开启 lint-staged 没有什么意义。

所以二选一, 保存时候检测 OR commit 前自动格式化+检测
