export interface HealthScoreData {
  sleep: {
    quality: number;
    duration: number;
  };
  riskFactors: {
    frequency: number;
    quantity: number;
  };
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  nutrition: {
    sugaryDrinks: number;
    vegetables: number;
    fruits: number;
    wholeGrains: number;
    protein: number;
    dairy: number;
  };
  wellbeing: {
    mentalWellbeing: number;
    tobaccoUse: number;
  };
  physicalActivity: {
    intensity: number;
    minutes: number;
  };
  bodyData: {
    bmi: number;
    waistCircumference: number;
  };
}

export interface Subcategory {
  name: string;
  score: number;
  color: string;
}

export interface Category {
  name: string;
  score: number;
  color: string;
  subcategories: Subcategory[];
}

export interface HealthScoreWheelProps {
  data: HealthScoreData;
  width?: number;
  height?: number;
} 