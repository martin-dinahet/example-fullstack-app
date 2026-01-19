export type ApiResponse<T> =
  | SuccessResponse<T> // success
  | ErrorResponse; // error

export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  errors: Record<string, string[]>;
};
