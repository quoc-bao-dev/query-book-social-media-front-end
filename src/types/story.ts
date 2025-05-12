

export type CrateStoryPayload = {
    content: string,
    media: {
        type: string,
        sourceType: string,
        fileName: string,
    },
    status: string,
}