# SafeLink – Disaster Alert & Rescue Recommendation System

**Live Demo:** [SafeLink Web App](https://dm-frontend-t8vb.onrender.com/)

**Hackathon:** Simhastha Tech Hackathon 2025  
**Registration ID:** TH1044  
**Theme:** Safety, Security, and Surveillance  

---

## Overview
SafeLink is a real-time, community-driven disaster management platform.  
It provides instant **location-based disaster alerts**, allows victims to **seek help with one tap**, and connects them with **nearby volunteers and authorities** for rapid rescue and disaster response.

---

## Problem Statement
During disasters like floods, earthquakes, or massive gatherings, people face:
- Lack of **real-time alerts** in affected areas.
- **No unified system** for reporting and requesting help.
- Delayed response from authorities and volunteers.
- **Limited public participation** in emergency response efforts.

SafeLink addresses these problems by combining **instant alerts, community volunteering, and smart rescue coordination** in a single platform.

---

## Solution
SafeLink provides:
- **Real-Time Disaster Alerts:** Alerts based on user location using APIs and IoT sensors.
- **One-Tap SOS Requests:** Victims can raise distress signals instantly, even in low-network areas.
- **Volunteer Assistance:** Connects victims with nearby volunteers who can provide immediate help.
- **Interactive Map:** Shows safe zones, danger zones, and live tracking.

---

## Project Structure
```

frontend/
│
├── src/
│   ├── app/            # Layout and main routing
│   ├── components/     # Reusable UI and logic components
│   │   └── ui/         # ShadCN UI elements
│   ├── context/        # Context APIs for global state
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Main application pages
│   ├── public/         # Static assets
│   └── styles/         # Global stylesheets
│
└── backend/
├── models/         # MongoDB schemas
├── routes/         # API endpoints
├── controllers/    # Business logic
└── server.js       # Main backend entry point
```

---

## Tech Stack
| Layer          | Technology |
|----------------|------------|
| **Frontend**   | React.js, Context API, Leaflet.js, ShadCN UI |
| **Backend**    | Node.js, Express.js, Socket.io |
| **Database**   | MongoDB |
| **APIs**       | OpenWeatherMap, USGS Earthquake, ReliefWeb, Geolocation |
| **IoT Sensors**| Real-time disaster and environmental data |
| **Hosting**    | Render |

---

## Frontend Dependencies and Usage

| Package                     | Purpose |
|-----------------------------|---------|
| **react** / **react-dom**   | Core React library for UI development |
| **react-router-dom**        | Routing and navigation |
| **tailwindcss** / **@tailwindcss/vite** | Styling and responsive design |
| **leaflet** / **react-leaflet** | Displaying maps and geo-data |
| **leaflet-routing-machine** | Route drawing between two points on map |
| **axios**                   | API requests to backend and external APIs |
| **socket.io-client**        | Real-time communication with backend |
| **react-icons** / **lucide-react** | Icons for UI |
| **framer-motion**           | Smooth animations and transitions |
| **typed.js**                | Typing effect for text |
| **react-hot-toast**         | Notifications and alerts in UI |
| **react-chartjs-2**         | Charts for data visualization |
| **@react-google-maps/api**  | Google Maps integration |
| **@headlessui/react**       | Accessible UI components like modals, dialogs |
| **@radix-ui/react-***       | Advanced UI primitives |
| **country-flag-icons**      | Display country flags dynamically |

---

## Backend Dependencies and Usage

| Package         | Purpose |
|-----------------|---------|
| **express**     | Web framework to handle APIs and routes |
| **mongoose**    | MongoDB object modeling and database connection |
| **socket.io**   | Real-time event-based communication |
| **socket.io-client** | Testing socket features locally |
| **bcryptjs**    | Password hashing for secure authentication |
| **jsonwebtoken**| Generate and verify JWT tokens for auth |
| **dotenv**      | Load environment variables securely |
| **cors**        | Enable cross-origin requests between frontend and backend |
| **body-parser** | Parse incoming request bodies |
| **cookie-parser** | Parse cookies for session handling |
| **axios**       | Fetching external data like APIs |
| **nodemailer**  | Send email alerts or OTPs |
| **serialport**  | Communicate with IoT hardware via serial port |
| **nodemon** *(dev dependency)* | Auto restart backend server during development |

---

## Environment Variables Setup

Create a `.env` file inside **backend/** folder and include the following variables:

```env
# MongoDB Connection
MONGO_URI=your_mongo_db_connection_string
atlas_url=your_mongo_atlas_url

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key

# Server Port
PORT=5000

# SMTP Credentials for Nodemailer
SMTP_PASS=your_google_generated_smtp_password

# Weather and Google Maps API Keys (Frontend Integration)
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
````

> **Note:**
>
> * Replace the placeholder values with actual keys and credentials.
> * `REACT_APP_*` variables are specifically used in the **frontend**.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kshitijrat/DM.git
cd DM
```

---

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run the backend server:

```bash
npm run dev
```

Backend will run at: **[http://localhost:5000](http://localhost:5000)**

---

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend will run at: **[http://localhost:5173](http://localhost:5173)**

---

## Live Deployment

The project is deployed and accessible here:
**[https://dm-frontend-t8vb.onrender.com/](https://dm-frontend-t8vb.onrender.com/)**

---

## Features

* Real-time disaster alerts based on user location.
* Interactive map displaying safe zones and danger zones.
* SOS button for victims to raise emergency help requests.
* Volunteer mode for people willing to assist victims nearby.
* Live visualizations and analytics for disasters and IoT data.

---

## Logic & Workflow

| Stage               | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| **Data Collection** | Data gathered from IoT sensors and external APIs.               |
| **Processing**      | Node.js backend processes and stores data in MongoDB.           |
| **Output**          | Real-time alerts sent via WebSockets.                           |
| **User Side**       | Victims and volunteers interact through the React.js interface. |
| **Admin Side**      | Dashboard for authorities to monitor and respond to incidents.  |

---

## Future Scope

* AI-driven disaster prediction algorithms.
* Offline mode for low or no internet areas.
* Gamified volunteer rewards using blockchain.
* Mobile app version for wider reach.

---

## Team

* **Priya Sharma** – Frontend Developer
* **Kshitij Ratnawat** – Backend Developer

---

## License

This project is licensed under the **MIT License**.

---

## Links

* **Live Project:** [SafeLink Web App](https://dm-frontend-t8vb.onrender.com/)
* **Hackathon Theme:** Safety, Security, and Surveillance
* **GitHub Repository:** [GitHub Repo](https://github.com/kshitijrat/DM.git)

