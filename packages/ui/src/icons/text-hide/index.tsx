import { Icon, IconProps, icon, useIconColors } from '@/ui/components/icon';

export const TextHideIcon = icon((props: IconProps) => {
  const { fill, stroke } = useIconColors(props.fill) ?? {
    fill: '#073CA4',
    stroke: '#4785FF',
  };
  return (
    <Icon
      size={30}
      viewBox="0 0 30 20"
      fill="none"
      {...props}
    >
      <rect
        width="30"
        height="20"
        rx="4"
        fill={fill}
      />
      <path
        d="M10 12L15 8L20 12"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
});
