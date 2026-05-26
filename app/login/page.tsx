"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { ApiException } from "@/lib/api"
import Image from "next/image"
import confrinho from "public/images/cofrinho.png"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    router.replace("/gastos")
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      router.push("/gastos")
    } catch (err) {
      if (err instanceof ApiException) {
        setError(err.message)
      } else {
        setError("Ocorreu um erro inesperado.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-[#4c0d57]">
      {/* Coluna da Esquerda: Ilustração */}
      <div className="flex w-full flex-col items-center justify-center bg-white p-8 md:w-1/2">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-[#4c0d57] mb-6">
            $alve seu dinheiro, <br /> $alve seu futuro
          </h1>
          {/* Espaço para a sua ilustração/vetor */}
        <div>
          <Image
            src={confrinho}
            alt="confrinho"
            className="object-cover w-full h-full"
          />
        </div>
        </div>
      </div>

      {/* Coluna da Direita: Formulário */}
      <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-4xl font-semibold text-white mb-8">Sing in</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
              <div className="rounded-md bg-red-500/20 px-3 py-2 text-xs text-red-200">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-gray-300 text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="👤 Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-200 text-gray-800 placeholder-gray-500 rounded-full h-11 border-none focus-visible:ring-2 focus-visible:ring-orange-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-gray-300 text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="🔒 Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-200 text-gray-800 placeholder-gray-500 rounded-full h-11 border-none focus-visible:ring-2 focus-visible:ring-orange-500"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full h-11 shadow-md transition-colors mt-2"
            >
              {loading ? "Entrando..." : "Submit"}
            </Button>
          </form>

          <div className="mt-8 text-center flex flex-col gap-2">
            <Link href="/reset-password" className="text-sm text-gray-300 hover:underline">
              Resetar senha
            </Link>
            <p className="text-sm text-gray-300">
              Não tem cadastro?{" "}
              <Link href="/register" className="text-orange-400 font-medium hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}