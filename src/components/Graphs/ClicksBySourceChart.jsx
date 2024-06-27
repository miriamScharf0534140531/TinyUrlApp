import React, { useEffect, useState } from 'react';
import { getLinkById } from "../../services/api";
import { useLocation } from 'react-router-dom';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClicksBySourceChart = () => {
  const location = useLocation();
  const { linkId } = location.state || {};
  const [linkDetails, setLinkDetails] = useState([]);

  useEffect(() => {
    const fetchLinkInfoDetails = async () => {
      if (linkId) {
        try {
          const data = await getLinkById(linkId);
          setLinkDetails(data);
        } catch (error) {
          console.error('Error while fetching user details:', error);
        }
      }
    };
    fetchLinkInfoDetails();
  }, [linkId]);
  const labels = Object.keys(linkDetails);
  const data = Object.values(linkDetails);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Clicks',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
    scales: {
      y: {
        ticks: {
          stepSize: 1, // רק מספרים שלמים
        },
      },
    },
  };


  if (!linkDetails) {
    return <div>Loading...</div>; // הצגת הודעה כשהנתונים נטענים
  }
  return (
<Bar data={chartData} options={chartData.scales}/>
  );
};

export default ClicksBySourceChart;
