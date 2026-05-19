"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Target, 
  PlusCircle, 
  Trash, 
  CheckCircle,
  CurrencyCircleDollar
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

export default function MetasPage() {
  const router = useRouter()
  
  // Estados da aplicação
  const [metas, setMetas] = useState<Meta[]>([])
  const [titulo, setTitulo] = useState("")
  const [valorAlvo, setValorAlvo] = useState("")
  const [valorAtual, setValorAtual] = useState("")

  // Carregar dados do localStorage (Cache do Navegador) ao montar a tela
  useEffect(() => {
    const cachedMetas = localStorage.getItem("@salve:metas")
    if (cachedMetas) {
      setMetas(JSON.parse(cachedMetas))
    } else {
      // Dados iniciais caso o cache esteja vazio
      const initialMetas: Meta[] = [
        { id: "1", titulo: "Reserva de Emergência", valorAlvo: 5000, valorAtual: 1500 },
        { id: "2", titulo: "Comprar Notebook", valorAlvo: 4000, valorAtual: 4000 },
      ]
      setMetas(initialMetas)
      localStorage.setItem("@salve:metas", JSON.stringify(initialMetas))
    }
  }, [])

  // Função para salvar no cache e atualizar o estado
  const salvarNoCache = (novasMetas: Meta[]) => {
    setMetas(novasMetas)
    localStorage.setItem("@salve:metas", JSON.stringify(novasMetas))
  }

  // Criar Nova Meta
  const handleCriarMeta = (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo || !valorAlvo) return

    const novaMeta: Meta = {
      id: Date.now().toString(),
      titulo,
      valorAlvo: parseFloat(valorAlvo),
      valorAtual: valorAtual ? parseFloat(valorAtual) : 0
    }

    const listaAtualizada = [...metas, novaMeta]
    salvarNoCache(listaAtualizada)

    // Limpar campos do formulário
    setTitulo("")
    setValorAlvo("")
    setValorAtual("")
  }

  // Excluir Meta
  const handleDeletarMeta = (id: string) => {
    const listaFiltrada = metas.filter(meta => meta.id !== id)
    salvarNoCache(listaFiltrada)
  }

  // Calcular totais para os blocos de valores
  const totalAlvo = metas.reduce((acc, curr) => acc + curr.valorAlvo, 0)
  const totalAtual = metas.reduce((acc, curr) => acc + curr.valorAtual, 0)

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      
      {/* SIDEBAR VERTICAL ROXA (#670965) */}
      <aside className="w-80 bg-[#670965] text-white flex flex-col p-6 shadow-xl">
        <div className="mb-10">
          <h2 className="text-3xl font-black tracking-wider text-[#FF8A05]">$ALVE</h2>
          <p className="text-xs text-purple-200 uppercase tracking-widest font-semibold">Guarde & Conquiste</p>
        </div>

        {/* Formulário de Cadastro fixo na Lateral */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-6 text-[#FF8A05]">
            <PlusCircle size={24} weight="fill" />
            <h3 className="text-lg font-bold text-white">Nova Meta</h3>
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
              className="w-full bg-[#FF8A05] hover:bg-[#e07a04] text-white font-bold rounded-lg h-11 shadow-md transition-colors uppercase tracking-wider mt-4"
            >
              Adicionar Meta
            </Button>
          </form>
        </div>

        <div className="text-xs text-purple-300 text-center border-t border-purple-800 pt-4">
          Modo offline ativo (Dados em cache)
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
              <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Necessário</CardTitle>
              <Target size={24} className="text-[#FF8A05]" weight="fill" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-gray-800">
                R$ {totalAlvo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-gray-500 mt-1">Sua meta global combinada</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard de Metas Cadastradas */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Target size={26} className="text-[#670965]" weight="bold" />
            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Suas Metas Atuais</h2>
          </div>

          {metas.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">Nenhuma meta cadastrada ainda. Use o formulário ao lado para começar!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {metas.map(meta => {
                const progressoPorcentagem = Math.min(
                  Math.round((meta.valorAtual / meta.valorAlvo) * 100), 
                  100
                );
                const metaConcluida = progressoPorcentagem >= 100;

                return (
                  <Card key={meta.id} className="bg-white relative shadow-sm overflow-hidden border-gray-100 hover:shadow-md transition-shadow">
                    {/* Linha indicativa superior baseada no status */}
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
                      
                      {/* Botão Deletar */}
                      <button 
                        onClick={() => handleDeletarMeta(meta.id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors"
                        title="Remover meta"
                      >
                        <Trash size={18} />
                      </button>
                    </CardHeader>

                    <CardContent className="pt-2 space-y-3">
                      <div className="flex justify-between items-baseline">
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
                    </CardContent>
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