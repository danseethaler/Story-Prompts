module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            wComponents: ['./src/components/index.ts'],
            wConfig: ['./src/config/index.ts'],
            wHooks: ['./src/hooks/index.ts'],
            wStyled: ['./src/styled/index.ts'],
          },
        },
      ],
    ],
  };
};
