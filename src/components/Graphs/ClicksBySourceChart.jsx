import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { getLinkById } from "../../services/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClicksBySourceChart = () => {
  const location = useLocation();
  const { linkId } = location.state || {};
  const [linkDetails, setLinkDetails] = useState([]);
  const navigate = useNavigate();
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
  const handleDashboard = ()=>{
    navigate(-1);
  }

  const labels = Object.keys(linkDetails);
  const data = Object.values(linkDetails);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Clicks',
        data: data,
        backgroundColor: '#8db3a6',
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
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border" role="status">
      </div>
    </div>
  }
  return (
    <>
    <button className="button" type="button" onClick={() => handleDashboard()}>Back  <FontAwesomeIcon icon={faArrowLeft} /></button>
    <Bar data={chartData} options={chartData.scales} />
    </>
  );
};

export default ClicksBySourceChart;
