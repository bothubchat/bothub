import { Icon, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const SimpleGearBgIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      size={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect
        width="24"
        height="24"
        rx="4"
        fill={theme.colors.grayScale.gray3}
      />
      <path
        d="M17.2311 11.7386C17.2334 11.653 17.2334 11.5674 17.2311 11.4818L18.1181 10.3736C18.1646 10.3154 18.1968 10.2471 18.2121 10.1742C18.2274 10.1013 18.2253 10.0258 18.2061 9.95383C18.0604 9.4073 17.8429 8.8825 17.5592 8.39316C17.5221 8.32914 17.4705 8.27468 17.4085 8.23412C17.3466 8.19356 17.2761 8.16801 17.2025 8.15951L15.7923 8.00255C15.7336 7.94072 15.6742 7.88127 15.6139 7.82419L15.4474 6.41037C15.4389 6.33678 15.4132 6.2662 15.3726 6.20426C15.3319 6.14233 15.2773 6.09076 15.2132 6.05365C14.7239 5.7702 14.1991 5.55308 13.6525 5.40798C13.5805 5.38875 13.5051 5.3867 13.4322 5.40198C13.3593 5.41726 13.291 5.44946 13.2328 5.49597L12.1275 6.37827H11.8707L10.7625 5.493C10.7043 5.44649 10.636 5.41429 10.5631 5.39901C10.4902 5.38372 10.4147 5.38578 10.3427 5.40501C9.79618 5.55068 9.27138 5.7682 8.78205 6.05187C8.71802 6.08904 8.66356 6.14065 8.623 6.20257C8.58244 6.2645 8.55689 6.33505 8.54839 6.40859L8.39143 7.82122C8.3296 7.88027 8.27015 7.93973 8.21307 7.99958L6.79925 8.16189C6.72566 8.17045 6.65508 8.19609 6.59315 8.23676C6.53121 8.27743 6.47964 8.332 6.44253 8.39614C6.15914 8.88554 5.94183 9.41033 5.79627 9.9568C5.77712 10.0288 5.77516 10.1043 5.79055 10.1772C5.80594 10.2501 5.83824 10.3184 5.88485 10.3765L6.76715 11.4818V11.7386L5.88188 12.8469C5.83537 12.9051 5.80317 12.9733 5.78789 13.0463C5.77261 13.1192 5.77466 13.1946 5.79389 13.2666C5.93957 13.8131 6.15708 14.3379 6.44075 14.8273C6.47792 14.8913 6.52953 14.9458 6.59146 14.9863C6.65339 15.0269 6.72393 15.0524 6.79747 15.0609L8.20772 15.2179C8.26678 15.2797 8.32623 15.3392 8.38608 15.3963L8.55077 16.8101C8.55933 16.8837 8.58497 16.9542 8.62564 17.0162C8.66631 17.0781 8.72089 17.1297 8.78502 17.1668C9.27442 17.4502 9.79921 17.6675 10.3457 17.8131C10.4177 17.8322 10.4932 17.8342 10.5661 17.8188C10.639 17.8034 10.7073 17.7711 10.7654 17.7245L11.8707 16.8422C11.9563 16.8445 12.0419 16.8445 12.1275 16.8422L13.2357 17.7292C13.2939 17.7757 13.3622 17.8079 13.4351 17.8232C13.508 17.8385 13.5835 17.8364 13.6555 17.8172C14.2021 17.6718 14.7269 17.4543 15.2162 17.1704C15.2802 17.1332 15.3346 17.0816 15.3752 17.0196C15.4158 16.9577 15.4413 16.8872 15.4498 16.8136L15.6068 15.4034C15.6686 15.3447 15.7281 15.2853 15.7851 15.225L17.1989 15.0586C17.2725 15.05 17.3431 15.0244 17.4051 14.9837C17.467 14.943 17.5186 14.8884 17.5557 14.8243C17.8391 14.3349 18.0564 13.8101 18.2019 13.2636C18.2211 13.1916 18.223 13.1161 18.2077 13.0432C18.1923 12.9703 18.16 12.902 18.1133 12.8439L17.2311 11.7386ZM11.9991 13.9884C11.5287 13.9884 11.069 13.8489 10.6779 13.5876C10.2868 13.3263 9.98196 12.9549 9.80197 12.5203C9.62197 12.0858 9.57487 11.6076 9.66664 11.1463C9.7584 10.6849 9.9849 10.2612 10.3175 9.92861C10.6501 9.59602 11.0738 9.36952 11.5351 9.27776C11.9965 9.18599 12.4746 9.23309 12.9092 9.41309C13.3437 9.59308 13.7152 9.8979 13.9765 10.289C14.2378 10.6801 14.3773 11.1399 14.3773 11.6102C14.3773 12.2409 14.1267 12.8458 13.6807 13.2918C13.2347 13.7378 12.6298 13.9884 11.9991 13.9884Z"
        fill="#4785FF"
      />
    </Icon>
  );
});
