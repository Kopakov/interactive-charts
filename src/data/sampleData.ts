import { HealthScoreData } from '../types/healthScore';

export const sampleData: HealthScoreData = {
  sleep: {
    quality: 85,
    duration: 75
  },
  riskFactors: {
    frequency: 60,
    quantity: 45
  },
  bloodPressure: {
    systolic: 90,
    diastolic: 85
  },
  nutrition: {
    sugaryDrinks: 30,
    vegetables: 95,
    fruits: 85,
    wholeGrains: 75,
    protein: 80,
    dairy: 70
  },
  wellbeing: {
    mentalWellbeing: 90,
    tobaccoUse: 100
  },
  physicalActivity: {
    intensity: 75,
    minutes: 80
  },
  bodyData: {
    bmi: 85,
    waistCircumference: 80
  }
}; 