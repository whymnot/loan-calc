import { useEffect, useState } from 'react';
import type { LoanParams } from '../components/LoanForm';

const DEFAULTS: LoanParams = { amount: 50_000_000, rate: 24, months: 36, type: 'annuity' };

function readUrl(): LoanParams {
  const q = new URLSearchParams(window.location.search);
  const amount = Number(q.get('amount')) || DEFAULTS.amount;
  const rate = Number(q.get('rate')) || DEFAULTS.rate;
  const months = Number(q.get('months')) || DEFAULTS.months;
  const type = q.get('type') === 'differentiated' ? 'differentiated' : 'annuity';
  return { amount, rate, months, type };
}

export function useUrlState() {
  const [params, setParams] = useState<LoanParams>(readUrl);

  useEffect(() => {
    const q = new URLSearchParams({
      amount: String(params.amount),
      rate: String(params.rate),
      months: String(params.months),
      type: params.type,
    });
    window.history.replaceState(null, '', `?${q}`);
  }, [params]);

  return [params, setParams] as const;
}