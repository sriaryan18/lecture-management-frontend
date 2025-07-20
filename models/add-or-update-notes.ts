import z from 'zod';

export const addOrUpdateNotesFormSchema = z.object({
  lectureId: z.string().min(1, { message: 'Lecture is required' }),
  classroomId: z.string().min(1, { message: 'Classroom is required' }),
  instructorId: z.string().min(1, { message: 'Instructor is required' }),
  notes: z.string().min(1, { message: 'Notes are required' }),
});

export const addOrUpdateStudentNotesFormSchema = z.object({
  studentId: z.string().min(1, { message: 'Student is required' }),
  lectureId: z.string().min(1, { message: 'Lecture is required' }),
  classroomId: z.string().min(1, { message: 'Classroom is required' }),
  notes: z.string().min(1, { message: 'Notes are required' }),
});
