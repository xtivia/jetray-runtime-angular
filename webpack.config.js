var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const appRoot = path.resolve('./src');

module.exports = {
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

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: 'dist/[name]-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // suppress Typescript warnings when building Angular into vendor package
    //new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,appRoot),
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/,appRoot),
    new CleanWebpackPlugin(['dist'], {root: __dirname, verbose: true, dry: false})
  ],
};
