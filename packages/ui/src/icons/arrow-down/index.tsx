import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const ArrowDownIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      size={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = theme.colors.base.white } = {
            fill: theme.colors.base.white,
          },
        ) => (
          <path
            d="M3 6L8 10L13 6"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </IconConsumer>
    </Icon>
  );
});
