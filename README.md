# 📦 Next.js Google Drive Clone (Appwrite + Podman)

## 🔍 Problem Statement
The goal of this project is to deploy a **Next.js-based Google Drive clone** as a containerized application.  
The app uses **Appwrite Cloud** for backend services — authentication, file storage, and database — and demonstrates how a modern full-stack web application can be containerized, versioned, and managed using **Podman**.

---

## 🧠 Application Overview
- **Frontend:** Next.js 14
- **Backend (BaaS):** Appwrite Cloud  
- **Database & Storage:** Appwrite Databases + Buckets  
- **Containerization Tool:** Podman  
- **Base Image:** node:20-alpine  

---

## ⚙️ Tools & Technologies
| Component | Technology |
|------------|-------------|
| Frontend | Next.js |
| Backend API | Appwrite Cloud |
| Container Runtime | Podman |
| Registry | Docker Hub |
| Language | JavaScript / TypeScript |
| OS Base Image | Alpine Linux |

---

## 🧩 Project Structure
vault/
┣ 📜 Containerfile
┣ 📜 package.json
┣ 📜 .dockerignore
┣ 📂 public/
┣ 📂 src/
┗ 📜 README.md


---

## 🐳 Containerfile
```dockerfile
# --------------------------------------
# Stage 1 – Builder
# --------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --------------------------------------
# Stage 2 – Runner
# --------------------------------------
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

# Environment variable placeholder (real values passed at runtime)
ENV NEXT_PUBLIC_APPWRITE_ENDPOINT_URL=https://fra.cloud.appwrite.io/v1

EXPOSE 3000
CMD ["npm", "start"]

