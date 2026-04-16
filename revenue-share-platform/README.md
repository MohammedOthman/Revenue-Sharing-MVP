# Revenue Share Platform - B2B SaaS

A comprehensive B2B SaaS platform for managing revenue sharing initiatives, contracts, partnerships, legal documents, and KPIs.

## Features

### Core Functionality
- **Partner Management**: Onboard and manage referral, affiliate, strategic, and reseller partners
- **Contract Lifecycle**: Create, track, and manage revenue share contracts with customizable terms
- **Revenue Tracking**: Record revenue, calculate partner shares, and process payments
- **KPI Monitoring**: Track performance metrics against targets with visual progress indicators
- **Legal Documents**: Manage agreements, amendments, NDAs, and other legal documentation
- **Dashboard Analytics**: Comprehensive overview with real-time metrics and insights

### Technical Stack

**Backend:**
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- Role-based Access Control

**Frontend:**
- React 18 + Vite
- React Router for navigation
- Axios for API communication
- Modern CSS with responsive design

## Project Structure

```
revenue-share-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth & validation
│   │   ├── utils/          # Helper functions
│   │   ├── config/         # Database config
│   │   └── server.js       # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── context/        # React context (Auth)
│   │   ├── styles/         # CSS stylesheets
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 16+ 
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret
```

4. Start the development server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Partners
- `GET /api/partners` - Get all partners
- `POST /api/partners` - Create partner
- `PUT /api/partners/:id` - Update partner
- `DELETE /api/partners/:id` - Delete partner

### Contracts
- `GET /api/contracts` - Get all contracts
- `POST /api/contracts` - Create contract
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract

### Revenue
- `GET /api/revenue` - Get all revenue records
- `POST /api/revenue` - Create revenue record
- `POST /api/revenue/:id/process-payment` - Process payment

### KPIs
- `GET /api/kpis` - Get all KPIs
- `POST /api/kpis` - Create KPI
- `PATCH /api/kpis/:id/value` - Update KPI value

### Legal Documents
- `GET /api/legal-documents` - Get all documents
- `POST /api/legal-documents` - Create document

### Dashboard
- `GET /api/dashboard/overview` - Get dashboard overview
- `GET /api/dashboard/analytics/trends` - Get revenue trends
- `GET /api/dashboard/analytics/partner-performance` - Get partner performance

## Demo Credentials

```
Email: admin@example.com
Password: password123
```

## License

MIT License
