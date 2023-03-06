import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from '@arco-design/web-react'
// import "@arco-design/web-react/dist/css/arco.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Button type='primary'>hello arco</Button>
    </div>
  )
}

export default App
