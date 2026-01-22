import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import type { SuccessOf } from "../types";
import type { LoginDTO, RegisterDTO, UpdateUserDTO } from "./dto";
import type {
  DeleteCurrentUserResponse,
  GetCurrentUserResponse,
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
  UpdateCurrentUserResponse,
} from "./types";

const authKeys = {
  currentUser: ["auth", "me"] as const,
};

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: currentUser, isLoading } = useQuery({
    queryKey: authKeys.currentUser,
    retry: false,
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const response: GetCurrentUserResponse = await api("/auth/me");
      if (!response.success) throw new Error("Failed to get current user");
      return response.data.currentUser;
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginDTO) => {
      return api("/auth/login", { method: "POST", body: JSON.stringify(data) });
    },
    onSuccess: (response: SuccessOf<LoginResponse>) => {
      localStorage.setItem("token", response.token);
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterDTO) => {
      return api("/auth/register", { method: "POST", body: JSON.stringify(data) });
    },
    onSuccess: (response: SuccessOf<RegisterResponse>) => {
      localStorage.setItem("token", response.token);
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateUserDTO) => {
      return api("/auth/me", { method: "PATCH", body: JSON.stringify(data) });
    },
    onSuccess: (response: SuccessOf<UpdateCurrentUserResponse>) => {
      localStorage.setItem("token", response.token);
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      return api("/auth/me", { method: "DELETE" });
    },
    onSuccess: (_response: SuccessOf<DeleteCurrentUserResponse>) => {
      localStorage.removeItem("token");
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
    },
  });

  const refreshMutation = useMutation({
    mutationFn: () => {
      return api("/auth/refresh", { method: "GET" });
    },
    onSuccess: (response: SuccessOf<RefreshTokenResponse>) => {
      localStorage.setItem("token", response.token);
    },
  });

  return { currentUser, isLoading, loginMutation, registerMutation, updateMutation, deleteMutation, refreshMutation };
}
