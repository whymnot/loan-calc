export type LoanParams = {
  amount: number;
  rate: number;
  months: number;
  type: 'annuity' | 'differentiated';
};

type Props = {
  value: LoanParams;
  onChange: (value: LoanParams) => void;
};

export function LoanForm({ value, onChange }: Props) {
  const set = <K extends keyof LoanParams>(key: K, v: LoanParams[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div>
      <label>
        Сумма: {value.amount.toLocaleString('ru-RU')}
        <input
          type="range" min={1_000_000} max={500_000_000} step={1_000_000}
          value={value.amount}
          onChange={(e) => set('amount', Number(e.target.value))}
        />
      </label>

      <label>
        Ставка: {value.rate}%
        <input
          type="range" min={1} max={40} step={0.5}
          value={value.rate}
          onChange={(e) => set('rate', Number(e.target.value))}
        />
      </label>

      <label>
        Срок: {value.months} мес.
        <input
          type="range" min={3} max={120} step={1}
          value={value.months}
          onChange={(e) => set('months', Number(e.target.value))}
        />
      </label>

      <select value={value.type} onChange={(e) => set('type', e.target.value as LoanParams['type'])}>
        <option value="annuity">Аннуитетный</option>
        <option value="differentiated">Дифференцированный</option>
      </select>
    </div>
  );
}