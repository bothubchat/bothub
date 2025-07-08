import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const VKFilledIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      size={20}
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = theme.colors.base.white } = { fill: theme.colors.base.white }
        ) => (
          <>
            <g clipPath="url(#clip0_548_1367)">
              <rect
                width="15"
                height="11.25"
                transform="translate(3.25 4.375)"
                fill={fill}
              />
              <path
                d="M2.15 1.4C0.75 2.81333 0.75 5.07333 0.75 9.6V10.4C0.75 14.92 0.75 17.18 2.15 18.6C3.56333 20 5.82333 20 10.35 20H11.15C15.67 20 17.93 20 19.35 18.6C20.75 17.1867 20.75 14.9267 20.75 10.4V9.6C20.75 5.08 20.75 2.82 19.35 1.4C17.9367 2.6491e-07 15.6767 0 11.15 0H10.35C5.83 0 3.57 2.6491e-07 2.15 1.4ZM4.12333 6.08667H6.41667C6.49 9.9 8.17 11.5133 9.50333 11.8467V6.08667H11.6567V9.37333C12.97 9.23333 14.3567 7.73333 14.8233 6.08H16.97C16.7948 6.9358 16.4451 7.7463 15.9427 8.46091C15.4403 9.17551 14.796 9.77888 14.05 10.2333C14.8827 10.6476 15.6181 11.2338 16.2076 11.9532C16.7971 12.6726 17.2274 13.5088 17.47 14.4067H15.1033C14.5967 12.8267 13.33 11.6 11.6567 11.4333V14.4067H11.39C6.83 14.4067 4.23 11.2867 4.12333 6.08667Z"
                fill="#0077FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_548_1367">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.75)"
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
