import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY || 'YOUR_DEEPSEEK_API_KEY',
});

export const analyzeImageWithDeepSeek = async (imageUrl: string) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Analyze the image at ${imageUrl} and determine the type of trash (glass, plastic, paper, metal, organic), its weight in kilograms, CO2 emissions, and recyclable percentage. Return the result as a JSON object.` }
            ],
            model: "deepseek-chat",
        });

        // Возвращаем результат анализа
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error analyzing the image with DeepSeek:', error);
        throw error;
    }
};