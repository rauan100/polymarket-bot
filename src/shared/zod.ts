import { z } from "zod";

export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): T {
    try {
        return schema.parse(data);
    } catch (err) {
        if (err instanceof z.ZodError) {
            throw new Error(JSON.stringify(err.errors));
        }
        throw err;
    }
}