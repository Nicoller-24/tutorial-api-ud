import axios, { AxiosError } from "axios";

import type {
  ApiValidationError,
  Tutorial,
  TutorialCreatePayload,
  TutorialDetailUpdatePayload,
  TutorialListItem,
  TutorialUpdatePayload,
} from "../types/tutorial";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  headers: { "Content-Type": "application/json" },
});

export function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return "Ocurrió un error inesperado";
  }

  const axiosError = error as AxiosError<{ detail?: string | ApiValidationError[] }>;
  const detail = axiosError.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).join(". ");
  }

  return axiosError.message || "Error al comunicarse con la API";
}

export const tutorialService = {
  list: () => api.get<TutorialListItem[]>("/tutorials"),

  getById: (id: number) => api.get<Tutorial>(`/tutorials/${id}`),

  create: (payload: TutorialCreatePayload) => api.post<Tutorial>("/tutorials", payload),

  update: (id: number, payload: TutorialUpdatePayload) =>
    api.put<Tutorial>(`/tutorials/${id}`, payload),

  remove: (id: number) => api.delete(`/tutorials/${id}`),

  updateDetail: (id: number, payload: TutorialDetailUpdatePayload) =>
    api.put(`/tutorials/${id}/detail`, payload),
};
