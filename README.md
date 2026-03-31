<div align="center">

<img src="https://img.shields.io/badge/☁️_AWS-ECS_Fargate_Full--Stack_App-FF9900?style=for-the-badge&labelColor=232F3E" alt="Header"/>

# 🚀 AWS ECS Fargate Full-Stack Application

[![Deploy Backend](https://github.com/Ai-with-Gaurav/aws-fargate-ecs/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ai-with-Gaurav/aws-fargate-ecs/actions/workflows/deploy.yml)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![AWS](https://img.shields.io/badge/Cloud-AWS-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

<br/>

<img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
<img src="https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
<img src="https://img.shields.io/badge/Node.js_20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/AWS_ECS-FF9900?style=for-the-badge&logo=amazonecs&logoColor=white" alt="ECS"/>
<img src="https://img.shields.io/badge/AWS_Fargate-FF9900?style=for-the-badge&logo=awsfargate&logoColor=white" alt="Fargate"/>
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/AWS_Amplify-FF9900?style=for-the-badge&logo=awsamplify&logoColor=white" alt="Amplify"/>
<img src="https://img.shields.io/badge/AWS_RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white" alt="RDS"/>

<br/><br/>

> 🌟 A production-grade full-stack web application deployed on AWS using serverless containers with fully automated CI/CD pipeline.

---

### 🎯 Features

`✅ Serverless Containers` `✅ Auto-scaling` `✅ CI/CD Pipeline` `✅ Private Database` `✅ Secrets Management` `✅ Load Balanced` `✅ Multi-AZ` `✅ Rolling Deployments`

</div>

---

## 🏗️ Architecture

```mermaid
graph TD
    A[🌐 User Browser] -->|HTTPS| B[⚡ AWS Amplify<br/>Next.js Frontend<br/>Port 3000]
    B -->|API Proxy<br/>Server-Side| C[⚖️ Application Load Balancer<br/>Port 80/443]
    C -->|Port 4000| D[🐳 ECS Fargate Service<br/>Express Backend<br/>ARM64 Container]
    D -->|Port 5432| E[🐘 RDS PostgreSQL<br/>Private Subnet<br/>Multi-AZ]
    
    F[🔄 GitHub Actions] -->|Push to main| G[📦 Amazon ECR<br/>Container Registry]
    G -->|Pull Image| D
    
    H[🔐 AWS Secrets Manager] -.->|Inject Secrets| D

    style A fill:#4CAF50,stroke:#2E7D32,color:#fff,stroke-width:2px
    style B fill:#000000,stroke:#333,color:#fff,stroke-width:2px
    style C fill:#FF9900,stroke:#CC7A00,color:#fff,stroke-width:2px
    style D fill:#2496ED,stroke:#1976D2,color:#fff,stroke-width:2px
    style E fill:#4169E1,stroke:#2850C8,color:#fff,stroke-width:2px
    style F fill:#2088FF,stroke:#1565C0,color:#fff,stroke-width:2px
    style G fill:#FF9900,stroke:#CC7A00,color:#fff,stroke-width:2px
    style H fill:#DD344C,stroke:#B71C1C,color:#fff,stroke-width:2px
```

---

## 🌍 Live URLs

<div align="center">

| | Component | URL | Status |
|:--:|:---------:|:---:|:------:|
| 🖥️ | **Frontend** | [`https://main.d1bi6naztta26q.amplifyapp.com`](https://main.d1bi6naztta26q.amplifyapp.com) | ![Up](https://img.shields.io/badge/●-Live-brightgreen?style=flat-square) |
| ⚙️ | **Backend API** | [`http://my-app-alb-117181659.ap-southeast-1.elb.amazonaws.com`](http://my-app-alb-117181659.ap-southeast-1.elb.amazonaws.com/api/v1/health) | ![Up](https://img.shields.io/badge/●-Live-brightgreen?style=flat-square) |
| 💚 | **Health Check** | [`/api/v1/health`](http://my-app-alb-117181659.ap-southeast-1.elb.amazonaws.com/api/v1/health) | ![Up](https://img.shields.io/badge/●-Healthy-brightgreen?style=flat-square) |
| 📦 | **Products API** | [`/api/v1/products`](http://my-app-alb-117181659.ap-southeast-1.elb.amazonaws.com/api/v1/products) | ![Up](https://img.shields.io/badge/●-Live-brightgreen?style=flat-square) |

</div>

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="150">
<br/>
<img src="https://cdn.simpleicons.org/nextdotjs/000000" width="45" height="45"/>
<br/><br/>

**🎨 Frontend**
<br/>
Next.js 14<br/>
React 18<br/>
TypeScript
<br/><br/>
</td>
<td align="center" width="150">
<br/>
<img src="https://cdn.simpleicons.org/nodedotjs/339933" width="45" height="45"/>
<br/><br/>

**⚙️ Backend**
<br/>
Node.js 20<br/>
Express.js<br/>
REST API
<br/><br/>
</td>
<td align="center" width="150">
<br/>
<img src="https://cdn.simpleicons.org/postgresql/4169E1" width="45" height="45"/>
<br/><br/>

**🐘 Database**
<br/>
PostgreSQL 17<br/>
AWS RDS<br/>
Private Subnet
<br/><br/>
</td>
<td align="center" width="150">
<br/>
<img src="https://cdn.simpleicons.org/docker/2496ED" width="45" height="45"/>
<br/><br/>

**🐳 Containers**
<br/>
Docker<br/>
ECS Fargate<br/>
ARM64
<br/><br/>
</td>
<td align="center" width="150">
<br/>
<img src="https://cdn.simpleicons.org/githubactions/2088FF" width="45" height="45"/>
<br/><br/>

**🔄 CI/CD**
<br/>
GitHub Actions<br/>
Auto Deploy<br/>
Rolling Update
<br/><br/>
</td>
</tr>
</table>

---

## 📁 Project Structure

```
📦 aws-fargate-ecs/
│
├── 🔧 backend/                          # Express.js API Server
│   ├── 📂 src/
│   │   ├── 📄 index.js                  # Server entry point
│   │   ├── 📂 routes/
│   │   │   ├── 📄 health.js             # GET /api/v1/health
│   │   │   └── 📄 api.js                # Product CRUD endpoints
│   │   ├── 📂 config/
│   │   │   └── 📄 database.js           # PostgreSQL pool config
│   │   └── 📂 middleware/
│   │       └── 📄 cors.js               # CORS whitelist
│   ├── 🐳 Dockerfile                    # Multi-stage ARM64 build
│   ├── 📄 task-definition.json          # ECS Fargate task config
│   ├── 📄 init.sql                      # DB schema & seed data
│   └── 📄 package.json
│
├── 🎨 frontend/                          # Next.js Application
│   ├── 📂 src/
│   │   ├── 📂 app/
│   │   │   ├── 📄 page.tsx              # Product management UI
│   │   │   ├── 📄 layout.tsx            # Root layout
│   │   │   └── 📂 api/                  # Server-side API proxy
│   │   │       ├── 📂 health/route.ts   # Proxy → /api/v1/health
│   │   │       └── 📂 products/route.ts # Proxy → /api/v1/products
│   │   └── 📂 lib/
│   │       └── 📄 api.ts                # Frontend API client
│   ├── 📄 next.config.js
│   └── 📄 package.json
│
├── 🏗️ infrastructure/
│   └── 📄 setup-guide.md                # 11-phase AWS setup guide
│
└── 🔄 .github/workflows/
    └── 📄 deploy.yml                    # CI/CD pipeline
```

---

## 📡 API Endpoints

<div align="center">

| Method | Endpoint | Description | Response |
|:------:|:---------|:------------|:---------|
| ![GET](https://img.shields.io/badge/GET-4CAF50?style=flat-square) | `/api/v1/health` | Health check + DB status | `{"status": "healthy", "database": "connected"}` |
| ![GET](https://img.shields.io/badge/GET-4CAF50?style=flat-square) | `/api/v1/products` | List all products | `{"data": [...]}` |
| ![GET](https://img.shields.io/badge/GET-4CAF50?style=flat-square) | `/api/v1/products/:id` | Get single product | `{"data": {...}}` |
| ![POST](https://img.shields.io/badge/POST-FF9800?style=flat-square) | `/api/v1/products` | Create new product | `{"data": {...}}` |

</div>

---

## 💻 Local Development

<table>
<tr>
<td width="50%">

### 🔧 Backend
```bash
cd backend
npm install
npm run dev
```
> 🟢 Runs on `http://localhost:4000`

</td>
<td width="50%">

### 🎨 Frontend
```bash
cd frontend
npm install
npm run dev
```
> 🟢 Runs on `http://localhost:3000`

</td>
</tr>
</table>

### 🐳 Docker
```bash
cd backend
docker build --platform linux/arm64 -t my-app-backend .
docker run -p 4000:4000 --env-file .env my-app-backend
```

---

## ☁️ AWS Infrastructure

<table>
<tr>
<td width="50%">

### 🌐 Networking
| Resource | Details |
|:---------|:--------|
| ![VPC](https://img.shields.io/badge/VPC-FF9900?style=flat-square&logoColor=white) | `10.0.0.0/16` — 65,000 IPs |
| ![Subnets](https://img.shields.io/badge/Subnets-527FFF?style=flat-square) | 2 Public + 2 Private (2 AZs) |
| ![IGW](https://img.shields.io/badge/Internet_GW-4CAF50?style=flat-square) | Public subnet internet access |
| ![NAT](https://img.shields.io/badge/NAT_GW-FF9800?style=flat-square) | Private subnet outbound access |
| ![SG](https://img.shields.io/badge/Security_Groups-E91E63?style=flat-square) | Least-privilege firewall rules |

</td>
<td width="50%">

### 🖥️ Compute & Storage
| Resource | Details |
|:---------|:--------|
| ![ECS](https://img.shields.io/badge/ECS_Fargate-FF9900?style=flat-square&logo=amazonecs&logoColor=white) | ARM64, 0.25 vCPU, 512MB |
| ![RDS](https://img.shields.io/badge/RDS-527FFF?style=flat-square&logo=amazonrds&logoColor=white) | PostgreSQL 17, db.t3.micro |
| ![ECR](https://img.shields.io/badge/ECR-FF9900?style=flat-square) | Docker image registry |
| ![ALB](https://img.shields.io/badge/ALB-8C4FFF?style=flat-square) | Layer 7 load balancer |
| ![Amplify](https://img.shields.io/badge/Amplify-FF9900?style=flat-square&logo=awsamplify&logoColor=white) | Next.js SSR hosting |

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Security
- 🛡️ RDS in **private subnet** — no public access
- 🔑 Credentials in **AWS Secrets Manager**
- 🔒 **Security groups** enforce strict access
- 🔄 API proxy avoids **mixed content** (HTTPS→HTTP)
- 👤 **IAM roles** with least-privilege access

</td>
<td width="50%">

### 🔄 CI/CD Pipeline
On every push to `main`:
1. 🏗️ Build **ARM64** Docker image
2. 📤 Push to **Amazon ECR**
3. 📝 Update **ECS task definition**
4. 🚀 **Rolling deployment** to Fargate
5. ⚡ **Amplify** auto-deploys frontend

</td>
</tr>
</table>

---

## 🗺️ AWS Services Map

<div align="center">

| Service | Purpose | Region |
|:--------|:--------|:------:|
| ![VPC](https://img.shields.io/badge/Amazon_VPC-FF9900?style=flat-square&logo=amazonaws&logoColor=white) | Isolated private cloud network | `ap-southeast-1` |
| ![ECS](https://img.shields.io/badge/Amazon_ECS-FF9900?style=flat-square&logo=amazonecs&logoColor=white) | Serverless container orchestration | `ap-southeast-1` |
| ![Fargate](https://img.shields.io/badge/AWS_Fargate-FF9900?style=flat-square&logo=awsfargate&logoColor=white) | Serverless compute for containers | `ap-southeast-1` |
| ![RDS](https://img.shields.io/badge/Amazon_RDS-527FFF?style=flat-square&logo=amazonrds&logoColor=white) | Managed PostgreSQL database | `ap-southeast-1` |
| ![ECR](https://img.shields.io/badge/Amazon_ECR-FF9900?style=flat-square&logo=amazonaws&logoColor=white) | Docker container registry | `ap-southeast-1` |
| ![ALB](https://img.shields.io/badge/Elastic_Load_Balancer-8C4FFF?style=flat-square&logo=awselasticloadbalancing&logoColor=white) | Application load balancer | `ap-southeast-1` |
| ![Amplify](https://img.shields.io/badge/AWS_Amplify-FF9900?style=flat-square&logo=awsamplify&logoColor=white) | Frontend hosting & deployment | `ap-southeast-1` |
| ![Secrets](https://img.shields.io/badge/Secrets_Manager-DD344C?style=flat-square&logo=amazonaws&logoColor=white) | Secure credential storage | `ap-southeast-1` |
| ![CloudWatch](https://img.shields.io/badge/CloudWatch-FF4F8B?style=flat-square&logo=amazoncloudwatch&logoColor=white) | Logging & monitoring | `ap-southeast-1` |
| ![IAM](https://img.shields.io/badge/IAM-DD344C?style=flat-square&logo=amazonaws&logoColor=white) | Identity & access management | Global |

</div>

---

## 📊 Infrastructure Diagram

```mermaid
graph LR
    subgraph VPC["☁️ VPC (10.0.0.0/16)"]
        subgraph Public["🌐 Public Subnets"]
            ALB[⚖️ ALB]
            NAT[🔀 NAT Gateway]
        end
        subgraph Private["🔒 Private Subnets"]
            ECS[🐳 ECS Fargate]
            RDS[(🐘 RDS PostgreSQL)]
        end
    end
    
    Internet((🌍 Internet)) --> ALB
    ALB --> ECS
    ECS --> RDS
    ECS --> NAT
    NAT --> Internet

    style VPC fill:#232F3E,stroke:#FF9900,color:#fff,stroke-width:3px
    style Public fill:#4CAF50,stroke:#2E7D32,color:#fff,stroke-width:2px
    style Private fill:#1565C0,stroke:#0D47A1,color:#fff,stroke-width:2px
    style Internet fill:#FF9900,stroke:#CC7A00,color:#fff,stroke-width:2px
```

---

<div align="center">

### 🧹 Cleanup (Avoid Charges!)

> ⚠️ **Important:** Delete resources in the correct order to avoid orphaned dependencies and unnecessary charges.

</div>

```
1. ECS Service (set desired count to 0, then delete)
2. ECS Cluster
3. ALB + Target Groups
4. NAT Gateway (costs ~$0.045/hr)
5. Elastic IP
6. RDS Database
7. ECR Repository
8. Secrets Manager secrets
9. Amplify app
10. IAM user + roles
11. VPC (subnets, route tables, gateways)
```

---

<div align="center">

<img src="https://img.shields.io/badge/Built_with-❤️-red?style=for-the-badge" alt="Built with love"/>
<img src="https://img.shields.io/badge/Deployed_on-AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="Deployed on AWS"/>
<img src="https://img.shields.io/badge/Powered_by-Fargate-2496ED?style=for-the-badge&logo=awsfargate&logoColor=white" alt="Powered by Fargate"/>

<br/><br/>

### ⭐ Star this repo if you found it helpful!

**Made with ❤️ by [Ai-with-Gaurav](https://github.com/Ai-with-Gaurav)**

[![GitHub followers](https://img.shields.io/github/followers/Ai-with-Gaurav?style=social)](https://github.com/Ai-with-Gaurav)
[![GitHub stars](https://img.shields.io/github/stars/Ai-with-Gaurav/aws-fargate-ecs?style=social)](https://github.com/Ai-with-Gaurav/aws-fargate-ecs)

</div>
