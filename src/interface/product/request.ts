export interface ProductRequestParams {
  page?: number;
  limit?: number;
  tipe?: string;
}

export interface ProductRequest {
  judul: string;
  content: string;
  deskripsi: string;
  image: File;
  tipe: string;
}
