import { 
  MsgExecuteContractCompat
} from '@injectivelabs/sdk-ts'
import { WalletStrategy } from '@injectivelabs/wallet-strategy'
import { getNetworkEndpoints } from '@injectivelabs/networks'
import config from '../config'

// 合约交互工具类
export class ContractService {
  private walletStrategy: WalletStrategy
  private contractAddress: string

  constructor(walletStrategy: WalletStrategy) {
    this.walletStrategy = walletStrategy
    this.contractAddress = config.nft.contractAddress
  }

  /**
   * 铸造NFT
   * @param quantity 铸造数量
   * @param senderAddress 发送者地址
   */
  async mint(quantity: number, senderAddress: string) {
    // 构建合约消息
    const msg = {
      mint: {
        quantity: quantity
      }
    }

    // 创建执行合约的消息
    const executeMsg = MsgExecuteContractCompat.fromJSON({
      sender: senderAddress,
      contractAddress: this.contractAddress,
      msg,
      funds: [] // 免费mint，不需要发送资金
    })

    try {
      // 获取网络端点
      const endpoints = getNetworkEndpoints(config.network)
      // 根据配置的网络选择对应的 chainId
      const chainId = config.network.toString().includes('mainnet')
        ? config.chain.mainnet.chainId
        : config.chain.testnet.chainId

      // 广播交易
      const response = await this.walletStrategy.sendTransaction(
        executeMsg as any,
        {
          address: senderAddress,
          chainId: chainId as any,
          endpoints: endpoints,
        }
      )

      return response
    } catch (error) {
      console.error('Mint failed:', error)
      throw error
    }
  }

  /**
   * 查询用户已铸造的数量
   * @param address 用户地址
   */
  async getMintedCount(address: string): Promise<number> {
    try {
      // 查询合约状态
      // 注意: 这需要根据你的实际合约查询接口调整
      // const queryMsg = {
      //   minted: {
      //     address: address
      //   }
      // }
      // const result = await queryContract(this.contractAddress, queryMsg)
      // return result.count
      
      console.log('Querying minted count for:', address)
      return 0 // 临时返回值
    } catch (error) {
      console.error('Query failed:', error)
      return 0
    }
  }

  /**
   * 查询总铸造数量
   */
  async getTotalMinted(): Promise<number> {
    try {
      // 注意: 这需要根据你的实际合约查询接口调整
      // const queryMsg = {
      //   total_minted: {}
      // }
      // const result = await queryContract(this.contractAddress, queryMsg)
      // return result.total
      
      return 0 // 临时返回值
    } catch (error) {
      console.error('Query failed:', error)
      return 0
    }
  }

  /**
   * 查询铸造状态
   */
  async isMintActive(): Promise<boolean> {
    try {
      // 注意: 这需要根据你的实际合约查询接口调整
      // const queryMsg = {
      //   mint_active: {}
      // }
      // const result = await queryContract(this.contractAddress, queryMsg)
      // return result.active
      
      return true // 临时返回值
    } catch (error) {
      console.error('Query failed:', error)
      return false
    }
  }
}

export default ContractService

