import meow from "meow";

const cli = meow(`
  Usage
    $ chatwith <command>

  Commands
    chat           interact with the AI model
    upload         upload documents to the database

  Options
    --help, -h     show help
    --version      show version
`, {
    importMeta: import.meta,
    flags: {
        help: { type: "boolean", alias: "h" },
    },
});

switch (cli.input[0]) {
    case "chat":
        await import("./chat/index.js");
        break;
    case "upload":
        await import("./upload/index.js");
        break;
    default:
        cli.showHelp(1);
}
