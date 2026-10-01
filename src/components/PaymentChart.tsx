import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = { principal: number; interest: number };

export function PaymentChart({ principal, interest }: Props) {
  return (
    <div style={{ maxWidth: 300 }}>
      <Doughnut
        data={{
          labels: ['Основной долг', 'Проценты'],
          datasets: [{ data: [principal, interest], backgroundColor: ['#4f46e5', '#f59e0b'] }],
        }}
      />
    </div>
  );
}