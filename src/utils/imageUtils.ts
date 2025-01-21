import { config } from '@/config';

const toImage = (image?: string) => image && `${config.BASE_URL}/${image}`;

export default toImage;
