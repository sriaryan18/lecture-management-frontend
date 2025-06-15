export interface User {
    user: null | {
      firstName: string;
      lastName: string;
      email: string;
      id: string;
      paymentStatus: string;
      customerType: string;
      username: string;
      role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'SUPER_ADMIN';
      organizationId: string;
    };
    accessToken: string | null;
    refreshToken: string | null;
  }