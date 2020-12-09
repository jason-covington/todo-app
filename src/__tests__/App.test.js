import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { App } from '../App'

describe('<App />', () => {
    test('the app renders required elements', () => {
        render(<App />)
        screen.getByRole('button', { name: /add/i })
        screen.getByLabelText(/add a to-do/i)
    })

    test('the app should allow the user to add a to-do', () => {
        render(<App />)
        userEvent.type(
            screen.getByLabelText(/add a to-do/i),
            `new to-do{enter}`
        )
        expect(screen.getByLabelText(/add a to-do/i)).toHaveValue('')
        screen.getByText(/new to-do/i)
    })

    test('the app allows multiple to-dos to be added', () => {
        render(<App />)
        const input = screen.getByLabelText(/add a to-do/i)

        userEvent.type(input, `new to-do 1{enter}`)
        userEvent.type(input, `new to-do 2{enter}`)

        expect(screen.queryAllByRole('listitem').length).toBe(2)
    })

    test('the app allows to-dos to be deleted', () => {
        render(<App />)
        const input = screen.getByLabelText(/add a to-do/i)

        userEvent.type(input, `new to-do 1{enter}`)
        userEvent.type(input, `new to-do 2{enter}`)

        expect(screen.queryAllByRole('listitem').length).toBe(2)
        const firstItemDeleteButton = screen.queryAllByRole('button', {
            name: /delete/i,
        })[0]
        userEvent.click(firstItemDeleteButton)

        expect(screen.queryAllByRole('listitem').length).toBe(1)
    })

    test('the app should not allow a blank to-do', () => {
        render(<App />)
        userEvent.type(screen.getByLabelText(/add a to-do/i), `{enter}`)
        expect(screen.queryByRole('listitem')).toBeNull()
    })
})
