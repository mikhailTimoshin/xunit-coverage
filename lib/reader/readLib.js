const path = require('path')
const fs = require('fs')

let result = []
let dict = {}
let error = ''

const find = (startPath, filter, spec) => {
  if (!fs.existsSync(startPath)){
    error =  startPath
    throw new Error(`Dir with ${startPath} is not exist`)
  }
  const files = fs.readdirSync(startPath)
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i])
    let stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      find(filename, filter, spec)
    }
    else if (filename.indexOf(filter) >=0 && !filename.includes('node_modules') && !filename.includes('.json')) {
      const lastPart = filename.replace(/\\$/,'').replace(filter, '').split('\\').pop()
      if (lastPart.toLowerCase() === 'index') {
          throw new Error(`Dont set index name to files in path - ${filename}`)
      }
      if (result.includes(lastPart)) {
         throw new Error(`Duplicate filename im path - ${filename}`)
      }
      if (!result.includes(lastPart.replace(spec, ''))) {
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
