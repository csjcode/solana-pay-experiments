import { PropsWithChildren } from 'react'

export default function SiteHeading({ children }: PropsWithChildren<{}>) {
  return (
    <h1 className="my-8 self-center bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-6xl font-extrabold text-transparent">
      {children}
    </h1>
  )
}
