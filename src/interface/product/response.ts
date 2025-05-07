import { ProductType } from '@/enum';
export interface ProductResponse {
  id: number;
  judul: string;
  deskripsi: string;
  content: string;
  foto: string;
  tipe: ProductType;
  created_at: string;
  updated_at: string;
}
