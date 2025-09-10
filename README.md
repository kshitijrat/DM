# Safe Link – Disaster Management System

**Team ID:** TH1044  

## 1. Overview
Safe Link is a disaster management platform designed to connect affected individuals, rescue teams, and administrators in real-time during emergencies. The system ensures quick alert broadcasting, safe route navigation, and resource coordination, aiming to minimize disaster impact and save lives.

## 2. Problem & Solution

**Problem Statement:**  
During natural disasters, communication gaps, lack of real-time data, and uncoordinated rescue operations cause delays in providing help to victims, leading to increased loss of life and property.  

**Solution:**  
Safe Link provides a centralized platform for real-time disaster alerts, location tracking, resource availability updates, and direct communication between victims and rescue teams. The system uses real-time data and smart alerts to ensure faster, more coordinated responses.  

## 3. Logic & Workflow

Enabling life-saving action during disasters through instant alerts, smart help connectivity, and community-powered volunteering.

In times of disasters like floods, earthquakes, or severe storms, people often face life-threatening challenges due to:
- Lack of real-time disaster alerts for common users in affected areas  
- No reliable way to seek immediate help  
- No unified system to combine weather, earthquake & global disaster data  
- People don’t get instant help or location-based warnings during emergencies  
- No centralized platform for reporting, alerting, and seeking help  
- Absence of a trusted system to connect victims with nearby volunteers  
- Limited public participation in emergency response efforts  

While many individuals are willing to offer help during crises, there is no platform that allows them to do so effectively — nor one that encourages their participation through recognition or rewards.  
There is a pressing need for a system that can alert users instantly, allow victims to seek help, and empower volunteers to assist on-ground in real time, making disaster response faster, smarter, and community-driven.  

**Workflow Steps:**  

- **Data Collection:**  
  - Real-time incident reports from users  
  - Disaster data from APIs (weather, earthquake, and global alerts)  

- **Processing:**  
  - Backend verifies reports and triggers alerts to nearby users  
  - Calculates safe evacuation routes and resource availability  
  - Matches victims with nearby volunteers for faster on-ground support  

- **Output:**  
  - Instant location-based disaster alerts  
  - Safe routes and evacuation guidance  
  - Volunteer connection details for help delivery  

- **User Side:**  
  - **Seek Help:** Victims can request assistance with one tap, even in low connectivity zones  
  - **Become Volunteer:** Users can register as volunteers and receive requests from nearby victims  

## 4. Tech Stack
- **Programming Language:** JavaScript  
- **Frontend:** React.js, Tailwind CSS, Redux Toolkit  
- **Backend:** Node.js, Express.js, Socket.io (real-time communication)  
- **Database:** MongoDB (Mongoose)  
- **Others:** Axios, Nodemailer, JWT Authentication, dotenv  

## 5. Future Scope
The prototype can be scaled with:  
- AI-based disaster prediction & analytics  
- Mobile app integration for broader reach  
- Multi-language support for inclusivity  
- Integration with IoT sensors for real-time ground data  
- Offline & SMS support for critical alerts  
- Gamified volunteering for better engagement  
