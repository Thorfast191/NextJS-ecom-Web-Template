// import { redirect, notFound } from "next/navigation";

// import { hasPermission } from "@/lib/auth";

// import { getAdminUserById } from "@/actions/user.actions";

// import UserDetails from "@/components/admin/users/user-details";

// export default async function UserPage({
//   params,
// }: {
//   params: Promise<{
//     id: string;
//   }>;
// }) {
//   // ADMIN PROTECTION

//   const allowed = await hasPermission("manage_users");

//   if (!allowed) {
//     redirect("/admin/login");
//   }

//   // GET PARAMS

//   const { id } = await params;

//   // FETCH USER

//   const user = await getAdminUserById(id);

//   // NOT FOUND

//   if (!user) {
//     notFound();
//   }

//   // TOTAL SPENT

//   const totalSpent = user.orders.reduce((acc, order) => acc + order.total, 0);

//   // TOTAL ORDERS

//   const totalOrders = user.orders.length;

//   // TOTAL WISHLIST

//   const totalWishlist = user.wishlists.length;

//   return (
//     <div className="space-y-10">
//       {/* HEADER */}

//       <div className="flex items-center gap-6">
//         {user.image ? (
//           <img
//             src={user.image}
//             alt={user.name || ""}
//             className="w-24 h-24 rounded-full object-cover border border-slate-800"
//           />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-4xl font-black">
//             {user.name?.charAt(0)}
//           </div>
//         )}

//         <div>
//           <h1 className="text-5xl font-black">{user.name}</h1>

//           <p className="text-slate-400 mt-3">{user.email}</p>

//           <div className="flex items-center gap-4 mt-4">
//             <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm">
//               {user.role}
//             </span>

//             {user.isActive ? (
//               <span className="text-green-400 font-semibold">Active</span>
//             ) : (
//               <span className="text-red-400 font-semibold">Disabled</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* STATS */}

//       <div className="grid md:grid-cols-3 gap-6">
//         {/* ORDERS */}

//         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
//           <p className="text-slate-400 text-lg">Orders</p>

//           <h2 className="text-6xl font-black mt-4">{totalOrders}</h2>
//         </div>

//         {/* WISHLIST */}

//         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
//           <p className="text-slate-400 text-lg">Wishlist</p>

//           <h2 className="text-6xl font-black mt-4">{totalWishlist}</h2>
//         </div>

//         {/* TOTAL SPENT */}

//         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
//           <p className="text-slate-400 text-lg">Total Spent</p>

//           <h2 className="text-5xl font-black mt-4">৳ {totalSpent}</h2>
//         </div>
//       </div>

//       {/* WISHLIST PRODUCTS */}

//       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
//         <h2 className="text-4xl font-black mb-8">Wishlist Products</h2>

//         {user.wishlists.length === 0 ? (
//           <div className="text-slate-400">No wishlist products.</div>
//         ) : (
//           <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {user.wishlists.map((wishlist) => (
//               <div
//                 key={wishlist.id}
//                 className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden"
//               >
//                 {/* IMAGE */}

//                 {wishlist.product.imageUrl ? (
//                   <img
//                     src={wishlist.product.imageUrl}
//                     alt={wishlist.product.name}
//                     className="w-full h-64 object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-64 bg-slate-800 flex items-center justify-center text-slate-500">
//                     No Image
//                   </div>
//                 )}

//                 {/* CONTENT */}

//                 <div className="p-5">
//                   <h3 className="text-2xl font-bold">
//                     {wishlist.product.name}
//                   </h3>

//                   <p className="text-blue-400 text-xl font-bold mt-3">
//                     ৳ {wishlist.product.price}
//                   </p>

//                   <p className="text-sm text-slate-500 mt-3">
//                     Added on {new Date(wishlist.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ORDERED PRODUCTS */}

//       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
//         <h2 className="text-4xl font-black mb-8">Ordered Products</h2>

//         {user.orders.length === 0 ? (
//           <div className="text-slate-400">No orders found.</div>
//         ) : (
//           <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {user.orders.flatMap((order) =>
//               order.items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden"
//                 >
//                   {/* IMAGE */}

//                   {item.product.imageUrl ? (
//                     <img
//                       src={item.product.imageUrl}
//                       alt={item.product.name}
//                       className="w-full h-64 object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-64 bg-slate-800 flex items-center justify-center text-slate-500">
//                       No Image
//                     </div>
//                   )}

//                   {/* CONTENT */}

//                   <div className="p-5">
//                     <h3 className="text-2xl font-bold">{item.product.name}</h3>

//                     <div className="mt-4 space-y-2 text-sm text-slate-400">
//                       <p>Quantity: {item.quantity}</p>

//                       <p>Price: ৳ {item.price}</p>

//                       <p>Status: {order.status}</p>

//                       <p>
//                         Date: {new Date(order.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )),
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { redirect, notFound } from "next/navigation";
import { hasPermission } from "@/lib/auth";
import { getAdminUserById } from "@/actions/user.actions";

import UserDetails from "@/components/admin/users/user-details";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const allowed = await hasPermission("manage_users");

  if (!allowed) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const user = await getAdminUserById(id);

  if (!user) {
    notFound();
  }

  return <UserDetails user={user} />;
}
