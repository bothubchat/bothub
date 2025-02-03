import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const AnalyzeUrlsIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 14 14" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <>
          <path fillRule="evenodd" clipRule="evenodd" d="M4.79924 6.29926C5.18405 5.91459 5.70588 5.69849 6.24998 5.69849L4.79924 6.29926ZM2.54924 8.54926C2.54922 8.54928 2.54926 8.54924 2.54924 8.54926L4.79924 6.29926L2.54924 8.54926ZM2.54924 8.54926C2.16457 8.93406 1.94847 9.45589 1.94847 9.99999C1.94847 10.5441 2.16459 11.066 2.5493 11.4508C2.9341 11.8354 3.4559 12.0515 3.99998 12.0515C4.54408 12.0515 5.06591 11.8354 5.45072 11.4507C5.4507 11.4507 5.45073 11.4507 5.45072 11.4507L6.57572 10.3257C6.81003 10.0914 7.18993 10.0914 7.42424 10.3257C7.65856 10.56 7.65856 10.9399 7.42424 11.1743L6.29924 12.2993C5.6894 12.9089 4.86232 13.2515 3.99998 13.2515C3.13764 13.2515 2.31061 12.909 1.70077 12.2993C1.09109 11.6895 0.748474 10.8623 0.748474 10C0.748474 9.13766 1.09098 8.31063 1.70066 7.70079L3.95072 5.45073C4.56056 4.84105 5.38764 4.49849 6.24998 4.49849C7.11232 4.49849 7.93934 4.84099 8.54919 5.45068C8.78353 5.68496 8.78358 6.06486 8.5493 6.2992C8.31502 6.53355 7.93512 6.5336 7.70077 6.29932C7.31596 5.91461 6.79411 5.69849 6.24998 5.69849" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M8.54919 2.54931C8.54917 2.54933 8.54921 2.5493 8.54919 2.54931L7.42424 3.67426C7.18993 3.90857 6.81003 3.90857 6.57572 3.67426C6.3414 3.43994 6.3414 3.06005 6.57572 2.82573L7.70072 1.70073C8.31056 1.09105 9.13764 0.748489 9.99998 0.748489C10.8623 0.748489 11.6893 1.09099 12.2992 1.70067C12.9089 2.31052 13.2515 3.13766 13.2515 3.99999C13.2515 4.86233 12.909 5.68936 12.2993 6.2992L10.0492 8.54926C9.4394 9.15894 8.61232 9.5015 7.74998 9.5015C6.88764 9.5015 6.06061 9.159 5.45077 8.54931C5.21643 8.31503 5.21638 7.93513 5.45066 7.70079C5.68494 7.46644 6.06484 7.46639 6.29919 7.70068C6.684 8.08538 7.20585 8.3015 7.74998 8.3015C8.29408 8.3015 8.81591 8.0854 9.20072 7.70073M9.20072 7.70073L11.4507 5.45079C11.4506 5.45081 11.4507 5.45077 11.4507 5.45079C11.8353 5.06598 12.0515 4.5441 12.0515 3.99999C12.0515 3.45586 11.8354 2.93401 11.4507 2.5492C11.0659 2.16457 10.5441 1.94849 9.99998 1.94849C9.45588 1.94849 8.93399 2.16464 8.54919 2.54931" fill={fill} />
        </>
      )}
    </IconConsumer>
  </Icon>
));
