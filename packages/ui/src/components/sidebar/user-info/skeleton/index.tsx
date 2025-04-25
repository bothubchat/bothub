import {
  SidebarUserInfoStyled,
  SidebarUserInfoContent,
  SidebarUserInfoMain,
  SidebarUserInfoLeft,
  SidebarUserInfoText,
  SidebarUserInfoUpdateTariffContainer
} from '../styled';
import { SidebarUserInfoAvatar } from '../avatar';
import { Skeleton } from '@/ui/components/skeleton';
import { SidebarUserInfoSkeletonText } from './styled';
import { Button } from '@/ui/components/button';
import { useSidebar } from '../../context';

export const SidebarUserInfoSkeleton = () => {
  const { isOpen } = useSidebar();

  return (
    <SidebarUserInfoStyled $open={isOpen}>
      <SidebarUserInfoContent>
        <SidebarUserInfoMain>
          <SidebarUserInfoLeft>
            <SidebarUserInfoAvatar />
            <SidebarUserInfoText>
              <SidebarUserInfoSkeletonText
                component={Skeleton}
                variant="body-s-semibold"
              />
              <SidebarUserInfoSkeletonText
                component={Skeleton}
                variant="body-xs-regular"
              />
            </SidebarUserInfoText>
          </SidebarUserInfoLeft>
        </SidebarUserInfoMain>
        <SidebarUserInfoUpdateTariffContainer $open={isOpen}>
          <Button
            skeleton
            fullWidth
            size="small"
          />
        </SidebarUserInfoUpdateTariffContainer>
      </SidebarUserInfoContent>
    </SidebarUserInfoStyled>
  );
};
