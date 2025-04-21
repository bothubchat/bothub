import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const GuideIcon = icon(({ ...props }) => {
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
            <g clipPath="url(#clip0_9660_356947)">
              <path
                d="M9.75 6.5V12.5C9.75 13.0967 9.51295 13.669 9.09099 14.091C8.66903 14.5129 8.09674 14.75 7.5 14.75H5.8725C5.69557 15.2506 5.34735 15.6726 4.8894 15.9413C4.43144 16.21 3.89323 16.3081 3.36991 16.2184C2.84658 16.1286 2.37184 15.8567 2.02959 15.4508C1.68735 15.0448 1.49963 14.531 1.49963 14C1.49963 13.469 1.68735 12.9552 2.02959 12.5492C2.37184 12.1433 2.84658 11.8714 3.36991 11.7816C3.89323 11.6919 4.43144 11.79 4.8894 12.0587C5.34735 12.3274 5.69557 12.7494 5.8725 13.25H7.5C7.69891 13.25 7.88968 13.171 8.03033 13.0303C8.17098 12.8897 8.25 12.6989 8.25 12.5V6.5C8.25 5.90326 8.48705 5.33097 8.90901 4.90901C9.33097 4.48705 9.90326 4.25 10.5 4.25H12.75V2L16.5 5L12.75 8V5.75H10.5C10.3011 5.75 10.1103 5.82902 9.96967 5.96967C9.82902 6.11032 9.75 6.30109 9.75 6.5Z"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_9660_356947">
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
