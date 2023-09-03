import { makeRequest } from "../api";
import { mergeResult } from "../utils";

// Importing JSON data for the purpose of portability
import latestTransactionResponse from "../data/latest-transactions.json";
import graphTransactionResponse from "../data/graph-transactions.json";


// Fetching latest transactions 
const getLatestTransactions = async (limit) => {
  const query_all_transactions = `
    MATCH (t:Transaction),
    (t)<-[:SOLD]-(seller:Trader),
    (t)<-[:BOUGHT]-(buyer:Trader)
    WHERE t.Market = "OpenSea"
    RETURN 
        ID(t) AS ID,
        t.Market AS Market,
        t.Crypto AS Crypto,
        t.Price_Crypto AS Price,
        t.Price_USD AS USD,
        t.Transaction_hash AS hash,
        buyer.address AS Buyer, 
        seller.address as Seller
        ORDER BY t.Datetime_updated
        LIMIT $limit
    `;

  //COALESCE("$"+ apoc.number.format(t.Price_USD, '#,##0.00;(#,##0.00)', 'it'), ‘$0.00’) AS USD,

  const body = {
    statements: [
      {
        statement: query_all_transactions,
        parameters: {
          limit,
        },
      },
    ],
  };

  //   const { errors, results } = await makeRequest(body);

  const { errors, results } = latestTransactionResponse;
  const results_parsed = [];
  for (const result of results) {
    const first_result = mergeResult(result);
    results_parsed.push(first_result);
  }

  return results_parsed[0];
};

// Fetching transactions for visualizing graph 
const getAllTransactions = async (limit) => {
  const query_all_transactions = `
  MATCH (t:Transaction),
  (t)<-[:SOLD]-(seller:Trader),
  (t)<-[:BOUGHT]-(buyer:Trader)
  WHERE t.Market = "OpenSea"
  RETURN 
    t.Transaction_hash as transaction_hash,
    t.Price_Crypto as price,
   buyer.address AS buyer_address, 
   seller.address AS seller_address 
   ORDER BY rand()
   LIMIT $limit    `;

  const body = {
    statements: [
      {
        statement: query_all_transactions,
        parameters: {
          limit,
        },
      },
    ],
  };

  // const { errors, results } = await makeRequest(body);
  const { errors, results } = graphTransactionResponse;
  const results_parsed = [];
  for (const result of results) {
    const first_result = mergeResult(result);
    results_parsed.push(first_result);
  }

  return results_parsed[0];
};

// Fetch transaction by transaction ID
const getTransactionById = async (id) => {
  const query = `
    MATCH (t:Transaction),
    (t)<-[:SOLD]-(seller:Trader),
    (t)<-[:BOUGHT]-(buyer:Trader),
    (nft:NFT)<-[:FOR_NFT]-(t)
    WHERE ID(t) = $id
    RETURN 
        $id AS ID,
        t.Market AS Market,
        t.Crypto AS Crypto,
        t.Price_Crypto AS Price,
        t.Price_USD AS "Price (USD)",
        buyer.address AS Buyer, 
        seller.address as Seller
        SORT BY t.Datetime_updated_seconds
        LIMIT 25
    `;

  const body = {
    statements: [
      {
        statement: query,
        parameters: {
          id,
        },
      },
    ],
  };

  const { errors, results } = await makeRequest(body);

  return results;
};

export { getAllTransactions, getTransactionById, getLatestTransactions };
