export type TStudent = {
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  enrollNumber: number;
  id: number;
  useId: number;
};

export type TPayment = {
  createdAt: string;
  billNumber: number;
  paidAmount: number;
  paid: boolean;
  balance: number;
  studentId: number;
  id: number;
  status: string;
  student?: TStudent;
};

export type TSCourse = {
  name: string;
  id: number;
  timeStart: string;
  timeEnd: string;
  numberStudents: string;
};

export type TReport = {
  id: number;
  title: string;
  content: string;
  userId: number;
  studentId: number;
  student?: TStudent;
};

export type TCourse = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  schedule: string;
  students: TStudent[];
  subject: { id: number; name: string };
  video: string;
};

export type StudentInputs = Pick<
  TStudent,
  'id' | 'email' | 'name' | 'phone' | 'enrollNumber' | 'useId'
>;
