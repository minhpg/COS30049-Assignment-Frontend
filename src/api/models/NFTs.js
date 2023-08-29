import { makeRequest } from "../api";
import { mergeResult } from "../utils";
import getTopNFTsResponse from '../data/nft-tops.json'
const getTopNFTs = async (limit) => {
  const query_all_transactions = `
  MATCH
  (nft:NFT)<-[:FOR_NFT]-(t:Transaction),
  (nft:NFT)-[:IN_COLLECTION]->(c:Collection)
  WITH nft, count(t) as transaction_count, c
  RETURN
      {
        id: ID(nft),
        key: ID(nft),
        collection: c.Collection,
        permanent_link: nft.Permanent_link,
        name: nft.Name,
        image_urls: [nft.Image_url_1, nft.Image_url_2, nft.Image_url_3, nft.Image_url_4],
        transaction_count: transaction_count
      }
    ORDER BY transaction_count DESC
    LIMIT $limit 
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

  // const { errors, results } = await makeRequest(body);
  const { errors, results } = getTopNFTsResponse

  return results[0].data.map(item => item.row[0]);
};

export { getTopNFTs };
