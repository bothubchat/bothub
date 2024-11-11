import React from 'react';
import { LogoStyled } from './styled';
import { useTheme } from '@/ui/theme';
import { LogoProps } from '@/ui/components/logo';

export const LogoHalloween: React.FC<LogoProps> = ({ size = 29 }) => {
  const theme = useTheme();

  let fill: string;
  switch (theme.mode) {
    case 'dark':
      fill = '#FFFFFF';
      break;
    case 'light':
      fill = '#133985';
      break;
  }

  return (
    <LogoStyled
      width={size * 3.3448}
      height={size}
      viewBox="0 0 103 32"
      fill="none"
    >
      <path
        d="M0 24.8841V7.375H7.5216C9.25071 7.375 10.7204 7.84305 11.9308 8.77914C13.1503 9.7071 13.76 10.8141 13.76 12.1003C13.76 12.8491 13.5189 13.5614 13.0365 14.237C12.5633 14.9045 11.9627 15.3685 11.2346 15.6289C12.2357 15.8406 13.0502 16.333 13.6781 17.1063C14.3061 17.8796 14.62 18.7872 14.62 19.8292C14.62 21.2536 14.0057 22.4543 12.7772 23.4311C11.5486 24.3997 10.0789 24.8841 8.36795 24.8841H0ZM4.75049 14.2614H7.30319C7.78552 14.2614 8.19049 14.123 8.51811 13.8463C8.84573 13.5695 9.00954 13.2317 9.00954 12.8328C9.00954 12.4503 8.84118 12.1206 8.50446 11.8438C8.17684 11.5671 7.77642 11.4287 7.30319 11.4287H4.75049V14.2614ZM4.75049 20.8304H7.94478C8.47261 20.8304 8.91854 20.6676 9.28256 20.342C9.65568 20.0164 9.84224 19.6216 9.84224 19.1576C9.84224 18.6936 9.66023 18.2988 9.29621 17.9732C8.94129 17.6476 8.50901 17.4848 7.99938 17.4848H4.75049V20.8304Z"
        fill={fill}
      />
      <path
        d="M17.5451 14.1515C18.9102 12.9224 20.6075 12.3078 22.6369 12.3078C24.6663 12.3078 26.3681 12.9224 27.7423 14.1515C29.1165 15.3807 29.8036 16.915 29.8036 18.7547C29.8036 19.9513 29.4896 21.0379 28.8617 22.0147C28.2337 22.9915 27.3737 23.7567 26.2817 24.3102C25.1896 24.8556 23.9747 25.1283 22.6369 25.1283C20.6075 25.1283 18.9102 24.5218 17.5451 23.309C16.1891 22.0961 15.5112 20.578 15.5112 18.7547C15.5112 16.9069 16.1891 15.3725 17.5451 14.1515ZM22.6369 16.154C21.8542 16.154 21.2035 16.4022 20.6848 16.8988C20.1661 17.3872 19.9067 18.0058 19.9067 18.7547C19.9067 19.4791 20.1661 20.0815 20.6848 20.5618C21.2035 21.042 21.8542 21.2821 22.6369 21.2821C23.4377 21.2821 24.0975 21.042 24.6163 20.5618C25.1441 20.0815 25.408 19.4791 25.408 18.7547C25.408 18.0058 25.1441 17.3872 24.6163 16.8988C24.0975 16.4022 23.4377 16.154 22.6369 16.154Z"
        fill={fill}
      />
      <path
        d="M40.3595 16.4104H37.0833V19.5605C37.0833 20.1222 37.2926 20.5495 37.7112 20.8426C38.1298 21.1356 38.6668 21.2821 39.322 21.2821C39.7315 21.2821 40.0774 21.2496 40.3595 21.1845V24.8841C39.8407 25.0143 39.1491 25.0794 38.2845 25.0794C36.5827 25.0794 35.2131 24.5951 34.1757 23.6264C33.1382 22.6497 32.6195 21.3188 32.6195 19.6338V16.4104H30.0941V12.552H32.6195V9.40185H37.0833V12.552H40.3595V16.4104Z"
        fill={fill}
      />
      <path
        d="M64.5352 2.5H83.6486M68.7826 1H79.4011"
        stroke="#1ABB34"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="45.3594"
        y="2.5"
        width="57.4669"
        height="29"
        rx="4"
        fill="#F29C1C"
      />
      <path
        d="M78.8077 11.0882C78.7865 11.0577 78.7737 11.0227 78.7707 10.9863C78.7677 10.95 78.7745 10.9135 78.7905 10.8802C78.8065 10.847 78.8312 10.8182 78.8623 10.7964C78.8934 10.7746 78.9298 10.7606 78.9681 10.7557C81.475 9.71372 84.1665 8.68746 86.8627 8.10215C87.1911 8.03089 87.2871 7.98085 87.3855 8.33116C87.5202 8.81038 83.2916 14.1215 82.5288 14.0454C81.8825 13.9809 79.2623 11.9606 78.8077 11.0882Z"
        fill="#211715"
      />
      <path
        d="M69.994 11.0882C70.0152 11.0577 70.0279 11.0226 70.0309 10.9863C70.0339 10.9499 70.027 10.9134 70.011 10.8802C69.9949 10.8471 69.9702 10.8182 69.9392 10.7964C69.9081 10.7746 69.8717 10.7606 69.8334 10.7557C67.2645 9.80481 64.635 8.68746 61.9388 8.10215C61.6107 8.03089 61.5144 7.98085 61.416 8.33116C61.2813 8.81038 65.5102 14.1215 66.2728 14.0454C66.919 13.9809 69.5395 11.9606 69.994 11.0882Z"
        fill="#0E0C15"
      />
      <path
        d="M79.3752 10.9415C79.3403 10.8662 79.3381 10.8547 79.3686 10.9069L79.2883 11.1862L79.1252 11.2898L79.2655 11.234C79.3343 11.2058 79.4022 11.1754 79.4702 11.1461C79.6074 11.0875 79.7448 11.0294 79.8826 10.9717C80.1602 10.8555 80.4387 10.7411 80.7182 10.6286C81.2732 10.406 81.8322 10.1936 82.3951 9.99161C83.5483 9.5765 84.7201 9.20498 85.9114 8.89917C86.169 8.83322 86.4276 8.77034 86.6872 8.71053C86.8219 8.67986 86.9566 8.64941 87.0915 8.62059C87.1331 8.61576 87.1741 8.60727 87.214 8.59522C87.0761 8.6644 86.8711 8.47161 86.8035 8.41626C86.8229 8.43194 86.792 8.54725 86.8116 8.41464C86.8244 8.32862 86.8028 8.33393 86.8026 8.36668C86.8026 8.36345 86.855 8.21262 86.8121 8.28112C86.8018 8.30344 86.7936 8.3266 86.7876 8.3503C86.7475 8.46561 86.8528 8.23776 86.7942 8.33531C86.5787 8.69392 86.3659 9.04677 86.1213 9.38993C85.4104 10.3912 84.6329 11.349 83.7934 12.2577C83.4584 12.6358 83.0962 12.9918 82.7093 13.3231C82.6726 13.3536 82.6341 13.3822 82.5974 13.4126C82.4995 13.4926 82.6794 13.363 82.5996 13.4126C82.5326 13.4449 82.4687 13.4827 82.4086 13.5254C82.3841 13.5484 82.5646 13.4779 82.4652 13.5023C82.355 13.5291 82.6202 13.4943 82.5433 13.4945C82.7323 13.4945 82.6577 13.5122 82.5793 13.4908C82.4414 13.4534 82.6528 13.5369 82.533 13.4746C81.8955 13.1382 81.2996 12.736 80.7566 12.2754C80.4316 12.0126 80.121 11.7344 79.8261 11.4417C79.6176 11.2617 79.4446 11.0483 79.315 10.8115C78.9709 10.1768 77.9564 10.7363 78.3002 11.37C78.644 12.0038 79.2841 12.5273 79.84 12.9885C80.4467 13.5258 81.1181 13.9943 81.8405 14.3844C82.3302 14.6284 82.7573 14.6674 83.2167 14.3522C83.6773 14.014 84.0978 13.63 84.471 13.2069C85.4706 12.1424 86.3898 11.0134 87.222 9.82811C87.5172 9.46246 87.7547 9.05854 87.9271 8.62889C87.969 8.49554 87.979 8.35507 87.9563 8.21763C87.9336 8.0802 87.8788 7.94923 87.7958 7.83418C87.4356 7.31575 86.7764 7.55167 86.2631 7.67136C84.7313 8.03719 83.2262 8.49585 81.7572 9.04447C81.0319 9.31129 80.3124 9.59449 79.5998 9.88876C79.0084 10.1328 77.9076 10.412 78.2407 11.2383C78.2858 11.3777 78.3858 11.4954 78.5203 11.5673C78.6548 11.6392 78.8134 11.6598 78.9636 11.6249C79.1141 11.5852 79.2418 11.4911 79.319 11.3631C79.3961 11.2351 79.4163 11.0835 79.3752 10.9415Z"
        fill="#211715"
      />
      <path
        d="M70.5609 11.2353C70.8521 10.513 70.0557 10.2437 69.5121 10.0149C68.8548 9.73939 68.1926 9.47471 67.5254 9.22088C66.2209 8.72054 64.8891 8.28575 63.5357 7.91834C63.2232 7.8347 62.9094 7.75576 62.5941 7.6815C62.3014 7.59381 62.0003 7.53303 61.6952 7.5C61.5777 7.50168 61.4618 7.52539 61.3542 7.56975C61.2466 7.6141 61.1495 7.67821 61.0685 7.75832C60.9875 7.83843 60.9243 7.93294 60.8826 8.03632C60.8408 8.13971 60.8213 8.24989 60.8253 8.36044C60.8253 8.75503 61.1324 9.15999 61.3445 9.48125C62.1374 10.6551 63.0197 11.7732 63.9843 12.8268C64.3725 13.2772 64.7948 13.7006 65.2479 14.0936C65.6138 14.3978 66.0208 14.6948 66.536 14.5565C66.8823 14.4422 67.2075 14.2776 67.4996 14.0685C67.9175 13.7958 68.3205 13.5033 68.7069 13.1921C69.3502 12.6802 70.1116 12.0852 70.5017 11.3663C70.8445 10.7333 69.8312 10.1724 69.4866 10.8078C69.3798 11.0103 69.2362 11.1936 69.0622 11.3495C68.813 11.6085 68.5448 11.8513 68.2696 12.0854C67.7512 12.5425 67.1876 12.9518 66.5865 13.3077C66.4885 13.3633 66.3891 13.4131 66.2887 13.4636C66.1464 13.5355 66.3323 13.4594 66.2542 13.4786C66.1988 13.4922 66.0947 13.4908 66.2003 13.4998C66.2228 13.5019 66.3844 13.5106 66.3472 13.5021C66.2517 13.4809 66.38 13.5007 66.4053 13.5279C66.3469 13.4851 66.2836 13.4485 66.2167 13.4188C66.1045 13.3543 66.2977 13.4839 66.2201 13.4221C66.1831 13.3925 66.1467 13.3639 66.1089 13.3342C66.0201 13.2615 65.9343 13.1852 65.8499 13.108C65.664 12.9373 65.4862 12.759 65.3111 12.5775C64.4528 11.6791 63.658 10.7287 62.9316 9.73239C62.6398 9.35048 62.3701 8.95409 62.1235 8.54493C62.0853 8.47944 62.0529 8.41071 62.0142 8.34568C61.9481 8.23429 62.0338 8.43793 62.0231 8.36874C62.0187 8.3413 61.9956 8.31593 61.9937 8.28779C61.9868 8.18794 62.0008 8.35329 62.0013 8.37128C62.0013 8.36367 62.0013 8.35652 62.0013 8.34822C61.9949 8.63695 61.9658 8.44046 62.0059 8.40287C61.919 8.48497 61.7336 8.5168 61.6503 8.60282C61.5132 8.54932 61.6332 8.62058 61.6503 8.60282C61.7855 8.64311 61.9203 8.67555 62.0603 8.69668C63.3865 9.00388 64.6924 9.38405 65.9713 9.83525C66.6216 10.0617 67.2664 10.3018 67.9059 10.5555C68.1932 10.6691 68.4789 10.7855 68.763 10.9046C68.9187 10.9695 69.0738 11.0348 69.2283 11.1007C69.2968 11.1299 69.3652 11.1597 69.434 11.1885L69.5363 11.2326C69.7322 11.3205 69.7247 11.3046 69.5136 11.1848L69.4335 10.9055C69.4642 10.8531 69.4619 10.8647 69.4266 10.9401C69.3865 11.0817 69.407 11.2324 69.4838 11.3598C69.5607 11.4872 69.6876 11.581 69.8373 11.6209C69.9874 11.6569 70.1465 11.6368 70.2814 11.565C70.4162 11.4932 70.5163 11.3751 70.5609 11.2353Z"
        fill="#211715"
      />
      <path
        d="M58.8761 18.9064C58.8544 18.8766 58.8327 18.8467 58.811 18.8167H58.8431C60.6062 18.8167 62.9943 18.7996 65.4588 18.7796C65.749 19.1993 66.3808 19.9359 66.8642 20.4808C66.9449 20.572 67.0452 20.6461 67.1584 20.6982C67.2716 20.7504 67.3953 20.7794 67.5212 20.7833C67.6472 20.7872 67.7726 20.766 67.8893 20.7211C68.0059 20.6762 68.1112 20.6085 68.1981 20.5226C68.72 20.0065 69.4164 19.2832 69.8707 18.7422H78.5038C78.9583 19.2832 79.6548 20.0065 80.1766 20.5226C80.2633 20.6085 80.3683 20.6761 80.4848 20.7211C80.6012 20.7661 80.7264 20.7874 80.8522 20.7836C80.978 20.7799 81.1015 20.7511 81.2146 20.6993C81.3278 20.6474 81.428 20.5736 81.5088 20.4827C81.9922 19.9377 82.6252 19.2 82.9156 18.7796C85.3645 18.7996 87.7398 18.8165 89.4998 18.8167C87.9478 21.7555 84.5463 24.0338 80.5662 25.1029C77.5485 25.9138 73.4761 25.8144 70.284 25.4816C65.2049 24.9521 61.2655 22.1849 58.8761 18.9064Z"
        fill="#0E0C15"
      />
      <path
        d="M59.3836 18.6271L59.3187 18.5372L58.8111 19.3702C61.0273 19.3702 63.2435 19.351 65.4589 19.333L64.952 19.0593C65.2908 19.4995 65.6634 19.9157 66.0667 20.3046C66.4497 20.7013 66.8663 21.3581 67.4714 21.4386C68.1451 21.5281 68.6182 20.8736 69.0254 20.4665C69.4581 20.0341 69.8926 19.5999 70.2868 19.1352L69.8705 19.2966H78.5039L78.0876 19.1352C78.4753 19.5929 78.8938 20.0272 79.3154 20.4571C79.7489 20.8987 80.2061 21.4838 80.9182 21.4377C81.5882 21.3943 81.9849 20.7829 82.3723 20.3395C82.7454 19.9304 83.0959 19.5035 83.4224 19.0604L82.915 19.3347C85.1096 19.3526 87.3045 19.3711 89.4992 19.3718L88.9918 18.5388C87.0143 22.2407 82.509 24.4426 78.2855 24.9811C75.832 25.2931 73.3128 25.2117 70.8554 24.9857C68.5983 24.8008 66.4115 24.1524 64.449 23.0861C62.4364 21.9647 60.7076 20.4436 59.3829 18.6287C59.3015 18.5048 59.1726 18.415 59.0229 18.378C58.8732 18.3411 58.7142 18.3597 58.5787 18.4302C58.4452 18.5052 58.3483 18.6266 58.3089 18.7683C58.2694 18.9099 58.2906 19.0604 58.3678 19.1875C61.0045 22.7852 65.0923 25.3665 69.7258 25.97C72.3087 26.3189 74.9257 26.3855 77.5249 26.1686C80.0142 25.9598 82.4297 25.2631 84.6162 24.1232C86.8402 22.9519 88.8497 21.2635 90.0068 19.0976C90.0569 19.0132 90.0828 18.918 90.0822 18.8213C90.0816 18.7246 90.0544 18.6297 90.0033 18.5459C89.9522 18.462 89.8789 18.3921 89.7906 18.3428C89.7022 18.2936 89.6018 18.2667 89.4992 18.2648C87.8215 18.2648 86.1443 18.2526 84.4658 18.2399C84.029 18.2367 83.5923 18.2332 83.1557 18.2295C82.8403 18.227 82.6067 18.2443 82.4076 18.5017C82.3312 18.6004 82.2607 18.7025 82.1825 18.8003C81.9959 19.0355 81.7976 19.2615 81.6 19.4894C81.494 19.6112 81.3879 19.7324 81.2816 19.8531C81.1837 19.9638 81.0284 20.2274 80.8898 20.288C80.8163 20.3205 80.8729 20.3323 80.8146 20.3219C80.7049 20.3028 80.5401 20.0708 80.4644 19.9949C80.2005 19.7303 79.9397 19.4631 79.682 19.1933C79.4371 18.9371 79.2138 18.6629 78.9675 18.4092C78.9056 18.3412 78.829 18.2865 78.7429 18.2487C78.6567 18.2109 78.5629 18.1909 78.4679 18.1901C78.0014 18.1703 77.529 18.1901 77.062 18.1901H69.9942C69.9562 18.1901 69.9178 18.188 69.8798 18.1901C69.5402 18.2083 69.404 18.4179 69.2059 18.6361C68.7276 19.1622 68.2171 19.6626 67.7097 20.1637C67.6447 20.2181 67.5839 20.2767 67.5277 20.3392C67.5005 20.3547 67.4964 20.36 67.516 20.3551L67.7244 20.3768C67.7263 20.3722 67.4045 20.0553 67.3632 20.0104C67.1109 19.7375 66.8489 19.473 66.5913 19.2032C66.3834 18.986 66.1505 18.7399 65.9965 18.5422C65.7795 18.2625 65.5696 18.2254 65.217 18.2281L64.3748 18.2348C62.5203 18.2494 60.6658 18.2634 58.8111 18.2634C58.7082 18.2647 58.6074 18.2912 58.5187 18.3403C58.4299 18.3894 58.3563 18.4594 58.3051 18.5435C58.2539 18.6276 58.2268 18.7227 58.2266 18.8197C58.2263 18.9166 58.2529 19.0119 58.3037 19.0962L58.3686 19.1861C58.7922 19.7712 59.8112 19.218 59.3836 18.6271Z"
        fill="#211715"
      />
    </LogoStyled>
  );
};
