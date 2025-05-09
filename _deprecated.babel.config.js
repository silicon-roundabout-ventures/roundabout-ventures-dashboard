module.exports = {
  presets: [
    'babel-preset-gatsby',
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ]
};
