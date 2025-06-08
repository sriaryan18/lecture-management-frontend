import { z } from 'zod';

export const addClassRoomFormSchema = z.object({
  classroomName: z.string().min(1, { message: 'Classroom name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
});
