'use client';

import { useMemo, useState } from 'react';

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from '@/state/api';
import Header from '@/app/(components)/Header';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    // Filter data by selected category
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === 'All' || data.category === selectedCategory;

        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);

        return matchesCategory && matchesDate;
      })
      .reduce((accumulator: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);

        if (!accumulator[data.category]) {
          // Set category to random color
          accumulator[data.category] = { name: data.category, amount: 0 };
          accumulator[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          accumulator[data.category].amount += amount;
        }

        return accumulator;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]); // Update data as filters change

  const classes = {
    label: 'block text-sm font-medium text-gray-700',
    select:
      'block w-full mt-1 pl-3 pr-10 py-2 text-base border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md',
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to find any expenses.
      </div>
    );
  }

  return (
    <div className="mb-5">
      <Header name="Expenses" />
      <p className="text-sm text-gray-500 mt-2 mb-4">
        Your expenses over time.
      </p>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category & Date
          </h3>
          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label
                htmlFor="category"
                className={classes.label}
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classes.select}
                defaultValue="All"
                onChange={event => setSelectedCategory(event.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>

            {/* START DATE */}
            <div>
              <label
                htmlFor="start-date"
                className={classes.label}
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                name="start-date"
                className={classes.select}
                onChange={event => setStartDate(event.target.value)}
              />
            </div>

            {/* END DATE */}
            <div>
              <label
                htmlFor="end-date"
                className={classes.label}
              >
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                name="end-date"
                className={classes.select}
                onChange={event => setEndDate(event.target.value)}
              />
            </div>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer
            width="100%"
            height={400}
          >
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884D8"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (entry: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? 'rgb(29, 78, 216)' : entry.color
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
