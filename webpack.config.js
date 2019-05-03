const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const env = process.env.NODE_ENV || 'development';


module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract=new ExtractTextPlugin('styles.css');
console.log("inn")
    return {
        entry: ['babel-polyfill','./src/app.js'],
        output: {
            path: path.join(__dirname, "public",'dist'),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                   use:[
                       { loader:'css-loader',
                       options:{
                           sourceMap:true
                       }
                    }  ,
                        {
                          loader:'sass-loader' ,
                          options:{
                              sourceMap:true
                          } 
                        }

                   ] 
                })
            }]
        },
        plugins:[
            CSSExtract,
            new UglifyJsPlugin(),
        ],
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath:'/dist/'
        }

    };
};

