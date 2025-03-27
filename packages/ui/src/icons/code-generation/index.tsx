import { Icon, icon, IconConsumer } from '@/ui/components';

export const CodeGeneration = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#fff' } = { fill: '#fff' }) => (
        <>
          <path
            d="M18.668 2.66406L19.5727 4.95808C19.6562 5.16984 19.698 5.27572 19.7619 5.365C19.8186 5.44413 19.8879 5.51342 19.967 5.5701C20.0563 5.63404 20.1622 5.6758 20.374 5.75932L22.668 6.66406L20.374 7.56882C20.1622 7.65233 20.0563 7.69406 19.967 7.75802C19.8879 7.81468 19.8186 7.88397 19.7619 7.96313C19.698 8.05242 19.6562 8.15828 19.5727 8.37006L18.668 10.6641L17.7632 8.37006C17.6797 8.15828 17.6379 8.05242 17.574 7.96313C17.5173 7.88397 17.448 7.81468 17.3689 7.75802C17.2796 7.69406 17.1737 7.65233 16.962 7.56882L14.668 6.66406L16.962 5.75932C17.1737 5.6758 17.2796 5.63404 17.3689 5.5701C17.448 5.51342 17.5173 5.44413 17.574 5.365C17.6379 5.27572 17.6797 5.16984 17.7632 4.95808L18.668 2.66406Z"
            fill={fill}
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g clipPath="url(#clip0_9047_27289)">
            <mask
              id="path-2-inside-1_9047_27289"
              fill={fill}
            >
              <path d="M8.10478 11.6378L2.97171 6.50471C2.56672 6.09972 2.56672 5.4431 2.97171 5.03812C3.3767 4.63313 4.03331 4.63313 4.4383 5.03812L10.3047 10.9045C10.7097 11.3095 10.7097 11.9661 10.3047 12.3711L4.4383 18.2374C4.03331 18.6424 3.3767 18.6424 2.97171 18.2374C2.56672 17.8325 2.56672 17.1758 2.97171 16.7709L8.10478 11.6378ZM12.0013 16.1418H20.2976C20.8703 16.1418 21.3346 16.6061 21.3346 17.1788C21.3346 17.7516 20.8703 18.2159 20.2976 18.2159H12.0013C11.4286 18.2159 10.9643 17.7516 10.9643 17.1788C10.9643 16.6061 11.4286 16.1418 12.0013 16.1418Z" />
            </mask>
            <path
              d="M8.10478 11.6378L2.97171 6.50471C2.56672 6.09972 2.56672 5.4431 2.97171 5.03812C3.3767 4.63313 4.03331 4.63313 4.4383 5.03812L10.3047 10.9045C10.7097 11.3095 10.7097 11.9661 10.3047 12.3711L4.4383 18.2374C4.03331 18.6424 3.3767 18.6424 2.97171 18.2374C2.56672 17.8325 2.56672 17.1758 2.97171 16.7709L8.10478 11.6378ZM12.0013 16.1418H20.2976C20.8703 16.1418 21.3346 16.6061 21.3346 17.1788C21.3346 17.7516 20.8703 18.2159 20.2976 18.2159H12.0013C11.4286 18.2159 10.9643 17.7516 10.9643 17.1788C10.9643 16.6061 11.4286 16.1418 12.0013 16.1418Z"
              fill={fill}
            />
            <path
              d="M8.10478 11.6378L39.5317 43.0647L70.9587 11.6378L39.5317 -19.7892L8.10478 11.6378ZM2.97171 6.50471L34.3987 -24.9223L2.97171 6.50471ZM4.4383 5.03812L-26.9887 36.4651L4.4383 5.03812ZM10.3047 10.9045L41.7316 -20.5225L10.3047 10.9045ZM10.3047 12.3711L41.7316 43.798V43.798L10.3047 12.3711ZM4.4383 18.2374L-26.9887 -13.1895L-26.9887 -13.1895L4.4383 18.2374ZM2.97171 16.7709L34.3987 48.1978H34.3987L2.97171 16.7709ZM39.5317 -19.7892L34.3987 -24.9223L-28.4553 37.9317L-23.3222 43.0647L39.5317 -19.7892ZM34.3987 -24.9223C51.3503 -7.97061 51.3503 19.5134 34.3987 36.4651L-28.4553 -26.3889C-46.2169 -8.62723 -46.2169 20.1701 -28.4553 37.9317L34.3987 -24.9223ZM34.3987 36.4651C17.447 53.4167 -10.037 53.4167 -26.9887 36.4651L35.8653 -26.3889C18.1036 -44.1505 -10.6936 -44.1505 -28.4553 -26.3889L34.3987 36.4651ZM-26.9887 36.4651L-21.1223 42.3315L41.7316 -20.5225L35.8653 -26.3889L-26.9887 36.4651ZM-21.1223 42.3315C-38.0739 25.3798 -38.0739 -2.10424 -21.1223 -19.0559L41.7316 43.798C59.4933 26.0364 59.4933 -2.76086 41.7316 -20.5225L-21.1223 42.3315ZM-21.1223 -19.0559L-26.9887 -13.1895L35.8653 49.6644L41.7316 43.798L-21.1223 -19.0559ZM-26.9887 -13.1895C-10.037 -30.1412 17.447 -30.1412 34.3987 -13.1895L-28.4553 49.6644C-10.6936 67.426 18.1036 67.426 35.8653 49.6644L-26.9887 -13.1895ZM34.3987 -13.1895C51.3503 3.76212 51.3503 31.2462 34.3987 48.1978L-28.4553 -14.6561C-46.2169 3.10551 -46.2169 31.9028 -28.4553 49.6644L34.3987 -13.1895ZM34.3987 48.1978L39.5317 43.0647L-23.3222 -19.7892L-28.4553 -14.6561L34.3987 48.1978ZM12.0013 60.5862H20.2976V-28.3027H12.0013V60.5862ZM20.2976 60.5862C-3.67565 60.5862 -23.1098 41.1521 -23.1098 17.1788H65.7791C65.7791 -7.93991 45.4163 -28.3027 20.2976 -28.3027V60.5862ZM-23.1098 17.1788C-23.1098 -6.79443 -3.67565 -26.2286 20.2976 -26.2286V62.6603C45.4163 62.6603 65.7791 42.2976 65.7791 17.1788H-23.1098ZM20.2976 -26.2286H12.0013V62.6603H20.2976V-26.2286ZM12.0013 -26.2286C35.9746 -26.2286 55.4087 -6.79443 55.4087 17.1788H-33.4802C-33.4802 42.2975 -13.1174 62.6603 12.0013 62.6603V-26.2286ZM55.4087 17.1788C55.4087 41.1521 35.9746 60.5862 12.0013 60.5862V-28.3027C-13.1174 -28.3027 -33.4802 -7.93991 -33.4802 17.1788H55.4087Z"
              fill={fill}
              mask="url(#path-2-inside-1_9047_27289)"
            />
          </g>
          <defs>
            <clipPath id="clip0_9047_27289">
              <rect
                width="18.6667"
                height="18.6667"
                fill={fill}
                transform="translate(2.66797 2.66406)"
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
