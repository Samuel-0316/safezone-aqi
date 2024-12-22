"use server";
import Together from "together-ai";
import { ChatCompletion } from "together-ai/src/resources/chat/index.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

type Allergen = {
  allergen: string;
};

const ItemFormat = z.object({
  allergen: z.string().describe("name of allergens possible in that food"),
});

const ResponseFormat = z.object({
  result: z
    .array(ItemFormat)
    .length(5)
    .describe("list of allergens for the food"),
});

const jsonSchema = zodToJsonSchema(ResponseFormat, {
  name: "ResponseFormat",
  nameStrategy: "title",
});

const together = new Together({ apiKey: process.env.TOGETHERAI_API_KEY });

const getAllergens = (response: ChatCompletion): string[] => {
  const allergensArray: string[] = [];
  if (response?.choices?.[0]?.message?.content) {
    const output = JSON.parse(response?.choices?.[0]?.message?.content);
    allergensArray.push(
      ...output.result.map((item: Allergen) => item.allergen),
    );
    return output;
  }
  return allergensArray;
};

export const generateAllergens = async (
  foodName: string,
): Promise<string[]> => {
  const prompt = `list the name of the possible allergen that could be there in the given food like ${foodName}, i want scientific name of allergen only like gluten etc, don't just give me the name of the food back`;
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
    return getAllergens(output);
  }
  throw new Error("no response from chat completion");
};
