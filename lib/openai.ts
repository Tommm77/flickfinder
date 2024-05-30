import { createOpenAI } from '@ai-sdk/openai';

const openAIKey = process.env.OPENAI_API_KEY;

if (!openAIKey) {
    throw new Error('OpenAI API key is missing');
}

export const openai = createOpenAI({
    apiKey: openAIKey,

});