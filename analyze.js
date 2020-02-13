const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/css/_variables.scss";
        `
      }
    }
  }
};




// // script to enable webpack-bundle-analyzer
// process.env.NODE_ENV = 'production';
// const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const webpackConfigProd = require('react-scripts/config/webpack.config.prod');

// webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());

// // actually running compilation and waiting for plugin to start explorer
// webpack(webpackConfigProd, (err, stats) => {
//   if (err || stats.hasErrors()) {
//     console.error(err);
//   }
// });


// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// module.exports = {
//   plugins: [
//     new BundleAnalyzerPlugin()
//   ]
// }