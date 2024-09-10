import { Suspense } from "react";

import Home from "@/features/Home";

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
