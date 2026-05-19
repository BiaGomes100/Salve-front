"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  type AuthResponse,
  type UserDto,
  deleteMe,
  getMe,
  login as apiLogin,
  register as apiRegister,
  removeToken,
  setToken,
  updateMe,
} from "@/lib/api"

type AuthState = {
  user: UserDto | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthActions = {
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: {
    name: string
    email: string
    password?: string
  }) => Promise<void>
  deleteAccount: () => Promise<void>
}

type AuthContextType = AuthState & AuthActions

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) {
      setIsLoading(false)
      return
    }

    getMe()
      .then(setUser)
      .catch(() => {
        removeToken()
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleAuthResponse = useCallback((response: AuthResponse) => {
    setToken(response.token)
    setUser(response.user)
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await apiLogin(email, password)
      handleAuthResponse(response)
    },
    [handleAuthResponse]
  )

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const response = await apiRegister(name, email, password)
      handleAuthResponse(response)
    },
    [handleAuthResponse]
  )

  const logout = useCallback(() => {
    removeToken()
    setUser(null)
  }, [])

  const updateProfile = useCallback(
    async (data: { name: string; email: string; password?: string }) => {
      const updated = await updateMe(data)
      setUser(updated)
    },
    []
  )

  const deleteAccount = useCallback(async () => {
    await deleteMe()
    removeToken()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      deleteAccount,
    }),
    [user, isLoading, login, register, logout, updateProfile, deleteAccount]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
