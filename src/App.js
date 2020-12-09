import * as React from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    TextField,
} from '@material-ui/core'
import styled from 'styled-components'

import { Todos } from './components/Todos'

export const App = () => {
    const [todos, setTodos] = React.useState([])
    const [name, setName] = React.useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (!Boolean(name)) {
            return
        }
        const newTodo = { name, key: Date.now(), completed: false }
        setName('')
        setTodos([...todos, newTodo])
    }

    const handleDeleteTodo = (key) => {
        setTodos(todos.filter((todo) => todo.key !== key))
    }

    const completedTodos = todos.filter((todo) => todo.completed)

    return (
        <Container maxWidth="sm">
            <Heading>Todo List</Heading>
            <Card>
                <CardContent>
                    <form onSubmit={handleFormSubmit}>
                        <FormControl fullWidth>
                            <TextField
                                id="todoText"
                                label="Add a todo"
                                type="text"
                                value={name}
                                variant="outlined"
                                placeholder="Todo..."
                                onChange={(e) => setName(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            type="submit"
                                        >
                                            Add
                                        </Button>
                                    ),
                                }}
                            />
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
            <Box mt={2}>
                <Card>
                    <CardContent>
                        {Boolean(todos.length) ? (
                            <Todos
                                todos={todos}
                                handleDeleteTodo={handleDeleteTodo}
                            />
                        ) : (
                            <h2>Please enter a todo!</h2>
                        )}
                    </CardContent>
                </Card>
            </Box>
            {Boolean(completedTodos.length) && (
                <Todos
                    todos={completedTodos}
                    handleDeleteTodo={handleDeleteTodo}
                />
            )}
        </Container>
    )
}

const Heading = styled.h1`
    text-align: center;
`
