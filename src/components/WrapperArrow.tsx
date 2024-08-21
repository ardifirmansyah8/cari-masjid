import { ReactNode } from "react";

import { Label } from "./ui/label";

export default function WrapperArrow(props: {
  children: ReactNode;
  slideCount?: number;
  currentSlide?: number;
}) {
  const { children, currentSlide, slideCount, ...others } = props;
  return <Label {...others}>{children}</Label>;
}
