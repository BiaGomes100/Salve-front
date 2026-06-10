"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Target, 
  PlusCircle, 
  Trash, 
  CheckCircle,
  CurrencyCircleDollar,
  Plus
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Meta {
  id: string;
  titulo: string;
  valorAlvo: number;
  valorAtual: number;
}

const API_URL = "http://localhost:5000/api/usuario/metas"

export default function MetasPage() {
  // Estados da aplicação
  const [metas, setMetas] = useState<Meta[]>([])
  const [apiConectada, setApiConectada] = useState<boolean | null>(null) // null = carregando, true = conectado, false = modo local

  // Estados do Formulário
  const [titulo, setTitulo] = useState("")
  const [valorAlvo, setValorAlvo] = useState("")
  const [valorAtual, setValorAtual] = useState("")

  // Estado temporário para armazenar o dinheiro que está sendo injetado por card
  const [valoresAporte, setValoresAporte] = useState<{ [key: string]: string }>({})

  // Busca inicial de dados da API com fallback de dados default
  useEffect(() => {
    async function carregarMetasDoServidor() {
      try {
        const resposta = await fetch(API_URL)
        if (!resposta.ok) throw new Error("Erro ao buscar metas.")
        
        const dadosReais = await resposta.json()
        setMetas(dadosReais)
        setApiConectada(true)
      } catch (err) {
        console.warn("Backend C# inacessível. Inicializando com dados locais default.", err)
        
        // Dados padrão para a tela não quebrar enquanto aguarda ou em modo offline
        const dadosIniciaisDefault: Meta[] = [
          { id: "mock-1", titulo: "Exemplo: Reserva de Emergência", valorAlvo: 5000, valorAtual: 1500 },
          { id: "mock-2", titulo: "Exemplo: Comprar Notebook", valorAlvo: 4000, valorAtual: 4000 },
        ]
        setMetas(dadosIniciaisDefault)
        setApiConectada(false)
      }
    }

    carregarMetasDoServidor()
  }, [])

  // Criar Nova Meta (POST)
  const handleCriarMeta = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo || !valorAlvo) return

    const novaMetaOtimista: Omit<Meta, "id"> = {
      titulo,
      valorAlvo: parseFloat(valorAlvo),
      valorAtual: valorAtual ? parseFloat(valorAtual) : 0
    }

    // Adiciona imediatamente à tela com ID temporário
    const idTemporario = Date.now().toString()
    setMetas(prev => [...prev, { ...novaMetaOtimista, id: idTemporario }])

    // Limpa formulário na hora
    setTitulo("")
    setValorAlvo("")
    setValorAtual("")

    if (apiConectada) {
      try {
        const resposta = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novaMetaOtimista)
        })
        if (!resposta.ok) throw new Error()
        
        const metaSalva: Meta = await resposta.json()
        // Substitui o ID temporário pelo real vindo do banco
        setMetas(prev => prev.map(m => m.id === idTemporario ? metaSalva : m))
      } catch (err) {
        console.error("Erro ao sincronizar nova meta com o servidor.", err)
      }
    }
  }

  // Injetar dinheiro em uma meta existente (PUT/PATCH)
  const handleAportarDinheiro = async (id: string) => {
    const quantiaStr = valoresAporte[id]
    if (!quantiaStr) return

    const quantia = parseFloat(quantiaStr)
    if (isNaN(quantia) || quantia <= 0) return

    let valorNovoFinal = 0

    // Atualiza estado local de forma instantânea
    setMetas(prev => prev.map(meta => {
      if (meta.id === id) {
        valorNovoFinal = Math.min(meta.valorAtual + quantia, meta.valorAlvo)
        return { ...meta, valorAtual: valorNovoFinal }
      }
      return meta
    }))

    // Limpa o input do card correspondente
    setValoresAporte(prev => ({ ...prev, [id]: "" }))

    if (apiConectada && !id.startsWith("mock-")) {
      try {
        // Envia a atualização do novo valor total para o backend C#
        const resposta = await fetch(`${API_URL}/${id}`, {
          method: "PUT", // Ou PATCH, dependendo da rota do seu Controller
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ valorAtual: valorNovoFinal })
        })
        if (!resposta.ok) throw new Error()
      } catch (err) {
        console.error("Erro ao sincronizar aporte no servidor.", err)
      }
    }
  }

  // Excluir Meta (DELETE)
  const handleDeletarMeta = async (id: string) => {
    // Remove localmente de imediato
    setMetas(prev => prev.filter(meta => meta.id !== id))

    if (apiConectada && !id.startsWith("mock-")) {
      try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
        if (!resposta.ok) throw new Error()
      } catch (err) {
        console.error("Não foi possível excluir a meta do banco de dados.", err)
      }
    }
  }

  // Encontra a meta incompleta com menor progresso percentual
  const metaPendente = metas
    .filter(meta => meta.valorAtual < meta.valorAlvo)
    .sort((a, b) => (a.valorAtual / a.valorAlvo) - (b.valorAtual / b.valorAlvo))[0];

  // Calcular totais para os blocos de valores
  const totalAlvo = metas.reduce((acc, curr) => acc + curr.valorAlvo, 0)
  const totalAtual = metas.reduce((acc, curr) => acc + curr.valorAtual, 0)

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      
      {/* SIDEBAR VERTICAL ROXA (#670965) */}
      <aside className="w-80 bg-[#670965] text-white flex flex-col p-6 shadow-xl shrink-0">
        
        <div className="mb-8 p-5 bg-white/5 border border-purple-400/10 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer shadow-sm">
          <Link href="/dashboard/gastos" className="w-full block">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-black tracking-wider text-[#FF8A05] group-hover:scale-[1.02] transition-transform origin-left">
                  $ALVE
                </h2>
                <p className="text-xs text-purple-200 uppercase tracking-widest font-semibold mt-0.5">
                  Controle de Gastos
                </p>
              </div>
              
              <div className="bg-[#FF8A05] p-2 rounded-lg text-white shadow-sm group-hover:bg-[#e07a04] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,140H40a8,8,0,0,1,0-16H196.69L138.34,65.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1 Approvals=221.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/home" className="w-full block mt-2">
            <Button 
              type="button" 
              className="w-full bg-white/5 hover:bg-white/15 text-purple-100 font-bold rounded-full h-11 border border-purple-400/20 shadow-sm transition-all uppercase tracking-wider text-xs"
            >
              Voltar para Home
            </Button>
          </Link>
        </div>

        {/* Formulário de Cadastro fixo na Lateral */}
        <div className="flex-1 space-y-6 overflow-y-auto pr-1">
          <div className="border-t border-purple-800/60 pt-6">
            <div className="flex items-center gap-2 mb-4 text-[#FF8A05]">
              <PlusCircle size={22} weight="fill" />
              <h3 className="text-md font-bold text-white uppercase tracking-tight">Nova Meta</h3>
            </div>

            <form onSubmit={handleCriarMeta} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="titulo" className="text-gray-200 text-xs font-bold uppercase">Objetivo</Label>
                <Input 
                  id="titulo"
                  placeholder="Ex: Viagem de Férias"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  required
                  className="bg-white/10 border-none text-white placeholder-purple-300 rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-[#FF8A05]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="valorAlvo" className="text-gray-200 text-xs font-bold uppercase">Valor Alvo (R$)</Label>
                <Input 
                  id="valorAlvo"
                  type="number"
                  placeholder="Quanto precisa? Ex: 5000"
                  value={valorAlvo}
                  onChange={e => setValorAlvo(e.target.value)}
                  required
                  className="bg-white/10 border-none text-white placeholder-purple-300 rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-[#FF8A05]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="valorAtual" className="text-gray-200 text-xs font-bold uppercase">Valor Já Guardado (R$)</Label>
                <Input 
                  id="valorAtual"
                  type="number"
                  placeholder="Opcional. Ex: 500"
                  value={valorAtual}
                  onChange={e => setValorAtual(e.target.value)}
                  className="bg-white/10 border-none text-white placeholder-purple-300 rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-[#FF8A05]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#FF8A05] hover:bg-[#e07a04] text-white font-bold rounded-lg h-11 shadow-md transition-colors uppercase tracking-wider mt-2"
              >
                Adicionar Meta
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* ÁREA DE EXIBIÇÃO / DASHBOARD */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        {/* Caixinhas de Valor no Topo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="border-l-4 border-[#670965] shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Acumulado</CardTitle>
              <CurrencyCircleDollar size={24} className="text-[#670965]" weight="fill" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-gray-800">
                R$ {totalAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-gray-500 mt-1">Soma de todos os seus progressos</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-[#FF8A05] shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Próximo Objetivo</CardTitle>
              <Target size={24} className="text-[#FF8A05]" weight="fill" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-gray-800 truncate">
                {metaPendente ? metaPendente.titulo : "Todas concluídas! 🎉"}
              </div>
              <p className="text-xs text-gray-500 mt-1">Meta atual com menor porcentagem</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard de Metas Cadastradas */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Target size={26} className="text-[#670965]" weight="bold" />
              <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Suas Metas Atuais</h2>
            </div>
            {apiConectada === false && (
              <span className="text-[10px] bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold">
                Modo Offline
              </span>
            )}
          </div>

          {metas.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">Nenhuma meta cadastrada ainda. Use o formulário ao lado para começar!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {metas.map(meta => {
                const progressoPorcentagem = meta.valorAlvo > 0 
                  ? Math.min(Math.round((meta.valorAtual / meta.valorAlvo) * 100), 100) 
                  : 0;
                const metaConcluida = progressoPorcentagem >= 100;

                return (
                  <Card key={meta.id} className="bg-white relative shadow-sm overflow-hidden border-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className={`h-1.5 ${metaConcluida ? 'bg-green-500' : 'bg-[#FF8A05]'}`} />
                      
                      <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            {meta.titulo}
                            {metaConcluida && <CheckCircle size={20} className="text-green-500" weight="fill" />}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {metaConcluida ? "Concluído com sucesso!" : `Falta pouco! Você atingiu ${progressoPorcentagem}%`}
                          </CardDescription>
                        </div>
                        
                        <button 
                          onClick={() => handleDeletarMeta(meta.id)}
                          className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors"
                          title="Remover meta"
                        >
                          <Trash size={18} />
                        </button>
                      </CardHeader>

                      <CardContent className="pt-2">
                        <div className="flex justify-between items-baseline mb-4">
                          <div className="text-xs text-gray-400 uppercase font-bold">Progresso</div>
                          <div className="text-right">
                            <span className="text-xl font-black text-gray-800">
                              R$ {meta.valorAtual.toLocaleString('pt-BR')}
                            </span>
                            <span className="text-xs text-gray-400 font-semibold">
                              {" "}de R$ {meta.valorAlvo.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>

                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${metaConcluida ? 'bg-green-500' : 'bg-[#FF8A05]'}`}
                            style={{ width: `${progressoPorcentagem}%` }}
                          />
                        </div>
                      </CardContent>
                    </div>

                    <div className="p-6 pt-0 border-t border-gray-50 bg-gray-50/50 mt-4">
                      {!metaConcluida ? (
                        <div className="pt-4 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3">
                          <div className="w-full sm:flex-1">
                            <Label htmlFor={`aporte-${meta.id}`} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                              Adicionar Saldo à Meta
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-2 text-xs font-bold text-gray-400">R$</span>
                              <Input
                                id={`aporte-${meta.id}`}
                                type="number"
                                placeholder="0,00"
                                value={valoresAporte[meta.id] || ""}
                                onChange={e => setValoresAporte(prev => ({ ...prev, [meta.id]: e.target.value }))}
                                className="bg-white border-gray-200 text-gray-800 text-xs font-bold rounded-lg h-9 pl-8 focus-visible:ring-2 focus-visible:ring-[#670965]"
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={() => handleAportarDinheiro(meta.id)}
                            className="bg-[#670965] hover:bg-[#4d044b] text-white font-bold h-9 px-3 rounded-lg flex items-center justify-center gap-1 shadow-sm shrink-0 w-full sm:w-auto"
                            title="Confirmar aporte"
                          >
                            <Plus size={14} weight="bold" /> Salvar
                          </Button>
                        </div>
                      ) : (
                        <div className="pt-4 text-center text-xs font-bold text-green-600 uppercase tracking-wider flex items-center justify-center gap-1 py-1">
                          🎉 Meta Alcançada!
                        </div>
                      )}
                    </div>

                  </Card>
                )
              })}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}