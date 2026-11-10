import { useId } from 'react';
import { Icon, icon } from '@/ui/components/icon';

export const SquareIcon = icon((props) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <Icon
      size={18}
      viewBox="0 0 18 18"
      fill="none"
      defaultColor="#ffffff"
      {...props}
    >
      <mask
        id={`${uid}path-1-inside-1_1407_38549`}
        fill="#ffffff"
      >
        <rect
          x="1"
          y="1"
          width="16"
          height="16"
          rx="1"
        />
      </mask>
      <rect
        x="1"
        y="1"
        width="16"
        height="16"
        rx="1"
        stroke="currentColor"
        strokeWidth="4"
        mask={`url(#${uid}path-1-inside-1_1407_38549)`}
      />
    </Icon>
  );
});
