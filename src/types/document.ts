export interface Document {
  id: string;
  order?: number;
  file: string;
  createdAt: string;
  updatedAt: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}
