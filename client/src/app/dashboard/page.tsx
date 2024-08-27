'use client';

import CardPopularProducts from './CardPopularProducts';
import CardSalesSummary from './CardSalesSummary';
import CardPurchaseSummary from './CardPurchaseSummary';
import CardExpenseSummary from './CardExpenseSummary';
import StatCard from './StatCard';
import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 dashboard-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customers & Expenses"
        primaryIcon={<Package className="text-blue-600 h-6 w-6" />}
        dateRange="22 - 29 Oct 2023"
        details={[
          {
            title: 'Customer Growth',
            amount: '175.00',
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: 'Expenses',
            amount: '10.00',
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 h-6 w-6" />}
        dateRange="22 - 29 Oct 2023"
        details={[
          {
            title: 'Dues',
            amount: '250.00',
            changePercentage: -86,
            IconComponent: TrendingDown,
          },
          {
            title: 'Pending Orders',
            amount: '147',
            changePercentage: 22,
            IconComponent: TrendingUp,
          },
        ]}
      />
      <StatCard
        title="Sales & Discounts"
        primaryIcon={<Tag className="text-blue-600 h-6 w-6" />}
        dateRange="22 - 29 Oct 2023"
        details={[
          {
            title: 'Sales',
            amount: '1000.00',
            changePercentage: 20,
            IconComponent: TrendingUp,
          },
          {
            title: 'Discounts',
            amount: '200.00',
            changePercentage: -10,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;
