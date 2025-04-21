import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const AcademyIcon = icon(({ ...props }) => {
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
            <g clipPath="url(#clip0_8379_398014)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.391555 6.59098C0.412177 6.57975 0.433384 6.56944 0.455121 6.56014L8.3793 2.95825C8.77365 2.77897 9.22635 2.77897 9.6207 2.95825L17.5603 6.56717C18.1465 6.83362 18.1465 7.66625 17.5603 7.93273L9.6207 11.5417C9.22635 11.7209 8.77365 11.7209 8.3793 11.5417L1.5 8.41468V10.6249C1.5 11.0392 1.16421 11.3749 0.75 11.3749C0.335786 11.3749 0 11.0392 0 10.6249V7.24995C0 7.23828 0.000266396 7.22668 0.00079344 7.21514C0.0118852 6.96778 0.142145 6.72508 0.391555 6.59098ZM15 10.5965V12.293C15 12.5746 14.9207 12.8506 14.7712 13.0894C13.607 14.9475 11.65 15.8749 9 15.8749C6.35003 15.8749 4.393 14.9475 3.22889 13.0894C3.07937 12.8508 3.00007 12.5749 3 12.2931V10.5965L8.3793 13.0417C8.77365 13.2209 9.22635 13.2209 9.6207 13.0417L15 10.5965Z"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_8379_398014">
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
