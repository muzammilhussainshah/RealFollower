/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const jsoMetroPlugin = require('obfuscator-io-metro-plugin')(
  {
    compact: false,
    sourceMap: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    shuffleStringArray: true,
    splitStrings: true,
    stringArrayThreshold: 1,
    splitStringsChunkLength: 3,
  },
  {
    runInDev: false,
    logObfuscatedFiles: true,
    sourceMapLocation: './index.android.bundle.map',
  },
);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  ...jsoMetroPlugin
};
