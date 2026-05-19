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
import MinhaFoto from "public/images/Nerd-amico.png"

export default function RegisterPage() {
  const router = useRouter()
  const { register, isAuthenticated } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    router.replace("/dashboard")
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem. Por favor, tente novamente.")
      return
    }

    setLoading(true)

    try {
      await register(name, email, password)
      router.push("/dashboard")
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
      {/* Coluna da Esquerda: Ilustração com fundo cinza igual à imagem */}
      <div className="flex w-full flex-col items-center justify-center bg-[#9e9e9e] p-8 md:w-1/2">
        <div className="max-w-md text-center">
          {/* Espaço para o vetor da mulher com cofrinho e calculadora */}
          <div>
            <Image
              src={MinhaFoto}
              alt="Minha foto"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Coluna da Direita: Formulário */}
      <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-4xl font-semibold text-white mb-8">Cadastre-se</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="rounded-md bg-red-500/20 px-3 py-2 text-xs text-red-200">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-gray-300 text-sm">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="👤 Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-gray-200 text-gray-800 placeholder-gray-500 rounded-full h-11 border-none focus-visible:ring-2 focus-visible:ring-orange-500"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-gray-300 text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="📧 voce@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-200 text-gray-800 placeholder-gray-500 rounded-full h-11 border-none focus-visible:ring-2 focus-visible:ring-orange-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-gray-300 text-sm">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="🔒 Mínimo 6 dígitos"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-200 text-gray-800 placeholder-gray-500 rounded-full h-11 border-none focus-visible:ring-2 focus-visible:ring-orange-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirm-password" className="text-gray-300 text-sm">Confirme sua senha</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="🔒 Repita sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-gray-200 text-gray-800 placeholder-gray-500 rounded-full h-11 border-none focus-visible:ring-2 focus-visible:ring-orange-500"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full h-11 shadow-md transition-colors mt-3"
            >
              {loading ? "Criando..." : "Criar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Já tem conta?{" "}
              <Link href="/login" className="text-orange-400 font-medium hover:underline">
                Faça o login!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}