import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const YandexIcon = icon(({ ...props }) => (
  <Icon size={20} viewBox="0 0 21 20" fill="none" {...props}>
    <IconConsumer>
      {() => (
        <>
          <g clipPath="url(#clip0_3518_13869)">
            <path
              d="M0.5 10C0.5 4.477 4.976 0 10.5 0C16.022 0 20.5 4.477 20.5 10C20.5 15.523 16.022 20 10.5 20C4.976 20 0.5 15.523 0.5 10Z"
              fill="#FC3F1D"
            />
            <path
              d="M11.7792 5.666H10.8552C9.16122 5.666 8.27022 6.524 8.27022 7.789C8.27022 9.219 8.88622 9.889 10.1512 10.748L11.1962 11.452L8.19322 15.939H5.94922L8.64422 11.925C7.09422 10.814 6.22422 9.735 6.22422 7.91C6.22422 5.622 7.81922 4.06 10.8442 4.06H13.8472V15.928H11.7792V5.666Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_3518_13869">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
