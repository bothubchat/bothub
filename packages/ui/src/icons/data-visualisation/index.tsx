import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const DataVisualisationIcon = icon(({ ...props }) => {
  const theme = useTheme();
  const fillColor = theme.colors.base.white;
  return (
    <Icon
      size={24}
      viewBox="0 0 18 19"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {({ fill = fillColor } = { fill: fillColor }) => (
          <>
            <path
              d="M14 2.5L14.6786 4.22051C14.7412 4.37933 14.7725 4.45874 14.8205 4.5257C14.863 4.58505 14.9149 4.63702 14.9743 4.67953C15.0413 4.72748 15.1207 4.7588 15.2795 4.82144L17 5.5L15.2795 6.17857C15.1207 6.2412 15.0413 6.2725 14.9743 6.32047C14.9149 6.36297 14.863 6.41493 14.8205 6.4743C14.7725 6.54127 14.7412 6.62067 14.6786 6.7795L14 8.5L13.3214 6.7795C13.2588 6.62067 13.2275 6.54127 13.1795 6.4743C13.137 6.41493 13.0851 6.36297 13.0257 6.32047C12.9587 6.2725 12.8793 6.2412 12.7205 6.17857L11 5.5L12.7205 4.82144C12.8793 4.7588 12.9587 4.72748 13.0257 4.67953C13.0851 4.63702 13.137 4.58505 13.1795 4.5257C13.2275 4.45874 13.2588 4.37933 13.3214 4.22051L14 2.5Z"
              fill={fill}
              stroke={fill}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g clipPath="url(#clip0_8273_406248)">
              <path
                d="M2.62755 11.7692C2.99866 12.6468 3.5791 13.4201 4.31813 14.0216C5.05715 14.6231 5.93227 15.0343 6.86697 15.2194C7.80166 15.4046 8.76747 15.3579 9.67997 15.0835C10.5925 14.8092 11.4239 14.3155 12.1015 13.6455C12.7791 12.9756 13.2822 12.1499 13.567 11.2406"
                stroke={fill}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.16667 9.5C2.16667 8.73396 2.31755 7.97542 2.6107 7.26768C2.90385 6.55995 3.33354 5.91689 3.87521 5.37522C4.41689 4.83354 5.05995 4.40386 5.76768 4.11071C6.47541 3.81756 7.23396 3.66667 8 3.66667V9.5H2.16667Z"
                stroke={fill}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_8273_406248">
                <rect
                  width="14"
                  height="14"
                  fill={fill}
                  transform="matrix(-1 0 0 1 15 2.5)"
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
