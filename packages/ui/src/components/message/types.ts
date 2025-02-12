export type MessageVariant = 'user' | 'assistant';

export type MessageColor = string | 'default' | 'green' | 'purple';

export type MessageTimestampPosition = 'right' | 'bottom';

export type MessageCopyEventHandler = (data: ClipboardItem[]) => unknown;
export type MessageContextCopyEventHandler = () => unknown;

export type MessageCodeCopyEventHandler = (code: string) => unknown;

export type MessagePlainTextCopyEventHandler = () => unknown;

export type MessageActionEventHandler = ({
  id,
  message
}: {
  id?: string;
  message?: string;
}) => unknown;

export type MessageActionEditEventHandler = ({
  id,
  message,
  variant
}: {
  id?: string;
  message?: string;
  variant?: MessageVariant;
}) => unknown;

export type MessageVersionEventHandler = (id?: string) => unknown;
