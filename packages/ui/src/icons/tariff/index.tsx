import { Icon, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const TariffIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon size={24} viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill={theme.colors.grayScale.gray3} />
      <path d="M11.1111 5.72439C11.4835 5.00196 12.5165 5.00196 12.8889 5.72439L14.1815 8.23215C14.3267 8.51373 14.5967 8.70989 14.9093 8.76092L17.6938 9.21537C18.4959 9.34629 18.8151 10.3287 18.2431 10.9061L16.2576 12.9104C16.0346 13.1355 15.9315 13.4529 15.9796 13.766L16.4078 16.5546C16.5312 17.358 15.6955 17.9651 14.9696 17.5995L12.4498 16.3305C12.1669 16.188 11.8331 16.188 11.5502 16.3305L9.03039 17.5995C8.30449 17.9651 7.46882 17.358 7.59218 16.5546L8.02042 13.766C8.06851 13.4529 7.96538 13.1355 7.74243 12.9104L5.75686 10.9061C5.18486 10.3287 5.50406 9.34629 6.30621 9.21537L9.09069 8.76092C9.40335 8.70989 9.67333 8.51373 9.81847 8.23215L11.1111 5.72439Z" fill="#4785FF" />
    </Icon>
  );
});
