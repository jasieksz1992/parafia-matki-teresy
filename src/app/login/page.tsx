import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
  return (
    <section className='hero small auth-hero'>
      <div className='auth-intro'>
        <p className='eyebrow'>Konto parafianina</p>
        <h1>Logowanie i rejestracja</h1>
        <p>Zaloguj się przez Google albo użyj adresu e-mail i hasła. Jeśli nie masz jeszcze konta, wybierz rejestrację w formularzu.</p>
      </div>
      <AuthForm />
    </section>
  )
}
