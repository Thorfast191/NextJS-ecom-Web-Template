"use client";

import { Heart } from "lucide-react";

import { useSession } from "next-auth/react";

import { useState } from "react";

import { toggleWishlist } from "@/actions/wishlist.actions";

import { getAnalyticsSession } from "@/lib/analytics";
import { trackEvent } from "@/actions/analytics.actions";

interface Props {
  productId: string;
}

export default function WishlistButton({ productId }: Props) {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [liked, setLiked] = useState(false);

  async function handleWishlist() {
    if (!session) {
      alert("Please login first");

      return;
    }

    try {
      setLoading(true);

      await toggleWishlist(productId);

      const newLiked = !liked;

      setLiked(newLiked);

      if (newLiked) {
        void trackEvent({
          sessionId: getAnalyticsSession(),
          event: "WISHLIST_ADD",
          productId,
        });
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleWishlist}
      disabled={loading}
      className={`w-11 h-11 rounded-full backdrop-blur-md border flex items-center justify-center transition ${
        liked
          ? "bg-red-500 border-red-500 text-white"
          : "bg-black/40 border-white/20 text-white hover:bg-white hover:text-black"
      }`}
    >
      <Heart size={18} className={liked ? "fill-white" : ""} />
    </button>
  );
}
