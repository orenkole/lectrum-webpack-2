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

# Lesson 2
Some working with pathes,
clean-webpack-plugin

---
Move to node run webpack
_build.js_
```javascript
/**
 * 1. webpack
 * 2. config
 * 3. create webpack compiler
 * 4. execution
 */

const webpack = require('webpack')
const chalk = require('chalk')

const config = require('./webpack.config')

const compiler = webpack(config);

compiler.run((error, stats) => {
    //...
});
```
Modify webpack console output:
```javascript
    const info = stats.toString({
        hash: true,
        modules: false,
    })

    console.log(chalk.greenBright('Build completed'))
    console.log(info)
```
---
Example of hooks:
https://webpack.js.org/api/compiler-hooks/
```javascript
compiler.hooks.done.tap({name: 'start', () => {
    console.log(' Compilation started ')
    // do smth ...
}})
```
