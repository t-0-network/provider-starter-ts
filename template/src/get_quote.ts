import {type Client, NetworkService, PaymentMethodType, QuoteType} from "@t-0/provider-sdk";
import {fromProtoDecimal, toProtoDecimal} from "./lib";

export default async function getQuote(networkClient: Client<typeof NetworkService>) {
  const eurgbp = await networkClient.getQuote({
    payInCurrency: "EUR",
    payInMethod: PaymentMethodType.SEPA,
    payOutCurrency: "GBP",
    payOutMethod: PaymentMethodType.SWIFT,
    quoteType: QuoteType.REALTIME,
    amount: {
      amount: {
        case: 'payInAmount',
        value: toProtoDecimal(10, 0)
      },
    }
  })

  switch (eurgbp.result.case) {
    case 'success':
      console.log(`EUR/GBP: ${fromProtoDecimal(eurgbp.result.value.rate!)}`)
      break;
    case 'failure':
      console.error(eurgbp.result.value.reason)
      break;
    default:
      console.error("unexpected result type")
  }
}