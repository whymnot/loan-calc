import { describe, it, expect } from 'vitest';
import { annuity, differentiated } from './calc';

describe('annuity', () => {
  it('сумма основного долга равна сумме кредита', () => {
    const total = annuity(1_000_000, 24, 12).reduce((s, p) => s + p.principal, 0);
    expect(total).toBeCloseTo(1_000_000, 2);
  });

  it('при ставке 0% платёж = сумма / срок', () => {
    expect(annuity(1200, 0, 12)[0].payment).toBeCloseTo(100, 2);
  });
});

describe('differentiated', () => {
  it('платежи уменьшаются со временем', () => {
    const p = differentiated(1_000_000, 24, 12);
    expect(p[0].payment).toBeGreaterThan(p[11].payment);
  });
});