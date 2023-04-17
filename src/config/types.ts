import { z } from 'zod';

export const configSchema = z.object({
    OPEN_API_KEY: z.string(),
});

export type TConfigSchema = z.infer<typeof configSchema>;
