# 🚀 E-commerce Platform

Welcome to the E-commerce Platform, a modern, Dockerized microservices application built with Node.js, React, and MongoDB. This project features a backend API, a frontend UI with real-time socket communication, a MongoDB database, and utility scripts for health checks and log analysis.

## 📝 Project Info

🔗 **Repository**: [E-commerce Dashboard](https://github.com/sureshbarach2001/Devops-Project.git)
*(Replace `yourusername` with your GitHub username)*

---

## 🛠️ Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
4. [Docker Optimizations](#docker-optimizations)
5. [Local Development Environment Setup](#local-development-environment-setup)
6. [CI Pipeline Configuration](#ci-pipeline-configuration)
7. [Contributing](#contributing)
8. [License](#license)

---

## 🗂️ Project Structure
```
E-commerce/
├── backend/            # Backend API (Node.js)
│   ├── Dockerfile      # Backend Docker configuration
│   └── ...             # Backend source files (server.js, package.json)
├── frontend/           # Frontend UI (React)
│   ├── Dockerfile      # Frontend Docker configuration
│   ├── src/App.test.js # Test suite for App component
│   └── ...             # Frontend source files (App.js, package.json)
├── socket/             # Real-time socket service (Node.js)
│   ├── Dockerfile      # Socket Docker configuration
│   └── ...             # Socket source files (index.js, package.json)
├── mongodb/            # MongoDB database
│   ├── Dockerfile      # MongoDB Docker configuration
│   └── ...             # Optional initialization scripts
├── utils/              # Utility service for monitoring scripts
│   ├── Dockerfile      # Utils Docker configuration
│   └── scripts/        # Monitoring scripts
│       ├── health_check.sh
│       └── log_analysis.sh
├── .github/workflows/  # CI/CD configuration
│   └── ci.yml          # GitHub Actions pipeline
├── docker-compose.yml  # Docker Compose configuration
└── README.md           # Project documentation
```

---

## 📋 Prerequisites

- **Docker**: Version 28.0.0+ ([Install Docker](https://docs.docker.com/get-docker/))
- **Docker Compose**: Version 2.24.6+ ([Install Docker Compose](https://docs.docker.com/compose/install/))
```bash
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  docker-compose --version
```
    Node.js: Version 18.x (for local development)
    Git: For cloning the repository

⚙️ Setup Instructions
Clone the Repository
bash
git clone https://github.com/sureshbarach2001/Devops-Project.git
cd Devops-Project
Build and Run with Docker Compose

-  Start All Services:
```bash
docker-compose up -d --build
```

  -build: Ensures fresh images are built.
   
 -d: Runs containers in the background.

- Verify Services:
```bash
docker-compose ps
```
Expected output:

```
    NAME                    SERVICE    STATUS         PORTS
    e-commerce-backend-1    backend    Up             0.0.0.0:8000->8000/tcp
    e-commerce-frontend-1   frontend   Up             0.0.0.0:3000->3000/tcp
    e-commerce-socket-1     socket     Up             0.0.0.0:4000->4000/tcp
    e-commerce-mongodb-1    mongodb    Up             0.0.0.0:27017->27017/tcp
    e-commerce-utils-1      utils      Up
    Access the Application:
        Frontend: http://localhost:3000
        Backend API: http://localhost:8000
        Socket: ws://localhost:4000
```

- Monitoring

    Health Check:
```bash
docker-compose exec -t utils bash -c "./health_check.sh"
```
Expected output:
```
Starting health check...
backend: [green]running
frontend: [green]running
socket: [green]running
mongodb: [green]running
MongoDB: [green]Responding to ping
Health check complete.
```
- Log Analysis:
```bash
    docker-compose exec -t utils bash -c "./log_analysis.sh"
```
Stop the Application
```bash
docker-compose down
```
 To remove data: 
```bash
docker-compose down --volumes
```
🐳 Docker Optimizations
```
    Layer Caching: Dockerfiles copy package*.json first and run npm install before copying source code, caching dependencies unless package.json changes.
    Multi-Stage Builds: Not currently used, but consider for production to reduce image size (e.g., build React app, then serve with nginx).
    Minimal Base Images: Uses node:18 for consistency with local Node.js version.
    No-Cache Builds: CI uses no-cache: true for frontend to ensure fresh dependency installations:
    yaml

    - name: Build and push frontend
      uses: docker/build-push-action@v5
      with:
        context: ./frontend
        file: ./frontend/Dockerfile
        push: true
        tags: sainsuresh/frontend:latest
        no-cache: true
```
💻 Local Development Environment Setup
Prerequisites

  Node.js 18: Install via nvm:
```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    nvm install 18
    nvm use 18
```
- Front-end Development

 Install Dependencies:
```bash
cd frontend
npm install
Start Development Server:
bash
npm run start
```
---
```
    Front-end running on this port Navigate to this URL:
    http://localhost:3000.
```
Run Tests for Front-end:
```bash
    npm test
```
- Back-end Development

 Install Dependencies:
```bash
cd backend
npm install
```
Start Server:
```bash
    node server.js  # Adjust based on your backend script
```
- Socket Development

 Install Dependencies:
```bash
cd socket
npm install
```
Start Socket Server:
```bash
    node index.js  # Adjust as needed
```
🤖 CI Pipeline Configuration
Overview
```
    File: .github/workflows/ci.yml
    Trigger: Push or pull requests to the suresh branch.
    Jobs:
        test: Runs tests for all services with MongoDB.
        build-and-push-docker: Builds and pushes Docker images to Docker Hub.
```
- Ci/CD Pipline Configuration
```yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:latest
        ports:
          - 27017:27017
        env:
          MONGO_INITDB_ROOT_USERNAME: ${{ secrets.MONGODB_USERNAME }}
          MONGO_INITDB_ROOT_PASSWORD: ${{ secrets.MONGODB_PASSWORD }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Wait for MongoDB to start
        run: sleep 10
      - name: Install backend dependencies
        run: cd backend && npm install
      - name: Run backend tests
        run: cd backend && npm test
      - name: Install frontend dependencies
        run: cd frontend && npm install
      - name: Run frontend tests
        run: cd frontend && npm test
      - name: Install socket dependencies
        run: cd socket && npm install
      - name: Run socket tests
        run: cd socket && npx jest --detectOpenHandles --forceExit
      - name: Install utils dependencies
        run: cd utils && [ -f "package.json" ] && npm install || echo "No package.json in utils"

  build-and-push-docker:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Build and push backend
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          file: ./backend/Dockerfile
          push: true
          tags: sainsuresh/backend:latest
      - name: Build and push frontend
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          file: ./frontend/Dockerfile
          push: true
          tags: sainsuresh/frontend:latest
          no-cache: true
      - name: Build and push socket
        uses: docker/build-push-action@v5
        with:
          context: ./socket
          file: ./socket/Dockerfile
          push: true
          tags: sainsuresh/socket:latest
      - name: Build and push utils
        uses: docker/build-push-action@v5
        with:
          context: ./utils
          file: ./utils/Dockerfile
          push: true
          tags: sainsuresh/utils:latest
      - name: Build and push mongodb (optional)
        uses: docker/build-push-action@v5
        with:
          context: ./mongodb
          file: ./mongodb/Dockerfile
          push: true
          tags: sainsuresh/mongodb:latest
```
- Best Practices
```
Secrets: Store MONGODB_USERNAME, MONGODB_PASSWORD, DOCKERHUB_USERNAME, and DOCKERHUB_TOKEN in GitHub Secrets.
Caching: Avoided in frontend build (no-cache: true) to ensure React 19 consistency; consider enabling for other services if stable.
Testing: Runs tests in the test job before building images, ensuring quality gates.
Debugging: Add logs (e.g., npm list react react-dom) if dependency issues arise:
```
---
``` yaml
    - name: Debug frontend dependencies
      run: cd frontend && npm list react react-dom @testing-library/react
```

📜 License

MIT License - See LICENSE for details.
Notes
    React 19: Uses react@19.0.0 and react-dom@19.0.0 for modern features; tests updated for react-dom/client.
    Troubleshooting: If CI tests fail, check frontend/Dockerfile for outdated npm install commands and clear cache with no-cache: true.

![image](https://github.com/user-attachments/assets/1869a8a0-434d-4c1e-88e9-6529a9438658)

![image](https://github.com/user-attachments/assets/22a11b4c-98bc-41be-94ef-5ecc1ca93cd1)

![image](https://github.com/user-attachments/assets/7865b193-9b72-4de8-9e41-2742d93181ab)

![image](https://github.com/user-attachments/assets/33bd383c-20ab-4c16-842e-4dbba3a6a97a)

![image](https://github.com/user-attachments/assets/56c8ac59-4f04-41a3-851b-b20360651d40)

![image](https://github.com/user-attachments/assets/d1903015-5ae6-436a-acf6-1affdfe4630e)
