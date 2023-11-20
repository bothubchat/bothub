import { Icon, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const ErrorBigIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon size={30} viewBox="0 0 30 30" fill="none" {...props}>
      <rect width="30" height="30" rx="4" fill={theme.colors.grayScale.gray3} />
      <g clipPath="url(#clip0_569_15164)">
        <path d="M15 7C10.584 7 7 10.584 7 15C7 19.416 10.584 23 15 23C19.416 23 23 19.416 23 15C23 10.584 19.416 7 15 7ZM15 15.8C14.56 15.8 14.2 15.44 14.2 15V11.8C14.2 11.36 14.56 11 15 11C15.44 11 15.8 11.36 15.8 11.8V15C15.8 15.44 15.44 15.8 15 15.8ZM15.8 19H14.2V17.4H15.8V19Z" fill="#FE4242" />
      </g>
      <defs>
        <clipPath id="clip0_569_15164">
          <rect width="16" height="16" fill="white" transform="translate(7 7)" />
        </clipPath>
      </defs>
    </Icon>
  );
});
