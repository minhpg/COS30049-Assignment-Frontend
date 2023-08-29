import { makeRequest } from "../api";
import { mergeResult } from "../utils";

const getTopNFTs = async (limit) => {
  const query_all_transactions = `
  MATCH
  (nft:NFT)<-[:FOR_NFT]-(t:Transaction)
  WITH nft, count(t) as transaction_count
  RETURN
      {
        id: ID(nft) ,
        permanent_link: nft.Permanent_link,
        name: nft.Name,
        image_urls: [nft.Image_url_1, nft.Image_url_2, nft.Image_url_3, nft.Image_url_4],
        transaction_count: transaction_count
      }
    ORDER BY transaction_count DESC
    LIMIT 10 
  `;

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

  const { errors, results } = await makeRequest(body);

  const results_parsed = [];
  for (const result of results) {
    const first_result = mergeResult(result);
    results_parsed.push(first_result);
  }

  return results_parsed[0];
};

export { getTopNFTs };
