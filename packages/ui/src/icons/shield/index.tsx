import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const ShieldIcon = icon(({ ...props }) => {
  const theme = useTheme();
  return (
    <Icon
      size={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { stroke = theme.colors.grayScale.gray1 } = {
            stroke: theme.colors.grayScale.gray1,
          },
        ) => (
          <path
            d="M6.375 9.02002L8.125 10.8158L11.625 7.22422M16 9.02002C16 13.0256 11.2225 15.9282 9.56123 16.8165C9.38159 16.9125 9.29172 16.9606 9.16712 16.9855C9.07 17.0048 8.93 17.0048 8.83288 16.9855C8.70828 16.9606 8.61841 16.9125 8.43877 16.8165C6.77746 15.9282 2 13.0256 2 9.02002V5.62381C2 4.90593 2 4.547 2.11442 4.23845C2.21549 3.96588 2.37973 3.72267 2.59295 3.52985C2.83431 3.31158 3.16182 3.18555 3.81685 2.93348L8.50842 1.12811C8.69034 1.05811 8.78125 1.02311 8.87488 1.00923C8.95783 0.996925 9.04217 0.996925 9.12512 1.00923C9.21875 1.02311 9.30966 1.05811 9.49158 1.12811L14.1831 2.93348C14.8382 3.18555 15.1657 3.31158 15.407 3.52985C15.6202 3.72267 15.7845 3.96588 15.8855 4.23845C16 4.547 16 4.90593 16 5.62381V9.02002Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </IconConsumer>
    </Icon>
  );
});
