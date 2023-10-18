const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CompressionPlugin = require('compression-webpack-plugin');
const ProgmemGenerator = require('./progmem-generator.js');

const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, args) => {
    const isProduction = args && args['mode'] === 'production';
    console.log('');
    console.log(isProduction ? 'PRODUCTION BUILD' : 'DEVELOPMENT BUILD');
    console.log('');


    const config = {
        entry: {
            'scripts/main': path.resolve('./src/bootstrap.tsx'),
        },
        output: {
            path: path.resolve('./dist'),
        },
        target: 'web',
        devtool: isProduction ? false : 'source-map',
        optimization: {
            splitChunks: {
                // always create vendor.js
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'scripts/vendor',
                        chunks: 'initial',
                        enforce: true,
                    },
                },
            },
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.html', '.txt'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    }],
                },
                // app main .less file
                {
                    test: /app\.less$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'styles/[name].css',
                            }

                        },
                        {
                            loader: 'less-loader',
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    sideEffects: true,
                    use: [
                            MiniCssExtractPlugin.loader, 
                            { loader: "style-loader" },
                            { loader: "css-loader" },
                        ],
                },
                {
                    test: /\.svg$/,
                    use: ['preact-svg-loader'],
                }
            ],
        },

        watchOptions: {
            aggregateTimeout: 100,
            ignored: /node_modules/,
            poll: 300
        },

        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            compress: false,
            port: 3030,
            historyApiFallback: true,
            hot: true,
        },
        
        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: isProduction ? 'production' : 'development',
                DEBUG: !isProduction
            }),

            new ESLintPlugin({
                extensions: ['ts', 'tsx'],
                exclude: [
                    '/node_modules/',
                ],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    // static files to the site root folder (index and robots)
                    {
                        from: '**/*',
                        to: path.resolve('./dist/'),
                        context: './src/static/'
                    },
                ]
            }),
            ///*
            new ProgmemGenerator({ outputPath: "WWWData.h", bytesPerLine: 20 }),
            new MiniCssExtractPlugin(),
            /*

            new CompressionPlugin({
                filename: "[path][name][ext].gz[query]",
                algorithm: "gzip",
                test: /\.(js|css)$/,
                deleteOriginalAssets: true
            }),
            
            //*/
        ],
    };

    if (isProduction) {
        config.optimization.minimize = true;
        config.optimization.minimizer = [
            new TerserPlugin({extractComments: false}),
            new CssMinimizerPlugin(),
        ]
    }

    return config;
};
