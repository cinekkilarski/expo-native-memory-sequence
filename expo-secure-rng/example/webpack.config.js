/* eslint-disable @typescript-eslint/no-require-imports */
const createConfigAsync = require("@expo/webpack-config");
const path = require("path");

module.exports = async (env, argv) => {
  const config = await createConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["expo-secure-rng"],
      },
    },
    argv
  );
  config.resolve.modules = [
    path.resolve(__dirname, "./node_modules"),
    path.resolve(__dirname, "../node_modules"),
  ];
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    "expo-secure-rng": path.resolve(__dirname, ".."),
  };

  return config;
};
