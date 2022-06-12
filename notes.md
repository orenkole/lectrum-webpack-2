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

![](notes_images/loaders-chain.png?raw=true)
![](notes_images/why-style.png?raw=true)

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


---
## babel
`% npm i -D babel-loader @babel/core`

_.babelrc.js_
caching babel config:
```javascript
api.cache.using();
```
---
preset - preconfigured set of plugins
`npm i -D @babel/preset-env`

preset_env doesn't support experimental syntax
`npm i -D @babel/plugin-proposal-class-properties`

makes code more resilient, but slower
```javascript
spec: true
```

make code faster but deviates standard
```javascript
loose: false
```

what types of modules transpiled to:
_cjs_ is bad for webpack optimization
```javascript
modules: false // 'cjs' is bad
```
---
01:05
_.browserslistrc_
---

react, react-dom, react-hot-loader
`npm i react react-dom`
`npm i -D react-hot-loader`
`npm i -D @babel/preset-react`

Modify babel config to setup for development through env

**NOTE: react-hot-loader already looks unnecessary**

---
Deal with css
use css modules:
```javascript
use: [
    'style-loader',
    {
        loader: 'css-loader',
        options: {
            modules: {localIdentName: '[path][name]__[local]--[hash:base64:5'},
        }
    }
]
```

install postcss:
`npm i -D postcss-loader`
`npm i -D postcss-preset-env`
inside postcss-preset-env we can setup options for any plugin
```javascript
use: [
    'style-loader',
    ...
    {
        loader: 'postcss-loader',
        options: {
            plugins: [
                env({
                    stage: 0,
                    features: {
                        'custom-media-queries': {
                            importFrom: [{
                                customMedia: {
                                    '--phonePortrait':
                                        '(width <= 414px)',
                                }
                            }]
                        }
                    }
                })
            ]
        }
    }
]
```

![img.png](notes_images/L3_1.png)
![img.png](notes_images/L3_2.png)

# Lesson 4.

About hot:
![img.png](notes_images/l4-1.png)
![img.png](notes_images/l4-2.png)

---
Excluding node_modules: on dev no, on prod yes because of modern syntax in old browsers
```javascript
test: /\.js$/,
exclude: /node_modules/,
```
---
## ES modules, devtools
Make node to be able to work with ES modules (import...from)

`npm install --save-dev @babel/register`
`npm install --save-dev cross-env`
_package.json_
```json
"start": "cross-env-shell NODE_ENV=development node --require @babel/register \"./scripts/webpack/start.js\"",
```
---
NOTE: babel is not merge, used the first available in the path chain
---

## Fix devtool
`devtool: 'eval-cheap-module-source-map'`
---

source map on prod is helpful when sentry used

_hidden-source-map_ - when source can't be shown for security reason
---

Error: process is not available:
`nmp i -D dotenv-webpack`
plugins:
`new DotenvWebpack(),`
---

## working with images: file-loader

`npm install file-loader --save-dev`
note not working: 
`<img src="../theme/images/myImg.png"/>`

correct:
```jsx
import React from "react";
import myImg from "../theme/images/l4-1.png"
export const MyDom = () => {
    return (
        <div>
            hello
            <img src={myImg}/>
        </div>
    )
}
```
_webpack.common.js_
```javascript
{
    test: /\.(png|jpe?g|gif)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'images/[name].[ext]'
            }
        },
    ],
},
```
---
split to modules:
![img.png](notes_images/l4-3.png)

## Working with svg
https://vecta.io/blog/best-way-to-embed-svg

`npm i -D @svgr/webpack`

_modules/svg.js_
```javascript
export const loadSvg = () => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                issuer: /\.js$/,
                use: [
                    '@svgr/webpack',
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                issuer: /\.css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
})
```

Note: convarting svg to base64 is bad because of productivity
---

## Fonts

Use in css:
![img.png](notes_images/l5-1.png)

Actual font
![img.png](notes_images/l5-2.png)

note: system-ui

## sass

## css: split to prod & dev, minify
Note: for good performance:
- load css for every page separately
- lazy load images
---
To extract css to a separate file:
`npm i -D mini-css-extract-plugin`

Split css into dev and prod
```javascript
export const loadProdCss = () =>({
    /**
     * mini-css-extract-plugin
     * css loader (minification is added)
     * postcss loader
     */
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    ...
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[id].css',
            chunkFilename: '[name].[id].css',
        })
    ]
    ...
})
```
---
Use css nano to minify on prod
`npm i -D cssnano`

## Images optimization

images optimization must be done with specific soft, like optimage, not with webpack

`npm i -D image-minimizer-webpack-plugin imagemin-mozjpeg imagemin-pngquant imagemin-svgo`

_optimization.js_
```javascript
import ImageMinWebpackPlugin from "imagemin-webpack";
import imageminMozJpeg from "imagemin-mozjpeg";
import imageminPngQuant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";

export const optimizeImages = () => ({
    plugins: [
        new ImageMinWebpackPlugin({
            imageminOptions: {
                plugins: [
                    imageminMozJpeg({
                        progressive: true,
                        quality: 60,
                    }),
                    imageminPngQuant({
                        quality: 60,
                    }),
                    imageminSvgo()
                ]
            }
        })
    ]
})
```
---
NOTE:
publicPath - to set the root of assets path for plugins (problem with 404 for assets like images in css url);
_webpack.common.js_
```javascript
output: {
    path: BUILD_DIRECTORY,
    filename: "js/bundle.js",
    publicPath: "/",
```
---
