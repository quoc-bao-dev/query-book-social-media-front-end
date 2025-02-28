import { config } from '@/config';
import { Media } from '@/types/common';

export const media = {
  toImage: (media?: Media) => {
    if (!media) return undefined;
    if (media.sourceType === 'file')
      return `${config.IMAGE_SERVER_URL}/${media.file}`;

    if (media.sourceType === 'url') return media.url;
  },
  toMedia: (payload: Media) => {
    return payload;
  },
};
