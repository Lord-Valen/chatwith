export * from './App/index.js';
export * from './ChatMessage/index.js';
export * from './Robot/index.js';
export * from './TextBox/index.js';
export * from './types.js';

import React from 'react';

import { render } from 'ink';
import { App } from './App/index.js';

render(<App />);
