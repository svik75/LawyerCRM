
export interface User {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  isAdmin?: boolean;
  isActivated?: boolean;
}

export interface Query {
  name?: string;
  query?: string;
  email?: string;
  phone?: string;
  status?: string;
  done?: boolean;
  history?: HistoryOrders[];
  date?: Date;
  queryPath?: string;
  _id?: string;
}

export interface HistoryOrders {
  event: string;
  date: Date;
  comments: string;
  user: string;
}

export interface Filter {
  startDate?: Date;
  endDate?: Date;
  done?: boolean;
  status?: string;
}

export interface Quiz  {
  uid: number;
  responses: [{
  question: string,
  resp: [string, boolean]
}];
}

export interface Claim {
  name?: string;
  isCompany?: boolean;
  email?: string;
  phone?: string;
  status?: string;
  done?: boolean;
  history?: HistoryOrders[];
  date?: Date;
  queryPath?: string;
  _id?: string;
}

export interface Contracts {
  name?: string;
  isCompany?: boolean;
  email?: string;
  phone?: string;
  status?: string;
  done?: boolean;
  date?: Date;
  contractSum?: number;
  contractDescription: string;
  payments: Payments[];
  debt: number;
  comments: string;
  _id?: string;
}

export interface Payments {
  date: Date;
  sum: number;
  paymentType: string;
}
