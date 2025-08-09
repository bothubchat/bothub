import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const BookIcon = icon(({ ...props }) => {
  const theme = useTheme();
  const fillColor = theme.colors.base.white;
  return (
    <Icon
      size={24}
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {({ fill = fillColor } = { fill: fillColor }) => (
          <path
            d="M3.33331 16.3333V5.66667C3.33331 4.73325 3.33331 4.26653 3.51497 3.91002C3.67475 3.59641 3.92972 3.34144 4.24333 3.18166C4.59985 3 5.06656 3 5.99998 3H14C14.9334 3 15.4001 3 15.7566 3.18166C16.0702 3.34144 16.3252 3.59641 16.485 3.91002C16.6666 4.26653 16.6666 4.73325 16.6666 5.66667V14.6667H4.99998C4.0795 14.6667 3.33331 15.4128 3.33331 16.3333ZM3.33331 16.3333C3.33331 17.2538 4.0795 18 4.99998 18H16.6666M7.49998 6.33333H12.5M7.49998 9.66667H12.5M15.8333 14.6667V18"
            stroke={fill}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </IconConsumer>
    </Icon>
  );
});
