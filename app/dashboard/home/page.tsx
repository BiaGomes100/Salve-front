"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  ChartPieSlice,
  Target, 
  Wallet,
  ArrowUp, 
  CurrencyCircleDollar,
  ListBullets,
  Lightbulb
} from "@phosphor-icons/react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Meta {
  id: string;
  titulo: string;
  valorAlvo: number;
  valorAtual: number;
}

interface Transacao {
  id: string;
  tipo: "receita" | "despesa";
  descricao: string;
  categoria: string;
  valor: number;
  data: string;
}

// ================= DADOS DEFAULT (PLACEHOLDERS DE AGUARDO) =================
const METAS_DEFAULT: Meta[] = [
  { id: "1", titulo: "Carregando Meta...", valorAlvo: 1000, valorAtual: 0 },
  { id: "2", titulo: "Carregando Meta...", valorAlvo: 5000, valorAtual: 0 }
]

const TRANSACOES_DEFAULT: Transacao[] = [
  { id: "1", tipo: "despesa", descricao: "Aguardando transações...", categoria: "Geral", valor: 0, data: new Date().toISOString() }
]

export default function HomePage() {
  const pathname = usePathname()

  // Inicializa os estados com os dados default em vez de arrays vazios
  const [metas, setMetas] = useState<Meta[]>(METAS_DEFAULT)
  const [transacoes, setTransacoes] = useState<Transacao[]>(TRANSACOES_DEFAULT)
  const [apiConectada, setApiConectada] = useState<boolean | null>(null) // null = tentando, true = conectou, false = usando local/default

  const obtenerMesAtual = () => {
    const hoje = new Date()
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`
  }
  const mesAtualSistema = obtenerMesAtual()

  // Tenta bater nas rotas do backend em segundo plano
  useEffect(() => {
    async function tentarBuscarDadosDoServidor() {
      try {
        const API_URL = "http://localhost:5000/api"

        const [respostaMetas, respostaGastos] = await Promise.all([
          fetch(`${API_URL}/usuario/metas`),
          fetch(`${API_URL}/usuario/gastos`)
        ])

        if (!respostaMetas.ok || !respostaGastos.ok) {
          throw new Error("Resposta inválida do servidor")
        }

        const dadosMetas = await respostaMetas.json()
        const dadosGastos = await respostaGastos.json()

        // Se deu certo, substitui os dados default pelos dados reais do PostgreSQL
        setMetas(dadosMetas)
        setTransacoes(dadosGastos)
        setApiConectada(true)
      } catch (err) {
        console.warn("Backend offline ou erro de CORS. Mantendo os dados default/locais.", err)
        setApiConectada(false)
      }
    }

    tentarBuscarDadosDoServidor()
  }, [])

  // Cálculos automáticos (funcionam tanto para o default quanto para a API)
  const transacoesFiltradas = transacoes.filter(t => t.data.startsWith(mesAtualSistema))
  
  const ultimosLancamentos = [...transacoesFiltradas]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3)

  const totalRecebidoMes = transacoesFiltradas.filter(t => t.tipo === "receita").reduce((a, c) => a + c.valor, 0)
  const totalGastoMes = transacoesFiltradas.filter(t => t.tipo === "despesa").reduce((a, c) => a + c.valor, 0)
  const saldoRestanteMes = totalRecebidoMes - totalGastoMes

  const totalMetasSalvo = metas.reduce((a, c) => a + c.valorAtual, 0)
  const totalMetasAlvo = metas.reduce((a, c) => a + c.valorAlvo, 0)

  const metaPendente = [...metas]
    .filter(meta => meta.valorAtual < meta.valorAlvo)
    .sort((a, b) => (a.valorAtual / a.valorAlvo) - (b.valorAtual / b.valorAlvo))[0];

  const obterInsightFinanceiro = () => {
    if (apiConectada === null) return "Sincronizando seus dados com o servidor $ALVE..."
    if (saldoRestanteMes > 0 && metaPendente) {
      return `Boa! Você tem R$ ${saldoRestanteMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} livres este mês. Que tal destinar uma parte para acelerar o seu objetivo "${metaPendente.titulo}"?`
    }
    if (saldoRestanteMes < 0) {
      return "Atenção: Seus gastos superaram as receitas este mês. Evite compras desnecessárias nos próximos dias para equilibrar a conta."
    }
    return "Tudo sob controle! Continue registrando seus gastos na aba ao lado para não perder o foco dos seus objetivos."
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      
      {/* ================= SIDEBAR VERTICAL INTEGRADA ================= */}
      <aside className="w-80 bg-[#670965] text-white flex flex-col p-6 shadow-xl shrink-0">
        <div className="mb-10">
          <h2 className="text-3xl font-black tracking-wider text-[#FF8A05]">$ALVE</h2>
          <p className="text-xs text-purple-200 uppercase tracking-widest font-semibold">Menu de Navegação</p>
        </div>

        <nav className="space-y-2 flex-1">
          <Link 
            href="/dashboard/home"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              pathname === "/dashboard/home" ? "bg-white/10 text-[#FF8A05] border-l-4 border-[#FF8A05]" : "hover:bg-white/5 text-purple-100"
            }`}
          >
            <ChartPieSlice size={22} weight="bold" /> Visão Geral (Home)
          </Link>

          <Link 
            href="/dashboard/metas"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              pathname === "/dashboard/metas" ? "bg-white/10 text-[#FF8A05] border-l-4 border-[#FF8A05]" : "hover:bg-white/5 text-purple-100"
            }`}
          >
            <Target size={22} weight="bold" /> Minhas Metas
          </Link>

          <Link 
            href="/dashboard/gastos"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              pathname === "/dashboard/gastos" ? "bg-white/10 text-[#FF8A05] border-l-4 border-[#FF8A05]" : "hover:bg-white/5 text-purple-100"
            }`}
          >
            <Wallet size={22} weight="bold" /> Controle de Gastos
          </Link>
        </nav>
      </aside>

      {/* ================= ÁREA DE CONTEÚDO PRINCIPAL ================= */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="space-y-8">
          
          {/* Indicador sutil de status da API no topo */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black uppercase text-gray-800 tracking-tight">Bem-vindo ao $ALVE</h1>
              <p className="text-gray-500 text-sm">Resumo geral da sua saúde financeira combinada no mês atual.</p>
            </div>
            {apiConectada === false && (
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full font-bold animate-pulse">
                Modo Offline (API Inativa)
              </span>
            )}
          </div>

          {/* Cards Superiores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-[#670965] bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold text-gray-400 uppercase">Saldo Restante (Mês)</CardTitle>
                <CurrencyCircleDollar size={24} className="text-[#670965]" weight="fill" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-black ${saldoRestanteMes >= 0 ? "text-gray-800" : "text-red-600"}`}>
                  R$ {saldoRestanteMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-gray-400 mt-1">Ganhos menos gastos deste mês</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#FF8A05] bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold text-gray-400 uppercase">Total Acumulado em Metas</CardTitle>
                <Target size={24} className="text-[#FF8A05]" weight="fill" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-gray-800">
                  R$ {totalMetasSalvo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-gray-400 mt-1">De um total alvo de R$ {totalMetasAlvo.toLocaleString('pt-BR')}</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500 bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold text-gray-400 uppercase">Total Recebido (Mês)</CardTitle>
                <ArrowUp size={24} className="text-green-500" weight="bold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-green-600">
                  R$ {totalRecebidoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-gray-400 mt-1">Lançamentos de entrada</p>
              </CardContent>
            </Card>
          </div>

          {/* ================= GRID INFERIOR ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* PROGRESSO DAS METAS */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm h-fit">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg uppercase text-gray-700 tracking-tight flex items-center gap-2">
                  <Target size={20} className="text-[#670965]"/> Progresso dos Seus Sonhos
                </h3>
                <Link href="/dashboard/metas" className="text-xs font-bold text-[#FF8A05] hover:underline">
                  Ver todas →
                </Link>
              </div>
              
              <div className="space-y-5">
                {metas.map(m => {
                  const pct = Math.min(Math.round((m.valorAtual / m.valorAlvo) * 100), 100)
                  return (
                    <div key={m.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-gray-700">{m.titulo}</span>
                        <span className="text-gray-500">{pct}% (R$ {m.valorAtual.toLocaleString('pt-BR')} / R$ {m.valorAlvo.toLocaleString('pt-BR')})</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-[#670965] h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* EXTRATO RÁPIDO + INSIGHTS */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-sm uppercase text-gray-700 tracking-tight flex items-center gap-2">
                    <ListBullets size={18} className="text-[#670965]"/> Atividades Recentes
                  </h3>
                  <Link href="/dashboard/gastos" className="text-[11px] font-bold text-[#FF8A05] hover:underline">
                    Ver extrato
                  </Link>
                </div>

                <div className="space-y-3">
                  {ultimosLancamentos.map(l => (
                    <div key={l.id} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-none last:pb-0">
                      <div className="truncate pr-2">
                        <p className="text-xs font-bold text-gray-800 truncate">{l.descricao}</p>
                        <span className="text-[9px] text-gray-400 font-semibold uppercase">{l.categoria}</span>
                      </div>
                      <span className={`text-xs font-black shrink-0 ${l.tipo === "receita" ? "text-green-600" : "text-gray-700"}`}>
                        {l.tipo === "receita" ? "+" : "-"} R$ {l.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD DE INSIGHT */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 p-5 rounded-xl border border-purple-100 shadow-sm">
                <h4 className="font-bold text-xs uppercase text-gray-700 tracking-tight flex items-center gap-2 mb-2">
                  <Lightbulb size={16} className="text-[#FF8A05]" weight="fill"/> Dica do $ALVE
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">{obterInsightFinanceiro()}</p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}