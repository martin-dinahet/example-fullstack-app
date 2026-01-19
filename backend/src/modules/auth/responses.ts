import type { ApiResponse } from "../../core/response";
import type { GetCurrentUserApiResponseDTO, LoginApiResponseDTO, RegisterApiResponseDTO } from "./dto";

export type LoginApiResponse = ApiResponse<LoginApiResponseDTO>;
export type RegisterApiResponse = ApiResponse<RegisterApiResponseDTO>;
export type GetCurrentUserApiResponse = ApiResponse<GetCurrentUserApiResponseDTO>;
