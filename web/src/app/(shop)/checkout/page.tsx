import { getShippingMethods } from "@/actions/shipping.actions";

import CheckoutClient from "@/components/shop/checkout/checkout-client";

export default async function CheckoutPage() {
  const shippingMethods = await getShippingMethods();

  return <CheckoutClient shippingMethods={shippingMethods} />;
}
