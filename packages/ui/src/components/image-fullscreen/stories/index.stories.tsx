import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  ImageFullScreen,
  ImageFullScreenAuthor,
  ImageFullScreenAuthorAvatar,
  ImageFullScreenAuthorName,
  ImageFullScreenAuthorTag,
  ImageFullScreenToolbar,
} from '@/ui/components/image-fullscreen';
import image from './assets/image.png';
import image1 from './assets/image-1.png';
import image2 from './assets/image-2.png';
import image3 from './assets/image-3.png';
import image4 from './assets/image-4.png';
import { DownloadImgIcon } from '@/ui/icons/download-img';
import { MjWhiteIcon } from '@/ui/icons/mj-white';
import { AdaptiveButton } from '@/ui/components/adaptive-button';

export type ImageFullScreenMeta = Meta<typeof ImageFullScreen>;

export type ImageFullScreenStory = StoryObj<typeof ImageFullScreen>;

export const Basic: ImageFullScreenStory = {
  args: {
    open: true,
    data: [
      {
        url: image,
        width: 512,
        height: 512,
      },
    ],
  },
};

export const Toolbar: ImageFullScreenStory = {
  args: {
    ...Basic.args,
    author: (
      <ImageFullScreenAuthor>
        <ImageFullScreenAuthorAvatar>
          <MjWhiteIcon />
        </ImageFullScreenAuthorAvatar>
        <ImageFullScreenAuthorName>Midjourney</ImageFullScreenAuthorName>
        <ImageFullScreenAuthorTag>6.0</ImageFullScreenAuthorTag>
      </ImageFullScreenAuthor>
    ),
    toolbar: (
      <ImageFullScreenToolbar>
        <AdaptiveButton startIcon={<DownloadImgIcon />}>
          Скачать изображение
        </AdaptiveButton>
      </ImageFullScreenToolbar>
    ),
  },
};

export const Images: ImageFullScreenStory = {
  args: {
    ...Toolbar.args,
    item: 'image2',
    data: [
      {
        id: 'image1',
        url: image1,
        width: 1024,
        height: 1024,
      },
      {
        id: 'image2',
        url: image2,
        width: 1024,
        height: 1024,
      },
      {
        id: 'image3',
        url: image3,
        width: 1024,
        height: 1024,
      },
      {
        id: 'image4',
        url: image4,
        width: 1024,
        height: 1024,
      },
    ],
  },
};

export const Images2: ImageFullScreenStory = {
  args: {
    ...Toolbar.args,
    item: 'image2',
    data: [
      {
        id: 'image1',
        url: image1,
        width: 1024,
        height: 1024,
      },
      {
        id: 'image2',
        url: image2,
        width: 1024,
        height: 1024,
      },
      {
        id: 'image3',
        url: image3,
        width: 1024,
        height: 1024,
      },
    ],
  },
};

export default {
  title: 'Components/Image/FullScreen',
  component: ImageFullScreen,
  decorators: [StoryDecorator()],
} as ImageFullScreenMeta;
