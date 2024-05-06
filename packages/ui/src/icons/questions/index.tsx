import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const QuestionsIcon = icon(({ ...props }) => (
  <Icon size={36} viewBox="0 0 36 36" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#121825' } = { fill: '#121825' }) => (
        <>
          <rect width="36" height="36" rx="10" fill={fill} />
          <path
            d="M17.3277 25.659C17.2578 26.1752 16.9838 26.6423 16.5663 26.9575C16.1487 27.2726 15.6216 27.4101 15.101 27.3395C14.5804 27.269 14.1089 26.9962 13.7902 26.5813C13.4715 26.1664 13.3318 25.6432 13.4018 25.127C13.4717 24.6107 13.7456 24.1436 14.1632 23.8285C14.5808 23.5133 15.1079 23.3759 15.6285 23.4464C16.1491 23.517 16.6206 23.7897 16.9393 24.2047C17.258 24.6196 17.3977 25.1427 17.3277 25.659ZM15.8884 22.0719C14.7812 21.9218 13.9937 20.977 14.1312 19.9625L14.4256 17.7901C14.6074 16.4486 15.8123 15.44 17.2854 15.3914C18.5375 15.3509 19.5533 14.4872 19.7082 13.3442L19.8394 12.3756C20.0182 11.0566 19.0346 9.8061 17.6404 9.58545C16.9565 9.47193 16.2555 9.62463 15.6835 10.0117C15.1233 10.3933 14.7669 10.9579 14.6801 11.5987C14.5427 12.6125 13.532 13.3144 12.4249 13.1644C11.3178 13.0143 10.5218 12.0676 10.6602 11.046C10.8822 9.40784 11.7983 7.96361 13.2268 6.99319C14.6641 6.02239 16.4374 5.6347 18.2225 5.91545C21.7756 6.46671 24.3 9.61095 23.8528 12.9115L23.7205 13.8879C23.3663 16.5017 21.2329 18.5374 18.4909 19.0047C18.4485 19.0116 18.4095 19.0318 18.3795 19.0622C18.3495 19.0926 18.3301 19.1318 18.324 19.174L18.1445 20.4992C18.006 21.5207 16.9963 22.222 15.8884 22.0719Z"
            fill="#1C64F2"
          />
          <path
            d="M9.65699 24.8471C9.69852 25.1092 9.63881 25.3764 9.49099 25.5898C9.34317 25.8033 9.11935 25.9455 8.86876 25.9852C8.61817 26.0249 8.36135 25.9589 8.15479 25.8016C7.94822 25.6443 7.80884 25.4087 7.7673 25.1465C7.72577 24.8844 7.78548 24.6172 7.9333 24.4038C8.08112 24.1903 8.30494 24.0481 8.55553 24.0084C8.80612 23.9687 9.06294 24.0347 9.2695 24.192C9.47607 24.3493 9.61545 24.5849 9.65699 24.8471ZM8.47891 23.2999C7.94602 23.3844 7.44707 23.035 7.36544 22.5199L7.19066 21.4168C7.08272 20.7356 7.49505 20.0713 8.16858 19.8377C8.74118 19.6395 9.08686 19.0729 8.9949 18.4925L8.91696 18.0007C8.81084 17.3309 8.17759 16.8602 7.50198 16.951C7.16984 16.993 6.86785 17.1675 6.65901 17.438C6.45479 17.7042 6.37094 18.0308 6.42249 18.3562C6.50406 18.871 6.1376 19.3578 5.60471 19.4423C5.07182 19.5267 4.56865 19.1776 4.48646 18.6589C4.35465 17.8271 4.57126 16.9911 5.0923 16.3136C5.61738 15.6346 6.38109 15.1926 7.24585 15.0754C8.96606 14.8385 10.582 16.0148 10.8476 17.6907L10.9262 18.1865C11.1365 19.5137 10.4422 20.812 9.24238 21.4309C9.22379 21.4404 9.20864 21.4558 9.19913 21.4749C9.18962 21.494 9.18625 21.5159 9.18951 21.5374L9.29613 22.2103C9.37833 22.729 9.01218 23.2154 8.47891 23.2999Z"
            fill="#1C64F2"
          />
          <path
            d="M27.0916 30.364C27.0384 30.6642 26.8734 30.9318 26.633 31.1081C26.3925 31.2844 26.0962 31.3549 25.8092 31.3041C25.5223 31.2533 25.2683 31.0853 25.103 30.8371C24.9377 30.5889 24.8747 30.2808 24.9279 29.9807C24.981 29.6805 25.146 29.4128 25.3865 29.2365C25.627 29.0602 25.9233 28.9898 26.2102 29.0406C26.4972 29.0914 26.7512 29.2594 26.9165 29.5076C27.0818 29.7558 27.1448 30.0638 27.0916 30.364ZM26.3926 28.2427C25.7825 28.1346 25.3718 27.5684 25.4763 26.9785L25.7 25.7155C25.8382 24.9354 26.5349 24.3688 27.3537 24.3677C28.0496 24.3672 28.6373 23.8817 28.755 23.2171L28.8548 22.6539C28.9906 21.8871 28.4796 21.1387 27.7121 20.984C27.3358 20.9051 26.9425 20.9812 26.6144 21.1967C26.2929 21.4091 26.0794 21.7322 26.0134 22.1048C25.909 22.6942 25.3286 23.0854 24.7185 22.9773C24.1083 22.8692 23.6929 22.3016 23.7981 21.7077C23.9669 20.7552 24.5154 19.9288 25.3351 19.3886C26.1596 18.8483 27.1544 18.6548 28.1372 18.8518C30.0935 19.2394 31.4069 21.1222 31.0669 23.0412L30.9663 23.6089C30.6971 25.1286 29.4567 26.2778 27.9221 26.4999C27.8984 26.5032 27.8762 26.5142 27.8587 26.5314C27.8412 26.5486 27.8293 26.5712 27.8248 26.5957L27.6883 27.3662C27.5831 27.9601 27.0033 28.3509 26.3926 28.2427Z"
            fill="#1C64F2"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
