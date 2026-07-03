# 🎫 Ticket-Craft: Events Ticket Booking System

Ticket-Craft is a modern, high-performance web application designed for discovering and booking premium live experiences. Built using the MERN stack and automated with modern DevOps practices.

---

## 🚀 Features

- **Dynamic Event Discovery**: Browse trending live events, check prices, and monitor real-time ticket availability.
- **Automated CI/CD**: Seamless deployment to AWS EC2 using Jenkins pipelines.
- **Containerized Architecture**: Production-ready deployment managed entirely via Docker & Docker Compose.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Nginx (Production) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **DevOps & CI/CD** | Jenkins, Docker, Docker Compose, AWS EC2 |

---

## 📦 Architecture & Deployment

The application runs inside isolated Docker containers, leveraging Nginx as a reverse proxy/web server for the frontend layer. 

### Local Development (Docker Compose)
To spin up the entire ecosystem (Frontend, Backend, and Database) locally, run:
```bash
docker compose up --build