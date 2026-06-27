import { getDashboardAnalytics } from "@/actions/dashboard.actions";

import DashboardCard from "@/components/admin/dashboard/dashboard-card";
import RecentOrders from "@/components/admin/dashboard/recent-orders";
import TopProducts from "@/components/admin/dashboard/top-products";
import RevenueChart from "@/components/admin/dashboard/revenue-chart";
import RecentCustomers from "@/components/admin/dashboard/recent-customers";

export default async function AdminDashboardPage() {
  const analytics = await getDashboardAnalytics();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-5xl font-black">Dashboard</h1>
        <p className="text-slate-400 mt-3">Store analytics overview</p>
      </div>

      {/* MAIN METRICS */}

      {/* MAIN METRICS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* REVENUE */}

        <DashboardCard
          title="Revenue Today"
          value={`৳ ${analytics.revenueToday}`}
        />

        <DashboardCard
          title="Revenue Total"
          value={`৳ ${analytics.totalRevenue}`}
        />

        {/* ORDERS */}

        <DashboardCard title="Orders" value={analytics.totalOrders} />

        <DashboardCard title="Pending Orders" value={analytics.pendingOrders} />

        {/* CUSTOMERS */}

        <DashboardCard title="Customers" value={analytics.totalCustomers} />

        {/* PRODUCTS */}

        <DashboardCard title="Products" value={analytics.totalProducts} />

        <DashboardCard title="Low Stock" value={analytics.lowStockProducts} />

        {/* VISITORS */}

        <DashboardCard
          title="Visitors Today"
          value={analytics.visitorsToday || 0}
        />

        <DashboardCard
          title="Total Visitors"
          value={analytics.totalVisitors || 0}
        />

        {/* SALES */}

        <DashboardCard
          title="Avg Order Value"
          value={`৳ ${analytics.averageOrderValue}`}
        />

        <DashboardCard
          title="Conversion Rate"
          value={`${analytics.conversionRate}%`}
        />

        {/* ANALYTICS FUNNEL */}

        <DashboardCard
          title="Product Views"
          value={analytics.productViews || 0}
        />

        <DashboardCard title="Add To Cart" value={analytics.addToCarts || 0} />

        <DashboardCard
          title="Wishlist Adds"
          value={analytics.wishlistAdds || 0}
        />

        <DashboardCard
          title="Checkout Starts"
          value={analytics.checkoutStarts || 0}
        />

        <DashboardCard title="Purchases" value={analytics.purchases || 0} />

        <DashboardCard
          title="ATC Rate"
          value={`${analytics.addToCartRate || 0}%`}
        />

        <DashboardCard
          title="Purchase Rate"
          value={`${analytics.purchaseRate || 0}%`}
        />
      </div>

      {/* CHART */}

      <RevenueChart data={analytics.revenueChart} />

      {/* TABLES */}

      <div className="grid xl:grid-cols-2 gap-6">
        <RecentOrders orders={analytics.recentOrders} />

        <TopProducts products={analytics.topProducts} />
      </div>

      {/* CUSTOMERS */}

      <RecentCustomers customers={analytics.recentCustomers} />
    </div>
  );
}
