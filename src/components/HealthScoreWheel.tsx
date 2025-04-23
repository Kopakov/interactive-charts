import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { HealthScoreData, HealthScoreWheelProps } from '../types/healthScore.ts';
import { calculateOverallScore, transformDataToCategories } from '../utils/healthScoreUtils.ts';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels as Plugin);

const NEUTRAL_COLORS = [
  '#E3E3E3', // Sleep
  '#D9D9D9', // Risk Factors
  '#CFCFCF', // Blood Pressure
  '#C5C5C5', // Nutrition
  '#BBBBBB', // Wellbeing
  '#B1B1B1', // Physical Activity
  '#A7A7A7', // Body Data
];

interface CustomChartData extends ChartData<'doughnut'> {
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    weight?: number;
    label?: string;
  }[];
}

const HealthScoreWheel: React.FC<HealthScoreWheelProps> = ({ data, width = 800, height = 800 }) => {
  const chartRef = useRef<ChartJS<'doughnut'>>(null);
  const categories = transformDataToCategories(data);
  const overallScore = calculateOverallScore(data);

  const outerRingData = categories.map(category => category.score);
  const innerRingData = categories.flatMap(category => category.subcategories.map(sub => sub.score));

  const labels = [
    ...categories.map(category => category.name),
    ...categories.flatMap(category => category.subcategories.map(sub => sub.name))
  ];

  const chartData: CustomChartData = {
    labels,
    datasets: [
      {
        data: innerRingData,
        backgroundColor: categories.flatMap(category =>
          category.subcategories.map(sub => sub.color || '#2196F3')
        ),
        borderColor: categories.flatMap(category =>
          category.subcategories.map(() => '#FFFFFF')
        ),
        borderWidth: 2,
        weight: 1,
        label: 'Subcategories'
      },
      {
        data: outerRingData,
        backgroundColor: NEUTRAL_COLORS.slice(0, categories.length),
        borderColor: categories.map(() => '#FFFFFF'),
        borderWidth: 2,
        weight: 0.5,
        label: 'Categories'
      }
    ]
  };

  const chartOptions: ChartOptions<'doughnut'> & {
    plugins: {
      datalabels: {
        color: string;
        font: {
          size: number;
          weight: string;
        };
        formatter: (value: number, context: any) => string;
        align: (context: any) => string;
        anchor: (context: any) => string;
        offset: number;
        display: boolean;
      };
    };
  } = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    layout: {
      padding: 40
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed;
            return `${datasetLabel}: ${value}%`;
          }
        }
      },
      datalabels: {
        color: '#000000',
        font: {
          size: 11,
          weight: 'bold'
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels?.[context.dataIndex] || '';
          return `${label}\n${value}%`;
        },
        align: (context) => {
          return context.datasetIndex === 0 ? 'end' : 'start';
        },
        anchor: (context) => {
          return context.datasetIndex === 0 ? 'end' : 'start';
        },
        offset: 8,
        display: true
      }
    }
  };

  // Add center text with overall score
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const centerX = chart.chartArea.left + chart.chartArea.width / 2;
      const centerY = chart.chartArea.top + chart.chartArea.height / 2;

      ctx.save();
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${overallScore}%`, centerX, centerY);
      ctx.font = '16px Arial';
      ctx.fillText('Health Score', centerX, centerY + 25);
      ctx.restore();
    }
  });

  return (
    <div className="health-score-wheel">
      <div className="text-center mb-4">
        <h2>Your Health Score: {overallScore}%</h2>
      </div>
      <div className="chart-container" style={{ height, width }}>
        <Doughnut
          ref={chartRef}
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default HealthScoreWheel; 