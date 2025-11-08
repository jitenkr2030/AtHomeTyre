# 🚀 Vercel Deployment Guide for AtHomeTyre

## **Required Environment Variables**

### **1. Database Configuration**
For production deployment, you need to use a cloud database instead of SQLite:

**Option A: PostgreSQL (Recommended)**
```
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
```

**Option B: MySQL**
```
DATABASE_URL="mysql://username:password@host:port/database"
```

**Option C: PlanetScale (MySQL-compatible)**
```
DATABASE_URL="mysql://username:password@host:port/database?sslaccept=strict"
```

### **2. NextAuth Configuration**
```
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-super-secret-key-here"
```

### **3. Generate a Secure Secret**
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## **Deployment Steps**

### **Step 1: Set Up Production Database**

#### **Option 1: Supabase (Free Tier Available)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database connection string
4. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

#### **Option 2: PlanetScale (Free Tier Available)**
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get your connection string
4. Update Prisma schema for PlanetScale

#### **Option 3: Railway (Free Tier Available)**
1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Get your connection string

### **Step 2: Update Prisma Schema for Production**

If using PostgreSQL, update your `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### **Step 3: Set Environment Variables in Vercel**

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:
   - `DATABASE_URL` (your production database URL)
   - `NEXTAUTH_URL` (your Vercel deployment URL)
   - `NEXTAUTH_SECRET` (your generated secret)

### **Step 4: Deploy to Vercel**

#### **Option A: Connect GitHub Repository (Recommended)**
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Next.js app
3. Configure environment variables
4. Deploy

#### **Option B: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### **Step 5: Run Database Migrations**

After deployment, you need to set up your database:

```bash
# Install Prisma CLI globally
npm install -g prisma

# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push

# Or run migrations (recommended for production)
npx prisma migrate deploy

# Seed the database with demo data
npx tsx prisma/seed.ts
```

## **Troubleshooting Common Issues**

### **Issue 1: "Server error" on Vercel**
**Solution**: Check environment variables are correctly set in Vercel dashboard

### **Issue 2: Database connection failed**
**Solution**: 
- Verify `DATABASE_URL` is correct
- Ensure database allows external connections
- Check SSL requirements

### **Issue 3: NextAuth not working**
**Solution**:
- Verify `NEXTAUTH_URL` matches your deployment URL exactly
- Ensure `NEXTAUTH_SECRET` is set and not the default value

### **Issue 4: Build fails**
**Solution**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify TypeScript configuration

## **Production Best Practices**

### **1. Security**
- Use strong, randomly generated secrets
- Enable SSL on database connections
- Use environment variables for all sensitive data

### **2. Performance**
- Enable caching in Vercel
- Use CDN for static assets
- Optimize images and database queries

### **3. Monitoring**
- Set up error monitoring (Sentry, etc.)
- Monitor database performance
- Set up uptime monitoring

### **4. Backup**
- Regular database backups
- Backup environment variables
- Version control for all code

## **Post-Deployment Checklist**

- [ ] Test user registration and login
- [ ] Test all API endpoints
- [ ] Verify database connections
- [ ] Test file uploads (if any)
- [ ] Check email functionality
- [ ] Test payment integration
- [ ] Verify SSL certificate
- [ ] Test mobile responsiveness
- [ ] Check page load speeds
- [ ] Set up monitoring and alerts

## **Getting Help**

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test database connection locally
4. Check browser console for errors
5. Review Next.js and Prisma documentation

---

**Note**: For a production e-commerce application, consider using a managed database service like Supabase, PlanetScale, or Railway for better reliability and scalability.