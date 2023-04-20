import { Command } from "@commander-js/extra-typings";

export const upload = new Command("upload")
    .argument("<path>", "Document or directory of documents to upload.")
    .option("-c, --chunk <number>", "The number of lines per chunk.", parseInt, 1000)
    .option("-o, --overlap <number>", "The number of overlapping lines.", parseInt, 50)
    .action((docPath, options) => {
        // TODO: traverse path and upsert files
        console.log("Not yet implemented!");
        console.log(docPath);
        console.log(options);
    });
