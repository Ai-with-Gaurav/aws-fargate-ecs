# AWS ECS Fargate Full-Stack Application

A production-grade full-stack web application deployed on AWS using serverless containers.

## Architecture

```
User (Browser)
    │
    ▼
AWS Amplify (Frontend - Next.js)
    │
    ▼ (API requests via proxy)
Application Load Balancer (ALB - port 80)
    │
    ▼
ECS Fargate Service (Backend - Express, port 4000)
    │
    ▼
RDS PostgreSQL (port 5432, private subnet)
```

## Live URLs

| Component | URL |
|-----------|-----|
| Frontend | `https://main.d1bi6naztta26q.amplifyapp.com` |
| Backend API | `http://my-app-alb-117181659.ap-southeast-1.elb.amazonaws.com` |
| Health Check | `http://my-app-alb-117181659.ap-southeast-1.elb.amazonaws.com/api/v1/health` |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Backend | Node.js, Express |
| Database | PostgreSQL (AWS RDS) |
| Containers | Docker, AWS ECS Fargate (ARM64) |
| Load Balancer | AWS Application Load Balancer |
| Frontend Hosting | AWS Amplify |
| Container Registry | AWS ECR |
| Secrets | AWS Secrets Manager |
| CI/CD | GitHub Actions |
| Networking | AWS VPC, Public/Private Subnets, NAT Gateway |

## Project Structure

```
aws-fargate-ecs/
├── backend/
│   ├── src/
│   │   ├── index.js                 # Express server entry point
│   │   ├── routes/
│   │   │   ├── health.js            # Health check endpoint
│   │   │   └── api.js               # Product CRUD API routes
│   │   ├── config/
│   │   │   └── database.js          # PostgreSQL connection config
│   │   └── middleware/
│   │       └── cors.js              # CORS configuration
│   ├── Dockerfile                   # Docker image (ARM64)
│   ├── task-definition.json         # ECS Fargate task config
│   ├── init.sql                     # Database schema & seed data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # Home page (product management)
│   │   │   ├── layout.tsx           # Root layout
│   │   │   └── api/                 # API proxy routes
│   │   │       ├── health/route.ts
│   │   │       └── products/route.ts
│   │   └── lib/
│   │       └── api.ts               # API client
│   ├── next.config.js
│   └── package.json
├── infrastructure/
│   └── setup-guide.md               # Step-by-step AWS setup guide
└── .github/
    └── workflows/
        └── deploy.yml               # CI/CD pipeline
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check with database status |
| GET | `/api/v1/products` | List all products |
| GET | `/api/v1/products/:id` | Get product by ID |
| POST | `/api/v1/products` | Create a new product |

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev    # Starts on http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev    # Starts on http://localhost:3000
```

## AWS Infrastructure

### Networking
- **VPC** (`10.0.0.0/16`) with public and private subnets across 2 AZs (`ap-southeast-1a`, `ap-southeast-1b`)
- **Internet Gateway** for public subnet internet access
- **NAT Gateway** for private subnet outbound access
- **Security Groups** restricting traffic: ALB → ECS (port 4000) → RDS (port 5432)

### Compute & Storage
- **ECS Fargate** running ARM64 containers (0.25 vCPU, 512MB)
- **RDS PostgreSQL** in private subnet (db.t3.micro)
- **ECR** for Docker image storage

### CI/CD Pipeline
On every push to `main`:
1. GitHub Actions builds ARM64 Docker image
2. Pushes to Amazon ECR
3. Updates ECS task definition
4. Deploys to ECS Fargate with rolling update
5. Amplify auto-deploys frontend

## Security

- RDS is in a private subnet with no public access
- Secrets stored in AWS Secrets Manager (DB credentials, JWT secret)
- Security groups enforce least-privilege network access
- Frontend proxies API calls to avoid mixed content (HTTPS → HTTP)
