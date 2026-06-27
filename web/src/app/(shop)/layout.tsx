import ShopNavbar from "@/components/shop/navbar/shop-navbar";
import ShopFooter from "@/components/shop/layout/shop-footer";

import PageViewTracker from "@/components/shop/analytics/page-view-tracker";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageViewTracker />

      <ShopNavbar />

      {children}

      <ShopFooter />
    </>
  );
}
