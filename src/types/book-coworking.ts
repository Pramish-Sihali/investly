export interface BookSpaceFormData {
  name: string;
  phone_number?: string;
  email?: string;
  message?: string;
  date_and_time: Date;
}

export interface BookSpaceResponse {
  id: number;
  name: string;
  phone_number?: string;
  email?: string;
  message?: string;
  date_and_time: string;
  created_at: string;
  updated_at: string;
}
