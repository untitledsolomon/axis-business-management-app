import Sidebar from '../components/sidebar';
import StatCard from '../components/StatCard'; // Assuming StatCard is in components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Required for area charts
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart Options (can be customized further)
const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      font: {
        size: 16,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Sample Data for Charts
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const lineChartData = {
  labels,
  datasets: [
    {
      label: 'Revenue ($)',
      data: labels.map(() => Math.floor(Math.random() * 2000) + 500), // Random data
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true, // Creates area chart effect
      tension: 0.3, // Smoothes the line
    },
  ],
};

const barChartData = {
  labels,
  datasets: [
    {
      label: 'New Orders',
      data: labels.map(() => Math.floor(Math.random() * 50) + 10), // Random data
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};


export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[var(--secondary-bg)] font-inter">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-text)] mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatCard title="Monthly Recurring Revenue" value="$8,120" icon="payments" accentColorClass="border-blue-500" />
          <StatCard title="Active Subscriptions" value="245" icon="subscriptions" accentColorClass="border-purple-500" />
          <StatCard title="Customer Churn Rate" value="3.2%" icon="trending_down" accentColorClass="border-red-500" />
          <StatCard title="Support Tickets (Open)" value="7" icon="support_agent" accentColorClass="border-yellow-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-[var(--primary-bg)] p-4 md:p-6 rounded-lg shadow-md">
            <div style={{ height: '300px' }}>
              <Line 
                options={commonChartOptions}
                data={lineChartData} 
              />
            </div>
          </div>

          <div className="bg-[var(--primary-bg)] p-4 md:p-6 rounded-lg shadow-md">
            <div style={{ height: '300px' }}>
              <Bar 
                options={commonChartOptions}
                data={barChartData} 
              />
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 bg-[var(--primary-bg)] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">Recent Activity Feed</h2>
          <p className="text-[var(--secondary-text)]">Placeholder for a feed showing recent customer signups, orders, etc...</p>
        </div>

      </main>
    </div>
  );
} 