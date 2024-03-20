export interface IRecipient {
  id: string;
  name: string;
}

export interface IGetNotificationResponse {
  id: string;
  title: string;
  body: string;
  allCompanies: boolean;
  recipients: IRecipient[];
  createdAt: Date;
}

export interface INotificationPayload {
  title: string;
  body: string;
  allCompanies: boolean;
  selectedCompanies: {
    id: string;
    name: string;
  }[];
}

export interface ICreateNotificationResponse {
  id: string;
  title: string;
  body: string;
  allCompanies: boolean;
  createdAt: Date;
}

export interface IDeleteNotificationResponse {
  message: string;
}
