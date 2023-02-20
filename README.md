# Solana Play experiments

### Plan

1. Bootstrap with the Solana Pay tutorial starter.
2. Add additional NFT portal pages
3. Add Different User roles
4. more later....

### Log of actions taken

#### Starting with: Take payments IRL with Solana Pay Tutorial

✅ Open source starter tutorial code: [Pointer Solana Pay Tutorial](pointer.gg/tutorials/solana-pay-irl-payments)
✅ Set up 2 Phantom Wallets - SolPayBuyer, SolPaySeller
✅ Get Devnet sol
✅ git clone -b start https://github.com/pointer-gg/solana-pay-tutorial
✅ rsync -av --exclude=".*" . ../solana-pay-experiments/
✅ cd ../solana-pay-experiments
✅ npm install
✅ npm run dev


### Proposed Step-by-Step

Part 1 Solana dApp Scaffold Next
* Installation - npm install
* Build and Run - npm run dev
* Wallet Integration with Auto Connec / Refresh

Part 2 - Get ready to exchange USDC
* Getting some USDC-Dev
* Updating our UI - prices
* First is the home page changing pricesto use those USD prices instead of the SOL ones.
* Next we need to update our API to create a transaction priced in USDC instead of SOL.
* We need to update that to use the priceUsd field - calculatePrice in lib/calculatePrice.ts
* Next we need to get the USDC address, which we’ll use to make a transaction that transfers USDC from the buyer to the shop.
* update our API to send the transaction in USDC instead of SOL use a new dependency, which provides functionality for SPL token
* Here’s the updated code for pages/api/makeTransaction.ts
* We have these new variables:
* We’ve also updated the transaction instruction:
* And that’s all we need to change to transfer USDC in a transaction!
* And now if you checkout you should see a transaction in USDC:
* Once approved you’ll see our familiar confirmed page!



