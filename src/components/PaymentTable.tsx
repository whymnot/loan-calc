import type { Payment } from '../lib/calc';

const fmt = (n: number) => Math.round(n).toLocaleString('ru-RU');

export function PaymentTable({ schedule }: { schedule: Payment[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>№</th><th>Платёж</th><th>Основной долг</th><th>Проценты</th><th>Остаток</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((p) => (
            <tr key={p.month}>
              <td>{p.month}</td>
              <td>{fmt(p.payment)}</td>
              <td>{fmt(p.principal)}</td>
              <td>{fmt(p.interest)}</td>
              <td>{fmt(p.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}