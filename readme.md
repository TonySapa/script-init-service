# Motivation

Communicating with different APIs from the Front End is often a repetitive task that can be summarised in a documented and coded process. In order to save time and use a consistent code style among different services is vital to have this process pre-defined.

# About
A script to generate a folder named as your service, containing a default service with response handlers, including error handlers. Built in TypeScript.
```
└── my-service
    │
    └── service.ts
    └── utils.ts
    └── index.ts
```

# Installation
```
npm i -D @tonisanchez.dev/init-service
```
Alternatively
```
yarn add -D @tonisanchez.dev/init-service
```

## Assumptions

There is usually 4 main things that the Front End finds useful on an API response in order to handle the response, those are:

- "data" The front end access the data returned and parse it with a specific function that is also prepared to handle errors.
- "status" Ideally there is only one status code that can be considered succesful. Not by itself, but this along with the data parsed can be enough to determine if the response can be considered successful.
- "headers.content-length" sometimes is useful to know how many items are in the response.
- "headers.content-type" know if the content type of the response is as expected. (application/json, etc.)

# Default response validator

Conditions:

- Status is 200 (201 when adding resources or 204 when deleting)
- The format (use typescript and/or parser) is exactly as expected.

# Functions to use (Functional Programming)

- `isSuccessful(res)` A case specific function (ideally not to reuse, since services can evolve and demand different behavior) to determine if the response is successful comparing the response with the expected status code and expected format. (Using previously type coded `param as ExpectedParam`) Other than that, it would be handled as failed.
- `handleSuccess(res)`
- `handleFail(res)`

Using this reusable function would have this format

```
const functionUsingThatService = async () => {
  const res = await getService(params)
  isSuccessful(res)
    ? handleSuccess(res.data)
    : handleFail(res)
}
```

The isSuccessful function could look something like:

```
const isSuccessful = (res) => {
  const statusExpected = 200
  type TypeExpected = {
    fieldA: string,
    fieldB?: number
  }
  const matchesExpected = (param) => {
    return typeof param === TypeExpected
  }
  return res.status === statusExpected &&
    matchesExpected(res.data)
}
```

The handleSuccess handler could look like this:

```
const handleSuccess = (res) => {
  const title = res.data && res.data.whatever || 'Fallbacktitle'
  const description = res.data && res.data.whatever2 || 'Fallback description'
  toaster.success(title, { description: description })
}
```

The handleFail handler could look like this:

```
export const handleFail = (res: AxiosResponse<GetCountryResponse>) => {
  if (res.status && res.status === 404) {
    toaster.danger('My custom not found message')
    console.error({ myCustomField: 'My tip', ...res })
  } else {
    toaster.danger('General error message')
  }
}
```

# How it works
Execute the script on your package.json like this:
```
// package.json
...
  "service": "node node_modules/@tonisanchez.dev/init-service 'YOUR_SERVICES_FOLDER_DIR'",
...
```
Everytime you call this script a new folder will be created containing 6 files:
- Default file containing a service with axios.
- Default file containing functions for response handling, including error handlers.
- An index to use it optionally for repositories with an folder structure of "index" files.

# Parameters
## `Service name`
Using script as shown above, you can specify the name of your service with a following parameter as shown below:
```
npm run service myService
```
Alternatively
```
yarn service myService
```

# Default content of files generated

## [service.ts]
```
import axios from 'axios'
import { base } from '../routes'

export const getThis = async (country: string) => {
  const baseUrl: string = \`https://restcountries.com/v3.1/name/\${country}\`
  const res = await axios.get(baseUrl).catch((error) => error.response)
  return res
}
```

## [utils.ts]
```
export type MyServiceProps = {
  children: string
}import { AxiosResponse } from 'axios'
import { toaster } from 'ui-sora'
import { GetCountryResponse, StatusCode } from '../../types'

/******************************************************************************
 * Check if the response passed is considered successful.
 * @param {AxiosResponse<GetCountryResponse>} res the response of the API
 * @returns boolean true if response is accepted as successful
 *****************************************************************************/
export const isSuccessful = (res: AxiosResponse<GetCountryResponse>) => {
  const statusExpected = 200
  const matchesExpected = (param: GetCountryResponse) => {
    return param as GetCountryResponse
  }
  return res.status === statusExpected && matchesExpected(res.data)
}

/******************************************************************************
 * @param {AxiosResponse<GetCountryResponse>} res the response of the API
 * @returns triggers a toaster notification
 *****************************************************************************/
export const handleSuccess = (res: AxiosResponse<GetCountryResponse>) => {
  const title =
    (res.data && res.data[0] && res.data[0].region) || 'Fallbacktitle'
  const description =
    (res.data[0] && res.data[0].name && res.data[0].name.common) ||
    'Fallback description'
  toaster.success(title, { description: description })
}

/******************************************************************************
 * @param {AxiosResponse<GetCountryResponse>} res the response of the API
 * @returns triggers a danger toaster notification and logs error
 *****************************************************************************/
export const handleFail = (res: AxiosResponse<GetCountryResponse>) => {
  if (res.status && res.status === 404) {
    toaster.danger('My custom not found message')
    console.error({ myCustomField: 'My tip', ...res })
  } else {
    toaster.danger('General error message')
  }
}

/******************************************************************************
 * @param {AxiosResponse<GetCountryResponse>} res the response of the API
 * @param {statusCode} number status code of the response
 * @param {formatIsExpected} function the validator of the response format
 * @returns bolean true if the response is as expected
 *****************************************************************************/
export const responseIsExpected = (
  res: AxiosResponse<GetCountryResponse>,
  statusCode: StatusCode,
  formatIsExpected: (params: unknown) => boolean // will be use case specific
) => {
  return res.status && res.status === statusCode && formatIsExpected(res)
}
```


# Have fun with it
I will be publishing newer versions and extend this simple and small tool. Meanwhile, I have more interesting projects on my Github [@TonySapa](https://github.com/