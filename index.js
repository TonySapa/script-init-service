import fs from 'fs'
import { service, utils } from './contents/index.js'

/******************************************************************************
 * Directory of services. A folder named services. Should be specified
 * on script on package.json as the first parameter.
 *****************************************************************************/
const servicesDir = process.argv[2] !== undefined
  ? process.argv[2]
  : '../src/services'

/******************************************************************************
 * The name to assign to the new service.
 *****************************************************************************/
const serviceName = process.argv[3] !== undefined ? process.argv[3] : 'Demo'

/******************************************************************************
 * The folder name. Is the serviceName transformed from camel case.
 * Example: serviceName -> service-name
 *****************************************************************************/
const serviceFolder = serviceName
  .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
  .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)

/******************************************************************************
 * @param {string} servicesDir the directory of the service
 * @param {string} serviceName the name to assign to the service
 * @returns {File} folders and files containing a basic service
 *****************************************************************************/
async function createService () {
  const dir = `${servicesDir}/${serviceFolder}`

  fs.mkdirSync(dir, { recursive: true }, (err) => {
      if (err) throw err
    }
  )

  try {
    fs.writeFileSync(`${dir}/service.ts`, service)
    console.log(`\u001b[1;32m ✓ service.ts successfully generated.`)
  } catch (err) {
    console.log(`\u001b[1;31m ✖ service.ts could not be generated.`)
    console.log(err)
  }

  try {
    fs.writeFileSync(`${dir}/utils.ts`, utils)
    console.log(`\u001b[1;32m ✓ utils.ts successfully generated.`)
  } catch (err) {
    console.log(`\u001b[1;31m ✖ utils.ts could not be generated.`)
    console.log(err)
  }
}

createService()
