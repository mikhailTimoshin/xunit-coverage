const printer = require('./lib/printer/printLib')
const matcher = require('./lib/matcher/matchLib')

const runner = (path = './', exName = '.js', specName = '.spec.js') => {
  try {
    const lists = matcher.match(path, exName, specName)
    const res = matcher.response(lists)
    for (let item of res.success) {
      printer.success(`${lists.specs.dict[item]} - has a coverage`)
    }
    for (let item of res.failure) {
      printer.warning(`${lists.sources.dict[item]} - dont has a coverage file`)
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
