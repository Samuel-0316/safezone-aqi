import Together from "together-ai";

const together = new Together({ apiKey: process.env.TOGETHERAI_API_KEY });

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const systemPrompt = `
        You are a helpful assistant for our application. Here's what you need to know:
        
        Application Name: safezone-aqi 
        Purpose: out application has a search bar in the first page if you click on it and enter a place it takes you to the second
        page where there is a map and if you click on the it gives you all the relevant aqi, water quality, pollen concentration and other information about the place
        if you want to click on a restaurant it gives you the menu and componenets used in it so that you can check which allergenes are there and so on 
        Key Features:
        - air quality index
        - water quality data
        - pollen concentration
        - food allergen data
        
        Common User Questions:
        1. [Common question 1 and its answer]
        2. [Common question 2 and its answer]
        
        Interaction Guidelines:
        - Always be helpful and professional
        - If you're unsure about something, direct users to contact support
        - Keep responses concise and relevant

`;

// you have to store the state for both assistant response and the user prompt
// and then send that state with the next user prompt
// into this history which of of type Message,
// ok ? nice
export const getChatResponse = async (history: Message[], prompt: string) => {
  const response = await together.chat.completions.create({
    messages: [
      ...history,
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    model: "Qwen/QwQ-32B-Preview",
    max_tokens: 1000,
    temperature: 0.7,
    top_p: 0.7,
    top_k: 50,
    repetition_penalty: 1,
    stop: ["<|im_end|>", "<|endoftext|>"],
    stream: true,
  });
  if (!response) {
    throw new Error("no response from chat completion");
  }
  return response;
};

// you can literally stream the response like this so that it feels faster
// const res = await getChatResponse(
//   [],
//   "i am the hero who came to kill the demon king",
// );
// for await (const token of res) {
//   process.stdout.write(token.choices[0].text);
// }
