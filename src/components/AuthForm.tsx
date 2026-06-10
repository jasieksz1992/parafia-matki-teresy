'use client'

import { FormEvent, useMemo, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { useRouter } from 'next/navigation'
import { loginWithEmail, loginWithGoogle, logout, registerWithEmail } from '@/lib/auth'
import { useAuth } from './AuthProvider'

type AuthMode = 'login' | 'register'

const authErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'Ten adres e-mail jest już zarejestrowany. Zaloguj się lub użyj innego adresu.',
  'auth/invalid-email': 'Podaj poprawny adres e-mail.',
  'auth/invalid-credential': 'Nieprawidłowy e-mail lub hasło.',
  'auth/popup-closed-by-user': 'Okno logowania Google zostało zamknięte przed zakończeniem.',
  'auth/too-many-requests': 'Zbyt wiele prób logowania. Spróbuj ponownie za chwilę.',
  'auth/user-disabled': 'To konto zostało wyłączone.',
  'auth/weak-password': 'Hasło musi mieć co najmniej 6 znaków.',
  'auth/wrong-password': 'Nieprawidłowy e-mail lub hasło.'
}

function getAuthErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    return authErrorMessages[error.code] ?? 'Nie udało się zakończyć logowania. Spróbuj ponownie.'
  }

  return 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.'
}

export default function AuthForm() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const submitLabel = useMemo(() => mode === 'login' ? 'Zaloguj e-mailem' : 'Utwórz konto', [mode])
  const isRegister = mode === 'register'

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)

    try {
      if (isRegister) {
        await registerWithEmail(email, password, displayName)
      } else {
        await loginWithEmail(email, password)
      }
      router.push('/community')
    } catch (nextError) {
      setError(getAuthErrorMessage(nextError))
    } finally {
      setPending(false)
    }
  }

  async function handleGoogleLogin() {
    setError('')
    setPending(true)

    try {
      await loginWithGoogle()
      router.push('/community')
    } catch (nextError) {
      setError(getAuthErrorMessage(nextError))
    } finally {
      setPending(false)
    }
  }

  if (user) {
    return (
      <div className='auth-card'>
        <div>
          <p className='eyebrow'>Jesteś zalogowany</p>
          <h2>{user.displayName || user.email || 'Konto parafianina'}</h2>
          <p className='muted'>Możesz przejść do wspólnoty albo wylogować się i użyć innego konta.</p>
        </div>
        <div className='actions'>
          <button className='button' type='button' onClick={() => router.push('/community')}>Przejdź do wspólnoty</button>
          <button className='button secondary' type='button' onClick={() => logout()}>Wyloguj</button>
        </div>
      </div>
    )
  }

  return (
    <div className='auth-grid'>
      <section className='auth-card' aria-labelledby='google-login-title'>
        <div>
          <p className='eyebrow'>Szybkie logowanie</p>
          <h2 id='google-login-title'>Google</h2>
          <p className='muted'>Użyj konta Google, aby automatycznie dołączyć do aplikacji parafialnej.</p>
        </div>
        <button className='button google-button' type='button' onClick={handleGoogleLogin} disabled={pending || loading}>
          <span aria-hidden='true'>G</span>
          Kontynuuj z Google
        </button>
      </section>

      <section className='auth-card' aria-labelledby='email-login-title'>
        <div>
          <p className='eyebrow'>{isRegister ? 'Nowe konto' : 'Mam konto'}</p>
          <h2 id='email-login-title'>{isRegister ? 'Rejestracja e-mailem' : 'Logowanie e-mailem'}</h2>
          <p className='muted'>Zaloguj się adresem e-mail i hasłem albo utwórz nowe konto.</p>
        </div>

        <div className='auth-tabs' role='tablist' aria-label='Wybierz sposób użycia formularza e-mail'>
          <button className={mode === 'login' ? 'active' : ''} type='button' role='tab' aria-selected={mode === 'login'} onClick={() => setMode('login')}>Logowanie</button>
          <button className={mode === 'register' ? 'active' : ''} type='button' role='tab' aria-selected={mode === 'register'} onClick={() => setMode('register')}>Rejestracja</button>
        </div>

        <form className='form' onSubmit={handleEmailSubmit}>
          {isRegister && (
            <label>
              Imię i nazwisko
              <input autoComplete='name' value={displayName} onChange={event => setDisplayName(event.target.value)} required minLength={2} />
            </label>
          )}
          <label>
            E-mail
            <input autoComplete='email' inputMode='email' type='email' value={email} onChange={event => setEmail(event.target.value)} required />
          </label>
          <label>
            Hasło
            <input autoComplete={isRegister ? 'new-password' : 'current-password'} type='password' value={password} onChange={event => setPassword(event.target.value)} required minLength={6} />
          </label>
          {error && <p className='form-error' role='alert'>{error}</p>}
          <button className='button' type='submit' disabled={pending || loading}>{pending ? 'Przetwarzanie…' : submitLabel}</button>
        </form>
      </section>
    </div>
  )
}
