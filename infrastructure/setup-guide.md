# AWS Infrastructure Setup Guide (Step-by-Step)

Replace `<ACCOUNT_ID>` with your AWS account ID and `<REGION>` with your chosen region (e.g., `us-east-1`).

---

## Phase 1: Prerequisites

### 1.1 Install Required Tools
```bash
# AWS CLI
# Download from: https://aws.amazon.com/cli/

# Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop/

# Node.js 20+
# Download from: https://nodejs.org/

# Verify installations
aws --version
docker --version
node --version
```

### 1.2 Configure AWS CLI
```bash
aws configure
# Enter: AWS Access Key ID
# Enter: AWS Secret Access Key
# Enter: Default region (e.g., us-east-1)
# Enter: Default output format (json)
```

---

## Phase 2: VPC & Networking

### 2.1 Create VPC
1. Go to **AWS Console > VPC > Your VPCs > Create VPC**
2. Name: `my-app-vpc`
3. IPv4 CIDR: `10.0.0.0/16` (gives ~65,000 IPs)
4. Click **Create VPC**

### 2.2 Create Subnets

**Public Subnet 1:**
- VPC: `my-app-vpc`
- Name: `public-subnet-1a`
- Availability Zone: `us-east-1a`
- CIDR: `10.0.1.0/24`

**Public Subnet 2:**
- Name: `public-subnet-1b`
- Availability Zone: `us-east-1b`
- CIDR: `10.0.2.0/24`

**Private Subnet 1:**
- Name: `private-subnet-1a`
- Availability Zone: `us-east-1a`
- CIDR: `10.0.3.0/24`

**Private Subnet 2:**
- Name: `private-subnet-1b`
- Availability Zone: `us-east-1b`
- CIDR: `10.0.4.0/24`

> You need at least 2 subnets in different AZs for ALB and RDS.

### 2.3 Create Internet Gateway
1. Go to **VPC > Internet Gateways > Create**
2. Name: `my-app-igw`
3. **Attach** it to `my-app-vpc`

### 2.4 Create NAT Gateway
1. Go to **VPC > NAT Gateways > Create**
2. Name: `my-app-nat`
3. Subnet: `public-subnet-1a` (NAT sits in a public subnet)
4. Allocate an Elastic IP

### 2.5 Create Route Tables

**Public Route Table:**
1. Create route table: `public-rt`
2. Associate: `public-subnet-1a`, `public-subnet-1b`
3. Add route: `0.0.0.0/0` -> Internet Gateway (`my-app-igw`)

**Private Route Table:**
1. Create route table: `private-rt`
2. Associate: `private-subnet-1a`, `private-subnet-1b`
3. Add route: `0.0.0.0/0` -> NAT Gateway (`my-app-nat`)

---

## Phase 3: Security Groups

### 3.1 ALB Security Group (`alb-sg`)
- **Inbound:** Port 80 (HTTP) from `0.0.0.0/0`, Port 443 (HTTPS) from `0.0.0.0/0`
- **Outbound:** All traffic

### 3.2 ECS Security Group (`ecs-sg`)
- **Inbound:** Port 4000 from `alb-sg` only
- **Outbound:** All traffic

### 3.3 RDS Security Group (`rds-sg`)
- **Inbound:** Port 5432 from `ecs-sg` only
- **Outbound:** All traffic

---

## Phase 4: Database (RDS)

1. Go to **RDS > Create Database**
2. Engine: PostgreSQL (or Aurora PostgreSQL)
3. Template: Free tier (for learning)
4. DB instance identifier: `my-app-db`
5. Master username: `postgres`
6. Master password: (choose a strong password)
7. VPC: `my-app-vpc`
8. Subnet group: Create new with `private-subnet-1a` + `private-subnet-1b`
9. Public access: **No**
10. Security group: `rds-sg`
11. Initial database name: `myappdb`

After creation, note the **Endpoint** (e.g., `my-app-db.xxxxx.us-east-1.rds.amazonaws.com`).

### Create the products table
Connect via a bastion host or temporarily from ECS task:
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Phase 5: IAM Roles

### 5.1 ECS Task Execution Role
1. Go to **IAM > Roles > Create Role**
2. Trusted entity: **ECS** > **Elastic Container Service Task**
3. Policies: `AmazonECSTaskExecutionRolePolicy`, `SecretsManagerReadWrite`
4. Name: `ecsTaskExecutionRole`

