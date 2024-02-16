import { useState } from 'react'

import './App.css'

function App() {
  const [ newItem, setNewItem] = useState("")
  
  const [ todos, setTodos] = useState([
    {text: 'something'},
    {text: 'something2'},
    {text: 'something3'},
  ])
    
  
  
  const handleInputChange = (event) => {
    setNewItem(event.target.value)
  }

  const habdleSubmit = (event) => {
    event.preventDefault(); // 
    setTodos([
      ...todos,
      {text: newItem}
    ])
  }

  return ( 
    <div className='todo-app'>
      <h1>ToDo</h1>
      <form onSubmit={habdleSubmit}>
        <input type='text' placeholder='Add something' onChange={handleInputChange} value={newItem}></input>
        <button type='submit'>Add <span>+</span></button>
      </form>
      <section>
        <ul>
          <li>
            <span>Name No1 </span>
            <button>DEL</button>
          </li>
          <li>
            <span>Name No2 </span>
            <button>DEL</button>
          </li>
          <li>
            <span>Name No3 </span>
            <button>DEL</button>
          </li>
        </ul>
      </section>
    </div>
     
  ) 
}

export default App
