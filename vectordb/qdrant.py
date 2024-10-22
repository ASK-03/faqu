import json
import requests
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, PointStruct
import ollama

# Initialize Qdrant client
client = QdrantClient(host="localhost", port=6333)


# Function to load JSON document
def load_json_doc(file_path: str) -> dict:
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading JSON file: {e}")
        raise e


# Function to get embeddings from the Ollama API
def get_embedding(text: str) -> list:
    try:
        # Fetch the embeddings from Ollama API
        response = ollama.embeddings(
            model='mxbai-embed-large',
            prompt=text,
        )
        # Assuming the API returns embeddings under 'embedding' key
        return response['embedding']
    except requests.exceptions.RequestException as e:
        print(f"Error fetching embedding: {e}")
        raise e
    except KeyError:
        print("Unexpected response format from Ollama API.")
        raise


# Function to create a collection in Qdrant
def create_collection():
    try:
        client.recreate_collection(
            collection_name="qa_collection",
            vectors_config=VectorParams(size=1024, distance="Dot")
        )
        print("Collection created successfully.")
    except Exception as e:
        print(f"Error creating collection: {e}")
        raise e


# Function to embed and save points in Qdrant
def embed_and_save(file_path: str):
    try:
        json_doc = load_json_doc(file_path)
        points = []
        id_counter = 1

        # Loop through the categories and items in the JSON document
        for category, items in json_doc.items():
            for item in items:
                question = item.get("question")
                answer = item.get("answer")

                if not question or not answer:
                    print(f"Skipping invalid entry: {item}")
                    continue

                # Get embedding for the question
                question_embedding = get_embedding(question)

                # Create a point structure with the embedding and payload
                point = PointStruct(
                    id=id_counter,
                    vector=question_embedding,
                    payload={
                        "category": category,
                        "question": question,
                        "answer": answer
                    }
                )

                points.append(point)
                id_counter += 1

        # Upsert points into the collection
        client.upsert(collection_name="qa_collection", points=points)
        print("Points upserted successfully.")
    except Exception as e:
        print(f"Error upserting points: {e}")
        raise e


# Main function to run the process
def main():
    try:
        create_collection()  # Create the collection
        embed_and_save("/home/ask-03/Abhishek/Important/projects/hackathons/faqu/vectordb/faqs.json")  # Embed and save the data points
    except Exception as e:
        print(f"Error in main process: {e}")


if __name__ == "__main__":
    main()
