import * as React from 'react'
import {
    Checkbox,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core'

import styled from 'styled-components'

export const Todos = ({ todos, handleDeleteTodo, handleCompleteTodo }) => {
    return (
        <List>
            {todos.map(({ name, key, completed }) => (
                <ListItem button key={key}>
                    {!completed && (
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={completed}
                                onClick={() => handleCompleteTodo(key)}
                            />
                        </ListItemIcon>
                    )}
                    {completed ? (
                        <CompletedText primary={name} />
                    ) : (
                        <ListItemText primary={name} />
                    )}
                    <ListItemSecondaryAction>
                        <Button
                            variant="outlined"
                            onClick={() => handleDeleteTodo(key)}
                        >
                            delete
                        </Button>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    )
}

const CompletedText = styled(ListItemText)`
    text-decoration: line-through;
`
