import * as React from 'react'
import { Button, TextField } from '@material-ui/core'

export const App = () => {
    const [todos, setTodos] = React.useState([])
    const [name, setName] = React.useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (!Boolean(name)) {
            return
        }
        const newTodo = { name, key: Date.now() }
        setName('')
        setTodos([...todos, newTodo])
    }

    const handleDeleteTodo = (key) => {
        setTodos(todos.filter((todo) => todo.key !== key))
    }

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    id="todoText"
                    label="Add a todo"
                    type="text"
                    value={name}
                    variant="outlined"
                    placeholder="Todo..."
                    onChange={(e) => setName(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                >
                    Add
                </Button>
            </form>
            <div>
                {Boolean(todos.length) ? (
                    <ul>
                        {todos.map(({ key, name }) => (
                            <li key={key}>
                                {name}{' '}
                                <button onClick={() => handleDeleteTodo(key)}>
                                    delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>Please enter a todo!</div>
                )}
            </div>
        </div>
    )
}
