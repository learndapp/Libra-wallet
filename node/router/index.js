const router = require("koa-router")();
const { has, at } = require("lodash");
const LW = require("libra-weight");
const lw = new LW(process.env.ADDR);

const libraAction = (method, params, scope) => {
  return new Promise((resolve, reject) => {
    lw.request(method, params, (error, result) => {
      if (error) {
        return resolve({
          error
        });
      }

      if (method === "get_transactions") {
        const transactions = [];
        result.txn_list_with_proof.transactions.forEach(tx => {
          const decodedTx = {
            raw_txn: lw.utils.deserializeRawTxnBytes(tx.raw_txn_bytes),
            ...tx
          };
          transactions.push(decodedTx);
        });
        result.txn_list_with_proof.transactions = transactions;
      }

      if (scope && has(result, scope)) {
        return resolve(at(result, scope));
      }
      return resolve({
        result
      });
    });
  });
};

router
  .get("/api/account/state/:address?", async (ctx, next) => {
    const { scope } = ctx.query;
    const address = ctx.params.address;
    const params = { address: Buffer.from(address, "hex") };
    const result = await libraAction("get_account_state", params, scope);
    ctx.body = {
      result
    };
  })
  .get(
    "/api/account/transaction/:address?/:sequenceNumber?/:fetchEvents?",
    async (ctx, next) => {
      const { scope } = ctx.query;
      const address = ctx.params.address || SAMPLE_ADDRESS;
      const sequenceNumber = ctx.params.sequenceNumber || 0;
      const fetchEvents = ctx.params.fetchEvents !== "false";
      const params = {
        account: Buffer.from(address, "hex"),
        sequence_number: parseInt(sequenceNumber, 10),
        fetch_events: fetchEvents
      };
      const result = await libraAction(
        "get_account_transaction_by_sequence_number",
        params,
        scope
      );
      ctx.body = {
        result
      };
    }
  )
  .get(
    "/api/events/:address?/:startEventSeqNum?/:ascending?/:limit?",
    async (ctx, next) => {
      const { scope } = ctx.query;
      const address = ctx.params.address || SAMPLE_ADDRESS;
      const startEventSeqNum = ctx.params.startEventSeqNum || 0;
      const ascending = ctx.params.ascending !== "false";
      const limit = ctx.params.limit || 10;
      const params = {
        access_path: { address: Buffer.from(address, "hex") },
        start_event_seq_num: parseInt(startEventSeqNum, 10),
        ascending,
        limit: parseInt(limit, 10)
      };
      const result = await libraAction(
        "get_events_by_event_access_path",
        params,
        scope
      );
      ctx.body = {
        result
      };
    }
  )
  .get(
    "/api/transactions/:startVersion?/:limit?/:fetchEvents?",
    async (ctx, next) => {
      const { scope } = ctx.query;
      const startVersion = ctx.params.startVersion || 0;
      const limit = ctx.params.limit || 10;
      const fetchEvents = ctx.params.fetchEvents !== "false";
      const params = {
        start_version: startVersion,
        limit: parseInt(limit, 10),
        fetch_events: fetchEvents
      };

      const result = await libraAction("get_transactions", params, scope);
      ctx.body = {
        result
      };
    }
  )
  .post("/rpc", async (ctx, next) => {
    const { method, params, id } = ctx.request.body;
    return lw.request(method, params, (error, result) => {
      return (ctx.body = { jsonrpc: "2.0", id, method, result, error });
    });
  })
  .get("*", (ctx, next) => {
    ctx.status = 404;
    ctx.body = "404";
  });

module.exports = router;
