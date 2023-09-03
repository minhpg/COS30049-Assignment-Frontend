// API results from Neo4J returns by row, thus we need to merge column keys to each row value
const mergeResult = (result) => {
    const { columns, data } = result
    const array = []
    for(const item of data) {
        let array_item = {}
        for(const index in columns) {
            array_item[columns[index]] = item.row[index] 
        }
        array.push(array_item)
    }

    return array
}

export {
    mergeResult
}