import { Icon, icon } from '@/ui/components/icon';

export const DallEIcon = icon(({ ...props }) => (
  <Icon size={24} viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="24" height="24" rx="12" fill="#3776D3" />
    <path d="M18.9453 10.5482C19.0822 10.1422 19.152 9.71706 19.1521 9.28913C19.1521 8.58102 18.9609 7.8857 18.5982 7.27463C17.8696 6.02316 16.5179 5.25052 15.055 5.25052C14.7669 5.25052 14.4794 5.28055 14.1977 5.34011C13.8186 4.91875 13.3534 4.58145 12.8326 4.35045C12.3118 4.11945 11.7472 4.00001 11.1762 4H11.1506L11.141 4.00006C9.36915 4.00006 7.79786 5.12813 7.25319 6.79117C6.68938 6.9051 6.15675 7.13657 5.69095 7.47006C5.22514 7.80355 4.83692 8.23138 4.55226 8.7249C4.19073 9.33964 4.00022 10.0377 4 10.7484C4.00014 11.7473 4.37592 12.7106 5.05458 13.4518C4.91759 13.8578 4.84772 14.283 4.84766 14.7109C4.84773 15.419 5.03889 16.1143 5.4015 16.7254C5.83272 17.4662 6.49124 18.0527 7.28211 18.4004C8.07298 18.748 8.95532 18.8389 9.8019 18.6598C10.181 19.0812 10.6463 19.4185 11.1671 19.6495C11.688 19.8805 12.2525 20 12.8235 20H12.8492L12.8596 19.9999C14.6324 19.9999 16.2031 18.8718 16.7478 17.2073C17.3116 17.0933 17.8442 16.8618 18.3101 16.5283C18.7758 16.1948 19.1642 15.767 19.4488 15.2735C19.8099 14.6593 20.0001 13.9618 20 13.2517C19.9998 12.2529 19.6239 11.2894 18.9453 10.5482ZM12.8502 18.954H12.846C12.1366 18.9538 11.4498 18.7082 10.9049 18.2601C10.9373 18.2429 10.9693 18.225 11.0008 18.2064L14.2296 16.3662C14.3102 16.321 14.3771 16.2555 14.4238 16.1764C14.4704 16.0974 14.495 16.0075 14.495 15.916V11.4217L15.8597 12.1992C15.8669 12.2027 15.873 12.2079 15.8777 12.2143C15.8823 12.2208 15.8852 12.2282 15.8862 12.2361V15.9555C15.8844 17.6092 14.5263 18.9506 12.8502 18.954ZM6.32112 16.2026C6.05442 15.7475 5.91391 15.2312 5.91374 14.7056C5.91374 14.5342 5.92891 14.3623 5.95846 14.1934C5.98246 14.2076 6.02436 14.2328 6.05442 14.2498L9.28315 16.09C9.36365 16.1364 9.45519 16.1608 9.5484 16.1608C9.64161 16.1608 9.73314 16.1363 9.81362 16.0899L13.7556 13.8441V15.3992V15.4018C13.7556 15.4094 13.7538 15.4167 13.7505 15.4234C13.747 15.4301 13.7422 15.4359 13.7361 15.4405L10.4721 17.2999C10.0103 17.5622 9.48681 17.7002 8.95395 17.7004C8.42053 17.7003 7.8965 17.5618 7.4344 17.299C6.9723 17.036 6.58838 16.658 6.32112 16.2026ZM5.4717 9.24774C5.82632 8.63999 6.38626 8.17465 7.05352 7.93315C7.05352 7.96058 7.05194 8.00918 7.05194 8.04291V11.7233L7.05188 11.7263C7.0519 11.8177 7.07642 11.9075 7.12296 11.9865C7.1695 12.0654 7.23641 12.1309 7.31688 12.1762L11.2588 14.4216L9.89418 15.1991C9.88744 15.2035 9.87972 15.2062 9.87169 15.2069C9.86366 15.2076 9.85558 15.2064 9.84815 15.2033L6.58386 13.3422C6.12241 13.0785 5.73931 12.6997 5.47298 12.2438C5.20664 11.788 5.06642 11.271 5.06636 10.7448C5.06656 10.2194 5.20622 9.70314 5.4717 9.24774ZM16.6842 11.8222L12.7422 9.57647L14.1069 8.79925C14.1136 8.79486 14.1214 8.79219 14.1294 8.79147C14.1374 8.79075 14.1455 8.792 14.153 8.79511L17.4171 10.6546C17.879 10.9179 18.2625 11.2965 18.5291 11.7523C18.7958 12.2082 18.9362 12.7252 18.9364 13.2515C18.9364 14.5077 18.1419 15.6318 16.9474 16.0656V12.2752C16.9475 12.2738 16.9475 12.2723 16.9475 12.271C16.9475 12.1799 16.9232 12.0905 16.8769 12.0117C16.8306 11.9329 16.7642 11.8676 16.6842 11.8222ZM18.0425 9.8051C18.0107 9.78591 17.9787 9.76711 17.9466 9.74868L14.7178 7.90846C14.6373 7.86218 14.5458 7.83778 14.4526 7.83774C14.3594 7.83778 14.268 7.86218 14.1874 7.90846L10.2455 10.1543V8.59922L10.2454 8.59654C10.2454 8.58134 10.2527 8.56704 10.265 8.55794L13.529 6.70006C13.9906 6.43744 14.5142 6.29918 15.047 6.29916C16.7253 6.29916 18.0862 7.64202 18.0862 9.2979C18.0862 9.46783 18.0715 9.63762 18.0425 9.8051ZM9.50349 12.5767L8.1385 11.7992C8.13134 11.7957 8.12517 11.7905 8.12054 11.784C8.1159 11.7776 8.11296 11.7701 8.11195 11.7623V8.0428C8.11269 6.38781 9.47366 5.04607 11.1512 5.04607C11.8616 5.04622 12.5496 5.29179 13.0958 5.74018C13.0712 5.75342 13.0283 5.77677 12.9998 5.7938L9.7711 7.63397C9.69054 7.67919 9.62355 7.74466 9.57694 7.8237C9.53034 7.90276 9.50578 7.99258 9.50576 8.08402V8.08698L9.50349 12.5767ZM10.2448 10.9996L12.0005 9.9991L13.7562 10.999V12.9994L12.0005 13.9994L10.2448 12.9994V10.9996Z" fill="white" />
  </Icon>
));
