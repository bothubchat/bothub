import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const TxtBlackIcon = icon(({ ...props }) => (
  <Icon
    size={22}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {() => (
        <>
          <g clipPath="url(#clip0_1047_16424)">
            <path
              d="M5.6377 0.323242H12.8555L18.9033 6.62793V19.1357C18.9033 20.5407 17.7668 21.6767 16.3682 21.6768H5.6377C4.23313 21.6768 3.09668 20.5403 3.09668 19.1357V2.86426C3.09666 1.4597 4.2331 0.323242 5.6377 0.323242Z"
              stroke="#4785FF"
              strokeWidth="0.646911"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.9873 0V6.44828H19.2267L12.9873 0Z"
              fill="#4785FF"
            />
            <path
              d="M6.92932 16.0629V12.935H5.78589V12.0664H9.08975V12.935H7.95183V16.0629H6.92932ZM12.8059 16.0629H11.7339L11.0028 14.837L10.2716 16.0629H9.19418L10.4641 13.93L9.35363 12.0664H10.4256L11.0028 13.0339L11.5745 12.0664H12.652L11.5416 13.9355L12.8059 16.0629ZM14.0483 16.0629V12.935H12.9103V12.0664H16.2142V12.935H15.0708V16.0629H14.0483Z"
              fill="#4785FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_1047_16424">
              <rect
                width="22"
                height="22"
                fill="white"
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
