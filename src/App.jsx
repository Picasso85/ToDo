import { useState, useMemo, useCallback, useEffect } from 'react';
import './assets/App.css';

const pageSize = 3;

function App() {
  const [newItem, setNewItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [todos, setTodos] = useState([
    { text: 'buy milk' },
    { text: 'code some stuff' },
    { text: 'make a lunch' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  // const handleSubmit = useCallback((event) => {
  //   event.preventDefault();
  //   if (newItem.trim() !== '') {
  //     setTodos(prevTodos => [...prevTodos, { text: newItem.trim() }]);
  //     setNewItem('');
  //   }
  // }, [newItem]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newItem.trim() !== '') {
      // 
      if (todos.length < 21) {
        setTodos([
          ...todos,
          { text: newItem.trim() }
        ]);
        setNewItem('');
      } else {
        // 
        setShowModal(true);
      }
    }
  };

  const handleDelete = useCallback((index) => {
    setTodos(prevTodos => prevTodos.filter((_, i) => i !== index));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  const totalPages = Math.ceil(filteredTodos.length / pageSize);

  const paginatedTodos = useMemo(() => {
    return filteredTodos.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, filteredTodos]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className='todo-app'>
      <h1 className="title">ToDo <span>{todos.length}</span></h1>
      
      <div className="search-container">
        <div className="search-input-container">
          <input
            type='text'
            placeholder='Search...'
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
            placeholder='Add something...'
            className="add-input"
            onChange={handleInputChange}
            value={newItem}
          />
          <button type='submit' className="add-button">Add+</button>
        </div>
      </form>
      <section>
        <ul className="todo-list">
          {paginatedTodos.map((todo, index) => (
            <li key={index} className="todo-item">
              <span>{todo.text}</span>
              <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>You lazy...</h2>
            <p>Tooo much ToDo <span>21</span>. try finish something</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;