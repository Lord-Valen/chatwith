import meow from "meow";

const cli = meow(`
  Usage
    $ chatwith upload <path> [Options]

  Options
    --help, -h     show help
    --chunk, -c    the number of lines per chunk
    --overlap, -o  the number of overlapping lines
`, {
    importMeta: import.meta,
    flags: {
        help: { type: "boolean", alias: "h" },
        chunk: { type: "number", alias: "c", default: 1000 },
        overlap: { type: "number", alias: "o", default: 50 },
    },
});

if (cli.flags.help) cli.showHelp()
if (cli.input[1] === undefined) cli.showHelp(1)

console.log("Not yet implemented!");
console.log(cli.input[1]);
console.log(cli.flags.chunk);
console.log(cli.flags.overlap);
