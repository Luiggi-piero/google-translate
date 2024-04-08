import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('My App works as expected', async () => {
    const user = userEvent.setup()  // inicializar nuestro usuario
    const app = render(<App />)

    const textareaFrom = app.getByPlaceholderText('Introducir texto')

    await user.type(textareaFrom, 'Hola mundo') // escribe el usuario en textarea
    
    // busca en un elemento q este en pantalla, puede ser un input que incluya Hello world
    const result = await app.findByDisplayValue(/peticiones/i, {}, {timeout: 4000}) 
    expect(result).toBeTruthy()
})