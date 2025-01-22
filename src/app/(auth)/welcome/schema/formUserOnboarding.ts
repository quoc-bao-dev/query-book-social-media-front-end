import { z } from 'zod';

export const formUserOnboarding = z.object({
    firstName: z.string(),
    lastName: z.string(),
});
