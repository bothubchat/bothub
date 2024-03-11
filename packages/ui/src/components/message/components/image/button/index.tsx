import React from 'react';
import { MessageImageButtonContent, MessageImageButtonStyled, MessageImageButtonZoneWrapper } from './styled';
import { ButtonProps } from '@/ui/components/button';

export type MessageImageButtonProps = ButtonProps & React.PropsWithChildren & {
  className?: string;
  zone?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const MessageImageButton: React.FC<MessageImageButtonProps> = ({
  className, zone = false, children, onClick, ...props
}) => {
  const contentNode = (
    <MessageImageButtonContent
      {...props}
      onClick={onClick}
    >
      {children}
    </MessageImageButtonContent>
  );

  let zoneNode: React.ReactNode;
  if (zone) {
    zoneNode = (
      <MessageImageButtonZoneWrapper>
        {contentNode}
      </MessageImageButtonZoneWrapper>
    );
  } else {
    zoneNode = contentNode;
  }

  return (
    <MessageImageButtonStyled 
      className={className}
    >
      {zoneNode}
    </MessageImageButtonStyled>
  );
};

export * from './styled';
export * from './list';
