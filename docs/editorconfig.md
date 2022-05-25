# editorconfig

为什么要加

> .editorconfig 是可移植自定义编辑器设置。
> 实现跨平台、编辑器和 IDE 统一编程风格, 提高代码阅读质量。
> EditorConfig 设置优先于全局 Visual Studio 文本编辑器设置

即使团队统一编程风格、编辑器，仍不能保证历史遗留代码、第三方开源库等风格一致，还可能存在编码问题，非 utf-8 等

config

> Unix-style newlines with a newline ending every file
> 根目录的配置文件，编辑器会由当前目录向上查找，如果找到 `roor = true` 的文件，则不再查找

## 扩展

通配符

```ini
*                匹配除/之外的任意字符串
**               匹配任意字符串
?                匹配任意单个字符
[name]           匹配name中的任意一个单一字符
[!name]          匹配不存在name中的任意一个单一字符
{s1,s2,s3}       匹配给定的字符串中的任意一个(用逗号分隔)
{num1..num2}     匹配num1到num2之间的任意一个整数, 这里的num1和num2可以为正整数也可以为负整数
```

EditorConfig 解决了编辑器配置层面的编码风格一致性问题。但代码风格的部分并未涉及，比如句尾分号、逗号、多行对象书写规范等
