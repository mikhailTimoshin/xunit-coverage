const reade = require('../reader/readLib')

const match = (dir, exName, specName = '.spec') => {
  const foundFiles = reade.find(dir, exName, specName)
  reade.clear()
  const foundTests = reade.find(dir, specName + exName, specName)
  return {
    sources: foundFiles,
    specs: foundTests
  }
}

const response = ({ sources, specs}) => {
  let successList = []
  let failureList = []
  for (let item of sources.result) {
    if (specs.result.includes(item)) {
      successList.push(item)
    } else {
      failureList.push(item)
    }
  }
  return {
    success: successList,
    failure: failureList
  }
}


module.exports = {
  match,
  response
}
