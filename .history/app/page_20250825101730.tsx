'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: string
  title: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

const fetchTodos = async () => {
  try {
    setIsLoading(true);
    const response = await fetch('/api/posts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setTodos(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Erreur lors du chargement des tâches:', error);
    // Optionnel: afficher un message d'erreur à l'utilisateur
  } finally {
    setIsLoading(false);
  }
}


  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTodo }),
        })
        setNewTodo('')
        fetchTodos()
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error)
      }
    }
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      })
      fetchTodos()
    } catch (error) {
      console.error('Erreur lors de la modification de la tâche:', error)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })
      fetchTodos()
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">Gérez vos tâches quotidiennes</p>
        </div>
        
        <div className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Ajouter une nouvelle tâche..."
            className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button 
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-r-lg font-medium transition-colors duration-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Ajouter
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {todos.length === 0 ? (
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-500">Aucune tâche pour le moment</p>
                <p className="text-sm text-gray-400">Ajoutez votre première tâche ci-dessus</p>
              </div>
            ) : (
              todos.map((todo) => (
                <li key={todo.id} className="py-4 flex items-start">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id, !todo.completed)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className={`ml-3 flex-grow ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {todo.title}
                  </div>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}

        {todos.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>{todos.filter(todo => todo.completed).length} sur {todos.length} tâches complétées</p>
          </div>
        )}
      </div>
    </div>
  )
}