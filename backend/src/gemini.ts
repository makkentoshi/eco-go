import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GEMINI_PROMPT = `Analyze the image and provide the following information in JSON format only. Do not include any introductory or explanatory text. Do not offer advice or suggestions.

{
  "estimated_weight_kg": "Estimated weight of the visible waste in kilograms (e.g., 0.5)",
  "co2_emission_kg": "Estimated CO2 emission in kilograms based on waste type and weight (e.g., 0.2)",
  "recyclability_percentage": "Percentage of recyclability of the identified waste (e.g., 75)",
  "dominant_waste_types": [
    "List of dominant waste types identified in the image (e.g., 'plastic', 'paper')",
  ]
}
`;


export const analyzeImageWithGemini = async (imageBase64: string) => {
    try {
        const imagePart = {
            inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64
            }
        };

        const result = await model.generateContent([GEMINI_PROMPT, imagePart]);

        // Check for any API errors by inspecting the promptFeedback
        const promptFeedback = result.response.promptFeedback;
        if (promptFeedback && promptFeedback.blockReason) {
            console.error('Gemini API blocked the prompt:', promptFeedback.blockReason);
            console.error('Gemini API safety ratings:', promptFeedback.safetyRatings);

            // Consider throwing an error or returning a specific error response
            throw new Error(`Gemini API blocked the prompt. Reason: ${promptFeedback.blockReason}`);
        }
        const response = await result.response;

    let text = response.text();
    console.log("Raw Gemini response", text); // Log the raw response
      // Remove ```json and ``` from the response
    text = text.replace(/```json/g, '').replace(/```/g, '');



        // Attempt to parse the response as JSON
        try {
            const jsonData = JSON.parse(text);
            return jsonData;
        } catch (error) {
            console.error("Error parsing Gemini response as JSON:", error);
            return {
                estimated_weight_kg: 0,
                co2_emission_kg: 0,
                recyclability_percentage: 0,
                dominant_waste_types: [],
            };
        }

    } catch (error) {
        console.error('Error analyzing image with Gemini:', error);
          return {
                estimated_weight_kg: 0,
                co2_emission_kg: 0,
                recyclability_percentage: 0,
                dominant_waste_types: [],
            };
    }
};