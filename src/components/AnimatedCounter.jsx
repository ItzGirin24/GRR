import React from 'react';
import CountUp from 'react-countup';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2 }) => {
  const { ref, inView } = useScrollAnimation();

  return (
    <span ref={ref}>
      {inView && (
        <CountUp
          end={parseFloat(end)}
          duration={duration}
          separator=","
          suffix={suffix}
          prefix={prefix}
          decimals={end.toString().includes('.') ? 1 : 0}
        />
      )}
    </span>
  );
};
