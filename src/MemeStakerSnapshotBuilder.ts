import Web3 from 'web3'
import CONSTANTS from './Constants'

import Bluebird from 'bluebird'

export default class MemeStakerSnapshotBuilder {
  private readonly blockHeight: string
  private readonly poolContracts

  private constructor(blockHeight: string, poolContracts) {
    this.blockHeight = blockHeight
    this.poolContracts = poolContracts
  }

  private async getMemerSnapshot(): Promise<Array<string>> {
    // Get all Staked events
    const stakedEvents = [].concat(...await Promise.all(this.poolContracts.map(async contract => {
      return await contract.getPastEvents('Staked', {
        fromBlock: CONSTANTS.START_BLOCK,
        toBlock: this.blockHeight
      })
    })) as any)
    // stakedEvents.filter((event)=>event.returnValues.amount.toString() !== '0')
    // Get user addresses only
    let stakerAddresses = stakedEvents.map((event) => { return event.returnValues.user })
    // Filter by unique
    stakerAddresses = stakerAddresses.filter((value, index, self) => { return self.indexOf(value) === index; })
    console.log(stakerAddresses.length)
    return stakerAddresses
  }


  public static async getSnapshot(web3: Web3, blockHeight: string): Promise<Array<string>> {
    const poolContracts = CONSTANTS.POOL_ADDRESSES.map((address) => new web3.eth.Contract(CONSTANTS.POOL_ABI, address))
    return new MemeStakerSnapshotBuilder(blockHeight, poolContracts).getMemerSnapshot()
  }
}
