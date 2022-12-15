import * as IPFS from 'ipfs';

async function main() {
    const node = await IPFS.create()

    let data = 'Hello, Tobias Perel'

    
    const results = await node.add(data)
    console.log(results.path)    

    const stream = node.cat('QmTcGGKKH9rxo9LKK9w24DNQJkDDHNtfShcnqipoCgXvvs')
    const decoder = new TextDecoder()
    data = ''
    for await (const chunk of stream) {
        // chunks of data are returned as a Uint8Array, convert it back to a string
        data += decoder.decode(chunk, { stream: true })
    }
    
    console.log(data)

}
main()