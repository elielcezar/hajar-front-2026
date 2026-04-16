import { NextResponse } from 'next/server';

interface CotacoesData {
  dolar: string;
  milho: string;
  soja: string;
  atualizadoEm: string;
}

let cache: { data: CotacoesData; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hora em ms

async function fetchWithTimeout(url: string, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchDolar(): Promise<number> {
  try {
    const res = await fetchWithTimeout(
      'https://economia.awesomeapi.com.br/json/last/USD-BRL'
    );
    if (!res.ok) throw new Error(`Status ${res.status}`);

    const data = await res.json();
    const bid = parseFloat(data?.USDBRL?.bid);
    if (isNaN(bid)) throw new Error('Valor inválido');
    return bid;
  } catch (err) {
    console.error('[Cotações] Erro ao buscar dólar:', err);
    return 0;
  }
}

async function fetchCommodity(
  symbol: string,
  fatorConversao: number,
  dolar: number
): Promise<string> {
  if (dolar <= 0) return '--';

  try {
    const res = await fetchWithTimeout(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
    );
    if (!res.ok) throw new Error(`Status ${res.status}`);

    const data = await res.json();
    const precoUsdCentavos =
      data?.chart?.result?.[0]?.meta?.regularMarketPrice;

    if (!precoUsdCentavos || isNaN(precoUsdCentavos)) {
      throw new Error('Preço não encontrado na resposta');
    }

    // Centavos/bushel → R$/saca de 60kg
    const precoSacaBrl = (precoUsdCentavos / 100) * fatorConversao * dolar;
    return precoSacaBrl.toFixed(2).replace('.', ',');
  } catch (err) {
    console.error(`[Cotações] Erro ao buscar ${symbol}:`, err);
    return '--';
  }
}

async function getCotacoes(): Promise<CotacoesData> {
  // 1 bushel milho = 25.4kg → 1 saca 60kg = 2.36 bushels
  // 1 bushel soja  = 27.2kg → 1 saca 60kg = 2.20 bushels
  const FATOR_MILHO = 2.36;
  const FATOR_SOJA = 2.2;

  const dolarValor = await fetchDolar();

  const [milho, soja] = await Promise.all([
    fetchCommodity('ZC=F', FATOR_MILHO, dolarValor),
    fetchCommodity('ZS=F', FATOR_SOJA, dolarValor),
  ]);

  const agora = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    dolar: dolarValor > 0 ? dolarValor.toFixed(2).replace('.', ',') : '--',
    milho,
    soja,
    atualizadoEm: agora,
  };
}

export async function GET() {
  try {
    const now = Date.now();

    if (cache && now - cache.timestamp < CACHE_TTL) {
      return NextResponse.json(cache.data, {
        headers: { 'X-Cache': 'HIT' },
      });
    }

    const cotacoes = await getCotacoes();

    cache = { data: cotacoes, timestamp: now };

    return NextResponse.json(cotacoes, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('[Cotações] Erro geral:', error);

    if (cache) {
      return NextResponse.json(cache.data, {
        headers: { 'X-Cache': 'STALE' },
      });
    }

    return NextResponse.json(
      {
        dolar: '--',
        milho: '--',
        soja: '--',
        atualizadoEm: '--',
      },
      { status: 500 }
    );
  }
}
