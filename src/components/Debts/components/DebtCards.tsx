import StatisticsCard from "@src/components/UI/StatisticsCard";
import type { Theme } from "@src/types/theme";
import type { Debt } from "@src/types/Debts/debt";

interface DebtCardsProps {
  debtsToShow: Debt[];
  theme: Theme;
}

const DebtCards = ({ debtsToShow, theme }: DebtCardsProps) => {
  const totalDebtIn =
    debtsToShow
      ?.filter((debt) => debt.d_type === "DEBT_IN")
      .reduce((sum, debt) => sum + debt.d_amount, 0)
      .toFixed(2) || "0.00";

  const totalDebtOut =
    debtsToShow
      ?.filter((debt) => debt.d_type === "DEBT_OUT")
      .reduce((sum, debt) => sum + debt.d_amount, 0)
      .toFixed(2) || "0.00";

  const insuranceAmount =
    debtsToShow
      ?.filter((debt) => debt.d_type === "INSURANCE")
      .reduce((sum, debt) => sum + debt.d_amount, 0)
      .toFixed(2) || "0.00";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatisticsCard
        title="Total Debt In"
        value={totalDebtIn}
        color="#52c41a"
        icon="↗"
        theme={theme}
      />

      <StatisticsCard
        title="Total Debt Out"
        value={totalDebtOut}
        color="#ff4d4f"
        icon="↘"
        theme={theme}
      />

      <StatisticsCard
        title="Insurance Amount"
        value={insuranceAmount}
        color="#faad14"
        icon="🛡"
        theme={theme}
      />
    </div>
  );
};

export default DebtCards;
