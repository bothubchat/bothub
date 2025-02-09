import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const ReferalIcon = icon(({ ...props }) => {
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
          { fill = theme.colors.grayScale.gray1 } = {
            fill: theme.colors.grayScale.gray1
          }
        ) => (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.625 2.25C9.36228 2.25006 10.0793 2.49143 10.6665 2.93725C11.2537 3.38308 11.6788 4.00885 11.877 4.719L11.916 4.87275L13.3185 4.5225C13.421 4.49698 13.5278 4.49341 13.6317 4.51202C13.7357 4.53062 13.8346 4.57099 13.9219 4.63046C14.0092 4.68994 14.083 4.76719 14.1384 4.85715C14.1937 4.94712 14.2295 5.04776 14.2433 5.1525L14.25 5.25V6.6075C14.6728 7.0129 15.0193 7.491 15.273 8.019L15.3765 8.25H15.75C15.9337 8.25002 16.111 8.31747 16.2483 8.43954C16.3856 8.56161 16.4733 8.72981 16.4948 8.91225L16.5 9V11.25C16.5 11.3734 16.4696 11.495 16.4113 11.6038C16.3531 11.7127 16.2689 11.8055 16.1663 11.874L16.0853 11.9205L15.2093 12.3593C14.8506 13.0531 14.3312 13.651 13.6943 14.103L13.5 14.2335V15C13.5 15.1837 13.4325 15.361 13.3105 15.4983C13.1884 15.6356 13.0202 15.7233 12.8378 15.7448L12.75 15.75H10.5C10.3163 15.75 10.139 15.6825 10.0017 15.5605C9.86444 15.4384 9.77674 15.2702 9.75525 15.0878L9.75 15H9C8.99998 15.1837 8.93253 15.361 8.81046 15.4983C8.6884 15.6356 8.52019 15.7233 8.33775 15.7448L8.25 15.75H6C5.8163 15.75 5.639 15.6825 5.50172 15.5605C5.36445 15.4384 5.27674 15.2702 5.25525 15.0878L5.25 15V14.2335C4.70819 13.8871 4.24016 13.4371 3.87283 12.9092C3.50549 12.3814 3.24608 11.7862 3.1095 11.1578C2.66725 11.0261 2.27611 10.7618 1.98904 10.4005C1.70197 10.0393 1.53282 9.59856 1.5045 9.138L1.5 9V8.625C1.50021 8.43384 1.57341 8.24998 1.70464 8.11097C1.83586 7.97197 2.01521 7.88832 2.20605 7.87712C2.39688 7.86592 2.58478 7.92801 2.73137 8.0507C2.87796 8.17339 2.97217 8.34743 2.99475 8.53725L3 8.625V9C3 9.111 3.024 9.21675 3.0675 9.31125C3.18198 8.63603 3.43735 7.99249 3.817 7.4225C4.19664 6.85251 4.69206 6.36885 5.271 6.003C5.21779 5.53086 5.26486 5.05281 5.40914 4.60012C5.55342 4.14743 5.79166 3.73031 6.10826 3.37604C6.42487 3.02177 6.8127 2.73834 7.2464 2.5443C7.68009 2.35025 8.14987 2.24997 8.625 2.25ZM12 8.25C11.8011 8.25 11.6103 8.32902 11.4697 8.46967C11.329 8.61032 11.25 8.80109 11.25 9C11.25 9.19891 11.329 9.38968 11.4697 9.53033C11.6103 9.67098 11.8011 9.75 12 9.75C12.1989 9.75 12.3897 9.67098 12.5303 9.53033C12.671 9.38968 12.75 9.19891 12.75 9C12.75 8.80109 12.671 8.61032 12.5303 8.46967C12.3897 8.32902 12.1989 8.25 12 8.25ZM8.625 3.75C8.17072 3.75 7.73189 3.91493 7.39006 4.21413C7.04823 4.51334 6.82665 4.92647 6.7665 5.37675C7.12995 5.29235 7.50187 5.24982 7.875 5.25H10.4078L10.4602 5.23725C10.3713 4.81647 10.1404 4.43905 9.80628 4.16828C9.47215 3.8975 9.05508 3.74982 8.625 3.75Z"
            fill={fill}
          />
        )}
      </IconConsumer>
    </Icon>
  );
});
