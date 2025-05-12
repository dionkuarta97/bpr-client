import { TipePublikasi } from '@/enum';
export interface PublikasiResponse {
  id: number;
  judul: string;
  deskripsi: string;
  content: string | null;
  foto: string | null;
  pdfPath: string | null;
  tipe: TipePublikasi;
  tahun: string | null;
  created_at: string;
  updated_at: string;
}
