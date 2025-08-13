'use client'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState('seller@haven.test')
  const [password, setPassword] = useState('seller123')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', { email, password, redirect: true, callbackUrl: '/' })
  }

  return (
    <section aria-labelledby="signin-heading" className="container" style={{maxWidth: 420}}>
      <h1 id="signin-heading">Sign in</h1>
      <form onSubmit={submit} aria-describedby={error ? 'form-error' : undefined}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <p id="form-error" role="alert">{error}</p>}
        <button className="btn" type="submit">Sign in</button>
      </form>
      <p>Demo accounts: <code>seller@haven.test / seller123</code> or <code>buyer@haven.test / buyer123</code></p>
    </section>
  )
}
