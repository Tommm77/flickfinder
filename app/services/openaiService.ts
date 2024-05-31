// services/openaiService.ts

import { openai } from "@/lib/openai";

export class OpenAIService {
    async getMovieRecommendations(prompt: string) {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Write only 3 movies don\'t give date only 3 movies name.I want your answer to be a array with movie separated by a comma' },
                    { role: 'user', content: prompt },
                ],
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('Error processing request:', error);
            throw new Error('Internal Server Error');
        }
    }
}