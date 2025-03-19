import { Icon, icon, IconConsumer } from '@bothub-chat/ui';

export const SpeechSynthesys = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.668 2.66406L19.5727 4.95808C19.6562 5.16984 19.698 5.27572 19.7619 5.365C19.8186 5.44413 19.8879 5.51342 19.967 5.5701C20.0563 5.63404 20.1622 5.6758 20.374 5.75932L22.668 6.66406L20.374 7.56882C20.1622 7.65233 20.0563 7.69406 19.967 7.75802C19.8879 7.81468 19.8186 7.88397 19.7619 7.96313C19.698 8.05242 19.6562 8.15828 19.5727 8.37006L18.668 10.6641L17.7632 8.37006C17.6797 8.15828 17.6379 8.05242 17.574 7.96313C17.5173 7.88397 17.448 7.81468 17.3689 7.75802C17.2796 7.69406 17.1737 7.65233 16.962 7.56882L14.668 6.66406L16.962 5.75932C17.1737 5.6758 17.2796 5.63404 17.3689 5.5701C17.448 5.51342 17.5173 5.44413 17.574 5.365C17.6379 5.27572 17.6797 5.16984 17.7632 4.95808L18.668 2.66406Z"
            fill={fill}
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g clipPath="url(#clip0_9047_11263)">
            <path
              d="M6.94824 20.045V19.5015L6.40532 19.4743C4.84147 19.3962 3.36052 18.6902 2.27193 17.4938C1.18261 16.2966 0.57114 14.7009 0.571429 13.0368V13.0367C0.571429 12.9765 0.582769 12.9175 0.604216 12.8633C0.62565 12.8091 0.656414 12.7615 0.693519 12.7226C0.730574 12.6838 0.773109 12.6545 0.817963 12.635C0.862745 12.6156 0.909744 12.606 0.956522 12.606C1.0033 12.606 1.0503 12.6156 1.09508 12.635C1.13994 12.6545 1.18247 12.6838 1.21952 12.7226C1.25663 12.7615 1.28739 12.8091 1.30883 12.8633C1.33027 12.9175 1.34162 12.9765 1.34162 13.0367C1.34162 14.5088 1.89954 15.9257 2.90048 16.9744C3.90228 18.024 5.26685 18.6189 6.69565 18.6189H7.97101C9.39981 18.6189 10.7644 18.024 11.7662 16.9744C12.7671 15.9257 13.3251 14.5088 13.3251 13.0367C13.3251 12.9141 13.3718 12.8016 13.4471 12.7226C13.5216 12.6446 13.6168 12.606 13.7101 12.606C13.8035 12.606 13.8987 12.6446 13.9731 12.7226C14.0485 12.8016 14.0952 12.9141 14.0952 13.0367C14.0952 14.7005 13.4836 16.2959 12.3943 17.4929C11.3058 18.689 9.825 19.3949 8.26135 19.473L7.71843 19.5001V20.0437V21.6645C7.71843 21.7871 7.67169 21.8997 7.59634 21.9786C7.52184 22.0566 7.42665 22.0952 7.33333 22.0952C7.24002 22.0952 7.14482 22.0566 7.07033 21.9786C6.99498 21.8997 6.94824 21.7871 6.94824 21.6645V20.045ZM5.08994 5.5475C5.68966 4.91917 6.49723 4.57143 7.33333 4.57143C8.16944 4.57143 8.977 4.91917 9.57673 5.5475L9.97963 5.16293L9.57673 5.5475C10.1773 6.17673 10.5191 7.03561 10.5191 7.93644V12.5129C10.5191 12.9584 10.4353 13.399 10.2731 13.8092C10.111 14.2194 9.8739 14.5905 9.57673 14.9018C9.27961 15.2131 8.92832 15.4586 8.54367 15.6255C8.15909 15.7924 7.7479 15.8779 7.33333 15.8779C6.91876 15.8779 6.50757 15.7924 6.12299 15.6255C5.73834 15.4586 5.38706 15.2131 5.08994 14.9018C4.79277 14.5905 4.5557 14.2194 4.39352 13.8092C4.23133 13.399 4.14754 12.9584 4.14754 12.5129V7.93644C4.14754 7.03561 4.48935 6.17673 5.08994 5.5475Z"
              fill={fill}
              stroke={fill}
              strokeWidth="1.14286"
            />
          </g>
          <defs>
            <clipPath id="clip0_9047_11263">
              <rect
                width="14.6667"
                height="18.6667"
                fill={fill}
                transform="translate(0 4)"
              />
            </clipPath>
          </defs>
        </svg>
      )}
    </IconConsumer>
  </Icon>
));
