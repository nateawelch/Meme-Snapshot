import Web3 from 'web3'
import * as yargs from 'yargs'
import MemeStakerSnapshotBuilder from './MemeStakerSnapshotBuilder'
import * as CONFIG from '../config'

yargs
  .scriptName("meme-snapshot-builder")
  .usage('$0 <cmd> [args]')
  .command('snapshot [blockNumber]', 'Get snapshot of accounts that previously staked and their current stake', (yargs) => {
    yargs.positional('blockNumber', {
      type: 'string',
      default: 'latest',
      describe: 'block number to snapshot at'
    })
  }, async function (argv) {
    const memers = await MemeStakerSnapshotBuilder.getSnapshot(new Web3(CONFIG.JSON_RPC_URL), argv.blockNumber)
    console.log(memers)
    memers.forEach((memer) => {
      console.log(memer)
    })
  })
  .help()
  .argv
