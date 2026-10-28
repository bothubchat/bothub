import { useId } from 'react';
import { Icon, icon } from '@/ui/components/icon';

export const ErrorIcon = icon((props) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <Icon
      size={16}
      viewBox="0 0 16 16"
      fill="none"
      defaultColor="#FE4242"
      {...props}
    >
      <g clipPath={`url(#${uid}clip0_1345_31684)`}>
        <path
          d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8 8.8C7.56 8.8 7.2 8.44 7.2 8V4.8C7.2 4.36 7.56 4 8 4C8.44 4 8.8 4.36 8.8 4.8V8C8.8 8.44 8.44 8.8 8 8.8ZM8.8 12H7.2V10.4H8.8V12Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={`${uid}clip0_1345_31684`}>
          <rect
            width="16"
            height="16"
            fill="white"
          />
        </clipPath>
      </defs>
    </Icon>
  );
});
