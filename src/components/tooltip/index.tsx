// coming soon. this was taken from ndpniraj
// https://gist.github.com/ndpniraj/633474d23145499c5a3c39b017f43be4

import React, { ReactNode, useRef } from 'react';

type Props = {
  children: ReactNode;
  tooltip?: string;
};

export default function Tooltip({ children, tooltip = '' }: Props) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cleanedUpTooltip = tooltip.replace(/\n/g, '<br />');

  return (
    <div ref={containerRef} className="group relative">
      {children}
      {tooltip && (
        <div
          className="hidden w-[300px] p-4 bg-[#070720] absolute text-white top-0 left-full transform -translate-x-3/3 group-hover:block  z-10 text-[10px]"
          ref={tooltipRef}
          dangerouslySetInnerHTML={{ __html: cleanedUpTooltip }}
        ></div>
      )}
    </div>
  );
}
