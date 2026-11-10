import { Icon, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const ArrowDownIcon = icon((props) => {
  const theme = useTheme();

  return (
    <Icon
      size={16}
      viewBox="0 0 16 16"
      fill="none"
      defaultColor={theme.colors.base.white}
      {...props}
    >
      <path
        d="M3 6L8 10L13 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
});
