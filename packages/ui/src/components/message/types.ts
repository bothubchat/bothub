export type MessageVariant = 'user' | 'assistant';

export type MessageColor = string | 'default' | 'green' | 'purple';

export type MessageCopyEventHandler = () => unknown;

export type MessageCodeCopyEventHandler = (code: string) => unknown;
