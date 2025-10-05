export const sampleData = {
  patients: [
    {
      id: 1,
      name: "John Smith",
      age: 65,
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-15",
      vitals: [
        {
          heartRate: "85 bpm",
          bloodPressure: "140/90",
          temperature: "98.6°F",
          oxygen: "96%",
          vision: "20/20"
        }
      ],
      medicalHistory: [
        { condition: "Hypertension", date: "2020-03-15" },
        { condition: "Type 2 Diabetes", date: "2019-08-22" },
        { condition: "High Cholesterol", date: "2021-01-10" }
      ],
      medications: [
        { name: "Metformin", dosage: "500mg twice daily" },
        { name: "Lisinopril", dosage: "10mg once daily" },
        { name: "Atorvastatin", dosage: "20mg once daily" }
      ]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 42,
      gender: "Female",
      phone: "+1 (555) 234-5678",
      email: "sarah.johnson@email.com",
      lastVisit: "2024-01-20",
      nextAppointment: "2024-02-20",
      vitals: [
        {
          heartRate: "72 bpm",
          bloodPressure: "120/80",
          temperature: "98.4°F",
          oxygen: "98%",
          vision: "20/25"
        }
      ],
      medicalHistory: [
        { condition: "Migraine", date: "2018-05-12" },
        { condition: "Anxiety", date: "2020-09-08" }
      ],
      medications: [
        { name: "Sumatriptan", dosage: "50mg as needed" },
        { name: "Sertraline", dosage: "100mg once daily" }
      ]
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 58,
      gender: "Male",
      phone: "+1 (555) 345-6789",
      email: "michael.brown@email.com",
      lastVisit: "2024-01-18",
      nextAppointment: "2024-02-18",
      vitals: [
        {
          heartRate: "95 bpm",
          bloodPressure: "150/95",
          temperature: "99.1°F",
          oxygen: "94%",
          vision: "20/30"
        }
      ],
      medicalHistory: [
        { condition: "Coronary Artery Disease", date: "2022-06-15" },
        { condition: "Hypertension", date: "2020-02-10" },
        { condition: "Sleep Apnea", date: "2021-11-03" }
      ],
      medications: [
        { name: "Amlodipine", dosage: "5mg once daily" },
        { name: "Metoprolol", dosage: "50mg twice daily" },
        { name: "CPAP Therapy", dosage: "Nightly" }
      ]
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 35,
      gender: "Female",
      phone: "+1 (555) 456-7890",
      email: "emily.davis@email.com",
      lastVisit: "2024-01-22",
      nextAppointment: "2024-02-22",
      vitals: [
        {
          heartRate: "68 bpm",
          bloodPressure: "110/70",
          temperature: "98.2°F",
          oxygen: "99%",
          vision: "20/20"
        }
      ],
      medicalHistory: [
        { condition: "Pregnancy", date: "2023-12-01" },
        { condition: "Iron Deficiency", date: "2023-10-15" }
      ],
      medications: [
        { name: "Prenatal Vitamins", dosage: "Once daily" },
        { name: "Iron Supplement", dosage: "65mg once daily" }
      ]
    },
    {
      id: 5,
      name: "Robert Wilson",
      age: 71,
      gender: "Male",
      phone: "+1 (555) 567-8901",
      email: "robert.wilson@email.com",
      lastVisit: "2024-01-25",
      nextAppointment: "2024-02-25",
      vitals: [
        {
          heartRate: "88 bpm",
          bloodPressure: "135/85",
          temperature: "98.8°F",
          oxygen: "95%",
          vision: "20/40"
        }
      ],
      medicalHistory: [
        { condition: "Alzheimer's Disease", date: "2021-04-20" },
        { condition: "Hypertension", date: "2019-07-12" },
        { condition: "Osteoarthritis", date: "2020-11-08" }
      ],
      medications: [
        { name: "Donepezil", dosage: "10mg once daily" },
        { name: "Hydrochlorothiazide", dosage: "25mg once daily" },
        { name: "Acetaminophen", dosage: "650mg as needed" }
      ]
    }
  ],
  
  appointments: [
    {
      id: 1,
      patientId: 1,
      patientName: "John Smith",
      date: "2024-02-15",
      time: "09:00",
      status: "pending",
      type: "Follow-up"
    },
    {
      id: 2,
      patientId: 2,
      patientName: "Sarah Johnson",
      date: "2024-02-20",
      time: "10:30",
      status: "pending",
      type: "Consultation"
    },
    {
      id: 3,
      patientId: 3,
      patientName: "Michael Brown",
      date: "2024-02-18",
      time: "14:00",
      status: "pending",
      type: "Cardiac Checkup"
    },
    {
      id: 4,
      patientId: 4,
      patientName: "Emily Davis",
      date: "2024-02-22",
      time: "11:15",
      status: "pending",
      type: "Prenatal Visit"
    },
    {
      id: 5,
      patientId: 5,
      patientName: "Robert Wilson",
      date: "2024-02-25",
      time: "15:30",
      status: "pending",
      type: "Memory Assessment"
    },
    {
      id: 6,
      patientId: 1,
      patientName: "John Smith",
      date: "2024-01-15",
      time: "09:00",
      status: "completed",
      type: "Follow-up"
    },
    {
      id: 7,
      patientId: 2,
      patientName: "Sarah Johnson",
      date: "2024-01-20",
      time: "10:30",
      status: "completed",
      type: "Consultation"
    },
    {
      id: 8,
      patientId: 3,
      patientName: "Michael Brown",
      date: "2024-01-18",
      time: "14:00",
      status: "completed",
      type: "Cardiac Checkup"
    },
    {
      id: 9,
      patientId: 4,
      patientName: "Emily Davis",
      date: "2024-01-22",
      time: "11:15",
      status: "completed",
      type: "Prenatal Visit"
    },
    {
      id: 10,
      patientId: 5,
      patientName: "Robert Wilson",
      date: "2024-01-25",
      time: "15:30",
      status: "completed",
      type: "Memory Assessment"
    }
  ],

  aiInsights: [
    {
      id: 1,
      type: "risk",
      priority: "High",
      title: "Cardiovascular Risk Alert",
      summary: "Patient Michael Brown shows elevated cardiovascular risk factors requiring immediate attention.",
      metrics: [
        { label: "Blood Pressure", value: "150/95", change: 8 },
        { label: "Heart Rate", value: "95 bpm", change: 12 },
        { label: "Risk Score", value: "High", change: 15 }
      ],
      recommendations: [
        "Schedule immediate cardiology consultation",
        "Consider medication adjustment for blood pressure",
        "Implement lifestyle modifications",
        "Monitor vitals more frequently"
      ],
      timeline: [
        { date: "2024-01-18", event: "Elevated blood pressure detected" },
        { date: "2024-01-20", event: "AI risk assessment triggered" },
        { date: "2024-01-22", event: "Follow-up appointment scheduled" }
      ]
    },
    {
      id: 2,
      type: "improvement",
      priority: "Medium",
      title: "Diabetes Management Progress",
      summary: "Patient John Smith shows significant improvement in diabetes management over the past 3 months.",
      metrics: [
        { label: "HbA1c", value: "6.8%", change: -12 },
        { label: "Blood Glucose", value: "125 mg/dL", change: -18 },
        { label: "Weight Loss", value: "8 lbs", change: -5 }
      ],
      recommendations: [
        "Continue current medication regimen",
        "Maintain dietary modifications",
        "Increase physical activity",
        "Schedule quarterly HbA1c testing"
      ],
      timeline: [
        { date: "2023-10-15", event: "HbA1c: 7.8%" },
        { date: "2023-12-15", event: "HbA1c: 7.2%" },
        { date: "2024-01-15", event: "HbA1c: 6.8%" }
      ]
    },
    {
      id: 3,
      type: "recommendation",
      priority: "Medium",
      title: "Prenatal Care Optimization",
      summary: "AI analysis suggests optimizing prenatal care for Emily Davis based on current health trends.",
      metrics: [
        { label: "Iron Levels", value: "Normal", change: 25 },
        { label: "Weight Gain", value: "12 lbs", change: 8 },
        { label: "Blood Pressure", value: "110/70", change: -2 }
      ],
      recommendations: [
        "Continue iron supplementation",
        "Increase folic acid intake",
        "Schedule additional ultrasound",
        "Monitor blood pressure weekly"
      ],
      timeline: [
        { date: "2023-12-01", event: "Pregnancy confirmed" },
        { date: "2023-12-15", event: "First prenatal visit" },
        { date: "2024-01-22", event: "Second trimester checkup" }
      ]
    },
    {
      id: 4,
      type: "monitoring",
      priority: "Low",
      title: "Cognitive Health Monitoring",
      summary: "Robert Wilson's cognitive assessment shows stable condition with recommended monitoring intervals.",
      metrics: [
        { label: "MMSE Score", value: "24/30", change: 0 },
        { label: "Memory Function", value: "Stable", change: 2 },
        { label: "Daily Activities", value: "Independent", change: 0 }
      ],
      recommendations: [
        "Continue current medication",
        "Maintain cognitive exercises",
        "Schedule 6-month follow-up",
        "Monitor for behavioral changes"
      ],
      timeline: [
        { date: "2023-07-25", event: "MMSE: 23/30" },
        { date: "2023-10-25", event: "MMSE: 24/30" },
        { date: "2024-01-25", event: "MMSE: 24/30" }
      ]
    },
    {
      id: 5,
      type: "alert",
      priority: "High",
      title: "Medication Interaction Alert",
      summary: "Potential drug interaction detected for Sarah Johnson's current medication regimen.",
      metrics: [
        { label: "Interaction Risk", value: "Moderate", change: 0 },
        { label: "Severity", value: "Level 2", change: 0 },
        { label: "Affected Drugs", value: "2", change: 0 }
      ],
      recommendations: [
        "Review medication timing",
        "Consider alternative medications",
        "Monitor for side effects",
        "Schedule pharmacist consultation"
      ],
      timeline: [
        { date: "2024-01-20", event: "New medication prescribed" },
        { date: "2024-01-21", event: "AI interaction check" },
        { date: "2024-01-22", event: "Alert generated" }
      ]
    }
  ]
};
