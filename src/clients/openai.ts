import { config } from '../config/index.js';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: config.OPEN_API_KEY,
});

export const openai = new OpenAIApi(configuration);
