<h1 align="center">Maan ki Umeed &mdash; Website Development</h1>

<p align="center">
  <em>A modern full-stack web framework focused on modularity, performance, and simplicity.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-Fullstack-000?logo=nextdotjs&style=flat-square" />
  <img src="https://img.shields.io/badge/MongoDB-Database-4EA94B?logo=mongodb&style=flat-square" />
  <img src="https://img.shields.io/badge/Clerk-Authentication-3b82f6?logo=clerk&style=flat-square" />
  <img src="https://img.shields.io/badge/Vercel-Auto--Deploy-000?logo=vercel&style=flat-square" />
  <img src="https://img.shields.io/badge/Web3Forms-Contact%20Forms-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/Responsive-Mobile--First-10b981?style=flat-square" />
</p>

<p align="center">
  <strong>🚀 Open for Contributions</strong><br/>
  Help us grow this project by submitting issues, suggestions, or pull requests!
</p>


## Overview
umeed_web is a full-stack web application framework that emphasizes modularity, security, and maintainability. It integrates Next.js, MongoDB, and Clerk authentication to deliver a seamless development experience, supported by a comprehensive component library and robust API endpoints.

## Features

- **Next.js**: Server-Side Rendering, Static Site Generation, and API routes for high performance  
- **Modular Architecture**: Clean component/page separation  
- **Responsive Design**: Mobile-first cross-device experience  
- **MongoDB**: Primary database for content and users  
- **Clerk Auth**: Secure admin authentication  
- **Vercel**: Auto-deploy on `main` push

## Project Setup
Follow these steps to set up the project locally:

#### Prerequisites:
- **[Node.js](https://nodejs.org/) v16+** - JavaScript runtime  
- **[MongoDB](https://www.mongodb.com/)** - Database (local or Atlas)  
- **[Clerk Account](https://clerk.dev/)** - Authentication provider (create project for API keys)
- **[Web3Forms Access Key](https://web3forms.com/)** - For handling contact forms (create a free account to get your access key)

#### Configuration:

Create a `.env` file in the project root with:
```env
# MongoDB connection URI (local or Atlas),I have used Atlas in this progect.
MONGO_URI_TEST=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<defaultdbname>

# Clerk authentication keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin

# Web3form Access Key
NEXT_PUBLIC_WEB3FORM_ACCESS_KEY=YOUR_ACCESS_KEY

# Admin and organization info
ADMIN_EMAIL=admin1@example.com,admin2@example.com # You can specify multiple admin email addresses.
NEXT_PUBLIC_ORG_EMAIL=org@example.com
NEXT_PUBLIC_ORG_PHONE_NO=+91-XXXXX-XXXXX
```
#### Installation:
```bash
# Clone repository
git clone https://github.com/uddiGitHub/umeed_web.git
cd umeed_web

# Install dependencies
npm install

# Start development server
npm run dev
```
Access application at:
   [http://localhost:3000](https://localhost:3000)

#### Admin Portal Access
1. Visit `/admin` route
2. Sign in with registered admin email
3. Use dashboard to manage content


<hr style="border:0.5px solid"/>

### Contributing
Contributions are welcome!
```markdown
## Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/description`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/description`)
5. Open pull request
```

