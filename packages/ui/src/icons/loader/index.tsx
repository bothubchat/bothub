import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const LoaderIcon = icon(({ ...props }) => (
  <Icon
    size={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <>
          <g clipPath="url(#clip0_1252_42784)">
            <path
              d="M8 0C7.78783 0 7.58434 0.0842854 7.43431 0.234315C7.28429 0.384344 7.2 0.587827 7.2 0.8V2.4C7.2 2.61217 7.28429 2.81566 7.43431 2.96569C7.58434 3.11571 7.78783 3.2 8 3.2C8.21217 3.2 8.41566 3.11571 8.56569 2.96569C8.71571 2.81566 8.8 2.61217 8.8 2.4V0.8C8.8 0.587827 8.71571 0.384344 8.56569 0.234315C8.41566 0.0842854 8.21217 0 8 0ZM15.2 7.2H13.6C13.3878 7.2 13.1843 7.28429 13.0343 7.43431C12.8843 7.58434 12.8 7.78783 12.8 8C12.8 8.21217 12.8843 8.41566 13.0343 8.56569C13.1843 8.71571 13.3878 8.8 13.6 8.8H15.2C15.4122 8.8 15.6157 8.71571 15.7657 8.56569C15.9157 8.41566 16 8.21217 16 8C16 7.78783 15.9157 7.58434 15.7657 7.43431C15.6157 7.28429 15.4122 7.2 15.2 7.2ZM3.2 8C3.2 7.78783 3.11571 7.58434 2.96569 7.43431C2.81566 7.28429 2.61217 7.2 2.4 7.2H0.8C0.587827 7.2 0.384344 7.28429 0.234315 7.43431C0.0842854 7.58434 0 7.78783 0 8C0 8.21217 0.0842854 8.41566 0.234315 8.56569C0.384344 8.71571 0.587827 8.8 0.8 8.8H2.4C2.61217 8.8 2.81566 8.71571 2.96569 8.56569C3.11571 8.41566 3.2 8.21217 3.2 8ZM3.376 2.4C3.22005 2.25254 3.01191 2.17307 2.79737 2.17907C2.58283 2.18507 2.37946 2.27605 2.232 2.432C2.08454 2.58795 2.00507 2.79609 2.01107 3.01063C2.01707 3.22517 2.10805 3.42854 2.264 3.576L3.416 4.688C3.49331 4.76265 3.58486 4.82095 3.6852 4.85944C3.78554 4.89793 3.8926 4.9158 4 4.912C4.10776 4.91159 4.21433 4.88941 4.31331 4.84679C4.41229 4.80418 4.50164 4.742 4.576 4.664C4.725 4.51411 4.80863 4.31135 4.80863 4.1C4.80863 3.88865 4.725 3.68589 4.576 3.536L3.376 2.4ZM12 4.912C12.206 4.91118 12.4037 4.83094 12.552 4.688L13.704 3.576C13.8445 3.42916 13.9239 3.23434 13.926 3.0311C13.9281 2.82785 13.8527 2.63144 13.7153 2.48174C13.5778 2.33203 13.3885 2.24028 13.1858 2.22509C12.9831 2.20991 12.7822 2.27245 12.624 2.4L11.472 3.536C11.323 3.68589 11.2394 3.88865 11.2394 4.1C11.2394 4.31135 11.323 4.51411 11.472 4.664C11.6105 4.81017 11.7991 4.89874 12 4.912ZM8 12.8C7.78783 12.8 7.58434 12.8843 7.43431 13.0343C7.28429 13.1843 7.2 13.3878 7.2 13.6V15.2C7.2 15.4122 7.28429 15.6157 7.43431 15.7657C7.58434 15.9157 7.78783 16 8 16C8.21217 16 8.41566 15.9157 8.56569 15.7657C8.71571 15.6157 8.8 15.4122 8.8 15.2V13.6C8.8 13.3878 8.71571 13.1843 8.56569 13.0343C8.41566 12.8843 8.21217 12.8 8 12.8ZM12.584 11.312C12.4312 11.1645 12.2261 11.0838 12.0139 11.0876C11.8016 11.0913 11.5995 11.1792 11.452 11.332C11.3045 11.4848 11.2238 11.6899 11.2276 11.9021C11.2313 12.1144 11.3192 12.3165 11.472 12.464L12.624 13.6C12.7723 13.7429 12.97 13.8232 13.176 13.824C13.2832 13.8246 13.3894 13.8037 13.4884 13.7625C13.5873 13.7212 13.677 13.6606 13.752 13.584C13.827 13.5096 13.8865 13.4211 13.9271 13.3237C13.9677 13.2262 13.9886 13.1216 13.9886 13.016C13.9886 12.9104 13.9677 12.8058 13.9271 12.7083C13.8865 12.6109 13.827 12.5224 13.752 12.448L12.584 11.312ZM3.416 11.312L2.264 12.424C2.18902 12.4984 2.1295 12.5869 2.08889 12.6843C2.04827 12.7818 2.02736 12.8864 2.02736 12.992C2.02736 13.0976 2.04827 13.2022 2.08889 13.2997C2.1295 13.3971 2.18902 13.4856 2.264 13.56C2.33903 13.6366 2.42869 13.6972 2.52764 13.7385C2.62658 13.7797 2.73281 13.8006 2.84 13.8C3.03721 13.8017 3.22809 13.7305 3.376 13.6L4.528 12.488C4.68076 12.3405 4.76869 12.1384 4.77245 11.9261C4.7762 11.7139 4.69546 11.5088 4.548 11.356C4.40054 11.2032 4.19843 11.1153 3.98614 11.1116C3.77385 11.1078 3.56876 11.1885 3.416 11.336V11.312Z"
              fill={fill}
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 8 8"
                to="360 8 8"
                dur="3.35s"
                repeatCount="indefinite"
              />
            </path>
          </g>
          <defs>
            <clipPath id="clip0_1252_42784">
              <rect
                width="16"
                height="16"
                fill="white"
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
