import { CreateRequest, PineconeClient } from "@pinecone-database/pinecone";
import { config } from "../config/index.js";

async function createClient() {
    const client = new PineconeClient();

    await client.init({
        apiKey: config.PINECONE_API_KEY,
        environment: config.PINECONE_ENVIRONMENT
    });

    const indexes = await client.listIndexes();

    if (indexes.includes(config.PINECONE_INDEX) === false) {
        const createRequest: CreateRequest = {
            name: config.PINECONE_INDEX,
            dimension: 300,
        };

        await client.createIndex({
            createRequest
        });
    }

    return client;
}

export const pinecone = await createClient();
