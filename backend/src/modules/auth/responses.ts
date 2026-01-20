import type { ApiResponse } from "../../core/response";
import type { GetCurrentUserRDTO, LoginResDTO, RegisterRDTO, UpdateCurrentUserRDTO } from "./dto";

export type LoginResponse = ApiResponse<LoginResDTO>;
export type RegisterResponse = ApiResponse<RegisterRDTO>;
export type GetCurrentUserResponse = ApiResponse<GetCurrentUserRDTO>;
export type UpdateCurrentUserResponse = ApiResponse<UpdateCurrentUserRDTO>;
