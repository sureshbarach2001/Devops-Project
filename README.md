# 🚀 E-commerce Platform

Welcome to the E-commerce Platform—a powerful, Dockerized micro-services app built with Node.js, React, and MongoDB. Featuring a back-end API, a sleek front-end UI, real-time socket communication, a MongoDB database, and handy monitoring scripts, this project is ready to scale!

## 📝 Project Info

🔗 **URL**: [E-commerce Dashboard](https://example.com) *(Update with your deployed URL once available)*

---

## 🛠️ How Can I Edit This Code?

Here’s how you can dive in and tweak the project:

### 🌐 Use Your Local Environment with Docker
Edit and run the project locally using Docker Compose:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/E-commerce.git

    Navigate to the project directory:
   ```

cd E-commerce
Start all services:
```bash
    docker-compose up -d --build
```
------
```
        Builds and runs backend, frontend, socket, mongodb, and utils in the background.
    Access the app:
        Frontend: http://localhost:3000
        Backend API: http://localhost:8000
        Socket: ws://localhost:4000
```
🖥️ Use Your Preferred IDE

Work locally with your favorite IDE:
```
    Clone and navigate (as above).
    Edit service code:
        Backend: ./backend/
        Frontend: ./frontend/
        Socket: ./socket/
        MongoDB config: ./mongodb/
    Rebuild and run:
```
---------
```bash
    docker-compose up -d --build
```
✏️ Edit Directly in GitHub

    Navigate to any file in the repo (e.g., backend/server.js).
    Make changes and commit them directly.

🧑‍💻 Technologies Used

- This project leverages:

    -  🐳 Docker - Containerization
    - ⚙️ Docker Compose - Multi-service orchestration
    - 🟢 Node.js - Backend and socket services
    - ⚛️ React - Frontend UI
    - 🍃 MongoDB - Database
    - 🖥️ Bash - Monitoring scripts (health_check.sh, log_analysis.sh)
---
🚀 How to Use
Start the Platform

Launch all services:
```bash
docker-compose up -d --build
```
Check Service Status

Verify everything’s running:
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
```
- Monitor Health

Run the health check script:

Inside Container:
```bash
docker-compose exec -t utils bash -c "./health_check.sh"
```
From Host (alternative):
```bash
    ./scripts/health_check.sh
```
Output:
```
Starting health check...
backend: [green]running
frontend: [green]running
socket: [green]running
mongodb: [green]running
MongoDB: [green]Responding to ping
Health check complete.
```
- Analyze Logs

Check logs for issues:

Inside Container:
```bash
docker-compose exec -t utils bash -c "./log_analysis.sh"
```
From Host:
```bash
    ./scripts/log_analysis.sh
```
Output example:
```
Starting log analysis...
backend: [green]No errors found
frontend: [green]No errors found
frontend: [yellow]Found 3 warning(s)
...
mongodb: [green]No errors found
mongodb: [yellow]Found 7 warning(s)
...
Log analysis complete.
```
Stop the Platform

Shut down all services:
```bash
docker-compose down
```
To remove data:
```bash
docker-compose down --volumes
```

🧑‍💼 Developed By

<a href="https://sureshbarach2001.vercel.app">Suresh Kumar</a>
🛠️ Prerequisites

  Docker: docker --version (28.0.0+)

  Docker Compose: docker-compose --version (2.24.6+)

```bash
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
```

🤝 Contributing

Love to have you onboard! Here’s how:

    Fork the repo.
    Create a branch: git checkout -b feature/YourFeature
    Commit changes: git commit -m "Add YourFeature"
    Push: git push origin feature/YourFeature
    Open a pull request.

Report issues at GitHub Issues.
📜 License

MIT License - See LICENSE for details.

![image](https://github.com/user-attachments/assets/1869a8a0-434d-4c1e-88e9-6529a9438658)

![image](https://github.com/user-attachments/assets/22a11b4c-98bc-41be-94ef-5ecc1ca93cd1)

![image](https://github.com/user-attachments/assets/7865b193-9b72-4de8-9e41-2742d93181ab)

![image](https://github.com/user-attachments/assets/33bd383c-20ab-4c16-842e-4dbba3a6a97a)

![image](https://github.com/user-attachments/assets/56c8ac59-4f04-41a3-851b-b20360651d40)

![image](https://github.com/user-attachments/assets/d1903015-5ae6-436a-acf6-1affdfe4630e)
