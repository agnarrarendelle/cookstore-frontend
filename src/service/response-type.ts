export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface UserEntryResult{
    token:string
}
