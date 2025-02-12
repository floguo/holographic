import React from 'react';
import Image from 'next/image';

interface StatueOfLibertyProps {
  className?: string;
  style?: React.CSSProperties;
}

const StatueOfLiberty: React.FC<StatueOfLibertyProps> = ({ className, style }) => {
  return (
    <Image 
      src="/statue-of-liberty.svg" 
      alt="Statue of Liberty"
      width={200}
      height={400}
      className={className}
      style={style}
    />
  );
};

export default StatueOfLiberty;
