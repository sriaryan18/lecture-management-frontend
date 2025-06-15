import { z } from 'zod';

export const  shareClassroomInviteSchema = z.object({
  classroomId: z.string().min(1, { message: 'Classroom is required' }),
  expiresAt: z.string().min(1, { message: 'Expires at is required' }),
});
