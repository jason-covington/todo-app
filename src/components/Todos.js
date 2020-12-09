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

export const Todos = ({ todos, handleDeleteTodo }) => {
    return (
        <List>
            {todos.map(({ key, name, completed }) => (
                <ListItem button key={key}>
                    <ListItemIcon>
                        <Checkbox edge="start" checked={completed} />
                    </ListItemIcon>
                    <ListItemText primary={name}>{name}</ListItemText>
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
