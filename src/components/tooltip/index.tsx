// coming soon. this was taken from ndpniraj
// https://gist.github.com/ndpniraj/633474d23145499c5a3c39b017f43be4

import React, { ReactNode, useRef } from 'react';

type Props = {
  children: ReactNode;
  tooltip?: string;
};

export default function Tooltip({ children, tooltip }: Props) {
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className="group relative inline-block"
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !containerRef.current) return;
        const { left } = tooltipRef.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + 'px';
      }}
    >
      {children}
      {tooltip && (
        <span
          className="inivisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-500 text-white rounded absolute top-full mt-2 whitespace-nowrap"
          ref={tooltipRef}
        >
          {tooltip}
        </span>
      )}
    </div>
  );
}
