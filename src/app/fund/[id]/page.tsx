import { Suspense } from "react";

import FundDetail from "@/features/FundDetail";

export default function Page() {
  return (
    <Suspense>
      <FundDetail />
    </Suspense>
  );
}
