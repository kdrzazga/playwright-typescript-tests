module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['support/**/*.ts', 'apps/*/steps/**/*.ts'],
    paths: ['apps/*/features/**/*.feature'],
    format: ['summary', 'progress-bar'],
    publishQuiet: true,
  },
};
