import Fastify from 'fastify'
import PrismaPlugin from '@plugins/prisma'

export function buildApp() {
    const app = Fastify({
        logger: true
    })

    app.register(PrismaPlugin)

    return app
}