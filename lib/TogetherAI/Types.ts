export type MenuItem = {
  name: string;
  price: number;
};

type MenuResponse = {
  menu: MenuItem[];
};

type ChatMessage = {
  role: "assistant";
  content: MenuResponse;
  tool_calls: never[];
};

type ChatCompletionChoice = {
  index: number;
  message: ChatMessage;
  logprobs: null;
  finish_reason: string;
};

type ChatCompletionUsage = {
  prompt_tokens: number;
  total_tokens: number;
  completion_tokens: number;
};

export type ChatCompletionResponse = {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  prompt_logprobs: null;
  prompt: [];
  choices: ChatCompletionChoice[];
  usage: ChatCompletionUsage;
};
