export * from './App/index.js';
export * from './ChatMessage/index.js';
export * from './Robot/index.js';
export * from './TextBox/index.js';
export * from './types.js';

import React from 'react';

import { render } from 'ink';
import meow from "meow";
import { App } from './App/index.js';

const cli = meow(`
  Usage
    $ chatwith chat [Options]

  Options
    --help, -h     show help
`, {
    importMeta: import.meta,
    flags: {
        help: { type: "boolean", alias: "h" },
    },
});

if (cli.flags.help) cli.showHelp()

render(<App />);
