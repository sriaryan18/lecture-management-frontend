import { GET_ALL_CLASSROOMS_BY_INSTRUCTOR_ID } from '@/garphql/instructor/queries/classrooms';
import { GET_ALL_CLASSROOMS_BY_STUDENT_ID } from '@/garphql/students/queries/classrooms';
import { GET_LECTURE_BY_ID } from '@/garphql/students/queries/lectures';
import { GET_STUDENT_NOTES } from '@/garphql/students/queries/notes';
import { DocumentNode } from 'graphql';

export interface IQueryConfig {
  name: DocumentNode;
  variables: (context: any) => any;
  preQueryAdaptorChain?: {
    name: string;
    dataTemplate: { data: string }; // template for the data to be resolved
  }[];
  postQueryAdaptorChain?: {
    name: string;
    dataTemplate: { data: string }; // template for the data to be resolved
  }[];
  skip?: (context: any) => boolean;
  enabled?: (context: any) => boolean;
}

export interface IConfigSections {
  permissions?: Record<string, unknown>;
  sections?: Record<string, unknown>;
  queries?: Record<string, IQueryConfig>;
}

export interface IPermissionsAndAccess {
  TOOLBAR: {
    permissions: {
      canAddLLecture: boolean;
      canAddNotes: boolean;
      canAddClassroom: boolean;
      canAddTests: boolean;
      canAddPersonalNotes: boolean;
      canManageStudents: boolean;
    };
  };
  LECTURE: {
    permissions: {
      canOpenTests: boolean;
      canOpenNotes: boolean;
      canViewLectureInfo: boolean;
      canViewLectureNotes: boolean;
      canViewLectureTests: boolean;
    };

    queries: {
      getLecturesById?: IQueryConfig;
      getStudentNotesByLectureId?: IQueryConfig;
      // getNotesByLectureId?: IQueryConfig;
      // getTestsByLectureId?: IQueryConfig;
      // getStudentNotesByLectureId?: IQueryConfig;
      // getStudentTestsByLectureId?: IQueryConfig;
    };
  };
  SIDEBAR: {
    query: {
      getAllClassrooms: IQueryConfig;
    };
  };
}

export interface IRoleSpecificConfig {
  STUDENT: IPermissionsAndAccess;
  INSTRUCTOR: IPermissionsAndAccess;
  ADMIN: IPermissionsAndAccess;
}

export const roleSpecificConfigs: IRoleSpecificConfig = {
  STUDENT: {
    TOOLBAR: {
      permissions: {
        canAddClassroom: false,
        canAddLLecture: false,
        canAddNotes: false,
        canAddPersonalNotes: true,
        canAddTests: false,
        canManageStudents: false,
      },
      sections: {
        canViewLectureInfo: true,
      },
    },
    LECTURE: {
      permissions: {
        canOpenNotes: true,
        canOpenTests: true,
        canViewLectureInfo: true,
        canViewLectureNotes: true,
        canViewLectureTests: true,
      },
      queries: {
        getLecturesById: {
          name: GET_LECTURE_BY_ID,
          variables: (context: { lectureId: string }) => ({
            lectureId: context.lectureId,
          }),
          postQueryAdaptorChain: [
            {
              name: 'resolveValues',
              dataTemplate: { data: 'getLectureById' },
            },
          ],
          preQueryAdaptorChain: [],
        },

        getStudentNotesByLectureId: {
          name: GET_STUDENT_NOTES,
          variables: (context: { lectureId: string; classroomId: string; studentId: string }) => ({
            lectureId: context.lectureId,
            classroomId: context.classroomId,
            studentId: context.studentId,
          }),
          postQueryAdaptorChain: [
            {
              name: 'resolveValues',
              dataTemplate: { data: 'getStudentNotesByLectureId' },
            },
          ],
          preQueryAdaptorChain: [],
        },
      },
      // sections: {
      //   canViewLectureInfo: true,
      //   canViewLectureNotes: true,
      //   canViewLectureTests: true,
      // },
    },
    SIDEBAR: {
      query: {
        getAllClassrooms: {
          name: GET_ALL_CLASSROOMS_BY_STUDENT_ID,
          variables: (context: { auth: { id: string } }) => ({
            studentId: context.auth.id,
          }),
          postQueryAdaptorChain: [
            {
              name: 'resolveValues',
              dataTemplate: { data: 'getClassroomsByStudentIds' },
            },
          ],
        },
      },
    },
  },
  INSTRUCTOR: {
    TOOLBAR: {
      permissions: {
        canAddClassroom: true,
        canAddLLecture: true,
        canAddNotes: true,
        canAddPersonalNotes: true,
        canAddTests: true,
        canManageStudents: true,
      },
    },
    LECTURE: {
      permissions: {
        canOpenNotes: true,
        canOpenTests: true,
        canViewLectureInfo: true,
        canViewLectureNotes: true,
        canViewLectureTests: true,
      },
      queries: {
        getLecturesById: {
          name: GET_LECTURE_BY_ID,
          variables: (context: { lectureId: string }) => ({
            lectureId: context.lectureId,
          }),
          postQueryAdaptorChain: [
            {
              name: 'resolveValues',
              dataTemplate: { data: 'getLectureById' },
            },
          ],
          preQueryAdaptorChain: [],
        },
      },
      // mutations: {}
    },
    SIDEBAR: {
      query: {
        getAllClassrooms: {
          name: GET_ALL_CLASSROOMS_BY_INSTRUCTOR_ID,
          variables: (context: { auth: { id: string } }) => ({
            instructorID: context.auth.id,
          }),
          postQueryAdaptorChain: [
            {
              name: 'resolveValues',
              dataTemplate: { data: 'getClassroomsByInstructorId' },
            },
          ],
        },
      },
    },
  },
};
