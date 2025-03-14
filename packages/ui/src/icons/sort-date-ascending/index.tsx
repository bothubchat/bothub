import { Icon, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const SortDateAscendingIcon = icon(
  ({ fill, ...props }: { fill?: string }) => {
    const theme = useTheme();
    const fillColor = fill ?? theme.colors.base.white;
    return (
      <Icon
        size={18}
        viewBox="0 0 18 10"
        fill="none"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 1.0625C3 0.751842 3.25184 0.5 3.5625 0.5H7.3125C7.62315 0.5 7.875 0.751842 7.875 1.0625C7.875 1.37316 7.62315 1.625 7.3125 1.625H3.5625C3.25184 1.625 3 1.37316 3 1.0625ZM1.5 4.8125C1.5 4.50185 1.75184 4.25 2.0625 4.25H7.3125C7.62315 4.25 7.875 4.50185 7.875 4.8125C7.875 5.12315 7.62315 5.375 7.3125 5.375H2.0625C1.75184 5.375 1.5 5.12315 1.5 4.8125ZM0 8.5625C0 8.25185 0.251843 8 0.5625 8H7.3125C7.62315 8 7.875 8.25185 7.875 8.5625C7.875 8.87315 7.62315 9.125 7.3125 9.125H0.5625C0.251843 9.125 0 8.87315 0 8.5625Z"
          fill={fillColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.3125 1.625C11.5521 1.625 10.125 3.05209 10.125 4.8125C10.125 6.5729 11.5521 8 13.3125 8C15.0729 8 16.5 6.5729 16.5 4.8125C16.5 3.05209 15.0729 1.625 13.3125 1.625ZM9 4.8125C9 2.43077 10.9308 0.5 13.3125 0.5C15.6942 0.5 17.625 2.43077 17.625 4.8125C17.625 7.1942 15.6942 9.125 13.3125 9.125C10.9308 9.125 9 7.1942 9 4.8125ZM13.3125 2.75C13.6231 2.75 13.875 3.00184 13.875 3.3125V4.4873L14.4876 5.1941C14.691 5.42885 14.6656 5.78413 14.4309 5.9876C14.1961 6.191 13.8409 6.16565 13.6374 5.9309L12.8874 5.06555C12.7988 4.96325 12.75 4.83245 12.75 4.69715V3.3125C12.75 3.00184 13.0019 2.75 13.3125 2.75Z"
          fill={fillColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 1.0625C3 0.751842 3.25184 0.5 3.5625 0.5H7.3125C7.62315 0.5 7.875 0.751842 7.875 1.0625C7.875 1.37316 7.62315 1.625 7.3125 1.625H3.5625C3.25184 1.625 3 1.37316 3 1.0625ZM1.5 4.8125C1.5 4.50185 1.75184 4.25 2.0625 4.25H7.3125C7.62315 4.25 7.875 4.50185 7.875 4.8125C7.875 5.12315 7.62315 5.375 7.3125 5.375H2.0625C1.75184 5.375 1.5 5.12315 1.5 4.8125ZM0 8.5625C0 8.25185 0.251843 8 0.5625 8H7.3125C7.62315 8 7.875 8.25185 7.875 8.5625C7.875 8.87315 7.62315 9.125 7.3125 9.125H0.5625C0.251843 9.125 0 8.87315 0 8.5625Z"
          stroke={fillColor}
          strokeWidth="0.5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.3125 1.625C11.5521 1.625 10.125 3.05209 10.125 4.8125C10.125 6.5729 11.5521 8 13.3125 8C15.0729 8 16.5 6.5729 16.5 4.8125C16.5 3.05209 15.0729 1.625 13.3125 1.625ZM9 4.8125C9 2.43077 10.9308 0.5 13.3125 0.5C15.6942 0.5 17.625 2.43077 17.625 4.8125C17.625 7.1942 15.6942 9.125 13.3125 9.125C10.9308 9.125 9 7.1942 9 4.8125ZM13.3125 2.75C13.6231 2.75 13.875 3.00184 13.875 3.3125V4.4873L14.4876 5.1941C14.691 5.42885 14.6656 5.78413 14.4309 5.9876C14.1961 6.191 13.8409 6.16565 13.6374 5.9309L12.8874 5.06555C12.7988 4.96325 12.75 4.83245 12.75 4.69715V3.3125C12.75 3.00184 13.0019 2.75 13.3125 2.75Z"
          stroke={fillColor}
          strokeWidth="0.5"
        />
      </Icon>
    );
  }
);
