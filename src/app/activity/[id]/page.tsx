import { Suspense } from "react";

import ActivityDetail from "@/features/ActivityDetail";

export default function Page() {
  return (
    <Suspense>
      <ActivityDetail />
    </Suspense>
  );
}
