# eslint-config-lidemy

[![lidemy](https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=height:120/https://www.filepicker.io/api/file/a8fY8pGRSbWi2WNX6QIu)](https://github.com/Lidemy/mentor-program-5th)


一份為程式導師計畫作業制定的 Eslint rules config

## 此份 config 包含哪些 rules plugins ?

- eslint-plugin-import: ^2.22.1
- eslint-plugin-node: ^11.1.0
- eslint-plugin-promise: ^4.2.1,
- eslint-plugin-jsx-a11y: ^6.4.1,
- eslint-plugin-react: ^7.12.4,
- eslint-plugin-react-hooks: ^4.2.0

上述套件需搭配 Eslint 版本為: 
- eslint: ^7.21.0 

上述套件亦加入 [`peerDependencies`](./package.json)

## 安裝

```
npm install eslint-config-lidemy 
```

因為有使用到上述 plugins，所以需要一併安裝：

```
npm install  --save-dev eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

或者直接將以下套件加入專案中 `pcakage.json` 的 `"devDependencies": { }` 並重新執行 `npm install` :

```json
    "eslint": "^7.21.0",
    "eslint-config-lidemy": "file:../eslint-config-lidemy",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.12.4",
    "eslint-plugin-react-hooks": "^4.2.0"
```

## 使用

- 更改專案中的 `eslintrc.js` (或 `eslintrc.json`) 的 `extends` 配置：

    ```javascript
    {
        extends: 'lidemy',
    }
    ```

## 規則介紹：

- [基本規則 (包含基本 JavaScript Style 與 ES6 相關新語法)](./rules/base)
- [React 相關規則 (包含 a11y, React hooks 與基本 React Style)](./rules/react)