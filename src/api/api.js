/* 
Function to handle API requests to Neo4J HTTP endpoint
Also handles authentication
*/
const makeRequest = async (body, fetch_options) => {
    const url = 'http://localhost:7474/db/nft/tx/commit'

    const headers = new Headers()
    headers.append('Authorization', `Basic ${btoa('neo4j:nft12345')}`)
    headers.append('Content-Type', 'application/json')

    const request = new Request(url, {
        method: "POST",
        headers,
        body: JSON.stringify(
            body
        )
    })

    const response = await fetch(request, fetch_options)
    const json_response = await response.json()
    return json_response
}


export {
    makeRequest
}

