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
    const completedTodos = todos.filter((todo) => todo.completed)
    const uncompletedTodos = todos.filter((todo) => !todo.completed)

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

    const handleCompleteTodo = (key) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.key === key) {
                todo.completed = true
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    return (
        <Container maxWidth="sm">
            <Heading>To-do List</Heading>
            <StyledCard>
                <form onSubmit={handleFormSubmit}>
                    <FormControl fullWidth>
                        <TextField
                            id="todoText"
                            label="Add a to-do"
                            type="text"
                            value={name}
                            variant="outlined"
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
            </StyledCard>
            <StyledCard>
                {Boolean(uncompletedTodos.length) ? (
                    <Todos
                        todos={uncompletedTodos}
                        handleDeleteTodo={handleDeleteTodo}
                        handleCompleteTodo={handleCompleteTodo}
                    />
                ) : (
                    <NoTodosText>
                        You're all caught up, or you need something to do!
                    </NoTodosText>
                )}
            </StyledCard>
            {Boolean(completedTodos.length) && (
                <StyledCard>
                    <Todos
                        todos={completedTodos}
                        handleDeleteTodo={handleDeleteTodo}
                    />
                </StyledCard>
            )}
        </Container>
    )
}

const StyledCard = styled(Card)`
    padding: 16px;
    margin-bottom: 16px;
`

const Heading = styled.h1`
    text-align: center;
`

const NoTodosText = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
`
