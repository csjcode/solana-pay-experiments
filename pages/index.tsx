import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react'
import Products from '../components/Products'
import SiteHeading from '../components/SiteHeading'

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export default function HomePage() {
  // We get the public key of the connected wallet, if there is one
  const { publicKey } = useWallet()

  return (
    <div className="m-auto flex max-w-4xl flex-col items-stretch gap-8 pt-24">
      <SiteHeading>Handbags of the World</SiteHeading>

      {/* We add the Solana wallet connect button */}
      <div className="basis-1/4">
        <WalletMultiButtonDynamic className="!bg-gray-900 hover:scale-105" />
      </div>

      {/* We disable checking out without a connected wallet */}
      <Products submitTarget="/checkout" enabled={publicKey !== null} />
    </div>
  )
}
