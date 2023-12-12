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

export type TReport = {
  id: number;
  title: string;
  content: string;
  userId: number;
  studentId: number;
  student?: TStudent;
};

export type StudentInputs = Pick<
  TStudent,
  'id' | 'email' | 'name' | 'phone' | 'enrollNumber' | 'useId'
>;
