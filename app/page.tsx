import Link from 'next/link'
import { announcements, events } from '@/lib/data'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="badge">PWA parafialna</p>
        <h1>Kościół pw. św. Matki Teresy z Kalkuty</h1>
        <p>Jesteśmy wspólnotą modlitwy, pomocy i codziennego wsparcia. Aplikacja pomaga być bliżej parafii, ogłoszeń i osób, które tworzą naszą wspólnotę.</p>
        <div className="actions">
          <Link className="primary" href="/community">Przejdź do wspólnoty</Link>
          <Link className="secondary" href="#kontakt">Kontakt</Link>
        </div>
      </section>
      <section className="grid">
        <div className="panel">
          <h2>Najnowsze ogłoszenia</h2>
          <div className="list">
            {announcements.slice(0, 3).map(item => (
              <article className="card" key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="panel">
          <h2>Najbliższe wydarzenia</h2>
          <div className="list">
            {events.slice(0, 3).map(item => (
              <article className="card" key={item.id}>
                <h3>{item.title}</h3>
                <p className="muted">{item.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="kontakt" className="panel" style={{ marginTop: 16 }}>
        <h2>Kontakt</h2>
        <p>Masz pytanie lub chcesz włączyć się w życie parafii? Napisz do kancelarii albo porozmawiaj z moderatorem w aplikacji.</p>
        <p className="muted">Adres i godziny dyżuru uzupełnisz w panelu ogłoszeń statycznych.</p>
      </section>
    </>
  )
}
