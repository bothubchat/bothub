import React from 'react';
import {
  SidebarAvatarSkeleton,
  SidebarUserAvatarBox,
  SidebarUserBox,
  SidebarUserCaps,
  SidebarUserInfo,
  SidebarUserName,
  SidebarUserStyled,
  SidebarUserTextBox,
} from './styled';
import { useSidebar } from '../context';
import { Skeleton } from '@/ui/components/skeleton';
import { Button } from '@/ui/components/button';
import { LogoutIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';
import { useTheme } from '@/ui/theme';

export const SidebarUserSkeleton: React.FC = () => {
  const { isOpen } = useSidebar();
  const theme = useTheme();

  if (!isOpen) {
    return <SidebarAvatarSkeleton />;
  }

  return (
    <SidebarUserStyled>
      <SidebarUserBox>
        <SidebarUserInfo>
          <SidebarUserAvatarBox>
            <SidebarAvatarSkeleton />
          </SidebarUserAvatarBox>
          <SidebarUserTextBox>
            <SidebarUserName>
              <Skeleton
                width={100}
                height={20}
              />
            </SidebarUserName>
            <SidebarUserCaps>
              <Skeleton
                width={150}
                height={20}
              />
            </SidebarUserCaps>
          </SidebarUserTextBox>
        </SidebarUserInfo>
        <Button
          disabled
          variant="text"
        >
          <LogoutIcon
            fill={theme.colors.grayScale.gray1}
            size={18}
          />
        </Button>
      </SidebarUserBox>
      <Button disabled>
        <Typography variant="button-sm">
          <Skeleton />
        </Typography>
      </Button>
    </SidebarUserStyled>
  );
};
