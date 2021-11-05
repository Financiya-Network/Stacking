export default {
    rpcTestnet: `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_KEY.split('').reverse().join('')}`,
    // chainId: 42,
    rpc: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY.split('').reverse().join('')}`,//ethereum mainnet rpc infura
    chainId: 1,
    chainIdTestnet: 42,
    bscChain: 56,
    bscChainTestent: 97,
    hmy_rpc_mainnet: 'https://api.harmony.one',
    hmy_rpc_testnet: 'https://api.s0.b.hmny.io',
    hmyChainTestnet: 1666700000,
    hmyChainMainnet: 1666600000,
    polygon_rpc_mainnet: `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY.split('').reverse().join('')}`, // matic mainnet rpc infura
    polygon_rpc_testnet: "https://mumbai-explorer.matic.today", // matic testnet rpc
    polygon_chain_mainnet: 137,
    polygon_chain_testnet: 80001,
    // bscChain: 97,
    api: 'http://localhost:8020',
    coingecko: "https://api.coingecko.com/api"
}