import { useEffect } from 'react'
import './App.css'
import initDB from './back/connection'

function App() {

  useEffect(() => {
    const init = async () => {
      await initDB();
    }

    init();
  })

  return (
    <></>
  )
}

export default App