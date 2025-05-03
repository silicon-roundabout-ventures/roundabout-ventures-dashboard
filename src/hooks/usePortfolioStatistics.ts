import { useMemo } from 'react';
import { PortfolioCompany, FundStatistics } from '../config/airtableConfig';

/**
 * Hook to calculate fund statistics from portfolio companies
 */
export function usePortfolioStatistics(
  companies: PortfolioCompany[]
): FundStatistics {
  return useMemo<FundStatistics>(() => {
    if (!companies || companies.length === 0) {
      return {
        totalInvestments: 0,
        totalCompanies: 0,
        averageInvestment: 0,
        medianValuation: 0,
        investmentsLast12Months: 0,
        companiesLast12Months: 0,
      };
    }
    // Total investments and count
    let totalInvestment = 0;
    let investmentsCount = 0;
    companies.forEach(c => {
      if (c.gbpFinalTicketInvested) {
        totalInvestment += c.gbpFinalTicketInvested;
        investmentsCount++;
      }
    });
    if (investmentsCount === 0) {
      totalInvestment = companies.length * 500000; // fallback average ticket
    }
    const averageInvestment =
      investmentsCount > 0
        ? totalInvestment / investmentsCount
        : totalInvestment / companies.length;
    // Median valuation
    const vals: number[] = [];
    companies.forEach(c => {
      const v = c.gbpInitialRoundPreMoneyValuation;
      if (v !== undefined) {
        if (typeof v === 'number') vals.push(v);
        else {
          const m = v.match(/\d+(\.\d+)?/);
          if (m) {
            let num = parseFloat(m[0]);
            if (v.includes('M')) num *= 1000000;
            else if (v.includes('K')) num *= 1000;
            vals.push(num);
          }
        }
      }
    });
    let medianValuation = 0;
    if (vals.length) {
      vals.sort((a, b) => a - b);
      const mid = Math.floor(vals.length / 2);
      medianValuation =
        vals.length % 2 === 0
          ? (vals[mid - 1] + vals[mid]) / 2
          : vals[mid];
    } else {
      medianValuation = 5000000;
    }
    // Last 12 months
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    let investmentsLast12Months = 0;
    let companiesLast12Months = 0;
    companies.forEach(c => {
      if (c.investmentDate) {
        const d = new Date(c.investmentDate);
        if (d >= oneYearAgo) {
          companiesLast12Months++;
          investmentsLast12Months += c.totalInvested ?? 500000;
        }
      }
    });
    return {
      totalInvestments: totalInvestment,
      totalCompanies: companies.length,
      averageInvestment,
      medianValuation,
      investmentsLast12Months,
      companiesLast12Months,
    };
  }, [companies]);
}
