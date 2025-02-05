import { ChatOpenAI } from "@langchain/openai";
import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export type LLMType = "OPENAI" | "DEEPSEEK" | "GOOGLE";
export function model(type: LLMType) {
  switch (type) {
    case "OPENAI":
      return new ChatOpenAI({
        modelName: "gpt-4",
        apiKey: process.env.OPENAI_API_KEY,
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true,
        callbacks: [
          {
            handleLLMStart: async () => {
              // console.log("🤖 Starting LLM call");
            },
            handleLLMEnd: async (output) => {
              console.log("🤖 End LLM call", output);
              const usage = output.llmOutput?.usage;
              if (usage) {
                // console.log("📊 Token Usage:", {
                //   input_tokens: usage.input_tokens,
                //   output_tokens: usage.output_tokens,
                //   total_tokens: usage.input_tokens + usage.output_tokens,
                //   cache_creation_input_tokens:
                //     usage.cache_creation_input_tokens || 0,
                //   cache_read_input_tokens: usage.cache_read_input_tokens || 0,
                // });
              }
            },
            // handleLLMNewToken: async (token: string) => {
            //   // console.log("🔤 New token:", token);
            // },
          },
        ],
      });

    case "GOOGLE":
      return new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        temperature: 0.7,
        streaming: true,
        callbacks: [
          {
            handleLLMStart: async () => {
              // console.log("🤖 Starting LLM call");
            },
            handleLLMEnd: async (output) => {
              console.log("🤖 End LLM call", output);
              const usage = output.llmOutput?.usage;
              if (usage) {
                // console.log("📊 Token Usage:", {
                //   input_tokens: usage.input_tokens,
                //   output_tokens: usage.output_tokens,
                //   total_tokens: usage.input_tokens + usage.output_tokens,
                //   cache_creation_input_tokens:
                //     usage.cache_creation_input_tokens || 0,
                //   cache_read_input_tokens: usage.cache_read_input_tokens || 0,
                // });
              }
            },
            // handleLLMNewToken: async (token: string) => {
            //   // console.log("🔤 New token:", token);
            // },
          },
        ],
      });

    case "DEEPSEEK":
      return new ChatDeepSeek({
        modelName: "deepseek-chat",
        apiKey: process.env.DEEPSEEK_API_KEY,
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true,
        callbacks: [
          {
            handleLLMStart: async () => {
              // console.log("🤖 Starting LLM call");
            },
            handleLLMEnd: async (output) => {
              console.log("🤖 End LLM call", output);
              const usage = output.llmOutput?.usage;
              if (usage) {
                // console.log("📊 Token Usage:", {
                //   input_tokens: usage.input_tokens,
                //   output_tokens: usage.output_tokens,
                //   total_tokens: usage.input_tokens + usage.output_tokens,
                //   cache_creation_input_tokens:
                //     usage.cache_creation_input_tokens || 0,
                //   cache_read_input_tokens: usage.cache_read_input_tokens || 0,
                // });
              }
            },
            // handleLLMNewToken: async (token: string) => {
            //   // console.log("🔤 New token:", token);
            // },
          },
        ],
      });
  }
}
