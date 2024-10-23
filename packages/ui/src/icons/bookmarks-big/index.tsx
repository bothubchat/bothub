import { Icon, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const BookmarksBigIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon size={24} viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill={theme.colors.grayScale.gray3} />
      <path d="M6 19.3333V8.66667C6 8.30001 6.13067 7.98601 6.392 7.72467C6.65333 7.46334 6.96711 7.33289 7.33333 7.33334H14C14.3667 7.33334 14.6807 7.464 14.942 7.72534C15.2033 7.98667 15.3338 8.30045 15.3333 8.66667V19.3333L10.6667 17.3333L6 19.3333ZM16.6667 17.3333V6.00001H8V4.66667H16.6667C17.0333 4.66667 17.3473 4.79734 17.6087 5.05867C17.87 5.32001 18.0004 5.63378 18 6.00001V17.3333H16.6667Z" fill="#4785FF" />
    </Icon>
  );
});
