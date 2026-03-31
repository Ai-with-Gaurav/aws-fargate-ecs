# AWS ECS Fargate Full-Stack Deployment Project

## Project Overview

A full-stack web application deployed on AWS using production-grade infrastructure:

- **Frontend**: Next.js app deployed on **AWS Amplify**
- **Backend**: Node.js/Express API deployed on **AWS ECS Fargate** (serverless containers)
- **Database**: PostgreSQL on **AWS RDS**
- **CI/CD**: **GitHub Actions** for automated builds and deployments
- **Secrets**: **AWS Secrets Manager** + **GitHub Secrets**

## Architecture Flow

```
User (Browser)
    |
    v
AWS Amplify (Frontend - Next.js, port 3000)
    |
    v (API requests)
Application Load Balancer (ALB - port 80/443)
    |
    v
ECS Fargate Service (Backend - Express, port 4000)
    |
    v
RDS PostgreSQL (port 5432, private subnet)
```

## Key AWS Concepts Used

| Concept | Purpose |
|---------|---------|
| **VPC** | Isolated private cloud network (CIDR /16 = ~65,000 IPs) |
| **Public Subnet** | Hosts ALB, accessible from internet |
| **Private Subnet** | Hosts ECS tasks & RDS, no direct internet access |
| **Internet Gateway** | Allows public subnet to talk to internet |
| **NAT Gateway** | Allows private subnet to reach internet (outbound only) |
| **Security Groups** | Firewall rules (inbound/outbound port restrictions) |
| **Route Tables** | Connect subnets to gateways |
| **ECS Cluster** | Logical grouping for container services |
| **ECS Service** | Manages running tasks, load balancer integration |
| **Task Definition** | Infrastructure config (CPU, memory, image, env vars, secrets) |
| **ECR** | Docker image registry (like Docker Hub but AWS-native) |
| **ALB** | OSI Layer 7 load balancer, path-based routing |
| **Fargate** | Serverless compute for containers (no EC2 management) |
| **IAM Roles** | Permissions for ECS to access other AWS services |

## Project Structure

```
aws-fargate-ecs/
├── CLAUDE.md
├── backend/
│   ├── src/
│   │   ├── index.js              # Express server entry point
│   │   ├── routes/
│   │   │   ├── health.js         # Health check endpoint
│   │   │   └── api.js            # API routes
│   │   ├── config/
│   │   │   └── database.js       # PostgreSQL connection config
│   │   └── middleware/
│   │       └── cors.js           # CORS configuration
│   ├── Dockerfile                # Docker image definition
│   ├── .dockerignore
│   ├── package.json
│   ├── task-definition.json      # ECS Fargate task config
│   └── .github/
│       └── workflows/
│           └── deploy.yml        # GitHub Actions CI/CD pipeline
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Home page
│   │   │   └── layout.tsx        # Root layout
│   │   └── lib/
│   │       └── api.ts            # Backend API client
│   ├── package.json
│   ├── next.config.js
│   └── .env.local                # Local env (NEXT_PUBLIC_API_URL)
└── infrastructure/
    └── setup-guide.md            # Step-by-step AWS setup
```

## Build & Run Commands

### Backend (local)
```bash
cd backend
npm install
npm run dev                        # Starts on port 4000
```

### Frontend (local)
```bash
cd frontend
npm install
npm run dev                        # Starts on port 3000
```

### Docker (backend)
```bash
# Build (use --platform for Mac M-series chips)
docker build --platform linux/amd64 -t backend-api .

# Run locally
docker run -p 4000:4000 --env-file .env backend-api
```

### ECR Push
```bash
# 1. Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# 2. Build with platform flag (required for Mac M-series)
docker build --platform linux/amd64 -t <repo-name> .

# 3. Tag
docker tag <repo-name>:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/<repo-name>:latest

# 4. Push
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/<repo-name>:latest
```

## Environment Variables

### Backend (.env - NEVER commit sensitive values)
```
PORT=4000
NODE_ENV=production
DB_HOST=<rds-endpoint>
DB_PORT=5432
DB_NAME=<database-name>
DB_USER=<username>
DB_PASSWORD=<password>        # Store in AWS Secrets Manager
JWT_SECRET=<secret>           # Store in AWS Secrets Manager
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://<alb-dns-name>   # or https://api.yourdomain.com
```

### GitHub Secrets (Settings > Secrets > Actions)
```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

## Security Rules

- **NEVER** commit AWS keys, DB passwords, or JWT secrets to git
- **NEVER** allow public access to RDS - keep it in private subnet
- Security group for RDS: allow port 5432 only from ECS security group
- Security group for ECS: allow port 4000 only from ALB security group
- Security group for ALB: allow ports 80/443 from 0.0.0.0/0 (internet)
- Use IAM roles with least-privilege (avoid AdministratorAccess in production)
- Rotate secrets periodically using AWS Secrets Manager rotation

## Deployment Strategies

- **Rolling Update** (used here): Replaces tasks gradually, rolls back if health check fails
- **Blue/Green**: Runs two versions simultaneously, switches traffic (good for A/B testing)
- Fargate auto-scaling: Scale based on CPU utilization threshold (e.g., 70%)
