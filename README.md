# SlotSwapper Frontend

A React-based web application for peer-to-peer time slot scheduling and swapping. Built for the ServiceHive technical challenge.

## 🚀 Live Demo

**Frontend URL**: https://slot-swap-frontend.vercel.app

## 📋 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Dashboard**: Personal calendar view with event management
- **Event Management**: Create, update, delete time slots
- **Status Management**: Mark events as BUSY or SWAPPABLE
- **Marketplace**: Browse and discover swappable slots from other users
- **Swap Requests**: Request swaps and manage incoming/outgoing requests
- **Responsive UI**: Clean, modern interface with loading states and error handling

## 🛠️ Tech Stack

- **React** 18.2.0 - UI library
- **React Router** 6.20.1 - Client-side routing
- **Vite** 5.0.8 - Build tool and dev server
- **CSS3** - Custom styling
- **JWT** - Authentication token management

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar component
│   │   └── PrivateRoute.jsx    # Route protection wrapper
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── pages/
│   │   ├── Dashboard.jsx       # User's calendar and events
│   │   ├── Marketplace.jsx     # Browse swappable slots
│   │   ├── Requests.jsx        # Manage swap requests
│   │   ├── Login.jsx           # User login page
│   │   └── Signup.jsx          # User registration page
│   ├── api.js                  # API client for backend communication
│   ├── App.jsx                 # Main app component with routing
│   ├── App.css                 # Global styles
│   └── main.jsx                # Application entry point
├── public/                     # Static assets
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── vercel.json                 # Vercel deployment config
├── .env                        # Local environment variables
├── .env.production             # Production environment variables
└── package.json                # Dependencies and scripts
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/kartikchane/SlotSwap_frontend.git
   cd SlotSwap_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🌐 Environment Variables

### Local Development (`.env`)
```env
VITE_API_URL=http://localhost:3000/api
```

### Production (`.env.production`)
```env
VITE_API_URL=https://slot-swap-backend.vercel.app/api
```

## 🎨 Key Components

### Authentication Flow
- **AuthContext**: Manages user authentication state
- **PrivateRoute**: Protects routes requiring authentication
- **Login/Signup**: User authentication pages

### Main Features
- **Dashboard**: 
  - View all events
  - Create new events
  - Change event status (BUSY ↔ SWAPPABLE)
  - Delete events

- **Marketplace**: 
  - Browse swappable slots from other users
  - Filter out own events
  - Request swaps with modal selection

- **Requests**: 
  - Incoming tab: Accept/reject swap requests
  - Outgoing tab: Track your swap requests
  - Real-time status updates

## 🔌 API Integration

The frontend communicates with the backend via RESTful API:

```javascript
// Example API calls from src/api.js
api.login(email, password)
api.getMyEvents()
api.createEvent(eventData)
api.updateEvent(id, { status: 'SWAPPABLE' })
api.getSwappableSlots()
api.requestSwap(mySlotId, theirSlotId)
api.respondToSwap(requestId, accept)
```

## 🚢 Deployment (Vercel)

### Automatic Deployment

Connected to GitHub for automatic deployments:
- **Push to main branch** → Auto-deploy to production

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🎯 User Flow

1. **Sign Up / Login** → Create account or authenticate
2. **Dashboard** → View your calendar, create events
3. **Make Swappable** → Mark events available for swapping
4. **Marketplace** → Browse others' swappable slots
5. **Request Swap** → Choose your slot to offer in exchange
6. **Requests Page** → Accept/reject incoming requests
7. **Complete Swap** → Event ownership exchanges automatically

## 🐛 Troubleshooting

### Common Issues

**Issue**: API calls failing
- **Solution**: Check `.env` file has correct `VITE_API_URL`
- Verify backend is running

**Issue**: Authentication errors
- **Solution**: Clear localStorage and login again
- Check JWT token validity

**Issue**: Build errors
- **Solution**: Delete `node_modules` and reinstall
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

## 📄 License

This project is part of the ServiceHive technical challenge.

## 🤝 Contributing

This is a technical challenge project. For questions or issues, contact the repository owner.

## 📧 Contact

**Developer**: Kartik Chanekar
**GitHub**: [@kartikchane](https://github.com/kartikchane)
**Repository**: [SlotSwap_frontend](https://github.com/kartikchane/SlotSwap_frontend)

---

**Backend Repository**: [SlotSwap_Backend](https://github.com/kartikchane/SlotSwap_Backend)
