import envPaths from 'env-paths';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { configSchema, TConfigSchema } from './types.js';

export * from "./types.js";

export const paths = envPaths("chatwith");

export function getConfig(): TConfigSchema {
    let config: TConfigSchema;

    try {
        const configFile = readFileSync(path.join(paths.config, "/config.json"), "utf-8");
        config = configSchema.parse(JSON.parse(configFile));
    } catch (e: any) {
        if (e.code === "ENOENT") {
            const defaultConfig = {
                OPEN_API_KEY: ""
            }
            mkdirSync(paths.config);
            writeFileSync(path.join(paths.config, "/config.json"), JSON.stringify(defaultConfig));
        }
        throw new Error(e);
    }
    return config;
}

export const config = getConfig();
