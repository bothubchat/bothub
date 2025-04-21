import { icon, Icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const GridHorizontalIcon = icon(({ ...props }) => {
  const theme = useTheme();
  return (
    <Icon
      size={18}
      fill="none"
      viewBox="0 0 18 18"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = theme.colors.base.white } = { fill: theme.colors.base.white }
        ) => (
          <>
            <path
              d="M2.625 15.375V10.125H15.375V15.375H2.625Z"
              stroke={fill}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.625 7.875V2.625H15.375V7.875H2.625Z"
              stroke={fill}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
