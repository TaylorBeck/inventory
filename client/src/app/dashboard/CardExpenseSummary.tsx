import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from '@/state/api';

import { formatCurrency } from '@/lib/utils';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

type ExpenseSums = {
  [category: string]: number;
};

const colors = ['#00C49F', '#0088FE', '#FFBB28'];

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const expenseSummary = dashboardMetrics?.expenseSummary[0];

  const expenseByCategorySummary =
    dashboardMetrics?.expenseByCategorySummary || [];

  const expenseCategoryTotals = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + ' Expenses';
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseCategoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const totalExpenses = expenseCategories.reduce(
    (accumulator, category: { value: number }) => accumulator + category.value,
    0
  );

  const formattedTotalExpenses = formatCurrency(totalExpenses);

  return (
    <div className="flex flex-col justify-between row-span-3 bg-white shadow-md rounded-2xl gap-5 xl:gap-1">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* TITLE */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>

          {/* PIE CHART */}
          <div className="xl:flex justify-between pr-7">
            <div className="relative basis-3/5">
              <ResponsiveContainer
                width="100%"
                height={140}
              >
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884D8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 basis-2/5 text-center">
                <span className="font-bold text-xl">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>

            {/* PIE CHART LEGEND */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs"
                >
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            {expenseSummary && (
              <div className="flex justify-between items-center px-7 mt-3 mb-4">
                <div className="pt-2">
                  <p className="text-xs">
                    Average:{' '}
                    <span className="font-semibold">
                      ${formattedTotalExpenses}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="text-green-500 mr-2" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
