export interface WaitlistEntry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  createdAt: Date;
}

export interface CreateWaitlistDTO {
  fullName: string;
  companyName: string;
  email: string;
}

export interface WaitlistResponse {
  id: string;
  message: string;
}
