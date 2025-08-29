export interface MovieAlert {
  id: string;
  userId: string;
  movieName: string;
  theatreName: string;
  city: string;
  language: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  notifiedAt?: string;
}

export interface AlertHistory {
  id: string;
  alertId: string;
  status: 'triggered' | 'failed' | 'sent';
  notificationType: 'email' | 'sms' | 'push';
  createdAt: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}