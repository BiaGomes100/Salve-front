"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  PlusCircle, 
  Trash, 
  Wallet, 
  ArrowUp, 
  ArrowDown, 
  Calendar,
  Lock,
  Tag
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transacao {
  id: string;
  tipo: "receita" | "despesa";
  descricao: string; 
  categoria: string;
  valor: number;
  data: string; 
}

const API_URL = "http://localhost:5000/api/usuario/gastos"

export default function ControleGastosPage() {
  const obterMesAtual = () => {
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    return `${ano}-${mes}`
  }

  const mesAtualSistema = obterMesAtual()
  
  // Estados da Tela
  const [mesSelecionado, setMesSelecionado] = useState<string>(mesAtualSistema)
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [apiConectada, setApiConectada] = useState<boolean | null>(null) // null = carregando, true = conectado, false = modo local
  
  // Estados do Formulário
  const [tipo, setTipo] = useState<"receita" | "despesa">("despesa")
  const [descricao, setDescricao] = useState("")
  const [categoria, setCategoria] = useState<string | null>("")
  const [valor, setValor] = useState("")  
  const [dataTransacao, setDataTransacao] = useState("")

  const podeEditar = mesSelecionado === mesAtualSistema

  // Busca inicial de dados da API com fallback de dados padrão
  useEffect(() => {
    async function carregarGastosDoServidor() {
      try {
        const resposta = await fetch(API_URL)
        if (!resposta.ok) throw new Error("Erro ao buscar registros.")
        
        const dadosReais = await resposta.json()
        setTransacoes(dadosReais)
        setApiConectada(true)
      } catch (err) {
        console.warn("Backend C# inacessível. Inicializando com dados locais default.", err)
        
        // Dados default para evitar tela vazia ou travamentos
        const dadosIniciaisDefault: Transacao[] = [
          { id: "mock-1", tipo: "receita", descricao: "Exemplo: Salário Base", categoria: "Receita", valor: 3500, data: `${mesAtualSistema}-05` },
          { id: "mock-2", tipo: "despesa", descricao: "Exemplo: Lanche ou Refeição", categoria: "Alimentação (iFood/Comida)", valor: 89.90, data: `${mesAtualSistema}-10` },
          { id: "mock-3", tipo: "despesa", descricao: "Exemplo: Transporte Urbano", categoria: "Transporte (Uber/Carro)", valor: 24.50, data: `${mesAtualSistema}-12` }
        ]
        setTransacoes(dadosIniciaisDefault)
        setApiConectada(false)
      }
    }

    carregarGastosDoServidor()
  }, [mesAtualSistema])

  // Lógica de envio: Adicionar Movimentação (POST)
  const handleAdicionarTransacao = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!podeEditar || !descricao || !valor || !dataTransacao) return

    const novaTransacaoOtimista: Omit<Transacao, "id"> = {
      tipo,
      descricao,
      categoria: tipo === "receita" ? "Receita" : (categoria || "Outros"),
      valor: parseFloat(valor),
      data: dataTransacao
    }

    // Atualização otimista na tela imediata do usuário
    const idTemporario = Date.now().toString()
    const transacaoComId: Transacao = { ...novaTransacaoOtimista, id: idTemporario }
    setTransacoes(prev => [...prev, transacaoComId])

    // Limpeza de formulário instantânea
    setDescricao("")
    setCategoria("")
    setValor("")
    setDataTransacao("")

    // Tenta sincronizar em background com o C# Controller
    if (apiConectada) {
      try {
        const resposta = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novaTransacaoOtimista)
        })

        if (!resposta.ok) throw new Error()
        
        // Atualiza o ID temporário com o ID persistido do PostgreSQL vindo da API
        const transacaoSalvaNoBanco: Transacao = await resposta.json()
        setTransacoes(prev => prev.map(t => t.id === idTemporario ? transacaoSalvaNoBanco : t))
      } catch (err) {
        console.error("Falha ao salvar no banco real. O registro ficou retido apenas em memória.", err)
      }
    }
  }

  // Lógica de remoção: Deletar Movimentação (DELETE)
  const handleDeletarTransacao = async (id: string) => {
    if (!podeEditar) return

    // Remove do estado visual de imediato
    setTransacoes(prev => prev.filter(t => t.id !== id))

    if (apiConectada && !id.startsWith("mock-")) {
      try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
        if (!resposta.ok) throw new Error()
      } catch (err) {
        console.error("Não foi possível sincronizar a exclusão com o servidor.", err)
      }
    }
  }

  // Filtragem e cálculos dinâmicos reativos
  const transacoesFiltradas = transacoes.filter(t => t.data.startsWith(mesSelecionado))

  const totalRecebido = transacoesFiltradas
    .filter(t => t.tipo === "receita")
    .reduce((acc, curr) => acc + curr.valor, 0)

  const totalGasto = transacoesFiltradas
    .filter(t => t.tipo === "despesa")
    .reduce((acc, curr) => acc + curr.valor, 0)

  const saldoRestante = totalRecebido - totalGasto

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      
      {/* SIDEBAR VERTICAL ROXA */}
      <aside className="w-80 bg-[#670965] text-white flex flex-col p-6 shadow-xl">
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
                  <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,140H40a8,8,0,0,1,0-16H196.69L138.34,65.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
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

        <div className="flex-1">
          {podeEditar ? (
            <>
              <div className="flex items-center gap-2 mb-6 text-[#FF8A05]">
                <PlusCircle size={24} weight="fill" />
                <h3 className="text-lg font-bold text-white">Lançar Movimentação</h3>
              </div>

              <form onSubmit={handleAdicionarTransacao} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-200 text-xs font-bold uppercase">Tipo de Fluxo</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTipo("despesa")}
                      className={`h-10 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-1 transition-all ${tipo === "despesa" ? "bg-[#FF8A05] text-white" : "bg-white/10 text-gray-300"}`}
                    >
                      <ArrowDown size={14} /> Gastei
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipo("receita")}
                      className={`h-10 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-1 transition-all ${tipo === "receita" ? "bg-green-600 text-white" : "bg-white/10 text-gray-300"}`}
                    >
                      <ArrowUp size={14} /> Recebi
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="descricao" className="text-gray-200 text-xs font-bold uppercase">Descrição / Local</Label>
                  <Input 
                    id="descricao"
                    placeholder={tipo === "receita" ? "Ex: Pagamento Empresa X" : "Ex: iFood, Uber, Mercado"}
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    required
                    className="bg-white/10 border-none text-white placeholder-purple-300 rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-[#FF8A05]"
                  />
                </div>

                {tipo === "despesa" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="categoria" className="text-gray-200 text-xs font-bold uppercase">Categoria</Label>
                    <Select value={categoria} onValueChange={setCategoria}>
                      <SelectTrigger className="bg-white/10 border-none text-white rounded-lg h-11 focus:ring-2 focus:ring-[#FF8A05]">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-gray-800">
                        <SelectItem value="Alimentação (iFood/Comida)">Comida / iFood</SelectItem>
                        <SelectItem value="Transporte (Uber/Carro)">Uber / Carro</SelectItem>
                        <SelectItem value="Contas / Boletos">Contas / Boletos</SelectItem>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="valor" className="text-gray-200 text-xs font-bold uppercase">Valor (R$)</Label>
                  <Input 
                    id="valor"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    required
                    className="bg-white/10 border-none text-white placeholder-purple-300 rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-[#FF8A05]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dataTransacao" className="text-gray-200 text-xs font-bold uppercase">Data do Ocorrido</Label>
                  <Input 
                    id="dataTransacao"
                    type="date"
                    value={dataTransacao}
                    onChange={e => setDataTransacao(e.target.value)}
                    required
                    className="bg-white/10 border-none text-white rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-[#FF8A05] text-white [color-scheme:dark]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#FF8A05] hover:bg-[#e07a04] text-white font-bold rounded-lg h-11 shadow-md transition-colors uppercase tracking-wider mt-4"
                >
                  Confirmar Lançamento
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 bg-black/20 rounded-xl h-full border border-purple-500/20">
              <Lock size={40} className="text-[#FF8A05] mb-3 animate-pulse" />
              <h3 className="font-bold text-white mb-1">Mês Encerrado</h3>
              <p className="text-xs text-purple-200">
                Você está visualizando o histórico de um mês passado. Não é permitido adicionar ou deletar registros.
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* ÁREA DE EXIBIÇÃO / DASHBOARD */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
              <Calendar size={28} className="text-[#670965]" />
              Controle Mensal
            </h2>
            {apiConectada === false && (
              <span className="text-[10px] bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold">
                Modo Offline
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase px-2">Filtrar Mês:</span>
            <input 
              type="month" 
              value={mesSelecionado}
              onChange={(e) => setMesSelecionado(e.target.value)}
              className="border-none font-bold text-gray-800 focus:outline-none focus:ring-0 cursor-pointer text-sm"
            />
          </div>
        </div>

        {/* Fluxo de Caixa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-l-4 border-green-500 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recebido no Mês</CardTitle>
              <ArrowUp size={24} className="text-green-500" weight="bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-800">
                R$ {totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-[#FF8A05] shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gastos no Mês</CardTitle>
              <ArrowDown size={24} className="text-[#FF8A05]" weight="bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-800">
                R$ {totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card className={`border-l-4 shadow-sm bg-white ${saldoRestante >= 0 ? "border-[#670965]" : "border-red-500"}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Saldo Restante</CardTitle>
              <Wallet size={24} className={saldoRestante >= 0 ? "text-[#670965]" : "text-red-500"} weight="fill" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${saldoRestante >= 0 ? "text-gray-800" : "text-red-600"}`}>
                R$ {saldoRestante.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Extrato do Período */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-tight">Extrato do Período</h3>

          {transacoesFiltradas.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-lg text-gray-400">
              Nenhuma movimentação lançada para este mês.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {transacoesFiltradas
                .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                .map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-4 group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.tipo === 'receita' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-[#FF8A05]'}`}>
                        {t.tipo === 'receita' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{t.descricao}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 flex items-center gap-1">
                            <Tag size={10} /> {t.categoria}
                          </span>
                          <span>•</span>
                          <span>{new Date(t.data + "T00:00:00").toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`font-black text-base ${t.tipo === 'receita' ? 'text-green-600' : 'text-gray-800'}`}>
                        {t.tipo === 'receita' ? '+' : '-'} R$ {t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      
                      {podeEditar && (
                        <button 
                          onClick={() => handleDeletarTransacao(t.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded"
                          title="Remover registro"
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}