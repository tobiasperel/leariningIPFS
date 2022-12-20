import * as IPFS from 'ipfs';
import * as dataJson from "./data.json" assert { type: "json" } ; 

async function viewDatabase(path,node){
    const stream = node.cat(path)

    const decoder = new TextDecoder()
    let data = ''
    for await (const chunk of stream) {
        // chunks of data are returned as a Uint8Array, convert it back to a string
        data += decoder.decode(chunk, { stream: true })
    }
    
    console.log(data)
}

async function main() {
    console.log(dataJson);
    const node = await IPFS.create()

    const databaseBuffer = Buffer.from(JSON.stringify(dataJson))
    const results = await node.add(databaseBuffer)

    console.log(results.path) 
    
    viewDatabase(results.path, node)
    
}
main()