import { ethers } from 'ethers';
import { getWalletClient } from 'wagmi/actions';
import { wagmiConfig } from '../config/wagmi';
import config from '../config';

// NFT 合约 ABI（只包含需要的方法）
const NFT_ABI = [
  'function mint(uint256 quantity) payable',
  'function totalMinted() view returns (uint256)',
  'function mintActive() view returns (bool)',
  'function minted(address owner) view returns (uint256)',
  'function MAX_SUPPLY() view returns (uint256)',
  'function MAX_PER_WALLET() view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenByIndex(uint256 index) view returns (uint256)', // ERC721Enumerable
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)', // ERC721Enumerable
];

// EVM 合约交互服务类
export class EvmContractService {
  private provider: ethers.BrowserProvider | null = null;
  private contract: ethers.Contract | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private isInitialized = false;

  constructor() {
    // 延迟初始化，等待 window.ethereum 可用
  }

  /**
   * 初始化 provider 和合约实例
   */
  async init() {
    // 如果已经初始化，直接返回
    if (this.isInitialized && this.contract) {
      return;
    }

    if (typeof window === 'undefined') {
      throw new Error('Window object not available');
    }

    // 检查是否有钱包连接
    const walletClient = await getWalletClient(wagmiConfig);
    if (!walletClient) {
      throw new Error('请先连接钱包');
    }

    // 使用 window.ethereum（RainbowKit 已经管理了连接）
    if (!window.ethereum) {
      throw new Error('MetaMask 未安装');
    }

    // 使用 MetaMask provider
    this.provider = new ethers.BrowserProvider(window.ethereum);
    const network = await this.provider.getNetwork();
    console.log('🌐 当前网络:', network.name, network.chainId);
    
    // 获取 signer
    this.signer = await this.provider.getSigner();
    
    // 创建合约实例
    const contractAddress = config.localChain.enabled 
      ? config.localChain.contractAddress 
      : config.nft.contractAddress;
    
    this.contract = new ethers.Contract(
      contractAddress,
      NFT_ABI,
      this.signer
    );

    this.isInitialized = true;
    console.log('✅ EVM 合约服务已初始化');
    console.log('📍 合约地址:', contractAddress);
  }

  /**
   * 铸造 NFT
   * @param quantity 铸造数量
   */
  async mint(quantity: number): Promise<any> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      throw new Error('合约未初始化');
    }

    console.log(`🔄 铸造 ${quantity} 个 NFT...`);
    
    // 调用 mint 函数，value: 0（免费 mint）
    const tx = await this.contract.mint(quantity, { value: 0 });
    
    console.log('📝 交易已发送:', tx.hash);
    
    // 等待交易确认
    const receipt = await tx.wait();
    
    console.log('✅ 交易已确认:', receipt);
    
    return receipt;
  }

  /**
   * 查询总铸造数量
   */
  async getTotalMinted(): Promise<number> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      return 0;
    }

    try {
      const totalMinted = await this.contract.totalMinted();
      return Number(totalMinted);
    } catch (error) {
      console.error('查询 totalMinted 失败:', error);
      return 0;
    }
  }

  /**
   * 查询用户已铸造的数量
   * @param address 用户地址
   */
  async getMintedCount(address: string): Promise<number> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      return 0;
    }

    try {
      const minted = await this.contract.minted(address);
      return Number(minted);
    } catch (error) {
      console.error('查询 minted 失败:', error);
      return 0;
    }
  }

  /**
   * 查询铸造状态
   */
  async isMintActive(): Promise<boolean> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      return false;
    }

    try {
      const mintActive = await this.contract.mintActive();
      return mintActive;
    } catch (error) {
      console.error('查询 mintActive 失败:', error);
      return false;
    }
  }

  /**
   * 查询最大供应量
   */
  async getMaxSupply(): Promise<number> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      return 10000;
    }

    try {
      const maxSupply = await this.contract.MAX_SUPPLY();
      return Number(maxSupply);
    } catch (error) {
      console.error('查询 MAX_SUPPLY 失败:', error);
      return 10000;
    }
  }

  /**
   * 查询每个钱包最大铸造数量
   */
  async getMaxPerWallet(): Promise<number> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      return 10;
    }

    try {
      const maxPerWallet = await this.contract.MAX_PER_WALLET();
      return Number(maxPerWallet);
    } catch (error) {
      console.error('查询 MAX_PER_WALLET 失败:', error);
      return 10;
    }
  }

  /**
   * 获取合约实例
   */
  getContract() {
    return this.contract;
  }

  /**
   * 获取 provider
   */
  getProvider() {
    return this.provider;
  }

  /**
   * 获取 signer
   */
  getSigner() {
    return this.signer;
  }

  /**
   * 查询用户拥有的所有 NFT token IDs
   * 注意：由于标准 ERC721 没有枚举功能，我们需要遍历所有 token
   * @param owner 用户地址
   */
  async getUserNFTs(owner: string): Promise<number[]> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      return [];
    }

    try {
      console.log(`🔍 查询用户 ${owner} 的 NFT...`);
      
      const totalMinted = await this.contract.totalMinted();
      const nftIds: number[] = [];

      // 遍历所有已铸造的 token，检查拥有者
      // 为了提高性能，可以批量查询
      const batchSize = 50; // 每批查询50个
      
      for (let i = 1; i <= Number(totalMinted); i += batchSize) {
        const endIndex = Math.min(i + batchSize - 1, Number(totalMinted));
        
        // 创建批量查询 promises
        const promises: Promise<any>[] = [];
        for (let j = i; j <= endIndex; j++) {
          promises.push(this.contract!.ownerOf(j));
        }
        
        // 并行查询
        const owners = await Promise.all(promises);
        
        // 检查哪些 token 属于该用户
        for (let k = 0; k < owners.length; k++) {
          if (owners[k].toLowerCase() === owner.toLowerCase()) {
            nftIds.push(i + k);
          }
        }
      }

      console.log(`✅ 找到 ${nftIds.length} 个 NFT`);
      return nftIds;
    } catch (error) {
      console.error('查询用户 NFT 失败:', error);
      return [];
    }
  }

  /**
   * 获取 NFT token URI
   * @param tokenId token ID
   */
  async getTokenURI(tokenId: number): Promise<string> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      return '';
    }

    try {
      const uri = await this.contract.tokenURI(tokenId);
      return uri;
    } catch (error) {
      console.error('查询 tokenURI 失败:', error);
      return '';
    }
  }

  /**
   * 获取用户 NFT 余额
   * @param owner 用户地址
   */
  async getBalanceOf(owner: string): Promise<number> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      return 0;
    }

    try {
      const balance = await this.contract.balanceOf(owner);
      return Number(balance);
    } catch (error) {
      console.error('查询 balanceOf 失败:', error);
      return 0;
    }
  }
}

// 导出单例
export const evmContractService = new EvmContractService();

export default EvmContractService;

