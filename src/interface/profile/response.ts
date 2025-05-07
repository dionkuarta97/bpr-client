export interface GeneralInformationResponse {
  id: number;
  name: string;
  alamat: string | null;
  no_hp: string | null;
  email: string | null;
  visi: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface VisiMisiResponse {
  visi: string;
  misi: {
    id: number;
    judul: string;
    deskripsi: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface StrukturPerusahaanResponse {
  id: number;
  nama: string;
  jabatan: string;
  foto: string;
  quote: string;
  created_at?: string;
  updated_at?: string;
}

export interface BannerResponse {
  id: number;
  judul: string | null;
  deskripsi: string | null;
  path: string;
  created_at: string | null;
  updated_at: string | null;
}
