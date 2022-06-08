# lint 接入

- [lint 接入](#lint-接入)
  - [使用 @applint/spec](#使用-applintspec)
  - [自定义接入](#自定义接入)
    - [prettier](#prettier)
    - [eslint](#eslint)
    - [stylelint](#stylelint)
    - [commitlint](#commitlint)
  - [husky && lint-staged](#husky--lint-staged)

## 使用 @applint/spec

```bash
npm i -D @applint/spec eslint prettier stylelint husky lint-staged @commitlint/cli eslint-config-prettier eslint-formatter-pretty stylelint-config-prettier prettier-eslint
```

## 自定义接入

### prettier

```bash
npm i -D prettier
```

### eslint

```bash
npm i -D eslint cross-env @babel/eslint-parser @babel/eslint-plugin @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-airbnb-base eslint-plugin-react eslint-plugin-react-hooks prettier-eslint eslint-config-airbnb-typescript eslint-formatter-pretty eslint-plugin-eslint-comments eslint-plugin-promise eslint-config-prettier
# babel
npm i @babel/core @babel/preset-env @babel/preset-react @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

### stylelint

```bash
npm i -D stylelint stylelint-config-standard stylelint-config-prettier stylelint-config-css-modules stylelint-config-rational-order stylelint-no-unsupported-browser-features stylelint-order stylelint-declaration-block-no-ignored-properties
```

### commitlint

```bash
npm i -D @commitlint/cli @commitlint/config-conventional
```

## husky && lint-staged

```bash
npx husky-init && npm install
npm i -D lint-staged
```
