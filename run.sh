echo "Running the application"
echo "------ Installing dependencies ------"
npm i

    echo "------ Starting the database ------"
    sudo docker compose up -d

echo "------ Generating the Prisma client ------"
npx prisma generate
npx prisma db push

sudo docker pull qdrant/qdrant

ollama pull mxbai-embed-large

sudo docker run -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage:z \
    qdrant/qdrant

echo "------ Starting the application ------"
npm run dev

