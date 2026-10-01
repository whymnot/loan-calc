export type Payment = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export function annuity(amount: number, yearlyRate: number, months: number): Payment[] {
  const r = yearlyRate / 12 / 100;
  const pay = r === 0 ? amount / months : (amount * r) / (1 - Math.pow(1 + r, -months));
  let balance = amount;
  return Array.from({ length: months }, (_, i) => {
    const interest = balance * r;
    const principal = pay - interest;
    balance -= principal;
    return { month: i + 1, payment: pay, principal, interest, balance: Math.max(balance, 0) };
  });
}

export function differentiated(amount: number, yearlyRate: number, months: number): Payment[] {
  const r = yearlyRate / 12 / 100;
  const principal = amount / months;
  let balance = amount;
  return Array.from({ length: months }, (_, i) => {
    const interest = balance * r;
    balance -= principal;
    return { month: i + 1, payment: principal + interest, principal, interest, balance: Math.max(balance, 0) };
  });
}