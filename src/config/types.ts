import { z } from 'zod';

export const configSchema = z.object({
    MODEL: z.string().default("gpt-3.5-turbo"),
    OPEN_API_KEY: z.string(),
});

export type TConfigSchema = z.infer<typeof configSchema>;
