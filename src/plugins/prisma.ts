// plugins/prisma.ts
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
import {PrismaPg} from "@prisma/adapter-pg"

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

const prismaPlugin: FastifyPluginAsync = async (fastify) => {
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({ connectionString });
    const prisma = new PrismaClient({ adapter });

    await prisma.$connect();

    // Adiciona ao Fastify
    fastify.decorate("prisma", prisma);

    // Desconectar quando o servidor fechar
    fastify.addHook("onClose", async () => {
        await prisma.$disconnect();
    });
};

export default prismaPlugin;