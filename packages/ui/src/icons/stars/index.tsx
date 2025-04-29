import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const StarsIcon = icon(({ ...props }) => {
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
            <g clipPath="url(#clip0_2445_92447)">
              <path
                d="M14.7273 0.5L13.6964 2.75L11.4545 3.77273L13.6964 4.80364L14.7273 7.04545L15.75 4.80364L18 3.77273L15.75 2.75M6.54545 2.95455L4.5 7.45455L0 9.5L4.5 11.5455L6.54545 16.0455L8.59091 11.5455L13.0909 9.5L8.59091 7.45455M14.7273 11.9545L13.6964 14.1964L11.4545 15.2273L13.6964 16.25L14.7273 18.5L15.75 16.25L18 15.2273L15.75 14.1964"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_2445_92447">
                <rect
                  width="18"
                  height="18"
                  fill={fill}
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
