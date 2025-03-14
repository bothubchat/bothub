import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const ArrowNarrowRightWhiteIcon = icon(({ ...props }) => {
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
          { fill = theme.colors.base.white } = { fill: theme.colors.base.white }
        ) => (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.0645 4.76351C11.2333 4.59478 11.4621 4.5 11.7008 4.5C11.9394 4.5 12.1683 4.59478 12.3371 4.76351L15.9371 8.36351C16.1058 8.53228 16.2006 8.76116 16.2006 8.99981C16.2006 9.23846 16.1058 9.46733 15.9371 9.63611L12.3371 13.2361C12.1673 13.4001 11.94 13.4908 11.704 13.4887C11.468 13.4867 11.2423 13.392 11.0754 13.2251C10.9086 13.0583 10.8139 12.8325 10.8119 12.5966C10.8098 12.3606 10.9005 12.1333 11.0645 11.9635L13.1282 9.89981H2.70078C2.46209 9.89981 2.23317 9.80499 2.06439 9.6362C1.8956 9.46742 1.80078 9.2385 1.80078 8.99981C1.80078 8.76111 1.8956 8.53219 2.06439 8.36341C2.23317 8.19463 2.46209 8.09981 2.70078 8.09981H13.1282L11.0645 6.03611C10.8958 5.86733 10.801 5.63846 10.801 5.39981C10.801 5.16116 10.8958 4.93228 11.0645 4.76351Z"
              fill={fill}
            />
          </svg>
        )}
      </IconConsumer>
    </Icon>
  );
});
