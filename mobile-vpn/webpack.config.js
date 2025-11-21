const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.jsx', '.web.js', '.jsx', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      'react-native-vector-icons/MaterialCommunityIcons': '@expo/vector-icons/MaterialCommunityIcons',
      'react-native-vector-icons': '@expo/vector-icons',
      '@react-native-vector-icons/material-design-icons': '@expo/vector-icons/MaterialCommunityIcons',
      '@expo/vector-icons/MaterialCommunityIcons$': '@expo/vector-icons/build/MaterialCommunityIcons',
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
      '@theme': path.resolve(__dirname, 'src/theme'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              'react-native-web',
              [
                'module-resolver',
                {
                  alias: {
                    '@': './src',
                    '@components': './src/components',
                    '@screens': './src/screens',
                    '@store': './src/store',
                    '@utils': './src/utils',
                    '@types': './src/types',
                    '@assets': './src/assets',
                    '@navigation': './src/navigation',
                    '@theme': './src/theme',
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'SecureVPN',
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
