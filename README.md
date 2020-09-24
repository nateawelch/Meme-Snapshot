# MEME staker snapshot

Simple tool for generating list of all accounts that have staked MEME before/at a specific block number

# Requirements
1. Node/npm
2. An Ethereum node that has all historic Staked events for the relevant contracts

# How to generate snapshot

  - Update the `JSON_RPC_URL` field in `config.js` to have an Ethereum node URL that satisfies the above requirements
  - `yarn` to install packages
  - `yarn build` to build this project
  - `yarn start snapshot blockNumber` to print out a snapshot. Replace `blockNumber` with the block you want to snapshot at. Leaving `blockNumber` blank will default it to the current block height

# How does it work?

1. Iterates over the pool addresses and fetches `Staked` events for each
2. Grabs user addresses
3. Filters by unique