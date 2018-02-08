const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index.tsx'],
    vendor: ['react', 'react-dom', 'semantic-ui-react', 'semantic-ui-css/semantic.css'],
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build/dist'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: false,
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        oneOf: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
            }
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader',
            }),
          },
          /*{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          },*/
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: 'vendor'
    }),
    new HtmlPlugin({
      template: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new ExtractTextPlugin('[name].css'),
    //new ForkTsCheckerPlugin(),
  ],
  devServer: {
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    },
  }
};