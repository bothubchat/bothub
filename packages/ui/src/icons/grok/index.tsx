import { Icon, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme/hook';

export const GrokIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      size={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <rect
        width="18"
        height="18"
        rx="9"
        fill={theme.colors.base.black}
      />
      <path
        d="M6.2345 7.388L11.256 14.5H9.024L4.0025 7.388H6.2345ZM6.2325 11.338L7.349 12.92L6.2335 14.5H4L6.2325 11.338ZM14 4.291V14.5H12.1705V6.882L14 4.291ZM14 3.5L9.024 10.5475L7.9075 8.966L11.7665 3.5H14Z"
        fill="white"
      />
    </Icon>
  );
});
