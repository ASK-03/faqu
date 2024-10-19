echo "Running the application"
echo "------ Installing dependencies ------"
npm i

echo "------ Starting the database ------"
sudo docker compose up -d

echo "------ Generating the Prisma client ------"
npx prisma generate
npx prisma db push

echo "------ Starting the application ------"
npm run dev