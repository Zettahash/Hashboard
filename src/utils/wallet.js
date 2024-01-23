import { genericABI } from '@/components/data/genericABI'
import { BrowserProvider, formatUnits, Contract } from 'ethers'
import { useDisconnect } from '@web3modal/ethers/vue'
const { disconnect } = useDisconnect()

const tokens = {
  zh: {
    contract: '0x2C0e15190aCB858Bf74447928Cbd8Fb9709dCB19',
  },
  usdc: {
    contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  usdt: {
    contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  },
}

const getBalance = async function(currency, address){
  address = address ? address : this.$store.state.wallet
  if (!currency) { return '0' }
  currency = currency.toLowerCase()
  const walletProvider = this.$store.state.application.walletConnectModal.getWalletProvider()
  const ethersProvider = new BrowserProvider(walletProvider)

  let balance = false
  if (tokens[currency]) {
    const contract = new Contract(tokens[currency].contract, genericABI, ethersProvider)
    balance = await contract.balanceOf(address)
  }
  else if (currency === 'eth') {
    balance = await ethersProvider.getBalance(address)
  }
  const formatted = formatUnits(balance, 18)
  const formattedStr = Number(formatted) > 1 ? Number(formatted).toFixed(6) : Number(formatted).toFixed(8)
  return { balance: formatted, formatted: formattedStr, raw: balance }
}

const doDisconnect = function () {
  this.$store.commit('setWallet', false)
  disconnect()
}
export { getBalance, doDisconnect }