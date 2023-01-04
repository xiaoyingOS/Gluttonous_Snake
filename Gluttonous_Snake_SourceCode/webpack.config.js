//引入一个包
const path = require('path');

//引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

//引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//webpack中所有的配置信息都应该写在 module.exports中
module.exports = {
    //指定入口文件
    entry: './src/index.ts',

    //指定打包文件所在目录
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname,'dist'),
        //打包后文件
        filename: 'demo.js',

        //告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            //不能使用const关键字，兼容ie10等等
            const: false,
        }
    },

    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //test指定的是规则生效的文件
                test: /\.ts$/,
                //要使用的loader
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: "babel-loader",
                        //设置babel
                        options: {
                            //设置预定义环境
                            presets: [
                                //
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的目标浏览器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "10",
                                            "edge":"58",
                                            "firefox": "58",
                                        },
                                        //指定corejs版本
                                        "corejs": "3",
                                        //使用corejs的方式。 "usage" 表示按需加载
                                        "useBuiltIns": "usage",
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //排除的文件
                exclude: /node-modules/
            },
            //指定less文件的处理
            {
                test: /\.less$/,
                //use文件执行顺序是从下到上，所以先执行的要写在下面
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    //配置webpack插件
    plugins: [
        //自动生成html页面，并且引入相关资源。
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title",//下面用的模板
            template: "./src/index.html"

        }),
        //配置clean插件
        new CleanWebpackPlugin(),
    ],

    //用来设置引用模块
    resolve: {
        extensions:['.ts', '.js'] //extensions表示扩展名，就是告诉webpack，
        //只要是ts和js扩展名的文件都可以作为模块使用
    },

    mode: "production", //设置打包模式，production表示生产模式，development 开发模式

};