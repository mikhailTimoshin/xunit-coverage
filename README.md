#XUNIT: check test coverage

install module:

``
yarn add -D xunit-coverage
``

check coverage from file

````
const runCoverageTest = require('xunit-coverage')
runCoverageTest('./src', '.js', '.test.js')
````

check coverage from package.json script
````
{
    "scripts": {
        "test:coverage": "node ./node_modules/xunit-coverage ./src .js .spec.js"
    }       
}
````
