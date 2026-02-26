import { buildApp } from '@app/app'

export async function startServer() {
    const app = buildApp()

    await app.listen({
        port: 3000,
        host: '0.0.0.0'
    })
}