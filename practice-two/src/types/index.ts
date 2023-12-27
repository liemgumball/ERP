export type TStudent = {
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  enrollNumber: number;
  id: number;
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

export type StudentInputs = Pick<
  TStudent,
  'id' | 'email' | 'name' | 'phone' | 'enrollNumber'
>;
