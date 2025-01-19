export const types = ["Table", "Row", "Column", "Cell", "Other"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "Insert table",
    description:
      "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.",
    type: "Table",
    strengths:
      "Complex intent, cause and effect, creative generation, search, summarization for audience",
  },
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "Add column before",
    description: "Very capable, but faster and lower cost than Davinci.",
    type: "Column",
    strengths:
      "Language translation, complex classification, sentiment, summarization",
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: " Add column after",
    description: "Capable of straightforward tasks, very fast, and lower cost.",
    type: "Column",
    strengths: "Moderate classification, semantic search",
  },
  {
    id: "be638fb1-973b-4471-a49c-290325085802",
    name: "Delete column",
    description:
      "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
    type: "Column",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
  },
  {
    id: "b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb",
    name: "Add row before",
    description:
      "Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.",
    type: "Row",
  },
  {
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: "Add row after",
    description:
      "Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.",
    type: "Row",
    strengths: "Real-time application where low-latency is preferable",
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "Delete row",
    description: "Capable of straightforward tasks, very fast, and lower cost.",
    type: "Row",
    strengths: "Moderate classification, semantic search",
  },
  {
    id: "be638fb1-973b-4471-a49c-290325085802",
    name: "Delete table",
    description:
      "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
    type: "Table",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
  },
  {
    id: "b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb",
    name: "Merge cells",
    description:
      "Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.",
    type: "Cell",
  },
  {
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: "Split cell",
    description:
      "Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.",
    type: "Cell",
    strengths: "Real-time application where low-latency is preferable",
  },
  {
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: "Toggle header column",
    description:
      "Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.",
    type: "Column",
    strengths: "Real-time application where low-latency is preferable",
  },
  {
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: " Toggle header row",
    description:
      "Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.",
    type: "Row",
    strengths: "Real-time application where low-latency is preferable",
  },
  {
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: "Toggle header cell",
    description:
      "Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.",
    type: "Cell",
    strengths: "Real-time application where low-latency is preferable",
  },
  {
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: "Merge or split",
    description:
      "Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.",
    type: "Other",
    strengths: "Real-time application where low-latency is preferable",
  },
];
