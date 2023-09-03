import { makeRequest } from "../api"
import { mergeResult } from "../utils"

// Fetch an address's information and analytics

const getSingleTrader = async (address) => {
    return await getSingleTraderAnalytics(address)
}

const getSingleTraderAnalytics = async (address) => {

    const parameters = {
        address
    }

    const query_buy_count = `MATCH n=(t:Trader)-[r:BOUGHT]->(:Transaction) WHERE t.address = $address RETURN count(r) AS value `    
    const query_sold_count = `MATCH n=(t:Trader)-[r:SOLD]->(:Transaction) WHERE t.address = $address RETURN count(r) AS value`    
    const query_first_txn = `MATCH (t:Trader)-[:BOUGHT|:SOLD]->(txn:Transaction) 
    WHERE t.address = $address 
    RETURN txn.Datetime_updated AS value
    ORDER BY txn.Datetime_updated ASC
    LIMIT 1
    ` 

    const query_highest_txn = `MATCH (t:Trader)-[:BOUGHT|:SOLD]->(txn:Transaction) 
    WHERE t.address = $address 
    RETURN txn.Price_USD AS value
    ORDER BY txn.Price_USD DESC
    LIMIT 1
    `    

    const query_sum_sold = `MATCH 
    n=(t:Trader)-[r:BOUGHT]->(txn:Transaction) WHERE t.address = $address RETURN sum(txn.Price_USD) AS value`    

    const query_sum_bought = `MATCH n=(t:Trader)-[r:SOLD]->(txn:Transaction) WHERE t.address = $address RETURN sum(txn.Price_USD) AS value`    

    const body = {
        "statements": [
            {
                "statement": query_buy_count,
                parameters
            },
            {
                "statement": query_sold_count,
                parameters
            },
            {
                "statement": query_first_txn,
                parameters
            },
            {
                "statement": query_highest_txn,
                parameters
            },
            {
                "statement": query_sum_sold,
                parameters
            },
            {
                "statement": query_sum_bought,
                parameters
            }
        ]
    }


    
    const { errors, results } = await makeRequest(body)
    const results_parsed = []
    for(const result of results) {
        const first_result = mergeResult(result)[0]
        if(first_result)
        {
            const { value } = first_result
            results_parsed.push(value)
        }
        else {
            results_parsed.push(0)
        }
    }

    const { 
        0: buy_count,
        1: sold_count,
        2: first_txn,
        3: highest_txn,
        4: sum_sold,
        5: sum_bought
    } = results_parsed

    const date = new Date(first_txn);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    const data = {
        address,
        buy_count,
        sold_count,
        highest_txn: {
            value: highest_txn,
            unit: 'USD'
        },
        first_txn: formattedDate,
        buy_sum: {
            value: sum_bought,
            unit: 'USD'
        },
        sold_sum: {
            value: sum_sold,
            unit: 'USD'
        }
    }

    return data
}

const getBuyTransactions = async (address, page, limit) => {

    if (!limit)
        limit = 25
    if (!page)
        page = 1

    const offset = (page - 1) * limit

    const parameters = {
        address,
        limit,
        offset
    }

    const query_buy = `
    MATCH
    (t)<-[:SOLD]-(seller:Trader),
    (t)<-[:BOUGHT]-(buyer:Trader)
    WHERE  buyer.address = $address
    RETURN
        ID(t) as id,
        t.Market as market,
        t.Transaction_hash as hash, 
        t.Datetime_updated_seconds as timestamp,
        t.Price_Crypto as price_crypto,
        t.Price_USD as price_usd ,
        t.Crypto as crypto,
        buyer.address AS buyer_address, 
        buyer.username AS buyer_username, 
        seller.address AS seller_address
    SKIP $offset LIMIT $limit
    `

    const body = {
        statements: [{
            statement: query_buy,
            parameters
        }]
    }


    
    const { errors, results } = await makeRequest(body)

    const results_parsed = []
    for(const result of results) {
        const first_result = mergeResult(result)
        results_parsed.push(first_result)
    }

    return results_parsed[0]
}

const getSellTransactions = async (address, page, limit) => {

    if (!limit)
        limit = 25
    if (!page)
        page = 1

    const offset = (page - 1) * limit

    const parameters = {
        address,
        limit,
        offset
    }

    const query_sell = `
    MATCH (t:Transaction),
    (t)<-[:SOLD]-(seller:Trader),
    (t)<-[:BOUGHT]-(buyer:Trader)
    WHERE  seller.address = $address
    RETURN
        ID(t) as id,
        t.Market as market,
        t.Transaction_hash as hash, 
        t.Datetime_updated_seconds as timestamp,
        t.Price_Crypto as price_crypto,
        t.Price_USD as price_usd ,
        t.Crypto as crypto,
        buyer.address AS buyer_address, 
        buyer.username AS buyer_username, 
        seller.address AS seller_address
    SKIP $offset LIMIT $limit

    `
    const body = {
        statements: [{
            statement: query_sell,
            parameters
        }]
    }


    
    const { errors, results } = await makeRequest(body)

    const results_parsed = []
    for(const result of results) {
        const first_result = mergeResult(result)
        results_parsed.push(first_result)
    }

    return results_parsed[0]
}

const getAllTransactions = async (address) => {

    const parameters = {
        address
    }

    const query_sell = `
    MATCH (t:Transaction),
    (t)<-[:SOLD]-(seller:Trader),
    (t)<-[:BOUGHT]-(buyer:Trader)
    WHERE  seller.address = $address
    RETURN
        ID(t) as id,
        t.Market as market,
        t.Transaction_hash as hash, 
        t.Datetime_updated_seconds as timestamp,
        t.Price_Crypto as price_crypto,
        t.Price_USD as price_usd ,
        t.Crypto as crypto,
        buyer.address AS buyer_address, 
        buyer.username AS buyer_username, 
        seller.address AS seller_address

    UNION

    MATCH (t:Transaction),
    (t)<-[:SOLD]-(seller:Trader),
    (t)<-[:BOUGHT]-(buyer:Trader)
    WHERE  buyer.address = $address
    RETURN
        ID(t) as id,
        t.Market as market,
        t.Transaction_hash as hash, 
        t.Datetime_updated_seconds as timestamp,
        t.Price_Crypto as price_crypto,
        t.Price_USD as price_usd ,
        t.Crypto as crypto,
        buyer.address AS buyer_address, 
        buyer.username AS buyer_username, 
        seller.address AS seller_address
    `
    const body = {
        statements: [{
            statement: query_sell,
            parameters
        }]
    }


    
    const { errors, results } = await makeRequest(body)

    const results_parsed = []
    for(const result of results) {
        const first_result = mergeResult(result)
        results_parsed.push(first_result)
    }

    return results_parsed[0]
}

export {
    getSingleTrader,
    getBuyTransactions,
    getSellTransactions,
    getAllTransactions
}