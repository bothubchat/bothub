import { Icon, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const SortAlphabetDescendingIcon = icon(
  ({ fill, ...props }: { fill?: string }) => {
    const theme = useTheme();
    const fillColor = fill ?? theme.colors.base.white;
    return (
      <Icon
        size={18}
        viewBox="0 0 18 11"
        fill="none"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.6875 1.75C0.6875 1.43934 0.939342 1.1875 1.25 1.1875H8.75C9.06065 1.1875 9.3125 1.43934 9.3125 1.75C9.3125 2.06066 9.06065 2.3125 8.75 2.3125H1.25C0.939342 2.3125 0.6875 2.06066 0.6875 1.75ZM11.375 1.1875C11.5963 1.1875 11.7971 1.31732 11.8879 1.51917L15.2629 9.01915C15.3904 9.3025 15.2641 9.6355 14.9808 9.76293C14.6975 9.89042 14.3645 9.76412 14.2371 9.48085L13.159 7.0852H9.59097L8.51292 9.48085C8.3855 9.76412 8.0525 9.89042 7.76915 9.76293C7.48587 9.6355 7.35957 9.3025 7.48707 9.01915L10.8621 1.51917C10.9529 1.31732 11.1537 1.1875 11.375 1.1875ZM10.0972 5.9602H12.6528L11.375 3.12073L10.0972 5.9602ZM0.6875 5.5C0.6875 5.18935 0.939342 4.9375 1.25 4.9375H6.5C6.81065 4.9375 7.0625 5.18935 7.0625 5.5C7.0625 5.81065 6.81065 6.0625 6.5 6.0625H1.25C0.939342 6.0625 0.6875 5.81065 0.6875 5.5ZM0.6875 9.25C0.6875 8.93935 0.939342 8.6875 1.25 8.6875H5C5.31066 8.6875 5.5625 8.93935 5.5625 9.25C5.5625 9.56065 5.31066 9.8125 5 9.8125H1.25C0.939342 9.8125 0.6875 9.56065 0.6875 9.25Z"
          fill={fillColor}
          stroke={fillColor}
          strokeWidth="0.5"
        />
      </Icon>
    );
  }
);
