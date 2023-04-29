import { CreateRequest, PineconeClient } from "@pinecone-database/pinecone";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/index.js";
import { readFileSync } from "node:fs";
import { config } from "../config/index.js";
import fg from "fast-glob";
import { relative } from "node:path";

const IGNORED_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".mp3",
    ".mp4",
    ".mov",
    ".avi",
    ".zip",
    ".gz",
    ".tar",
    ".tgz",
    ".bz2",
    ".rar",
    ".7z",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".odt",
    ".ods",
]

type TChunk = {
    filename: string
    start: number
    end: number
    text: string
    embedding: number[] | null
}

function createUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

function fileToChunks(directory: string, filename: string, chunkSize: number, chunkOverlap: number) {
    const relativePath = relative(directory, filename);
    const fileContents = readFileSync(filename, "utf-8");

    const chunks: TChunk[] = [];

    let start = 0;
    let end = chunkSize;

    while (start < fileContents.length) {
        if (end > fileContents.length) {
            end = fileContents.length
        }

        chunks.push({
            filename: relativePath,
            start,
            end,
            text: fileContents.substring(start, end),
            embedding: null,
        })

        if (end === fileContents.length) {
            break
        }

        start = end - chunkOverlap
        end = start + chunkSize
    }

    return chunks;
}

function chunkToVector(chunk: TChunk, metadata = {}) {
    return {
        id: createUUID(),
        values: chunk.embedding!,
        metadata: {
            ...metadata,
            filename: chunk.filename,
            start: chunk.start,
            end: chunk.end,
            text: chunk.text,
        },
    }
}

class Pinecone {
    private static instance: Pinecone;
    public static client: PineconeClient;
    public static index: VectorOperationsApi;

    private constructor() {
        Pinecone.init();
    }

    public static async getInstance(): Promise<Pinecone> {
        if (!Pinecone.instance) {
            Pinecone.instance = new Pinecone();
        }
        return Pinecone.instance
    }

    private static async init() {
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

        this.client = client;
        this.index = client.Index(config.PINECONE_INDEX);
    }

    async upsertChunks(chunks: TChunk[], metadata = {}, namespace = "") {
        const index = Pinecone.index;
        const vectors = chunks.map(chunkToVector, metadata)
        for (let i = 0; i < vectors.length; i += 100) {
            const upsertRequest = {
                vectors: vectors.slice(i, i + 100),
                namespace,
            };
            await index.upsert({ upsertRequest });
        }
    }

    async upsertFile(path: string, file: string, chunkSize: number, chunkOverlap: number, metadata: any, namespace = "") {
        const chunks = fileToChunks(path, file, chunkSize, chunkOverlap);
        await this.upsertChunks(chunks, metadata, namespace)
    }

    async upsertDirectory(directory: string, chunkSize: number, chunkOverlap: number, metadata: any, namespace = "") {
        const files = await fg("**/*", { cwd: directory, onlyFiles: true, absolute: true, ignore: IGNORED_EXTENSIONS.map((extension) => { return "*" + extension }) })
        files.map((file) => {
            this.upsertFile(directory, file, chunkSize, chunkOverlap, metadata, namespace)
        })
    }
}

export const pinecone = await Pinecone.getInstance()
