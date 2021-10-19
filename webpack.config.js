// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const appRoot = path.resolve('./src');

const config = {
    entry: {
        'ng_runtime': [ './src/ng_runtime.ts' ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname,'dist'),
    
        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]',
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: path.resolve(__dirname, 'dist/[name]-manifest.json'),
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]',
            entryOnly: false,
        }),
        // suppress Typescript warnings when building Angular into vendor package
        // new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,appRoot),
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/,appRoot),
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['dist'], root: __dirname, verbose: true, dry: false}),
    ],
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new TerserPlugin());
    } else {
        config.mode = 'development';
    }
    return config;
};
