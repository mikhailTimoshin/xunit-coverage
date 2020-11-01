module.exports = {
  success(text) {
    console.log('\n\x1b[42m\x1b[30m SUCCESS \x1b[0m', text + ' \n');
  },
  check(text) {
    console.log('\x1b[0m\x1b[32m ✔ \x1b[0m ', text);
  },
  warning(text) {
    console.log('\n\x1b[43m\x1b[30m WARNING \x1b[0m', text + ' \n');
  },
  uncheck(text) {
    console.log('\x1b[31m ✖ \x1b[0m ', text);
  },
  error(text) {
    console.log('\n\x1b[41m\x1b[30m FAILURE \x1b[0m\n', text + ' \n');
    process.exit(1)
  }
}
