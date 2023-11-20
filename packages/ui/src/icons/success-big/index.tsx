import { Icon, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const SuccessBigIcon = icon(({ ...props }) => {
  const theme = useTheme();
  
  return (
    <Icon size={30} viewBox="0 0 30 30" fill="none" {...props}>
      <rect width="30" height="30" rx="4" fill={theme.colors.grayScale.gray3} />
      <g clipPath="url(#clip0_569_15228)">
        <path d="M23 15C23 19.4183 19.4183 23 15 23C10.5817 23 7 19.4183 7 15C7 10.5817 10.5817 7 15 7C19.4183 7 23 10.5817 23 15Z" fill="#1ABB34" />
        <path fillRule="evenodd" clipRule="evenodd" d="M20.2071 11.7929C20.5976 12.1834 20.5976 12.8166 20.2071 13.2071L14.7071 18.7071C14.3166 19.0976 13.6834 19.0976 13.2929 18.7071L10.7929 16.2071C10.4024 15.8166 10.4024 15.1834 10.7929 14.7929C11.1834 14.4024 11.8166 14.4024 12.2071 14.7929L14 16.5858L18.7929 11.7929C19.1834 11.4024 19.8166 11.4024 20.2071 11.7929Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_569_15228">
          <rect width="16" height="16" fill="white" transform="translate(7 7)" />
        </clipPath>
      </defs>
    </Icon>
  );
});