### 5.2 IAM User (for CI/CD)
1. Go to **IAM > Users > Create User**
2. Name: `ecs-deploy-user`
3. Attach policies: `AmazonECS_FullAccess`, `AmazonEC2ContainerRegistryFullAccess`, `AmazonEC2FullAccess`
4. Create access key (CLI use case)
5. Save the Access Key ID and Secret Access Key

---

## Phase 6: ECR (Container Registry)

```bash
# Create repository
aws ecr create-repository --repository-name my-app-backend --region us-east-1

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build image (add --platform for Mac M-series)
cd backend
docker build --platform linux/amd64 -t my-app-backend .

# Tag
docker tag my-app-backend:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/my-app-backend:latest

# Push
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/my-app-backend:latest
```

---

## Phase 7: AWS Secrets Manager

1. Go to **Secrets Manager > Store a new secret**
2. Secret type: **Other type of secret**
3. Add key/value pairs:
   - `DB_HOST`: (your RDS endpoint)
   - `DB_PORT`: `5432`
   - `DB_NAME`: `myappdb`
   - `DB_USER`: `postgres`
   - `DB_PASSWORD`: (your password)
   - `JWT_SECRET`: (any random string)
4. Secret name: `prod/my-app-backend`
5. Note the full ARN for use in task-definition.json

---

## Phase 8: ECS Cluster & Service

### 8.1 Create Cluster
1. Go to **ECS > Clusters > Create Cluster**
2. Name: `my-app-cluster`
3. Infrastructure: **AWS Fargate** (NOT EC2)

### 8.2 Create Task Definition
1. Go to **ECS > Task Definitions > Create**
2. Family name: `ecs-backend-api`
3. Launch type: Fargate
4. OS: Linux/X86_64
5. CPU: 0.25 vCPU, Memory: 0.5 GB
6. Task role: `ecsTaskExecutionRole`
7. Container:
   - Name: `backend-api-container`
   - Image: `<ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/my-app-backend:latest`
   - Port: 4000
   - Health check: `CMD-SHELL, curl -f http://localhost:4000/api/v1/health || exit 1`
8. Or import from your `task-definition.json` file

### 8.3 Create Service
1. Enter your cluster > **Create Service**
2. Task definition: `ecs-backend-api` (latest revision)
3. Service name: `backend-api-service`
4. Desired tasks: 1
5. VPC: `my-app-vpc`
6. Subnets: private subnets
7. Security group: `ecs-sg`
8. Load balancer: **Create new ALB**
   - Name: `my-app-alb`
   - Listener: Port 80
   - Target group: create new, port 4000
9. Auto-scaling:
   - Min: 1, Max: 10
   - Scale at 70% CPU utilization

---

## Phase 9: Frontend Deployment (Amplify)

1. Go to **AWS Amplify > Create new app**
2. Connect to GitHub repository (frontend repo)
3. Branch: `main`
4. Framework: Next.js (auto-detected)
5. Build command: `npm run build`
6. Deploy

### Add Environment Variable
1. Go to your Amplify app > **Environment variables**
2. Add: `NEXT_PUBLIC_API_URL` = `http://<ALB_DNS_NAME>` (from your load balancer)
3. Redeploy

---

## Phase 10: GitHub Actions CI/CD

### 10.1 Add Secrets to GitHub
Go to your **backend repo > Settings > Secrets and variables > Actions**:
- `AWS_ACCESS_KEY_ID`: (from IAM user)
- `AWS_SECRET_ACCESS_KEY`: (from IAM user)

### 10.2 Update deploy.yml
Edit `.github/workflows/deploy.yml` and fill in:
- `ECR_REPOSITORY`: your ECR repo name
- `ECS_CLUSTER`: your cluster name
- `ECS_SERVICE`: your service name
- `CONTAINER_NAME`: `backend-api-container`

### 10.3 Deploy
```bash
git add .
git commit -m "feat: initial deployment"
git push origin main
```
GitHub Actions will automatically build, push to ECR, and deploy to ECS.

---

## Phase 11: Cleanup (IMPORTANT - Avoid Charges!)

Delete in this order:
1. ECS Service (set desired count to 0 first, then delete)
2. ECS Cluster
3. ALB + Target Groups
4. NAT Gateway (costs ~$0.045/hr)
5. Elastic IP
6. RDS Database
7. ECR Repository
8. Secrets Manager secrets
9. Amplify app
10. IAM user + roles (optional)
11. VPC (subnets, route tables, gateways)
