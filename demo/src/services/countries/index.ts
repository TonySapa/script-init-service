import axios from 'axios'
import { base } from '../routes'

export const getThis = async (country: string) => {
  const baseUrl: string = `${base}/${country}`
  const res = await axios.get(baseUrl).catch((error) => error.response)
  return res
}
