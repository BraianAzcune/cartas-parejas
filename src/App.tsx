import { useState } from 'react'
import './App.css'
import Tablero from './components/Tablero'

function App () {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tablero></Tablero>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default App
