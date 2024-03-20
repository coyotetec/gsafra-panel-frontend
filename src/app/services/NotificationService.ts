import { api } from './utils/api';
import {
  ICreateNotificationResponse,
  IDeleteNotificationResponse,
  IGetNotificationResponse,
  INotificationPayload,
} from '../../types/notification';

export class NotificationService {
  static async getNotifications() {
    const { data } =
      await api.get<IGetNotificationResponse[]>('/notifications');

    return data;
  }

  static async createNotification(payload: INotificationPayload) {
    const { data } = await api.post<ICreateNotificationResponse>(
      '/notifications',
      {
        title: payload.title,
        body: payload.body,
        companiesId: payload.allCompanies
          ? []
          : payload.selectedCompanies.map((selected) => selected.id),
      },
    );

    return data;
  }

  static async updateNotification(id: string, payload: INotificationPayload) {
    const { data } = await api.put<ICreateNotificationResponse>(
      `/notifications/${id}`,
      {
        title: payload.title,
        body: payload.body,
        companiesId: payload.allCompanies
          ? []
          : payload.selectedCompanies.map((selected) => selected.id),
      },
    );

    return data;
  }

  static async deleteNotification(id: string) {
    const { data } = await api.delete<IDeleteNotificationResponse>(
      `/notifications/${id}`,
    );

    return data;
  }
}
