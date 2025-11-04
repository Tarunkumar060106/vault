# Stage 1: Builder

FROM node:20-alpine AS builder

workdir /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

ENV NEXT_PUBLIC_APPWRITE_ENDPOINT_URL=https://fra.cloud.appwrite.io/v1 \
    NEXT_PUBLIC_APPWRITE_PROJECT_ID=${NEXT_PUBLIC_APPWRITE_PROJECT_ID} \
    NEXT_PUBLIC_APPWRITE_DATABASE_ID=${NEXT_PUBLIC_APPWRITE_DATABASE_ID} \
    NEXT_PUBLIC_APPWRITE_PROJECT_NAME=${NEXT_PUBLIC_APPWRITE_PROJECT_NAME} \
    NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=${NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID} \
    NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID=${NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID} \
    NEXT_PUBLIC_APPWRITE_BUCKET_ID=${NEXT_PUBLIC_APPWRITE_BUCKET_ID} \
    NEXT_APPWRITE_SECRET=${NEXT_APPWRITE_SECRET}

        
EXPOSE 3000

CMD ["npm", "start"]
