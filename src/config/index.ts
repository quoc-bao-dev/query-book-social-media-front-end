export const config = {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL as string,
    IMAGE_SERVER_URL: process.env.NEXT_PUBLIC_IMAGE_SERVER_URL as string,
    IMAGE_API_KEY: process.env.NEXT_PUBLIC_IMAGE_SERVER_API_KEY as string,
    API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN as string,
    API_PATH: process.env.NEXT_PUBLIC_API_PATH as string,
    MESSAGE_SERVER_URL: process.env.NEXT_PUBLIC_MESSAGE_SERVER_URL as string,
    MESSAGE_SOCKET_URL: process.env.NEXT_PUBLIC_MESSAGE_SOCKET_URL as string,
    NEXT_PUBLIC_STRIPE_PUBLISH_KEY: process.env
        .NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string,
};
