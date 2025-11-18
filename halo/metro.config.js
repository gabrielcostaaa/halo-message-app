const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

// 1. Encontra o diretório raiz do monorepo (um nível acima)
const root = path.resolve(__dirname, '..');

const config = {
  // 2. Diz ao Metro para observar arquivos na raiz também
  watchFolders: [root],

  resolver: {
    // 3. Diz ao Metro onde procurar os módulos (na pasta local E na raiz)
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(root, 'node_modules'),
    ],
    // Bloqueia o react-native duplicado (caso exista na raiz)
    blacklistRE: /.*\/halo-message-app\/node_modules\/react-native\/.*/,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);