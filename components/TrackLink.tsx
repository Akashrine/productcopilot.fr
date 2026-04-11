"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  event: string;
  eventProps?: Record<string, string>;
};

export default function TrackLink({ event, eventProps, onClick, ...props }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible(event, { props: eventProps });
    }
    onClick?.(e);
  };

  return <Link {...props} onClick={handleClick} />;
}
