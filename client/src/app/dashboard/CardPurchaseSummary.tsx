import numeral from 'numeral';
import { useGetDashboardMetricsQuery } from '@/state/api';

import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  return (
    <div className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* TITLE */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Purchase Summary
            </h2>
            <hr />
          </div>

          <div>
            {/* CHART HEADER */}
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format('$0.00a')
                    : '0'}
                </p>
                {lastDataPoint && (
                  <p
                    className={`flex ml-3 text-sm ${
                      lastDataPoint.changePercentage! >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>

            {/* CHART */}
            <div className="w-full h-[300px] md:h-[220px] xl:h-[130px]">
              <ResponsiveContainer
                className="p-2 pr-4"
                width="100%"
                height="100%"
                minHeight={130}
              >
                <AreaChart
                  data={purchaseData}
                  margin={{
                    top: 0,
                    right: 0,
                    left: -50,
                    bottom: 0,
                  }}
                >
                  <XAxis
                    dataKey="date"
                    tick={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString('en')}`,
                    ]}
                    labelFormatter={label => {
                      const date = new Date(label);
                      return date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });
                    }}
                  />
                  <Area
                    type="linear"
                    dataKey="totalPurchased"
                    stroke="#8884D8"
                    fill="#8884D8"
                    dot={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
