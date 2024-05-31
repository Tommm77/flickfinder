import { openai } from "@/lib/openai";

export class OpenAIService {
    async getMovieRecommendations(prompt: string) {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Write only 3 movies don\'t give date only 3 movies name. I want your answer to be an array with movie names separated by a comma.' },
                    { role: 'user', content: prompt },
                ],
            });

            const moviesString = response.choices[0].message.content;

            // Ensure the response is properly formatted JSON
            let moviesArray;
            try {
                moviesArray = JSON.parse(moviesString || '[]');
                console.log('Parsed JSON:', moviesArray);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError, 'Original response:', moviesString);
                new Error('Invalid JSON format received from OpenAI');
            }

            return moviesArray;
        } catch (error) {
            console.error('Error processing request:', error);
            throw new Error('Internal Server Error');
        }
    }
}
