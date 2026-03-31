<div align="center">

# 🚀 AWS ECS Fargate Full-Stack Application

[![Deploy Backend](https://github.com/Ai-with-Gaurav/aws-fargate-ecs/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ai-with-Gaurav/aws-fargate-ecs/actions/workflows/deploy.yml)

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/AWS_ECS-FF9900?style=for-the-badge&logo=amazonecs&logoColor=white" alt="ECS"/>
<img src="https://img.shields.io/badge/AWS_Fargate-FF9900?style=for-the-badge&logo=awsfargate&logoColor=white" alt="Fargate"/>
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>

<br/>

> A production-grade full-stack web application deployed on AWS using serverless containers with automated CI/CD.

</div>

---

## 🏗️ Architecture

```mermaid
graph TD
    A[🌐 User Browser] -->|HTTPS| B[⚡ AWS Amplify<br/>Next.js Frontend]
    B -->|API Proxy| C[⚖️ Application Load Balancer<br/>Port 80]
    C -->|Port 4000| D[🐳 ECS Fargate Service<br/>Express Backend]
    D -->|Port 5432| E[🐘 RDS PostgreSQL<br/>Private Subnet]
    
    style A fill:#4CAF50,stroke:#333,color:#fff
    style B fill:#000000,stroke:#333,color:#fff
    style C fill:#FF9900,stroke:#333,color:#fff
    style D fill:#2496ED,stroke:#333,color:#fff
    style E fill:#4169E1,stroke:#333,color:#fff
```

---

## 🌍 Live URLs

| Component | URL |
|:---------:|:---:|
| 🖥️ **Frontend** | [`https://main.d1bi6naztta26q.amplifyapp.com`](https://main.d1bi6naztta26q.amplifyapp.com) |
| ⚙️ **Backend API** | [`http://my-app-alb-117181659.ap-southeast-1.elb.amazonaws.com`](http://my-app-alb-117181659.ap-southeast-1.elb.amazonaws.com/api/v1/health) |

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="150">

### 🎨 Frontend
<img src="https://cdn.simpleicons.org/nextdotjs/000000" width="40" height="40"/><br/>
Next.js 14<br/>
React 18<br/>
TypeScript

</td>
<td align="center" width="150">

### ⚙️ Backend
<img src="https://cdn.simpleicons.org/express/000000" width="40" height="40"/><br/>
Node.js<br/>
Express<br/>
REST API

</td>
<td align="center" width="150">

### 🐘 Database
<img src="https://cdn.simpleicons.org/postgresql/4169E1" width="40" height="40"/><br/>
PostgreSQL<br/>
AWS RDS<br/>
Private Subnet

</td>
<td align="center" width="150">

### 🐳 Containers
<img src="https://cdn.simpleicons.org/docker/2496ED" width="40" height="40"/><br/>
Docker<br/>
ECS Fargate<br/>
ARM64

</td>
<td align="center" width="150">

### 🔄 CI/CD
<img src="https://cdn.simpleicons.org/githubactions/2088FF" width="40" height="40"/><br/>
GitHub Actions<br/>
Auto Deploy<br/>
Rolling Update

</td>
</tr>
</table>

---

## 📁 Project Structure

```
📦 aws-fargate-ecs/
├── 🔧 backend/
│   ├── 📂 src/
│   │   ├── 📄 index.js                 # Express server entry point
│   │   ├── 📂 routes/
│   │   │   ├── 📄 health.js            # Health check endpoint
│   │   │   └── 📄 api.js               # Product CRUD API
│   │   ├── 📂 config/
│   │   │   └── 📄 database.js          # PostgreSQL connection
│   │   └── 📂 middleware/
│   │       └── 📄 cors.js              # CORS configuration
│   ├── 🐳 Dockerfile                   # Docker image (ARM64)
│   ├── 📄 task-definition.json         # ECS Fargate task config
│   ├── 📄 init.sql                     # DB schema & seed data
│   └── 📄 package.json
├── 🎨 frontend/
│   ├── 📂 src/
│   │   ├── 📂 app/
│   │   │   ├── 📄 page.tsx             # Home page
│   │   │   ├── 📄 layout.tsx           # Root layout
│   │   │   └── 📂 api/                 # API proxy routes
│   │   └── 📂 lib/
│   │       └── 📄 api.ts               # API client
│   └── 📄 package.json
├── 🏗️ infrastructure/
│   └── 📄 setup-guide.md               # AWS setup guide
└── 🔄 .github/workflows/
    └── 📄 deploy.yml                   # CI/CD pipeline
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| 🟢 `GET` | `/api/v1/health` | Health check with DB status |
| 🔵 `GET` | `/api/v1/products` | List all products |
| 🔵 `GET` | `/api/v1/products/:id` | Get product by ID |
| 🟡 `POST` | `/api/v1/products` | Create a new product |

---

## 💻 Local Development

### Backend
```bash
cd backend
npm install
npm run dev    # 🚀 Starts on http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev    # 🚀 Starts on http://localhost:3000
```

---

## ☁️ AWS Infrastructure

<table>
<tr>
<td>

### 🌐 Networking
- **VPC** `10.0.0.0/16` across 2 AZs
- **Internet Gateway** for public access
- **NAT Gateway** for private outbound
- **Security Groups** with least-privilege rules

</td>
<td>

### 🖥️ Compute & Storage
- **ECS Fargate** — ARM64, 0.25 vCPU, 512MB
- **RDS PostgreSQL** — db.t3.micro, private subnet
- **ECR** — Docker image registry
- **ALB** — Layer 7 load balancer

</td>
</tr>
<tr>
<td>

### 🔐 Security
- RDS in private subnet, no public access
- Secrets in AWS Secrets Manager
- Security groups enforce strict access
- API proxy avoids mixed content

</td>
<td>

### 🔄 CI/CD Pipeline
On push to `main`:
1. Build ARM64 Docker image
2. Push to Amazon ECR
3. Update ECS task definition
4. Rolling deployment to Fargate
5. Amplify auto-deploys frontend

</td>
</tr>
</table>

---

## 🗺️ AWS Services Used

| Service | Purpose |
|:--------|:--------|
| ![VPC](https://img.shields.io/badge/VPC-FF9900?style=flat-square&logo=amazonaws&logoColor=white) | Isolated private cloud network |
| ![ECS](https://img.shields.io/badge/ECS_Fargate-FF9900?style=flat-square&logo=amazonecs&logoColor=white) | Serverless container orchestration |
| ![RDS](https://img.shields.io/badge/RDS-527FFF?style=flat-square&logo=amazonrds&logoColor=white) | Managed PostgreSQL database |
| ![ECR](https://img.shields.io/badge/ECR-FF9900?style=flat-square&logo=amazonaws&logoColor=white) | Docker image registry |
| ![ALB](https://img.shields.io/badge/ALB-8C4FFF?style=flat-square&logo=awselasticloadbalancing&logoColor=white) | Application load balancer |
| ![Amplify](https://img.shields.io/badge/Amplify-FF9900?style=flat-square&logo=awsamplify&logoColor=white) | Frontend hosting & deployment |
| ![Secrets](https://img.shields.io/badge/Secrets_Manager-DD344C?style=flat-square&logo=amazonaws&logoColor=white) | Secure credential storage |
| ![CloudWatch](https://img.shields.io/badge/CloudWatch-FF4F8B?style=flat-square&logo=amazoncloudwatch&logoColor=white) | Logging & monitoring |

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by [Ai-with-Gaurav](https://github.com/Ai-with-Gaurav)

</div>
