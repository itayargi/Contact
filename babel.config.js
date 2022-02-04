

module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset',
      '@babel/preset-flow',
    ],
    
  };
};
// module.exports = {
//     presets: [
//       ['@babel/preset-env', { targets: { node: 'current' } }],
//       '@babel/preset-react',
//       '@babel/preset-typescript',
//       'module:metro-react-native-babel-preset'
//     ]
// };
