const service =
`import axios from 'axios'
import { base } from '../routes'

export const getThis = async (country: string) => {
  const baseUrl: string = \`https://restcountries.com/v3.1/name/\${country}\`
  const res = await axios.get(baseUrl).catch((error) => error.response)
  return res
}
`
export default service
