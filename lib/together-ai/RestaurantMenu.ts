import Together from "together-ai";
import { ChatCompletion } from "together-ai/src/resources/chat/index.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { MenuItem } from "./RestaurantTypes";

const ItemFormat = z.object({
  name: z.string().describe("name of an indian dish"),
  price: z.number().describe("symbol and cost of the food"),
});

const ResponseFormat = z.object({
  menu: z.array(ItemFormat).length(20),
});

const jsonSchema = zodToJsonSchema(ResponseFormat, {
  name: "ResponseFormat",
  nameStrategy: "title",
});

const together = new Together({ apiKey: process.env.TOGETHERAI_API_KEY });

export const generateMenu = async (
  country: string,
  cuisine: string,
): Promise<ChatCompletion> => {
  const prompt = `generate dishes from ${country} and ${cuisine}`;
  const response: ChatCompletion = await together.chat.completions.create({
    messages: [
      { role: "system", content: "answer for the user prompt only in json" },
      { role: "user", content: prompt },
    ],
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    response_format: { type: "json_object", schema: jsonSchema },
  });
  if (response?.choices?.[0]?.message?.content) {
    const output = JSON.parse(response?.choices?.[0]?.message?.content);
    console.log(output);
    return output;
  }
  throw new Error("no response from chat completion");
};

export const getMenu = (response: ChatCompletion): MenuItem[] => {
  return response.choices[0].message?.content as unknown as MenuItem[];
};
