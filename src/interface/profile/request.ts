export interface GeneralInformationRequest {
  name: string;
  alamat: string | null;
  no_hp: string | null;
  email: string | null;
}

export interface UpdateVisiRequest {
  visi: string;
}

export interface CreateMisiRequest {
  judul: string;
  deskripsi: string;
}

export interface CreateStrukturPerusahaanRequest {
  nama: string;
  jabatan: string;
  image?: File;
  foto?: string;
  quote?: string;
}

export interface CreateBannerRequest {
  image?: File;
  judul?: string;
  deskripsi?: string;
  path?: string;
}
