import { useState } from 'react'
import { getThis } from './services/countries'
import {
  handleFail,
  handleSuccess,
  isSuccessful
} from './services/countries/utils'

export default function App() {
  const [text, setText] = useState('')

  const handleClick = async (country: string) => {
    const res = await getThis(country)
    setText(`${res.status}`)
    return isSuccessful(res) ? handleSuccess(res) : handleFail(res)
  }

  return (
    <div>
      <button onClick={() => handleClick('spain')}>Spain</button>
      <button onClick={() => handleClick('non-existing')}>Non-existing</button>
      <h1>{text}</h1>
    </div>
  )
}
