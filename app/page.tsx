"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"

export default function Page() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      router.replace(isAuthenticated ? "/dashboard" : "/login")
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  )
}
