import {
  PayoutRequest,
  PayoutResponse,
  UpdatePaymentRequest,
  UpdateLimitRequest,
  UpdateLimitResponse,
  AppendLedgerEntriesRequest,
  AppendLedgerEntriesResponse,
  UpdatePaymentResponse,
  HandlerContext, type Client, NetworkService,
} from "@t-0/provider-sdk";

/*
  Please refer to docs, proto definition comments or source code comments to understand purpose of fields
 */
const CreateProviderService = (networkClient: Client<typeof NetworkService>) => {
  return {
    async updatePayment(req: UpdatePaymentRequest, _: HandlerContext) {
      // TODO: Step 2.1 implement how you handle updates of payment initiated by you
      console.log(`Received payment update for ${req.paymentId}, payment ${req.result.case}`)
      return {} as UpdatePaymentResponse
    },

    async payOut(req: PayoutRequest, _: HandlerContext) {
      // TODO: Step 2.4 implement how you do payouts (payments initiated by your counterparts)
      console.log(`Received payout request ${req.payoutId}`)

      //TODO: confirmPayout should be called when you system notifies that payout has been made successfully
      setInterval(() => {
        networkClient.confirmPayout({
          paymentId: req.paymentId,
          payoutId: req.payoutId,
        })
      }, 2000);
      return {
        result: {
          case: "accepted",
          value: {},
        },
      } as PayoutResponse
    },

    async updateLimit(req: UpdateLimitRequest, _: HandlerContext) {
      // TODO: optionally implement updates on your limits and limits usage
      console.log(`Received update of limits with provider ${req.limits[0].creditorId}`)
      return {} as UpdateLimitResponse
    },

    async appendLedgerEntries(req: AppendLedgerEntriesRequest, _: HandlerContext) {
      // TODO: optionally implement handling of new ledger transactions and new ledger entries
      console.log(`Received ledger entries for ${req.transactions} transaction(s)`)
      return {
      } as AppendLedgerEntriesResponse
    },
  }
};

export default CreateProviderService;
