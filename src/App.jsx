import { useState } from 'react';
import './App.css';

function App() {
  const [newItem, setNewItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [todos, setTodos] = useState([
    { text: 'something a' },
    { text: 'something b' },
    { text: 'something c' }
  ]);
  
  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newItem.trim() !== '') {
      setTodos([
        ...todos,
        { text: newItem.trim() }
      ]);
      setNewItem('');
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='todo-app'>
      <h1 className="title">ToDo</h1>
      <div className="search-container">
        <div className="search-input-container">
          <input
            type='text'
            placeholder='Search'
            className="search-input"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <button className="clear-button" onClick={clearSearch}>Clear</button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="add-container">
          <input
            type='text'
            placeholder='Add something'
            className="add-input"
            onChange={handleInputChange}
            value={newItem}
          />
          <button type='submit' className="add-button">Add</button>
        </div>
      </form>
      <section>
        <ul className="todo-list">
          {filteredTodos.map((todo, index) => (
            <li key={index} className="todo-item">
              <span>{todo.text}</span>
              <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
