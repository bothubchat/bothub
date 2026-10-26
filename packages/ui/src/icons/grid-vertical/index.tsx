import { icon, Icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const GridVerticalIcon = icon((props) => {
  const theme = useTheme();
  return (
    <Icon
      size={18}
      fill="none"
      viewBox="0 0 18 18"
      defaultColor={theme.colors.base.white}
      {...props}
    >
      <path
        d="M2.625 2.625H7.875V7.875H2.625V2.625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.625 10.125H7.875V15.375H2.625V10.125Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.125 2.625H15.375V7.875H10.125V2.625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.125 10.125H15.375V15.375H10.125V10.125Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
});
