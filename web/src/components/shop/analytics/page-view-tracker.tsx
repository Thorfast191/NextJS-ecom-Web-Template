"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/actions/analytics.actions";
import { getAnalyticsSession } from "@/lib/analytics";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent({
      sessionId: getAnalyticsSession(),
      event: "PAGE_VIEW",
      path: pathname,
    });
  }, [pathname]);

  return null;
}
