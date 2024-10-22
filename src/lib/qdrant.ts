import { QdrantClient } from "@qdrant/js-client-rest";
import * as fs from "fs"; 
import axios from "axios";

const client = new QdrantClient({ host: "localhost", port: 6333 });

interface QAItem {
  question: string;
  answer: string;
}

// Load JSON document from faqu.json
const loadJsonDoc = (): { [key: string]: QAItem[] } => {
  const data = fs.readFileSync("faqu.json", "utf-8");
  return JSON.parse(data);
};


const getEmbedding = async (text: string): Promise<number[]> => {
  try {
    const response = await axios.post(
      "http://localhost:11400/api/embed", // Ollama's API endpoint for embeddings
      {
        model: "ollama-unique", // The Ollama model name you are using for embeddings
        text: text, // The text you want to embed
      }
    );
    return response.data.embedding; // Assuming the response contains an `embedding` field
  } catch (error) {
    console.error("Error fetching embedding:", error);
    throw error;
  }
};

const createCollection = async (): Promise<void> => {
  try {
    await client.createCollection("qa_collection", {
      vectors: {
        size: 1024, 
        distance: "Dot",
      },
    });
    console.log("Collection created successfully.");
  } catch (error) {
    console.error("Error creating collection:", error);
  }
};

const embedAndSave = async () => {
  try {
    const jsonDoc = loadJsonDoc();
    const points = [];
    let idCounter = 1;

    // Loop through the JSON document
    for (const category in jsonDoc) {
      const items = jsonDoc[category];
      for (const item of items) {
        const questionEmbedding = await getEmbedding(item.question);

        const point = {
          id: idCounter++, // Generate a random ID for each point
          vector: questionEmbedding,
          payload: {
            question: item.question,
            answer: item.answer,
          },
        };

        points.push(point);
      }
    }

    // Upsert points into the collection
    await client.upsert("qa_collection", { points });
    console.log("Points upserted successfully.");
  } catch (error) {
    console.error("Error upserting points:", error);
  }
};

const main = async () => {
  await createCollection();  // Create the collection
  await embedAndSave();
};

main();