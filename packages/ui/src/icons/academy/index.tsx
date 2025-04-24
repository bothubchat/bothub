import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const AcademyIcon = icon(({ ...props }) => {
  const theme = useTheme();
  return (
    <Icon
      size={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = theme.colors.base.white } = { fill: theme.colors.base.white }
        ) => (
          <>
            <g clipPath="url(#clip0_10915_8741)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.391555 6.09141C0.412177 6.08018 0.433384 6.06987 0.455121 6.06057L8.3793 2.45867C8.77365 2.2794 9.22635 2.2794 9.6207 2.45867L17.5603 6.0676C18.1465 6.33405 18.1465 7.16668 17.5603 7.43315L9.6207 11.0421C9.22635 11.2213 8.77365 11.2213 8.3793 11.0421L1.5 7.9151V10.1254C1.5 10.5396 1.16421 10.8754 0.75 10.8754C0.335786 10.8754 0 10.5396 0 10.1254V6.75038C0 6.73871 0.000266396 6.7271 0.00079344 6.71557C0.0118852 6.4682 0.142145 6.2255 0.391555 6.09141ZM15 10.0969V11.7934C15 12.0751 14.9207 12.3511 14.7712 12.5898C13.607 14.4479 11.65 15.3754 9 15.3754C6.35003 15.3754 4.393 14.4479 3.22889 12.5899C3.07937 12.3512 3.00007 12.0753 3 11.7935V10.0969L8.3793 12.5421C8.77365 12.7213 9.22635 12.7213 9.6207 12.5421L15 10.0969Z"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_10915_8741">
                <rect
                  width="18"
                  height="18"
                  fill={fill}
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
