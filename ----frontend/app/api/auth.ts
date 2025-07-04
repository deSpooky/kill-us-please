import * as types from '../types'

export const authApi = {
    async signup({ email, password }: types.LoginCredentials): Promise<{ user: { id: number; }; } | { error: string; }> {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const userId = await response.json()
        return userId
    },

    async login({ email, password }: types.LoginCredentials): Promise<{ user: { id: number; }; } | { error: string; }> {
        const response = await fetch(`http://localhost:3000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const userId = await response.json()
        return userId
    }
}
