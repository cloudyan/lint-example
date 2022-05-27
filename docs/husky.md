# husky

**为什么用 husky？**

我们只会用到“提交工作流”钩子，提交工作流包含 4 个钩子：

- `pre-commit` 在提交信息**编辑前**运行，在这个阶段塞入**代码检查**流程，检查未通过返回非零值即可停止提交流程；
- `prepare-commit-msg` 在默认信息被创建之后运行，此时正是**启动编辑器前**，可在这个阶段加载 `commitizen` 之类的辅助填写工具；
- `commit-msg` 在**完成编辑后**运行，可在这个阶段借助 `commitlint` 进行提交信息规范性检查；
- `post-commit` 在**提交完成后**运行，在这个阶段一般做一些通知操作。

使用 Git 钩子最直观的方式是操作 .git/hooks 下的示例文件，将对应钩子文件的 .sample 后缀名移除即可启用。然而这种操作方式存在弊端：

- 需要操作项目范围外的 .git 目录
- 无法同步 .git/hooks 到远程仓库

两个弊端可以通过为 Git 指定 hooks 目录完美避过，Husky 便是基于此方案实现

```bash
# 指定 Git hooksPath 为根目录下的 .husky 目录
git config core.hooksPath .husky
```

注意：

git hooks 可以通过 `git commit --no-verify` 跳过检查，所以需要再 CI 流程中卡点
