import {type Client, NetworkService, PaymentMethodType} from "@t-0/provider-sdk";
import {toProtoDecimal} from "./lib";

export default async function submitPayment(networkClient: Client<typeof NetworkService>): Promise<void> {
  // TODO: Step 2.3 replace this with receiving quotes from you systems and publishing them into t-0 Network. We recommend publishing at least once per 5 seconds, but not more than once per second
    await networkClient.createPayment({
      currency: 'GBP',
      amount: {
        amount: {
          case: "payOutAmount",
          value: toProtoDecimal(10, 0),
        },
      },
      paymentDetails: {
        details: {
          case: "sepa",
          value: {
            iban: 'GB12345567890',
            beneficiaryName: 'Max Mustermann',
          }
        }
      },
    })
}