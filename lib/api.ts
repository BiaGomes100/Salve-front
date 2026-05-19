const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"

type RequestOptions = {
  method?: string
  body?: unknown
  headers?: Record<string, string>
}

type ApiError = {
  message: string
  status: number
}

export class ApiException extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = "ApiException"
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

export function setToken(token: string) {
  localStorage.setItem("auth_token", token)
}

export function removeToken() {
  localStorage.removeItem("auth_token")
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options
  const token = getToken()

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json()

  if (!response.ok) {
    const error = data as ApiError
    throw new ApiException(
      error.message ?? "An unexpected error occurred.",
      response.status
    )
  }

  return data as T
}

// Auth types
export type UserDto = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export type AuthResponse = {
  token: string
  user: UserDto
}

// Auth endpoints
export async function login(email: string, password: string) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: { email, password },
  })
}

export async function register(
  name: string,
  email: string,
  password: string
) {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: { name, email, password },
  })
}

// User endpoints (authenticated)
export async function getMe() {
  return request<UserDto>("/users/me")
}

export async function updateMe(data: {
  name: string
  email: string
  password?: string
}) {
  return request<UserDto>("/users/me", {
    method: "PUT",
    body: data,
  })
}

export async function deleteMe() {
  return request<void>("/users/me", {
    method: "DELETE",
  })
}
