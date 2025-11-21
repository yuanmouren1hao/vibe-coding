module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: [
      '@react-native/babel-preset',
      '@babel/preset-typescript',
    ],
    plugins: [
      'react-native-web',
      'react-native-paper/babel',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
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
  };
};
