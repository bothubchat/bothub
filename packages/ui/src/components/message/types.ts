export type MessageVariant = 'user' | 'assistant';

export type MessageColor = string | 'default' | 'green' | 'purple';

export type MessageCopyEventHandler = (data: ClipboardItem[]) => unknown;
export type MessageContextCopyEventHandler = () => unknown;

export type MessageCodeCopyEventHandler = (code: string) => unknown;

export type MessageActionEventHandler = ({
  id,
  message,
}: {
  id?: string;
  message?: string;
}) => unknown;

export type MessageVersionEventHandler = (id?: string) => unknown;
