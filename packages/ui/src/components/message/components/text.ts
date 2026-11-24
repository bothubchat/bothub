import { MessageVariant } from '../types';

/**
 * Межстрочный интервал текста сообщения: ответ читают долго, ему нужен
 * воздух из макета; в пузыре пользователя строк мало и они плотнее
 */
export const getMessageLineHeight = (variant: MessageVariant) =>
  variant === 'user' ? 1.45 : 1.6;
