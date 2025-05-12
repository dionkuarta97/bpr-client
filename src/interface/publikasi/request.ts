import { TipePublikasi } from '@/enum';

export interface PublikasiRequestParams {
  page?: number;
  limit?: number;
  tipe?: string;
  tahun?: string;
}

export interface PublikasiRequest {
  judul: string;
  content: string | null;
  deskripsi: string;
  image: File | null;
  pdf: File | null;
  tipe: TipePublikasi;
  tahun: string | null;
}
