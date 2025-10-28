"use client"

import { useState, useEffect } from 'react'
import { Calendar, TrendingUp, Target, BarChart3, Trophy, Clock, Star, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Dados simulados - em produção viriam de uma API
const todayMatches = [
  {
    id: 1,
    homeTeam: "Manchester City",
    awayTeam: "Arsenal",
    league: "Premier League",
    time: "16:30",
    homeOdds: 1.85,
    drawOdds: 3.40,
    awayOdds: 4.20,
    prediction: "Casa",
    confidence: 78,
    homeForm: ["W", "W", "D", "W", "W"],
    awayForm: ["W", "L", "W", "D", "W"],
    h2h: "City 3-1 nos últimos 5 jogos"
  },
  {
    id: 2,
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    league: "La Liga",
    time: "21:00",
    homeOdds: 2.10,
    drawOdds: 3.20,
    awayOdds: 3.50,
    prediction: "Mais de 2.5 gols",
    confidence: 85,
    homeForm: ["W", "W", "W", "D", "W"],
    awayForm: ["W", "W", "L", "W", "W"],
    h2h: "Média de 3.2 gols nos últimos encontros"
  },
  {
    id: 3,
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    league: "Premier League",
    time: "14:00",
    homeOdds: 1.95,
    drawOdds: 3.60,
    awayOdds: 3.80,
    prediction: "Casa",
    confidence: 72,
    homeForm: ["W", "D", "W", "W", "L"],
    awayForm: ["D", "W", "L", "D", "W"],
    h2h: "Liverpool invicto em casa há 8 jogos"
  }
]

const topTips = [
  {
    id: 1,
    match: "Man City vs Arsenal",
    tip: "Manchester City vence",
    odds: 1.85,
    confidence: 78,
    reasoning: "City tem 85% de aproveitamento em casa e Arsenal perdeu 2 dos últimos 3 jogos fora",
    status: "pending"
  },
  {
    id: 2,
    match: "Barcelona vs Real Madrid",
    tip: "Mais de 2.5 gols",
    odds: 1.75,
    confidence: 85,
    reasoning: "Clássico com média de 3.2 gols. Ambos times marcaram em 80% dos últimos jogos",
    status: "pending"
  },
  {
    id: 3,
    match: "Juventus vs Milan",
    tip: "Ambos marcam",
    odds: 1.65,
    confidence: 70,
    reasoning: "Milan marcou em todos os últimos 6 jogos. Juventus sofreu gols em 4 dos últimos 5",
    status: "won"
  }
]

const stats = [
  { label: "Taxa de Acerto", value: "73.2%", icon: Target, color: "text-green-600" },
  { label: "ROI Mensal", value: "+18.5%", icon: TrendingUp, color: "text-blue-600" },
  { label: "Jogos Analisados", value: "1,247", icon: BarChart3, color: "text-purple-600" },
  { label: "Apostas Vencedoras", value: "912", icon: Trophy, color: "text-yellow-600" }
]

function FormIndicator({ form }: { form: string[] }) {
  return (
    <div className="flex gap-1">
      {form.map((result, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
            result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
          }`}
        >
          {result}
        </div>
      ))}
    </div>
  )
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${
          confidence >= 80 ? 'bg-green-500' : confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
        }`}
        style={{ width: `${confidence}%` }}
      />
    </div>
  )
}

export default function FootballAnalytics() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">FootballStats Pro</h1>
                <p className="text-blue-200 text-sm">Análise Inteligente para Apostadores</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-mono text-lg">
                {format(currentTime, 'HH:mm:ss')}
              </div>
              <div className="text-blue-200 text-sm">
                {format(currentTime, "dd 'de' MMMM", { locale: ptBR })}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Jogos de Hoje */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Jogos de Hoje</h2>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {todayMatches.length} jogos
                </span>
              </div>

              <div className="space-y-4">
                {todayMatches.map((match) => (
                  <div key={match.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-200 font-medium">{match.time}</span>
                        <span className="text-gray-400 text-sm">{match.league}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Confiança:</span>
                        <span className={`text-sm font-bold ${
                          match.confidence >= 80 ? 'text-green-400' : 
                          match.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {match.confidence}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">{match.homeTeam}</span>
                          <FormIndicator form={match.homeForm} />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-white font-semibold">{match.awayTeam}</span>
                          <FormIndicator form={match.awayForm} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-green-500/20 rounded-lg p-2 text-center">
                        <div className="text-xs text-green-300">Casa</div>
                        <div className="text-green-400 font-bold">{match.homeOdds}</div>
                      </div>
                      <div className="bg-yellow-500/20 rounded-lg p-2 text-center">
                        <div className="text-xs text-yellow-300">Empate</div>
                        <div className="text-yellow-400 font-bold">{match.drawOdds}</div>
                      </div>
                      <div className="bg-red-500/20 rounded-lg p-2 text-center">
                        <div className="text-xs text-red-300">Fora</div>
                        <div className="text-red-400 font-bold">{match.awayOdds}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-blue-400 text-sm font-medium">Previsão: </span>
                        <span className="text-white font-bold">{match.prediction}</span>
                      </div>
                      <div className="text-xs text-gray-400">{match.h2h}</div>
                    </div>

                    <div className="mt-3">
                      <ConfidenceBar confidence={match.confidence} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dicas Premium */}
          <div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">Dicas Premium</h2>
              </div>

              <div className="space-y-4">
                {topTips.map((tip) => (
                  <div key={tip.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-200 text-sm font-medium">{tip.match}</span>
                      {tip.status === 'won' && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {tip.status === 'lost' && <XCircle className="w-4 h-4 text-red-400" />}
                      {tip.status === 'pending' && <Clock className="w-4 h-4 text-yellow-400" />}
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold">{tip.tip}</span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                          {tip.odds}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">Confiança:</span>
                        <span className={`text-sm font-bold ${
                          tip.confidence >= 80 ? 'text-green-400' : 
                          tip.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {tip.confidence}%
                        </span>
                      </div>
                      <ConfidenceBar confidence={tip.confidence} />
                    </div>

                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-blue-200 text-xs leading-relaxed">{tip.reasoning}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">Dica do Dia</span>
                </div>
                <p className="text-white text-sm mb-2">
                  <strong>Barcelona vs Real Madrid - Mais de 2.5 gols</strong>
                </p>
                <p className="text-gray-300 text-xs">
                  El Clásico sempre entrega! Média de 3.2 gols nos últimos 10 confrontos. 
                  Ambas equipes em excelente fase ofensiva.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé com Disclaimer */}
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-400 font-bold mb-2">Aviso Importante</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                As análises e previsões apresentadas são baseadas em dados estatísticos e algoritmos de machine learning. 
                Apostas esportivas envolvem riscos financeiros. Aposte com responsabilidade e apenas o que pode perder. 
                Este site é apenas para fins informativos e educacionais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}