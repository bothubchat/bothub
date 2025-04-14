import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const SpeechSynthesysIcon = icon(({ ...props }) => {
  const theme = useTheme();

  const fillColor = theme.colors.base.white;

  return (
    <Icon
      size={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {({ fill = fillColor } = { fill: fillColor }) => (
          <>
            <path
              d="M18.666 2.66675L19.5708 4.96076C19.6543 5.17252 19.696 5.2784 19.76 5.36768C19.8166 5.44682 19.8859 5.51611 19.9651 5.57279C20.0544 5.63673 20.1602 5.67849 20.372 5.762L22.666 6.66675L20.372 7.5715C20.1602 7.65501 20.0544 7.69675 19.9651 7.7607C19.8859 7.81737 19.8166 7.88666 19.76 7.96582C19.696 8.0551 19.6543 8.16097 19.5708 8.37275L18.666 10.6667L17.7613 8.37275C17.6778 8.16097 17.636 8.0551 17.5721 7.96582C17.5154 7.88666 17.4461 7.81737 17.3669 7.7607C17.2777 7.69675 17.1718 7.65501 16.96 7.5715L14.666 6.66675L16.96 5.762C17.1718 5.67849 17.2777 5.63673 17.3669 5.57279C17.4461 5.51611 17.5154 5.44682 17.5721 5.36768C17.636 5.2784 17.6778 5.17252 17.7613 4.96076L18.666 2.66675Z"
              fill={fill}
              stroke={fill}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g clipPath="url(#clip0_9041_376766)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.33333 4C6.33686 4 5.38119 4.41473 4.67658 5.15296C3.97196 5.89118 3.57612 6.89243 3.57612 7.93644V12.5129C3.57612 13.0298 3.6733 13.5417 3.86212 14.0193C4.05094 14.4969 4.32769 14.9309 4.67658 15.2964C5.02547 15.6619 5.43966 15.9519 5.89551 16.1497C6.35136 16.3475 6.83993 16.4493 7.33333 16.4493C7.82674 16.4493 8.31531 16.3475 8.77116 16.1497C9.22701 15.9519 9.6412 15.6619 9.99009 15.2964C10.339 14.9309 10.6157 14.4969 10.8046 14.0193C10.9934 13.5417 11.0906 13.0298 11.0906 12.5129V7.93644C11.0906 6.89243 10.6947 5.89118 9.99009 5.15296C9.28547 4.41473 8.32981 4 7.33333 4ZM6.37681 20.045V21.6645C6.37681 21.9303 6.47759 22.1852 6.65697 22.3731C6.83635 22.5611 7.07965 22.6667 7.33333 22.6667C7.58702 22.6667 7.83031 22.5611 8.0097 22.3731C8.18908 22.1852 8.28986 21.9303 8.28986 21.6645V20.0437C10.0085 19.9579 11.6296 19.1822 12.817 17.8775C14.0043 16.5728 14.6667 14.8394 14.6667 13.0367C14.6667 12.7709 14.5659 12.516 14.3865 12.3281C14.2071 12.1401 13.9638 12.0345 13.7101 12.0345C13.4565 12.0345 13.2132 12.1401 13.0338 12.3281C12.8544 12.516 12.7536 12.7709 12.7536 13.0367C12.7536 14.3656 12.2497 15.6401 11.3528 16.5798C10.4559 17.5195 9.23944 18.0474 7.97101 18.0474H6.69565C5.42723 18.0474 4.21075 17.5195 3.31384 16.5798C2.41692 15.6401 1.91304 14.3656 1.91304 13.0367C1.91304 12.9051 1.8883 12.7748 1.84023 12.6532C1.79216 12.5316 1.72171 12.4211 1.63289 12.3281C1.54406 12.235 1.43862 12.1612 1.32257 12.1108C1.20652 12.0605 1.08213 12.0345 0.956522 12.0345C0.83091 12.0345 0.706527 12.0605 0.590477 12.1108C0.474426 12.1612 0.36898 12.235 0.280159 12.3281C0.191338 12.4211 0.120881 12.5316 0.0728111 12.6532C0.0247413 12.7748 1.09223e-07 12.9051 1.11095e-07 13.0367C-0.00031316 14.8396 0.661917 16.5734 1.84927 17.8783C3.03663 19.1833 4.65795 19.9592 6.37681 20.045Z"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_9041_376766">
                <rect
                  width="14.6667"
                  height="18.6667"
                  fill="white"
                  transform="translate(0 4)"
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
