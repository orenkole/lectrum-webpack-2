# Lesson 1
```
npm i -D webpack@4.29.1
npx webpack
y // install webpack-cli
```
---
npm scripts launch form node_modules

---
_modules concatenation_, _scope hoisting_
соединение импортов
---

_package.json_
```json
"build": "webpack --mode=development"
```
get source maps with _eval_

turn off source map:
```json
"build": "webpack --mode=development --devtool=false"
```

We'll configure webpack not with webpack-cli but with node scripts (01:33)
---

Webpack configuration types:
- object
- function
- promise

```javascript
module.exports = () => {
    return {
        mode: 'none',
        devtool: false,
    }
}
```
---
Example use of config with promise:
```javascript
module.exports = async () => {
    const port = await choosePort(3000);
}
```
---

`npm i -D html-webpack-plugin`

we can insert data from webpack
_/static/template.html_
```pug
    <title>
        <%= htmlWebpackPlugin.options.title %>
    </title>
```
```javascript
plugins: [
    new HtmlWebpackPlugin({
        template: "./static/template.html",
        title: "Lear webpack"
    })
```
---
Serving:
```

npm i -D serve
npx serve ./dist
```
_package.json_
```json
        "serve": "serve \"./dist\" -s"
```
