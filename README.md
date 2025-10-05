# Medical Dashboard

A comprehensive doctor-side medical dashboard built with React that displays patient details, AI insights, and appointment statistics.

## Features

### 📊 Dashboard Overview
- **Appointment Statistics**: Real-time display of total, completed, pending, and today's appointments
- **Patient Management**: Detailed patient cards with vital signs, medical history, and medications
- **AI Insights**: Intelligent analytics and recommendations from patient-side AI data
- **Responsive Design**: Modern, mobile-friendly interface

### 🏥 Patient Management
- Patient cards showing vital signs with color-coded warnings
- Detailed patient profiles with medical history and medications
- Quick access to patient information and next appointments
- Visual indicators for patients requiring attention

### 🤖 AI Insights & Analytics
- Risk analysis and trend monitoring
- Personalized recommendations for each patient
- Timeline tracking of patient progress
- Priority-based alert system
- Drug interaction warnings

### 📈 Statistics Widgets
- Total appointments tracking
- Completion rate monitoring
- Pending appointments overview
- Today's schedule summary

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd /Users/animankhandelwal/Desktop/frontend_medi
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js          # Main dashboard component
│   ├── Header.js             # Top navigation header
│   ├── Sidebar.js            # Left navigation sidebar
│   ├── StatsWidgets.js       # Appointment statistics
│   ├── PatientWidgets.js     # Patient management cards
│   ├── AIInsights.js         # AI analytics and insights
│   └── *.css                 # Component-specific styles
├── data/
│   └── sampleData.js         # Sample data for demonstration
├── App.js                    # Main application component
├── App.css                   # Global application styles
├── index.js                  # Application entry point
└── index.css                 # Global styles
```

## Key Components

### StatsWidgets
Displays appointment statistics with:
- Total appointments count
- Completed appointments with completion rate
- Pending appointments
- Today's appointments

### PatientWidgets
Shows patient information including:
- Vital signs with warning indicators
- Medical history and current medications
- Last visit and next appointment dates
- Detailed patient profiles on click

### AIInsights
Provides intelligent analytics:
- Risk assessment and alerts
- Improvement tracking
- Personalized recommendations
- Patient timeline analysis
- Drug interaction warnings

## Sample Data

The application includes comprehensive sample data featuring:
- 5 patients with detailed medical profiles
- 10 appointments (5 pending, 5 completed)
- 5 AI insights covering different scenarios (risk, improvement, recommendations, monitoring, alerts)

## Customization

### Adding New Patients
Edit `src/data/sampleData.js` to add new patient records with the following structure:
```javascript
{
  id: number,
  name: string,
  age: number,
  gender: string,
  phone: string,
  email: string,
  lastVisit: string,
  nextAppointment: string,
  vitals: [{ heartRate, bloodPressure, temperature, oxygen, vision }],
  medicalHistory: [{ condition, date }],
  medications: [{ name, dosage }]
}
```

### Adding AI Insights
Add new insights to the `aiInsights` array in `sampleData.js`:
```javascript
{
  id: number,
  type: "risk" | "improvement" | "recommendation" | "monitoring" | "alert",
  priority: "High" | "Medium" | "Low",
  title: string,
  summary: string,
  metrics: [{ label, value, change }],
  recommendations: [string],
  timeline: [{ date, event }]
}
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Lucide React**: Beautiful, customizable icons
- **CSS3**: Modern styling with flexbox and grid
- **Responsive Design**: Mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Real-time data integration
- Patient search and filtering
- Export functionality for reports
- Dark mode support
- Advanced analytics charts
- Integration with EHR systems

## License

This project is for demonstration purposes. Please ensure compliance with healthcare data regulations (HIPAA, etc.) when handling real patient data.
