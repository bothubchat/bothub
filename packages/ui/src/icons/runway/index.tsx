import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const RunwayIcon = icon(({ ...props }) => {
  const theme = useTheme();
  const fillColor = theme.colors.base.white;
  const strokeColor = theme.colors.base.black;
  return (
    <Icon
      size={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = fillColor, stroke = strokeColor } = {
            fill: fillColor,
            stroke: strokeColor
          }
        ) => (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="24"
                height="24"
                rx="12"
                fill={fill}
              />
              <g clipPath="url(#clip0_12265_143287)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.7327 19.4914C14.0365 19.6464 12.6182 17.6589 11.5311 16.6508C10.9814 20.6118 4.9959 20.2363 5 16.2182C5.00197 14.5305 5 10.4064 5 8.77175C5 8.18403 5.1613 7.59218 5.46389 7.09029C6.03811 6.11689 7.14772 5.4884 8.27772 5.50054C9.97998 5.5027 14.0794 5.4986 15.7327 5.50054C19.7545 5.50054 20.1365 11.4839 16.1619 12.0226L18.048 13.9061C20.1202 15.8549 18.5649 19.5771 15.7327 19.4914ZM14.8192 17.1344C15.988 18.3385 17.8539 16.4732 16.6502 15.306L13.3806 12.041H11.5515V13.8693L14.3779 16.6917L14.8192 17.1344ZM6.98015 16.2202C6.95352 17.8936 9.59586 17.8997 9.56942 16.2202V8.77175C9.59176 7.93709 8.70907 7.27393 7.91203 7.53104C7.87736 7.54124 7.84463 7.55144 7.81387 7.56377C7.31331 7.74935 6.96585 8.26163 6.98015 8.79625V16.2202ZM15.7327 10.0634C17.4124 10.0901 17.4105 7.45147 15.7327 7.47794H11.292C11.6293 8.18816 11.5435 9.29423 11.5496 10.0634H15.7327Z"
                  fill={stroke}
                />
              </g>
              <defs>
                <clipPath id="clip0_12265_143287">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                    transform="translate(5 5.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
