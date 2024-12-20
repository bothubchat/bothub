import { TariffCardDiscountLabelStyled } from './styled';

export interface TariffCardDiscountLabelProps {
  percent: '20' | '30';
  variant: 'main' | 'dashboard';
  color: string;
  bgColor?: string;
}

export const TariffCardDiscountLabel = ({
  percent,
  variant,
  color,
  bgColor = '#0E0C15',
}: TariffCardDiscountLabelProps) => {
  if (percent === '20') {
    return <Discount20 color={color} bgColor={bgColor} variant={variant} />;
  }

  return <Discount30 color={color} bgColor={bgColor} variant={variant} />;
};

const Discount30 = ({
  variant,
  color,
  bgColor,
}: Omit<TariffCardDiscountLabelProps, 'percent'>) => (
  <TariffCardDiscountLabelStyled
    width="75"
    height="87"
    viewBox="0 0 75 87"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    $variant={variant}
  >
    <path
      d="M0.894444 86.5L53.7795 0.5H74.1143L22.2177 86.5H0.894444Z"
      fill={bgColor}
      stroke={color}
    />
    <path
      d="M52.1649 19.0895L53.0707 19.6367L51.3778 22.4392L50.472 21.8921L52.1649 19.0895ZM57.8215 17.9739C57.5571 18.4116 57.2471 18.7554 56.8915 19.0053C56.5371 19.2531 56.1668 19.3945 55.7806 19.4295C55.3943 19.4645 55.0223 19.3822 54.6644 19.1826L55.3547 18.0397C55.529 18.1311 55.7096 18.1642 55.8965 18.1387C56.0813 18.1121 56.2589 18.0355 56.4294 17.9089C56.5999 17.7823 56.7482 17.6147 56.8743 17.4059C57.0089 17.183 57.0898 16.9622 57.1168 16.7434C57.1418 16.5235 57.1138 16.3226 57.0328 16.1409C56.9517 15.9591 56.8194 15.8142 56.6358 15.7061C56.4485 15.5902 56.253 15.5385 56.0491 15.5509C55.8453 15.5632 55.6459 15.6392 55.451 15.7787C55.2573 15.9161 55.0809 16.1166 54.9218 16.38L54.5895 16.9302L53.7201 16.4051L54.0525 15.8549C54.1834 15.6381 54.2604 15.426 54.2834 15.2185C54.3075 15.0091 54.2799 14.8168 54.2004 14.6416C54.1189 14.4651 53.9874 14.3234 53.8058 14.2165C53.6307 14.108 53.4539 14.0551 53.2752 14.0578C53.0958 14.0573 52.9255 14.1079 52.7644 14.2098C52.6046 14.3096 52.4659 14.4567 52.3484 14.6513C52.2333 14.8418 52.1613 15.0389 52.1322 15.2426C52.1032 15.4463 52.1225 15.6364 52.1902 15.8128C52.2559 15.988 52.374 16.1313 52.5446 16.2426L51.8891 17.3278C51.5455 17.1091 51.3001 16.824 51.1529 16.4723C51.005 16.1174 50.955 15.7332 51.0029 15.3196C51.0488 14.9048 51.1935 14.4958 51.4371 14.0925C51.688 13.6771 51.984 13.3635 52.3248 13.1518C52.6649 12.9368 53.0164 12.8242 53.3794 12.8139C53.7424 12.8036 54.082 12.8939 54.3981 13.0849C54.7499 13.2946 54.9813 13.5755 55.0923 13.9274C55.2046 14.2773 55.1955 14.6425 55.0653 15.0229L55.1139 15.0523C55.4391 14.6513 55.8038 14.4139 56.208 14.34C56.6114 14.2628 57.0071 14.3428 57.3949 14.5798C57.7434 14.7904 57.9955 15.0782 58.1512 15.4432C58.306 15.805 58.3568 16.2063 58.3035 16.6471C58.2514 17.0858 58.0907 17.5281 57.8215 17.9739ZM61.2632 12.3518C60.9608 12.8524 60.5747 13.2055 60.1047 13.4111C59.6339 13.6135 59.1003 13.666 58.5037 13.5684C57.9064 13.4675 57.2683 13.2121 56.5894 12.802C55.9118 12.3899 55.3924 11.9448 55.0313 11.4666C54.6693 10.9853 54.4705 10.4903 54.4346 9.98191C54.4 9.47145 54.5333 8.96697 54.8344 8.46847C55.1355 7.96997 55.52 7.61728 55.988 7.41039C56.4559 7.2035 56.9865 7.14926 57.5798 7.24766C58.1743 7.34403 58.81 7.59663 59.4868 8.00547C60.1677 8.41676 60.6911 8.86433 61.0571 9.34817C61.4223 9.82875 61.6232 10.3249 61.6599 10.8366C61.6978 11.3462 61.5655 11.8513 61.2632 12.3518ZM60.3118 11.7771C60.5468 11.3881 60.5407 10.9654 60.2936 10.5091C60.0457 10.0496 59.5479 9.59397 58.8001 9.14229C58.3057 8.84362 57.859 8.64436 57.4602 8.54451C57.0614 8.44466 56.72 8.43755 56.4359 8.52318C56.1498 8.60759 55.9291 8.77848 55.7736 9.03583C55.5398 9.42287 55.5475 9.84515 55.7966 10.3027C56.0438 10.7589 56.5375 11.2121 57.278 11.6621C57.7732 11.9641 58.2207 12.1666 58.6203 12.2697C59.0211 12.3707 59.3646 12.3791 59.6507 12.2947C59.9347 12.209 60.1551 12.0365 60.3118 11.7771ZM64.0467 4.83862L63.7184 4.64032C63.4773 4.49466 63.286 4.30996 63.1445 4.08623C63.0043 3.86048 62.9318 3.61198 62.9269 3.34075C62.922 3.06952 63.0041 2.79409 63.173 2.51444C63.3468 2.22669 63.5543 2.02288 63.7954 1.90302C64.0345 1.78192 64.2853 1.73294 64.548 1.75605C64.8118 1.77714 65.0653 1.86112 65.3085 2.00801L65.6368 2.20631C65.8779 2.35198 66.0692 2.53667 66.2106 2.7604C66.3521 2.98413 66.4252 3.23161 66.4301 3.50284C66.4362 3.77204 66.3536 4.04849 66.1822 4.33219C66.0108 4.61589 65.804 4.81868 65.5616 4.94058C65.3193 5.06247 65.0662 5.11287 64.8023 5.09179C64.5397 5.06867 64.2878 4.98429 64.0467 4.83862ZM64.1976 3.84698L64.5259 4.04528C64.686 4.14198 64.8562 4.19223 65.0364 4.19601C65.2167 4.1998 65.3656 4.10442 65.4831 3.90989C65.6018 3.71332 65.6174 3.53879 65.5297 3.38627C65.4413 3.2305 65.316 3.10366 65.1539 3.00573L64.8256 2.80743C64.6635 2.70951 64.4941 2.65561 64.3175 2.64575C64.1389 2.63466 63.9884 2.73043 63.866 2.93308C63.7509 3.12356 63.7374 3.29932 63.8255 3.46036C63.9115 3.62018 64.0355 3.74905 64.1976 3.84698ZM58.5729 5.85094L58.2446 5.65264C58.0014 5.50575 57.8097 5.31943 57.6695 5.09367C57.5293 4.86792 57.4578 4.62004 57.4549 4.35003C57.45 4.0788 57.5321 3.80337 57.701 3.52372C57.8736 3.238 58.0804 3.0352 58.3216 2.91533C58.5619 2.79222 58.8134 2.74222 59.076 2.76533C59.3386 2.78844 59.5915 2.87344 59.8347 3.02033L60.1629 3.21863C60.4061 3.36552 60.5984 3.55083 60.7398 3.77456C60.8805 3.99503 60.9522 4.24028 60.9551 4.51028C60.9579 4.78029 60.8743 5.05613 60.7041 5.3378C60.5315 5.62352 60.3251 5.82794 60.0848 5.95106C59.8457 6.07215 59.5942 6.12215 59.3303 6.10107C59.0665 6.07998 58.814 5.9966 58.5729 5.85094ZM58.7275 4.85322L59.0558 5.05152C59.2179 5.14945 59.3885 5.20132 59.5675 5.20713C59.7457 5.20969 59.8936 5.1137 60.0111 4.91917C60.1286 4.72463 60.1435 4.5511 60.0559 4.39859C59.9674 4.24282 59.8422 4.11598 59.68 4.01805L59.3518 3.81975C59.1897 3.72183 59.0203 3.66793 58.8437 3.65807C58.6651 3.64698 58.5152 3.74174 58.394 3.94235C58.2777 4.13486 58.2642 4.31063 58.3535 4.46964C58.4427 4.62866 58.5674 4.75652 58.7275 4.85322ZM63.5118 8.36141L59.8719 0.321277L60.331 -0.438627L63.9709 7.60151L63.5118 8.36141Z"
      fill={color}
    />
    <path
      d="M33.1649 50.4724L34.0707 51.0195L32.3778 53.822L31.472 53.2749L33.1649 50.4724ZM38.8215 49.3567C38.5571 49.7945 38.2471 50.1382 37.8915 50.3881C37.5371 50.6359 37.1668 50.7773 36.7806 50.8123C36.3943 50.8473 36.0223 50.765 35.6644 50.5654L36.3547 49.4225C36.529 49.5139 36.7096 49.547 36.8965 49.5215C37.0813 49.4949 37.2589 49.4183 37.4294 49.2917C37.5999 49.1651 37.7482 48.9975 37.8743 48.7888C38.0089 48.5659 38.0898 48.345 38.1168 48.1263C38.1418 47.9063 38.1138 47.7054 38.0328 47.5237C37.9517 47.342 37.8194 47.197 37.6358 47.0889C37.4485 46.973 37.253 46.9213 37.0491 46.9337C36.8453 46.9461 36.6459 47.022 36.451 47.1615C36.2573 47.299 36.0809 47.4994 35.9218 47.7628L35.5895 48.313L34.7201 47.7879L35.0525 47.2377C35.1834 47.0209 35.2604 46.8088 35.2834 46.6014C35.3075 46.3919 35.2799 46.1996 35.2004 46.0244C35.1189 45.8479 34.9874 45.7062 34.8058 45.5993C34.6307 45.4908 34.4539 45.4379 34.2752 45.4406C34.0958 45.4401 33.9255 45.4907 33.7644 45.5926C33.6046 45.6924 33.4659 45.8395 33.3484 46.0341C33.2333 46.2246 33.1613 46.4217 33.1322 46.6254C33.1032 46.8291 33.1225 47.0192 33.1902 47.1956C33.2559 47.3708 33.374 47.5141 33.5446 47.6254L32.8891 48.7106C32.5455 48.4919 32.3001 48.2068 32.1529 47.8551C32.005 47.5002 31.955 47.116 32.0029 46.7024C32.0488 46.2876 32.1935 45.8786 32.4371 45.4753C32.688 45.0599 32.984 44.7463 33.3248 44.5346C33.6649 44.3196 34.0164 44.207 34.3794 44.1967C34.7424 44.1864 35.082 44.2768 35.3981 44.4677C35.7499 44.6774 35.9813 44.9583 36.0923 45.3102C36.2046 45.6601 36.1955 46.0253 36.0653 46.4058L36.1139 46.4351C36.4391 46.0342 36.8038 45.7967 37.208 45.7228C37.6114 45.6456 38.0071 45.7256 38.3949 45.9626C38.7434 46.1732 38.9955 46.461 39.1512 46.826C39.306 47.1879 39.3568 47.5891 39.3035 48.0299C39.2514 48.4687 39.0907 48.9109 38.8215 49.3567ZM42.2632 43.7347C41.9608 44.2352 41.5747 44.5883 41.1047 44.7939C40.6339 44.9964 40.1003 45.0488 39.5037 44.9512C38.9064 44.8503 38.2683 44.5949 37.5894 44.1848C36.9118 43.7727 36.3924 43.3276 36.0313 42.8495C35.6693 42.3681 35.4705 41.8732 35.4346 41.3647C35.4 40.8543 35.5333 40.3498 35.8344 39.8513C36.1355 39.3528 36.52 39.0001 36.988 38.7932C37.4559 38.5863 37.9865 38.5321 38.5798 38.6305C39.1743 38.7268 39.81 38.9794 40.4868 39.3883C41.1677 39.7996 41.6911 40.2471 42.0571 40.731C42.4223 41.2116 42.6232 41.7077 42.6599 42.2194C42.6978 42.729 42.5655 43.2341 42.2632 43.7347ZM41.3118 43.16C41.5468 42.7709 41.5407 42.3482 41.2936 41.8919C41.0457 41.4324 40.5479 40.9768 39.8001 40.5251C39.3057 40.2264 38.859 40.0272 38.4602 39.9273C38.0614 39.8275 37.72 39.8204 37.4359 39.906C37.1498 39.9904 36.9291 40.1613 36.7736 40.4186C36.5398 40.8057 36.5475 41.228 36.7966 41.6855C37.0438 42.1417 37.5375 42.5949 38.278 43.0449C38.7732 43.3469 39.2207 43.5494 39.6203 43.6525C40.0211 43.7536 40.3646 43.7619 40.6507 43.6775C40.9347 43.5918 41.1551 43.4193 41.3118 43.16ZM45.0467 36.2214L44.7184 36.0231C44.4773 35.8775 44.286 35.6928 44.1445 35.469C44.0043 35.2433 43.9318 34.9948 43.9269 34.7236C43.922 34.4523 44.0041 34.1769 44.173 33.8973C44.3468 33.6095 44.5543 33.4057 44.7954 33.2858C45.0345 33.1647 45.2853 33.1157 45.548 33.1389C45.8118 33.1599 46.0653 33.2439 46.3085 33.3908L46.6368 33.5891C46.8779 33.7348 47.0692 33.9195 47.2106 34.1432C47.3521 34.3669 47.4252 34.6144 47.4301 34.8857C47.4362 35.1549 47.3536 35.4313 47.1822 35.715C47.0108 35.9987 46.804 36.2015 46.5616 36.3234C46.3193 36.4453 46.0662 36.4957 45.8023 36.4746C45.5397 36.4515 45.2878 36.3671 45.0467 36.2214ZM45.1976 35.2298L45.5259 35.4281C45.686 35.5248 45.8562 35.575 46.0364 35.5788C46.2167 35.5826 46.3656 35.4872 46.4831 35.2927C46.6018 35.0961 46.6174 34.9216 46.5297 34.7691C46.4413 34.6133 46.316 34.4865 46.1539 34.3885L45.8256 34.1902C45.6635 34.0923 45.4941 34.0384 45.3175 34.0286C45.1389 34.0175 44.9884 34.1132 44.866 34.3159C44.7509 34.5064 44.7374 34.6821 44.8255 34.8432C44.9115 35.003 45.0355 35.1319 45.1976 35.2298ZM39.5729 37.2338L39.2446 37.0355C39.0014 36.8886 38.8097 36.7022 38.6695 36.4765C38.5293 36.2507 38.4578 36.0029 38.4549 35.7328C38.45 35.4616 38.5321 35.1862 38.701 34.9065C38.8736 34.6208 39.0804 34.418 39.3216 34.2981C39.5619 34.175 39.8134 34.125 40.076 34.1481C40.3386 34.1713 40.5915 34.2563 40.8347 34.4031L41.1629 34.6014C41.4061 34.7483 41.5984 34.9336 41.7398 35.1574C41.8805 35.3778 41.9522 35.6231 41.9551 35.8931C41.9579 36.1631 41.8743 36.4389 41.7041 36.7206C41.5315 37.0063 41.3251 37.2108 41.0848 37.3339C40.8457 37.455 40.5942 37.505 40.3303 37.4839C40.0665 37.4628 39.814 37.3794 39.5729 37.2338ZM39.7275 36.236L40.0558 36.4343C40.2179 36.5323 40.3885 36.5841 40.5675 36.5899C40.7457 36.5925 40.8936 36.4965 41.0111 36.302C41.1286 36.1074 41.1435 35.9339 41.0559 35.7814C40.9674 35.6256 40.8422 35.4988 40.68 35.4009L40.3518 35.2026C40.1897 35.1046 40.0203 35.0507 39.8437 35.0409C39.6651 35.0298 39.5152 35.1246 39.394 35.3252C39.2777 35.5177 39.2642 35.6934 39.3535 35.8525C39.4427 36.0115 39.5674 36.1393 39.7275 36.236ZM44.5118 39.7442L40.8719 31.7041L41.331 30.9442L44.9709 38.9843L44.5118 39.7442Z"
      fill={color}
    />
    <path
      d="M14.1649 81.8552L15.0707 82.4023L13.3778 85.2049L12.472 84.6577L14.1649 81.8552ZM19.8215 80.7396C19.5571 81.1773 19.2471 81.521 18.8915 81.7709C18.5371 82.0187 18.1668 82.1601 17.7806 82.1951C17.3943 82.2301 17.0223 82.1478 16.6644 81.9482L17.3547 80.8053C17.529 80.8968 17.7096 80.9298 17.8965 80.9043C18.0813 80.8777 18.2589 80.8011 18.4294 80.6745C18.5999 80.5479 18.7482 80.3803 18.8743 80.1716C19.0089 79.9487 19.0898 79.7278 19.1168 79.5091C19.1418 79.2891 19.1138 79.0882 19.0328 78.9065C18.9517 78.7248 18.8194 78.5798 18.6358 78.4717C18.4485 78.3558 18.253 78.3041 18.0491 78.3165C17.8453 78.3289 17.6459 78.4048 17.451 78.5443C17.2573 78.6818 17.0809 78.8822 16.9218 79.1456L16.5895 79.6958L15.7201 79.1707L16.0525 78.6205C16.1834 78.4037 16.2604 78.1916 16.2834 77.9842C16.3075 77.7747 16.2799 77.5824 16.2004 77.4072C16.1189 77.2307 15.9874 77.0891 15.8058 76.9821C15.6307 76.8736 15.4539 76.8207 15.2752 76.8234C15.0958 76.8229 14.9255 76.8735 14.7644 76.9754C14.6046 77.0752 14.4659 77.2224 14.3484 77.4169C14.2333 77.6074 14.1613 77.8045 14.1322 78.0082C14.1032 78.2119 14.1225 78.402 14.1902 78.5784C14.2559 78.7536 14.374 78.8969 14.5446 79.0082L13.8891 80.0934C13.5455 79.8747 13.3001 79.5896 13.1529 79.2379C13.005 78.8831 12.955 78.4988 13.0029 78.0852C13.0488 77.6704 13.1935 77.2614 13.4371 76.8581C13.688 76.4427 13.984 76.1292 14.3248 75.9174C14.6649 75.7024 15.0164 75.5898 15.3794 75.5795C15.7424 75.5692 16.082 75.6596 16.3981 75.8505C16.7499 76.0603 16.9813 76.3411 17.0923 76.693C17.2046 77.0429 17.1955 77.4081 17.0653 77.7886L17.1139 77.818C17.4391 77.417 17.8038 77.1795 18.208 77.1056C18.6114 77.0285 19.0071 77.1084 19.3949 77.3455C19.7434 77.556 19.9955 77.8438 20.1512 78.2089C20.306 78.5707 20.3568 78.972 20.3035 79.4127C20.2514 79.8515 20.0907 80.2938 19.8215 80.7396ZM23.2632 75.1175C22.9608 75.618 22.5747 75.9711 22.1047 76.1768C21.6339 76.3792 21.1003 76.4316 20.5037 76.334C19.9064 76.2331 19.2683 75.9777 18.5894 75.5676C17.9118 75.1555 17.3924 74.7104 17.0313 74.2323C16.6693 73.7509 16.4705 73.256 16.4346 72.7475C16.4 72.2371 16.5333 71.7326 16.8344 71.2341C17.1355 70.7356 17.52 70.3829 17.988 70.176C18.4559 69.9691 18.9865 69.9149 19.5798 70.0133C20.1743 70.1097 20.81 70.3623 21.4868 70.7711C22.1677 71.1824 22.6911 71.63 23.0571 72.1138C23.4223 72.5944 23.6232 73.0905 23.6599 73.6022C23.6978 74.1119 23.5655 74.6169 23.2632 75.1175ZM22.3118 74.5428C22.5468 74.1537 22.5407 73.731 22.2936 73.2747C22.0457 72.8152 21.5479 72.3596 20.8001 71.9079C20.3057 71.6092 19.859 71.41 19.4602 71.3101C19.0614 71.2103 18.72 71.2032 18.4359 71.2888C18.1498 71.3732 17.9291 71.5441 17.7736 71.8015C17.5398 72.1885 17.5475 72.6108 17.7966 73.0683C18.0438 73.5246 18.5375 73.9777 19.278 74.4278C19.7732 74.7297 20.2207 74.9322 20.6203 75.0353C21.0211 75.1364 21.3646 75.1447 21.6507 75.0603C21.9347 74.9747 22.1551 74.8021 22.3118 74.5428ZM26.0467 67.6042L25.7184 67.4059C25.4773 67.2603 25.286 67.0756 25.1445 66.8519C25.0043 66.6261 24.9318 66.3776 24.9269 66.1064C24.922 65.8351 25.0041 65.5597 25.173 65.2801C25.3468 64.9923 25.5543 64.7885 25.7954 64.6686C26.0345 64.5475 26.2853 64.4986 26.548 64.5217C26.8118 64.5428 27.0653 64.6267 27.3085 64.7736L27.6368 64.9719C27.8779 65.1176 28.0692 65.3023 28.2106 65.526C28.3521 65.7498 28.4252 65.9972 28.4301 66.2685C28.4362 66.5377 28.3536 66.8141 28.1822 67.0978C28.0108 67.3815 27.804 67.5843 27.5616 67.7062C27.3193 67.8281 27.0662 67.8785 26.8023 67.8574C26.5397 67.8343 26.2878 67.7499 26.0467 67.6042ZM26.1976 66.6126L26.5259 66.8109C26.686 66.9076 26.8562 66.9579 27.0364 66.9616C27.2167 66.9654 27.3656 66.87 27.4831 66.6755C27.6018 66.4789 27.6174 66.3044 27.5297 66.1519C27.4413 65.9961 27.316 65.8693 27.1539 65.7714L26.8256 65.5731C26.6635 65.4751 26.4941 65.4212 26.3175 65.4114C26.1389 65.4003 25.9884 65.4961 25.866 65.6987C25.7509 65.8892 25.7374 66.0649 25.8255 66.226C25.9115 66.3858 26.0355 66.5147 26.1976 66.6126ZM20.5729 68.6166L20.2446 68.4183C20.0014 68.2714 19.8097 68.0851 19.6695 67.8593C19.5293 67.6335 19.4578 67.3857 19.4549 67.1157C19.45 66.8444 19.5321 66.569 19.701 66.2893C19.8736 66.0036 20.0804 65.8008 20.3216 65.681C20.5619 65.5578 20.8134 65.5078 21.076 65.531C21.3386 65.5541 21.5915 65.6391 21.8347 65.786L22.1629 65.9843C22.4061 66.1311 22.5984 66.3165 22.7398 66.5402C22.8805 66.7607 22.9522 67.0059 22.9551 67.2759C22.9579 67.5459 22.8743 67.8218 22.7041 68.1034C22.5315 68.3891 22.3251 68.5936 22.0848 68.7167C21.8457 68.8378 21.5942 68.8878 21.3303 68.8667C21.0665 68.8456 20.814 68.7622 20.5729 68.6166ZM20.7275 67.6188L21.0558 67.8171C21.2179 67.9151 21.3885 67.9669 21.5675 67.9728C21.7457 67.9753 21.8936 67.8793 22.0111 67.6848C22.1286 67.4903 22.1435 67.3167 22.0559 67.1642C21.9674 67.0084 21.8422 66.8816 21.68 66.7837L21.3518 66.5854C21.1897 66.4875 21.0203 66.4336 20.8437 66.4237C20.6651 66.4126 20.5152 66.5074 20.394 66.708C20.2777 66.9005 20.2642 67.0763 20.3535 67.2353C20.4427 67.3943 20.5674 67.5221 20.7275 67.6188ZM25.5118 71.127L21.8719 63.0869L22.331 62.327L25.9709 70.3671L25.5118 71.127Z"
      fill={color}
    />
  </TariffCardDiscountLabelStyled>
);

