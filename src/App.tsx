import { PaymentTable } from './components/PaymentTable';
import { PaymentChart } from './components/PaymentChart';
import { LoanForm } from './components/LoanForm';
import { annuity, differentiated } from './lib/calc';
import { useUrlState } from './hooks/useUrlState';

export default function App() {
  const [params, setParams] = useUrlState();({
    amount: 50_000_000, rate: 24, months: 36, type: 'annuity',
  });

  const calc = params.type === 'annuity' ? annuity : differentiated;
  const schedule = calc(params.amount, params.rate, params.months);
  const total = schedule.reduce((s, p) => s + p.payment, 0);

  return (
    <main>
      <h1>Кредитный калькулятор</h1>
      <LoanForm value={params} onChange={setParams} />
      <p>Первый платёж: {Math.round(schedule[0].payment).toLocaleString('ru-RU')}</p>
      <p>Переплата: {Math.round(total - params.amount).toLocaleString('ru-RU')}</p>
      <PaymentChart principal={params.amount} interest={total - params.amount} />
      <PaymentTable schedule={schedule} />
    </main>
  );
}