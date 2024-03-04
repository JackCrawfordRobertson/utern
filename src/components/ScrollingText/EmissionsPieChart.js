import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, PieController, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(ArcElement, PieController, Tooltip, Legend);

const EmissionsPieChart = ({ currentSection }) => {
  // Define the decrement percentages for each section
  const decrements = [0, 17, 23, 7]; // Starting with 0 for the initial state

  // Calculate the remaining percentage after decrements
  let remainingPercentage = 100;
  for (let i = 0; i <= currentSection && i < decrements.length; i++) {
    remainingPercentage -= decrements[i];
  }

  const data = {
    labels: ['Total UK Emissions', 'Reduced Emissions'],
    datasets: [
      {
        // Removed the 'label' key as per your request
        data: [remainingPercentage, 100 - remainingPercentage], // The first value is the remaining emissions, the second value is the reduced emissions
        backgroundColor: [
          '#3da9de', // Color for remaining emissions
          '#d9f2ff', // Color for reduced emissions
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    animation: {
      animateScale: true,
    },
    plugins: {
      legend: {
        display: false, // Adjust based on your preference
      },
      title: {
        display: true,
        text: 'UK Emissions Reduction',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default EmissionsPieChart;
  