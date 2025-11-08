# 🚀 VERCEL DEPLOYMENT SETUP GUIDE

## **🔧 Required Environment Variables for Vercel**

### **1. Generate Secure Secrets**

Copy these values to your Vercel dashboard:

```bash
# NextAuth Secret (Generated)
NEXTAUTH_SECRET="ZkTGV+IH3B4fSjt4Ojon7ivMiQqDRqomLgjTq/mt45I="

# Database URL (SQLite for now, upgrade to PostgreSQL for production)
DATABASE_URL="file:./db/custom.db"

# NextAuth URL (will be set automatically by Vercel)
NEXTAUTH_URL="${NEXTAUTH_URL}"
```

### **2. Vercel Dashboard Setup**

1. **Go to your Vercel Project**: https://vercel.com/jitenkr2030/AtHomeTyre
2. **Navigate to Settings**: Click on your project → Settings
3. **Environment Variables**: Go to Environment Variables tab
4. **Add the following variables**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXTAUTH_SECRET` | `ZkTGV+IH3B4fSjt4Ojon7ivMiQqDRqomLgjTq/mt45I=` | Production, Preview, Development |
| `DATABASE_URL` | `file:./db/custom.db` | Production, Preview, Development |
| `NEXTAUTH_URL` | `${NEXTAUTH_URL}` | Production, Preview, Development |

### **3. Alternative: Use Vercel CLI**

If you prefer using the Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add NEXTAUTH_SECRET
# When prompted, enter: ZkTGV+IH3B4fSjt4Ojon7ivMiQqDRqomLgjTq/mt45I=

vercel env add DATABASE_URL
# When prompted, enter: file:./db/custom.db

vercel env add NEXTAUTH_URL
# When prompted, enter: ${NEXTAUTH_URL}
```

### **4. Deployment Options**

#### **Option A: Automatic Deployment (Recommended)**
1. Push changes to your GitHub repository
2. Vercel will automatically detect and deploy
3. Environment variables will be applied automatically

#### **Option B: Manual Deployment via Vercel Dashboard**
1. Go to your Vercel project dashboard
2. Click on "Deployments" tab
3. Click "Redeploy" or create a new deployment
4. Select the branch/commit you want to deploy

#### **Option C: Manual Deployment via CLI**
```bash
# Deploy to production
vercel --prod

# Deploy to preview URL
vercel
```

### **5. Production Database Setup (Recommended for Scale)**

For production use, consider upgrading from SQLite to a cloud database:

#### **Option A: Supabase (Free Tier Available)**
```bash
# Update DATABASE_URL in Vercel to:
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
```

#### **Option B: PlanetScale (Free Tier Available)**
```bash
# Update DATABASE_URL in Vercel to:
DATABASE_URL="mysql://username:password@host:port/database?sslaccept=strict"
```

### **6. Post-Deployment Setup**

After deployment, you may need to:

1. **Run Database Migrations** (if using PostgreSQL/MySQL)
```bash
# Connect to your production database and run:
npx prisma migrate deploy
npx tsx prisma/seed.ts
```

2. **Test the Application**
- Visit your deployed URL
- Test user registration and login
- Verify all pages are working

### **7. Troubleshooting Common Issues**

#### **Issue: "NEXTAUTH_SECRET references Secret nextauth_secret, which does not exist"**
**Solution**: Add the secret manually in Vercel dashboard as shown above

#### **Issue: Database connection errors**
**Solution**: Verify DATABASE_URL is correct and database is accessible

#### **Issue: Build fails**
**Solution**: Check build logs in Vercel dashboard for specific errors

### **8. Environment Variables Summary**

Copy this entire block to Vercel:

```
NEXTAUTH_SECRET=ZkTGV+IH3B4fSjt4Ojon7ivMiQqDRqomLgjTq/mt45I=
DATABASE_URL=file:./db/custom.db
NEXTAUTH_URL=${NEXTAUTH_URL}
```

### **9. Security Notes**

- The `NEXTAUTH_SECRET` is generated securely using OpenSSL
- Never commit secrets to your repository
- Use different secrets for different environments if needed
- Rotate secrets periodically for security

### **10. Deployment Checklist**

- [ ] Add `NEXTAUTH_SECRET` to Vercel environment variables
- [ ] Add `DATABASE_URL` to Vercel environment variables
- [ ] Add `NEXTAUTH_URL` to Vercel environment variables
- [ ] Deploy the application
- [ ] Test all functionality
- [ ] Set up production database (optional but recommended)
- [ ] Configure custom domain (if needed)

---

## **🎯 Quick Start**

1. **Copy this secret**: `ZkTGV+IH3B4fSjt4Ojon7ivMiQqDRqomLgjTq/mt45I=`
2. **Go to Vercel**: https://vercel.com/jitenkr2030/AtHomeTyre
3. **Settings → Environment Variables**
4. **Add the three variables** with the values above
5. **Deploy or redeploy** your application

Your AtHomeTyre application should then deploy successfully! 🚀