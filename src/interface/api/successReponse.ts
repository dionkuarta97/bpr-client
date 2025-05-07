export interface SuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SuccessPaginationResponse<T> {
  success: true;
  message: string;
  metadata: {
    data: T;
    current_page: number;
    total: number;
    per_page: number;
    total_page: number;
  };
}
