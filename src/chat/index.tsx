export * from './App/index.js';
export * from './ChatMessage/index.js';
export * from './Robot/index.js';
export * from './TextBox/index.js';
export * from './types.js';

import React from 'react';

import { Command } from '@commander-js/extra-typings';
import { render } from 'ink';
import { App } from './App/index.js';

export const chat = new Command("chat")
    .description("interact with the AI model")
    .action(() => {
        render(<App />);
    });
