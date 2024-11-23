import { ExchangeRate } from '../types/configuration/currency';

import { QUERY_KEYS } from '../sections/configuration/currency/context';
import { useGetData } from './use-get-data';


export function useExchangeRate() {

  const { data = [], isLoading } = useGetData({
    url: '/api/config/currency/get-exchange-rate/',
    queryKey: [QUERY_KEYS.exchangeRate],
    staleTime: 300,
  });

  const secondaryCurrency = data.find((currency: ExchangeRate) => currency.type_currency === "Secundaria");
  const mainCurrency = data.find((currency: ExchangeRate) => currency.type_currency === "Principal");

  const exchangeRate = secondaryCurrency?.exchange_rate ?? 1;
  const secondaryCurrencyId = secondaryCurrency?.id ?? null;
  const mainCurrencyId = mainCurrency?.id ?? null;
  const secondaryCurrencyCode = secondaryCurrency?.code ?? null;
  const mainCurrencyCode = mainCurrency?.code ?? null;

  return {
    exchangeRate,
    secondaryCurrencyCode,
    mainCurrencyCode,
    mainCurrencyId,
    secondaryCurrencyId,
    isLoading
  }
}
