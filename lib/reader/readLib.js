const path = require('path')
const fs = require('fs')

let result = []
let dict = {}

const validateFile = (filename) => {
  return !filename.includes('node_modules') && !filename.includes('.json')
}

const validateFilters = (filename, subFilter, filter) => {
  return filename.slice(subFilter.length * -1) !== subFilter && filename.slice(filter.length * -1) === filter
}

const getLastPart = (filename, filter) => {
  return  filename.replace(/\\$/,'').replace(filter, '').split('\\').pop()
}

const find = (startPath, filter, subFilter = '') => {
  if (!fs.existsSync(startPath)){
    throw new Error(`Dir with ${startPath} is not exist`)
  }
  const files = fs.readdirSync(startPath)
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i])
    let stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      find(filename, filter, subFilter)
    }
    
    if (validateFilters(filename, subFilter, filter) && validateFile(filename)) {
      const lastPart = getLastPart(filename, filter)
      
      if (lastPart.toLowerCase() === 'index') {
        throw new Error(`Dont set index name to files in path - ${filename}`)
      }
      if (result.includes(lastPart)) {
        throw new Error(`Duplicate filename in path - ${filename}`)
      }
      if (!result.includes(lastPart.replace(subFilter, ''))) {
        result.push(lastPart);
        dict[lastPart] = filename
      }
    }
  }
  return {
    result,
    dict
  }
}

const clear = () => {
  result = []
  dict = {}
}

module.exports = {
  find,
  clear
}
