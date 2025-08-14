
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()
  return (
    <header>
      <nav className="nav container" aria-label="Main navigation">
        <Link href="/" className="logo" aria-label="Handcrafted Haven Home">Handcrafted Haven</Link>
        <Link href="/products">Products</Link>
        <Link href="/sellers">Sellers</Link>
        {session?.user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button className="btn secondary" onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <Link href="/auth/signin">Sign in</Link>
        )}
        <div className="spacer" />
      </nav>
    </header>
  )
}
