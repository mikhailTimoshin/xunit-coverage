const printer = require('./lib/printer/printLib')
const matcher = require('./lib/matcher/matchLib')

const runner = (path = './', exName = '.js', specName = '.spec.js') => {
  try {
    const lists = matcher.match(path, exName, specName)
    const res = matcher.response(lists)
    if (res.success.length > 0) {
      printer.success(` Has a coverage`)
      for (let item of res.success) {
        printer.check(`${lists.specs.dict[item]}`)
      }
    }

    if (res.failure.length > 0) {
      printer.warning(`Dont has a coverage`)
      for (let item of res.failure) {
        printer.uncheck(`${lists.sources.dict[item]}`)
      }
    }

    
    if (res.failure.length !== 0) {
      throw new Error(`${res.failure.length} files has not specification`)
    }
    
    if (res.success.length === 0) {
      printer.warning(`No files exist for test coverage`)
    }
  } catch (e) {
    printer.error(e.message)
  }
}
runner(process.argv[2], process.argv[3], process.argv[4])