const Discount20 = ({
  variant,
  color,
  bgColor,
}: Omit<TariffCardDiscountLabelProps, 'percent'>) => (
  <TariffCardDiscountLabelStyled
    width="75"
    height="87"
    viewBox="0 0 75 87"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    $variant={variant}
  >
    <path
      d="M0.894444 86.5L53.7795 0.5H74.1143L22.2177 86.5H0.894444Z"
      fill={bgColor}
      stroke={color}
    />
    <path
      d="M52.416 18.676L53.3218 19.2232L51.6289 22.0257L50.7231 21.4785L52.416 18.676ZM56.5419 19.9019L55.7273 19.4098L54.9141 15.9689C54.8303 15.6361 54.7489 15.3519 54.67 15.1162C54.5912 14.8804 54.4965 14.6822 54.3862 14.5215C54.2758 14.3608 54.1345 14.2284 53.9623 14.1244C53.7657 14.0057 53.5706 13.9486 53.3769 13.9533C53.1812 13.9568 52.9977 14.0133 52.8265 14.1228C52.6552 14.2324 52.5096 14.3864 52.3896 14.585C52.266 14.7897 52.2002 14.9947 52.1923 15.2001C52.1824 15.4043 52.2287 15.5955 52.3313 15.7736C52.4351 15.9497 52.5934 16.1021 52.8062 16.2306L52.158 17.3036C51.7629 17.0649 51.4739 16.7672 51.291 16.4106C51.1081 16.054 51.0321 15.6693 51.063 15.2564C51.0951 14.8416 51.2354 14.4285 51.4839 14.0171C51.736 13.5997 52.0356 13.28 52.3826 13.0582C52.7296 12.8363 53.0915 12.7202 53.4683 12.71C53.8463 12.6977 54.2096 12.7969 54.5582 13.0074C54.7912 13.1482 54.9933 13.3311 55.1643 13.5561C55.3354 13.7811 55.4898 14.0887 55.6275 14.4789C55.7664 14.8671 55.9086 15.3803 56.0541 16.0186L56.4972 17.7507L56.5397 17.7764L58.1775 15.0651L59.1198 15.6343L56.5419 19.9019ZM61.2617 12.3562C60.9594 12.8568 60.5732 13.2099 60.1033 13.4155C59.6325 13.6179 59.0989 13.6703 58.5023 13.5727C57.905 13.4719 57.2669 13.2164 56.588 12.8064C55.9104 12.3943 55.391 11.9492 55.0299 11.471C54.6679 10.9896 54.469 10.4947 54.4332 9.9863C54.3986 9.47584 54.5318 8.97136 54.833 8.47286C55.1341 7.97437 55.5186 7.62167 55.9865 7.41478C56.4545 7.2079 56.9851 7.15365 57.5784 7.25205C58.1729 7.34842 58.8086 7.60103 59.4854 8.00987C60.1663 8.42116 60.6897 8.86872 61.0557 9.35256C61.4209 9.83315 61.6218 10.3293 61.6585 10.841C61.6963 11.3506 61.5641 11.8557 61.2617 12.3562ZM60.3103 11.7815C60.5454 11.3925 60.5393 10.9698 60.2922 10.5135C60.0443 10.054 59.5464 9.59837 58.7987 9.14668C58.3043 8.84801 57.8576 8.64875 57.4588 8.5489C57.06 8.44905 56.7186 8.44194 56.4345 8.52758C56.1484 8.61199 55.9277 8.78287 55.7722 9.04022C55.5384 9.42727 55.5461 9.84954 55.7952 10.307C56.0423 10.7633 56.5361 11.2165 57.2766 11.6665C57.7718 11.9685 58.2192 12.171 58.6189 12.2741C59.0197 12.3751 59.3632 12.3835 59.6492 12.2991C59.9333 12.2134 60.1537 12.0409 60.3103 11.7815ZM64.0453 4.84301L63.717 4.64471C63.4758 4.49905 63.2846 4.31435 63.1431 4.09062C63.0029 3.86487 62.9304 3.61638 62.9255 3.34515C62.9206 3.07392 63.0026 2.79848 63.1716 2.51884C63.3454 2.23108 63.5528 2.02728 63.794 1.90741C64.0331 1.78632 64.2839 1.73733 64.5465 1.76044C64.8104 1.78153 65.0639 1.86552 65.3071 2.01241L65.6353 2.21071C65.8765 2.35637 66.0678 2.54107 66.2092 2.7648C66.3506 2.98852 66.4238 3.236 66.4287 3.50723C66.4348 3.77644 66.3521 4.05289 66.1808 4.33659C66.0094 4.62028 65.8025 4.82308 65.5602 4.94497C65.3179 5.06686 65.0648 5.11727 64.8009 5.09618C64.5383 5.07307 64.2864 4.98868 64.0453 4.84301ZM64.1962 3.85137L64.5245 4.04967C64.6846 4.14638 64.8547 4.19662 65.035 4.2004C65.2153 4.20419 65.3641 4.10881 65.4817 3.91428C65.6004 3.71772 65.6159 3.54318 65.5283 3.39066C65.4398 3.2349 65.3146 3.10805 65.1524 3.01013L64.8242 2.81183C64.662 2.7139 64.4927 2.66 64.3161 2.65014C64.1375 2.63905 63.987 2.73483 63.8646 2.93747C63.7495 3.12795 63.736 3.30371 63.824 3.46476C63.91 3.62458 64.0341 3.75345 64.1962 3.85137ZM58.5714 5.85533L58.2432 5.65703C58 5.51014 57.8083 5.32382 57.6681 5.09807C57.5279 4.87231 57.4563 4.62443 57.4535 4.35443C57.4486 4.0832 57.5306 3.80776 57.6996 3.52811C57.8722 3.24239 58.079 3.0396 58.3201 2.91973C58.5605 2.79661 58.8119 2.74661 59.0746 2.76972C59.3372 2.79284 59.5901 2.87784 59.8332 3.02473L60.1615 3.22303C60.4047 3.36991 60.597 3.55522 60.7384 3.77895C60.8791 3.99943 60.9508 4.24467 60.9537 4.51468C60.9565 4.78468 60.8729 5.06052 60.7027 5.34219C60.5301 5.62792 60.3237 5.83234 60.0833 5.95545C59.8442 6.07655 59.5928 6.12655 59.3289 6.10546C59.0651 6.08437 58.8126 6.001 58.5714 5.85533ZM58.7261 4.85761L59.0543 5.05591C59.2165 5.15384 59.387 5.20571 59.5661 5.21152C59.7443 5.21408 59.8922 5.11809 60.0097 4.92356C60.1272 4.72902 60.1421 4.5555 60.0545 4.40298C59.966 4.24722 59.8407 4.12037 59.6786 4.02244L59.3503 3.82414C59.1882 3.72622 59.0189 3.67232 58.8423 3.66246C58.6637 3.65137 58.5138 3.74613 58.3926 3.94675C58.2763 4.13926 58.2628 4.31502 58.3521 4.47404C58.4413 4.63305 58.566 4.76091 58.7261 4.85761ZM63.5104 8.3658L59.8705 0.32567L60.3295 -0.434233L63.9694 7.6059L63.5104 8.3658Z"
      fill={color}
    />
    <path
      d="M33.416 50.0588L34.3218 50.606L32.6289 53.4085L31.7231 52.8613L33.416 50.0588ZM37.5419 51.2847L36.7273 50.7926L35.9141 47.3517C35.8303 47.0189 35.7489 46.7347 35.67 46.499C35.5912 46.2632 35.4965 46.065 35.3862 45.9043C35.2758 45.7436 35.1345 45.6112 34.9623 45.5072C34.7657 45.3885 34.5706 45.3314 34.3769 45.3362C34.1812 45.3396 33.9977 45.3961 33.8265 45.5056C33.6552 45.6152 33.5096 45.7692 33.3896 45.9678C33.266 46.1725 33.2002 46.3775 33.1923 46.5829C33.1824 46.7871 33.2287 46.9783 33.3313 47.1564C33.4351 47.3325 33.5934 47.4849 33.8062 47.6134L33.158 48.6864C32.7629 48.4477 32.4739 48.15 32.291 47.7934C32.1081 47.4368 32.0321 47.0521 32.063 46.6393C32.0951 46.2244 32.2354 45.8113 32.4839 45.3999C32.736 44.9825 33.0356 44.6628 33.3826 44.441C33.7296 44.2191 34.0915 44.1031 34.4683 44.0928C34.8463 44.0805 35.2096 44.1797 35.5582 44.3902C35.7912 44.531 35.9933 44.7139 36.1643 44.9389C36.3354 45.164 36.4898 45.4716 36.6275 45.8617C36.7664 46.2499 36.9086 46.7631 37.0541 47.4014L37.4972 49.1335L37.5397 49.1592L39.1775 46.4479L40.1198 47.0171L37.5419 51.2847ZM42.2617 43.7391C41.9594 44.2396 41.5732 44.5927 41.1033 44.7983C40.6325 45.0007 40.0989 45.0532 39.5023 44.9556C38.905 44.8547 38.2669 44.5993 37.588 44.1892C36.9104 43.7771 36.391 43.332 36.0299 42.8538C35.6679 42.3725 35.469 41.8775 35.4332 41.3691C35.3986 40.8587 35.5318 40.3542 35.833 39.8557C36.1341 39.3572 36.5186 39.0045 36.9865 38.7976C37.4545 38.5907 37.9851 38.5365 38.5784 38.6349C39.1729 38.7312 39.8086 38.9838 40.4854 39.3927C41.1663 39.804 41.6897 40.2515 42.0557 40.7354C42.4209 41.216 42.6218 41.7121 42.6585 42.2238C42.6963 42.7334 42.5641 43.2385 42.2617 43.7391ZM41.3103 43.1643C41.5454 42.7753 41.5393 42.3526 41.2922 41.8963C41.0443 41.4368 40.5464 40.9812 39.7987 40.5295C39.3043 40.2308 38.8576 40.0316 38.4588 39.9317C38.06 39.8319 37.7186 39.8248 37.4345 39.9104C37.1484 39.9948 36.9277 40.1657 36.7722 40.423C36.5384 40.8101 36.5461 41.2324 36.7952 41.6899C37.0423 42.1461 37.5361 42.5993 38.2766 43.0493C38.7718 43.3513 39.2192 43.5538 39.6189 43.6569C40.0197 43.7579 40.3632 43.7663 40.6492 43.6819C40.9333 43.5962 41.1537 43.4237 41.3103 43.1643ZM45.0453 36.2258L44.717 36.0275C44.4758 35.8819 44.2846 35.6972 44.1431 35.4734C44.0029 35.2477 43.9304 34.9992 43.9255 34.728C43.9206 34.4567 44.0026 34.1813 44.1716 33.9016C44.3454 33.6139 44.5528 33.4101 44.794 33.2902C45.0331 33.1691 45.2839 33.1201 45.5465 33.1433C45.8104 33.1643 46.0639 33.2483 46.3071 33.3952L46.6353 33.5935C46.8765 33.7392 47.0678 33.9239 47.2092 34.1476C47.3506 34.3713 47.4238 34.6188 47.4287 34.89C47.4348 35.1592 47.3521 35.4357 47.1808 35.7194C47.0094 36.0031 46.8025 36.2059 46.5602 36.3278C46.3179 36.4497 46.0648 36.5001 45.8009 36.479C45.5383 36.4559 45.2864 36.3715 45.0453 36.2258ZM45.1962 35.2342L45.5245 35.4325C45.6846 35.5292 45.8547 35.5794 46.035 35.5832C46.2153 35.587 46.3641 35.4916 46.4817 35.2971C46.6004 35.1005 46.6159 34.926 46.5283 34.7735C46.4398 34.6177 46.3146 34.4909 46.1524 34.3929L45.8242 34.1946C45.662 34.0967 45.4927 34.0428 45.3161 34.033C45.1375 34.0219 44.987 34.1176 44.8646 34.3203C44.7495 34.5108 44.736 34.6865 44.824 34.8476C44.91 35.0074 45.0341 35.1363 45.1962 35.2342ZM39.5714 37.2381L39.2432 37.0398C39 36.893 38.8083 36.7066 38.6681 36.4809C38.5279 36.2551 38.4563 36.0072 38.4535 35.7372C38.4486 35.466 38.5306 35.1906 38.6996 34.9109C38.8722 34.6252 39.079 34.4224 39.3201 34.3025C39.5605 34.1794 39.8119 34.1294 40.0746 34.1525C40.3372 34.1756 40.5901 34.2606 40.8332 34.4075L41.1615 34.6058C41.4047 34.7527 41.597 34.938 41.7384 35.1618C41.8791 35.3822 41.9508 35.6275 41.9537 35.8975C41.9565 36.1675 41.8729 36.4433 41.7027 36.725C41.5301 37.0107 41.3237 37.2151 41.0833 37.3383C40.8442 37.4594 40.5928 37.5094 40.3289 37.4883C40.0651 37.4672 39.8126 37.3838 39.5714 37.2381ZM39.7261 36.2404L40.0543 36.4387C40.2165 36.5367 40.387 36.5885 40.5661 36.5943C40.7443 36.5969 40.8922 36.5009 41.0097 36.3064C41.1272 36.1118 41.1421 35.9383 41.0545 35.7858C40.966 35.63 40.8407 35.5032 40.6786 35.4053L40.3503 35.207C40.1882 35.109 40.0189 35.0551 39.8423 35.0453C39.6637 35.0342 39.5138 35.1289 39.3926 35.3296C39.2763 35.5221 39.2628 35.6978 39.3521 35.8568C39.4413 36.0159 39.566 36.1437 39.7261 36.2404ZM44.5104 39.7486L40.8705 31.7085L41.3295 30.9486L44.9694 38.9887L44.5104 39.7486Z"
      fill={color}
    />
    <path
      d="M14.416 81.4338L15.3218 81.981L13.6289 84.7835L12.7231 84.2363L14.416 81.4338ZM18.5419 82.6597L17.7273 82.1676L16.9141 78.7267C16.8303 78.3939 16.7489 78.1097 16.67 77.874C16.5912 77.6382 16.4965 77.44 16.3862 77.2793C16.2758 77.1186 16.1345 76.9862 15.9623 76.8822C15.7657 76.7635 15.5706 76.7064 15.3769 76.7112C15.1812 76.7146 14.9977 76.7711 14.8265 76.8806C14.6552 76.9902 14.5096 77.1442 14.3896 77.3428C14.266 77.5475 14.2002 77.7525 14.1923 77.9579C14.1824 78.1621 14.2287 78.3533 14.3313 78.5314C14.4351 78.7075 14.5934 78.8599 14.8062 78.9884L14.158 80.0614C13.7629 79.8227 13.4739 79.525 13.291 79.1684C13.1081 78.8118 13.0321 78.4271 13.063 78.0143C13.0951 77.5994 13.2354 77.1863 13.4839 76.7749C13.736 76.3575 14.0356 76.0378 14.3826 75.816C14.7296 75.5941 15.0915 75.4781 15.4683 75.4678C15.8463 75.4555 16.2096 75.5547 16.5582 75.7652C16.7912 75.906 16.9933 76.0889 17.1643 76.3139C17.3354 76.539 17.4898 76.8466 17.6275 77.2367C17.7664 77.6249 17.9086 78.1381 18.0541 78.7764L18.4972 80.5085L18.5397 80.5342L20.1775 77.8229L21.1198 78.3921L18.5419 82.6597ZM23.2617 75.1141C22.9594 75.6146 22.5732 75.9677 22.1033 76.1733C21.6325 76.3757 21.0989 76.4282 20.5023 76.3306C19.905 76.2297 19.2669 75.9743 18.588 75.5642C17.9104 75.1521 17.391 74.707 17.0299 74.2288C16.6679 73.7475 16.469 73.2525 16.4332 72.7441C16.3986 72.2337 16.5318 71.7292 16.833 71.2307C17.1341 70.7322 17.5186 70.3795 17.9865 70.1726C18.4545 69.9657 18.9851 69.9115 19.5784 70.0099C20.1729 70.1062 20.8086 70.3588 21.4854 70.7677C22.1663 71.179 22.6897 71.6265 23.0557 72.1104C23.4209 72.591 23.6218 73.0871 23.6585 73.5988C23.6963 74.1084 23.5641 74.6135 23.2617 75.1141ZM22.3103 74.5393C22.5454 74.1503 22.5393 73.7276 22.2922 73.2713C22.0443 72.8118 21.5464 72.3562 20.7987 71.9045C20.3043 71.6058 19.8576 71.4066 19.4588 71.3067C19.06 71.2069 18.7186 71.1998 18.4345 71.2854C18.1484 71.3698 17.9277 71.5407 17.7722 71.798C17.5384 72.1851 17.5461 72.6074 17.7952 73.0649C18.0423 73.5211 18.5361 73.9743 19.2766 74.4243C19.7718 74.7263 20.2192 74.9288 20.6189 75.0319C21.0197 75.1329 21.3632 75.1413 21.6492 75.0569C21.9333 74.9712 22.1537 74.7987 22.3103 74.5393ZM26.0453 67.6008L25.717 67.4025C25.4758 67.2569 25.2846 67.0722 25.1431 66.8484C25.0029 66.6227 24.9304 66.3742 24.9255 66.103C24.9206 65.8317 25.0026 65.5563 25.1716 65.2766C25.3454 64.9889 25.5528 64.7851 25.794 64.6652C26.0331 64.5441 26.2839 64.4951 26.5465 64.5183C26.8104 64.5393 27.0639 64.6233 27.3071 64.7702L27.6353 64.9685C27.8765 65.1142 28.0678 65.2989 28.2092 65.5226C28.3506 65.7463 28.4238 65.9938 28.4287 66.265C28.4348 66.5342 28.3521 66.8107 28.1808 67.0944C28.0094 67.3781 27.8025 67.5809 27.5602 67.7028C27.3179 67.8247 27.0648 67.8751 26.8009 67.854C26.5383 67.8309 26.2864 67.7465 26.0453 67.6008ZM26.1962 66.6092L26.5245 66.8075C26.6846 66.9042 26.8547 66.9544 27.035 66.9582C27.2153 66.962 27.3641 66.8666 27.4817 66.6721C27.6004 66.4755 27.6159 66.301 27.5283 66.1485C27.4398 65.9927 27.3146 65.8659 27.1524 65.7679L26.8242 65.5696C26.662 65.4717 26.4927 65.4178 26.3161 65.408C26.1375 65.3969 25.987 65.4926 25.8646 65.6953C25.7495 65.8858 25.736 66.0615 25.824 66.2226C25.91 66.3824 26.0341 66.5113 26.1962 66.6092ZM20.5714 68.6131L20.2432 68.4148C20 68.268 19.8083 68.0816 19.6681 67.8559C19.5279 67.6301 19.4563 67.3822 19.4535 67.1122C19.4486 66.841 19.5306 66.5656 19.6996 66.2859C19.8722 66.0002 20.079 65.7974 20.3201 65.6775C20.5605 65.5544 20.8119 65.5044 21.0746 65.5275C21.3372 65.5506 21.5901 65.6356 21.8332 65.7825L22.1615 65.9808C22.4047 66.1277 22.597 66.313 22.7384 66.5368C22.8791 66.7572 22.9508 67.0025 22.9537 67.2725C22.9565 67.5425 22.8729 67.8183 22.7027 68.1C22.5301 68.3857 22.3237 68.5901 22.0833 68.7133C21.8442 68.8344 21.5928 68.8844 21.3289 68.8633C21.0651 68.8422 20.8126 68.7588 20.5714 68.6131ZM20.7261 67.6154L21.0543 67.8137C21.2165 67.9117 21.387 67.9635 21.5661 67.9693C21.7443 67.9719 21.8922 67.8759 22.0097 67.6814C22.1272 67.4868 22.1421 67.3133 22.0545 67.1608C21.966 67.005 21.8407 66.8782 21.6786 66.7803L21.3503 66.582C21.1882 66.484 21.0189 66.4301 20.8423 66.4203C20.6637 66.4092 20.5138 66.5039 20.3926 66.7046C20.2763 66.8971 20.2628 67.0728 20.3521 67.2318C20.4413 67.3909 20.566 67.5187 20.7261 67.6154ZM25.5104 71.1236L21.8705 63.0835L22.3295 62.3236L25.9694 70.3637L25.5104 71.1236Z"
      fill={color}
    />
  </TariffCardDiscountLabelStyled>
);
