import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { App } from '../App'

describe('<App />', () => {
    test('the app renders required elements', () => {
        render(<App />)
        screen.getByRole('button', { name: /add/i })
        screen.getByLabelText(/add a todo/i)
    })

    test('the app should allow the user to add a todo', () => {
        render(<App />)
        userEvent.type(screen.getByLabelText(/add a todo/i), `new todo{enter}`)
        expect(screen.getByLabelText(/add a todo/i)).toHaveValue('')
        screen.getByText(/new todo/i)
    })

    test('the app allows multiple todos to be added', () => {
        render(<App />)
        const input = screen.getByLabelText(/add a todo/i)

        userEvent.type(input, `new todo 1{enter}`)
        userEvent.type(input, `new todo 2{enter}`)
        userEvent.type(input, `new todo 3{enter}`)

        expect(screen.queryAllByRole('listitem').length).toBe(3)
    })

    test('the app allows todos to be deleted', () => {
        render(<App />)
        const input = screen.getByLabelText(/add a todo/i)

        userEvent.type(input, `new todo 1{enter}`)
        userEvent.type(input, `new todo 2{enter}`)
        userEvent.type(input, `new todo 3{enter}`)

        expect(screen.queryAllByRole('listitem').length).toBe(3)
        const firstItemDeleteButton = screen.queryAllByRole('button', {
            name: /delete/i,
        })[0]
        userEvent.click(firstItemDeleteButton)

        expect(screen.queryAllByRole('listitem').length).toBe(2)
    })

    test('the app should not allow a blank todo', () => {
        render(<App />)
        userEvent.type(screen.getByLabelText(/add a todo/i), `{enter}`)
        expect(screen.queryByRole('listitem')).toBeNull()
    })
})
