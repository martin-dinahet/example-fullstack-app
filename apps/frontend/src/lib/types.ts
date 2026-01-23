export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
export type SuccessOf<T> = T extends SuccessResponse<infer Data> ? Data : never;
export type ErrorOf<T> = T extends ErrorResponse | infer _ ? ErrorResponse["errors"] : never;

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  errors: Record<string, string[]>;
}
