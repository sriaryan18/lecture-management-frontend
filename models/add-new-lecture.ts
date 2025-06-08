import z from 'zod';

export const addLectureFormSchema = z.object({
  lectureName: z.string().min(1, { message: 'Lecture name is required' }),
  topics: z.array(z.string()).min(1, { message: 'Topics are required' }),
  instructorId: z.string().min(1, { message: 'Instructor is required' }),
  classroomId: z.string().min(1, { message: 'Classroom is required' }),
  lectureDescription: z.string().min(1, { message: 'Lecture description is required' }),
});
