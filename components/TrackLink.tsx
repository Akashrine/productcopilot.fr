"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  event: string;
  eventProps?: Record<string, string>;
};

export default function TrackLink({ event, eventProps, onClick, ...props }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event, ...eventProps });
    }
    onClick?.(e);
  };

  return <Link {...props} onClick={handleClick} />;
}
