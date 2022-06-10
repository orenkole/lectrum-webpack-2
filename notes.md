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
Some working with paths,
clean-webpack-plugin

---
## Move to node run webpack
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
## Handle css
_mini-css-extract-plugin_ for production
_style-loader css-loader_ for development
```
npm i -D mini-css-extract-plugin
npm i -D style-loader css-loader
```

Loaders are able to chain (from bottom to top)

![](./notes_images/loaders-chain.png?raw=true)
![](./notes_images/why-style.png?raw=true)

_style-loader_ converts to js in order to use hot-reloading. Hot reloading can't work with external css files, only with <style> tags

_webpack.config.js_
```javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
    ]
}
```
---

## 1st look at webpack-dev-server

- Hot reloading is hard to maintain
- Hot reloading modifies code in dev mode, so it is different from prod

we'll test hot reloading
1. setup on server
2. setup on client
3. setup in webpack config
4. setup in source

Webpack V4
_start.js_
```javascript
        setupMiddlewares: (app) => { // add hot middleware
            app.use(
                hot(compiler, {
                    log: false,
                })
            )
        },
```
_webpack.config.js
```javascript
import {HotModuleReplacementPlugin} from "webpac";

        entry: [
            'webpack-hot-middleware/client?reload=true&quiet=true',
            SOURCE_DIRECTORY
        ],
    ...
        plugins:[
            ...
            new HotModuleReplacementPlugin()
        ]
```
_index.js_
```javascript
if (module.hot) {
    module.hot.accept('./simple-components/dom', function() {
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
    })
}
```

Webpack V5
out of the box?
---
react-hot-loader
used instead of webpack-hot-middleware.

# Lesson 3

## detect-port-alt

`npm i -D detect-port-alt inquirer`

---
**3 parts:**
- common
- dev
- prod

