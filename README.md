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
✅ change them if you’d like to sell something other than cookies! changed to handbags
✅ npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
✅ Update pages/_app.tsx
✅ sanity check - npm run dev
✅ Looks good - http://localhost:3000/
✅ _app.tsx code - creating a connection to the devnet Solana network. ("same in any app using these Solana libraries.")
✅ Update pages/index.tsx with new code
✅ FIX not in TUTORIAL - due to issue I had 
// top between imports and start of component function of pages/index.tsx
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)
// replace the old WalletMultiButton component inside with WalletMultiButtonDynamic
✅ sanity check - npm run dev
✅ sanity check - connect to wallet
update shop address in lib/addresses.ts
✅ Get devnet USDC https://spl-token-faucet.com/?token-name=USDC-Dev
✅ Airdrop extra SOL devnet SOL https://spl-token-faucet.com/?token-name=USDC-Dev
✅ Add page lib/addresses.ts
✅ Add shop public key
✅ (optional) Refactor public key in .gitignore file
✅ create our API route. Add a new file pages/api/makeTransaction.ts
✅ Add page lib/calculatePrice.ts
✅ You’ll see the checkout URL looks like: http://localhost:3000/checkout?box-of-cookies=2&basket-of-cookies=1. 
✅ !!!NOTE: "In reality you’d want to record this transaction in a database as part of the API call. This would allow us to later validate that the paid transaction is correct. Again because we’re focusing on the Solana structures here I’ve skipped over that in this tutorial."
✅ First let’s just make sure that we can call this API and deserialize the returned transaction back.
✅ Update pages/checkout.tsx
✅ Checkout with item
✅ "Okay nice, we’ve got a transaction from our API!"
✅ "Now let’s update the page to send that to the user’s wallet and ask them to approve it."


### Proposed Step-by-Step

Part 1 Solana dApp Scaffold Next
* Installation - npm install
* Build and Run - npm run dev
* Wallet Integration with Auto Connect / Refresh
* Generating the transaction
* Let’s start by installing some dependencies.
* npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
Update pages/_app.tsx 
Requesting the transaction
Sending the transaction
Detecting Payment
Adding a /confirmed page



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



