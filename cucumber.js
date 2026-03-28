module.exports = {
  default: {
    require: ['src/hooks/**/*.ts', 'src/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    paths: ['src/features/**/*.feature'],
    format: ['progress'],
  },
};
