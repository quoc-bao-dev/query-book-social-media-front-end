import { config } from '@/config';

type Media = {
    sourceType: 'file' | 'url';
    type: 'image' | 'video';
    fileName?: string;
    url?: string;
};
export const media = {
    toImage: (media: Media) => {
        if (media.sourceType === 'file')
            return `${config.IMAGE_SERVER_URL}/${media.fileName}`;

        if (media.sourceType === 'url') return media.url;
    },
    toMedia: (payload: Media) => {
        return payload;
    },
};
