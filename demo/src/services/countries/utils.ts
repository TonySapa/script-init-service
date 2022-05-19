import { AxiosResponse } from 'axios'
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
