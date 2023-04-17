import React from 'react';

import { config } from '../../config/index.js';
import { Box, Static, Text } from 'ink';
import { Configuration, OpenAIApi } from 'openai';
import { FC, useState } from 'react';
import { ChatMessage, ChatMessageT, TextBox } from '../index.js';

const configuration = new Configuration({
    apiKey: config.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const App: FC = () => {
    const [input, setInput] = useState<string>('');
    const [waiting, setWaiting] = useState<boolean>(false);
    const [history, setHistory] = useState<ChatMessageT[]>([{
        role: 'assistant',
        content: 'Hello, I am a chatbot. How are you doing today?'
    }]);

    const extendHistory = (entries: ChatMessageT[]) => {
        setHistory([...history, ...entries]);
    }

    const onSubmit = async () => {
        setWaiting(true);

        const userMessage: ChatMessageT = {
            role: "user",
            content: input,
        };

        const completion = await openai.createChatCompletion({
            model: config.MODEL,
            messages: [...history, userMessage],
        });

        if (typeof completion.data.choices[0] === "undefined" || typeof completion.data.choices[0].message === "undefined") {
            return
        }

        const aiMessage: ChatMessageT = {
            role: "assistant",
            content: completion.data.choices[0].message.content,
        };

        extendHistory([
            userMessage,
            aiMessage
        ]);
        setWaiting(false);
        setInput('');
    };

    const Prompt = () => {
        if (waiting) {
            return <Box width={60} borderStyle="round" borderColor="green">
                <Text>"assistant is thinking..."</Text>
            </Box>
        };
        return <TextBox width={80} value={input} onChange={setInput} onSubmit={onSubmit} />
    }

    return <Box width={80}>
        <Static items={history}>
            {(item, idx) => {
                return <Box key={idx} width={80} justifyContent={item.role === 'user' ? 'flex-end' : 'flex-start'}>
                    <ChatMessage {...item} />
                </Box>
            }}
        </Static>
        <Prompt />
    </Box>
}

