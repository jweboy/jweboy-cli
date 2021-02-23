module.exports = {
  '*.{js,jsx,md,json}': ['prettier --write'],
  '*.ts?(x)': ['prettier --parser=typescript --write'],
};
