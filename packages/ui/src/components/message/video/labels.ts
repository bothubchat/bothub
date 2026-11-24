/** Texts of the player: button names for screen readers and the error. */
export interface MessageVideoLabels {
  player: string;
  play: string;
  pause: string;
  replay: string;
  seek: string;
  mute: string;
  unmute: string;
  volume: string;
  speed: string;
  download: string;
  enterFullscreen: string;
  exitFullscreen: string;
  rewind: string;
  forward: string;
  loading: string;
  errorTitle: string;
  errorDescription: string;
  retry: string;
}

export const defaultMessageVideoLabels: MessageVideoLabels = {
  player: 'Видеоплеер',
  play: 'Воспроизвести',
  pause: 'Пауза',
  replay: 'Смотреть снова',
  seek: 'Перемотка',
  mute: 'Выключить звук',
  unmute: 'Включить звук',
  volume: 'Громкость',
  speed: 'Скорость',
  download: 'Скачать видео',
  enterFullscreen: 'Во весь экран',
  exitFullscreen: 'Выйти из полноэкранного режима',
  rewind: 'Назад на 10 секунд',
  forward: 'Вперёд на 10 секунд',
  loading: 'Видео загружается',
  errorTitle: 'Не удалось загрузить видео',
  errorDescription: 'Ссылка устарела или пропало соединение',
  retry: 'Повторить',
};
