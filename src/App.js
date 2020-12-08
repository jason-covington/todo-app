import * as React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [todos, setTodos] = React.useState([])
    const [todoName, setTodoName] = React.useState('')

    const handleAddTodo = () => {}

    return (
        <div>
            <h1>Todo</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a todo..."
                    onChange={(e) => setTodoName({ name: e.target.value })}
                />
                <button onClick={() => setTodos([...todos, todoName])}>
                    Add
                </button>
            </div>
            <div>
                <ul>
                    {todos.map((todo) => (
                        <li>{todo.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
