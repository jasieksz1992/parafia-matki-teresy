import Link from 'next/link'
import AnnouncementList from '@/components/AnnouncementList'
import EventList from '@/components/EventList'

const parishHighlights = [
  {
    value: 'Koszalin',
    label: 'lokalna wspólnota parafialna',
  },
  {
    value: 'św. Matka Teresa',
    label: 'patronka codziennej służby i bliskości',
  },
  {
    value: 'Online + parafia',
    label: 'ogłoszenia, wydarzenia i rozmowy w jednym miejscu',
  },
]

const quickLinks = [
  {
    href: '/announcements',
    title: 'Ogłoszenia parafialne',
    description: 'Najważniejsze informacje duszpasterskie, komunikaty i aktualności z życia parafii.',
  },
  {
    href: '/events',
    title: 'Wydarzenia i spotkania',
    description: 'Zobacz nadchodzące inicjatywy, spotkania formacyjne i wydarzenia wspólnotowe.',
  },
  {
    href: '/community',
    title: 'Wspólnota online',
    description: 'Dołącz do rozmów parafian, poproś o modlitwę albo zaoferuj sąsiedzką pomoc.',
  },
]

const serviceCards = [
  'Intencje modlitewne i duchowe wsparcie',
  'Pytania organizacyjne do parafii',
  'Pomoc sąsiedzka w duchu Matki Teresy',
]

export default function HomePage() {
  return (
    <div className='stack home-stack'>
      <section className='hero parish-hero'>
        <div className='hero-copy'>
          <p className='eyebrow'>Parafia rzymskokatolicka w Koszalinie</p>
          <h1>Kościół pw. św. Matki Teresy z Kalkuty</h1>
          <p className='lead'>
            Nowoczesne centrum informacji dla parafian i gości: ogłoszenia, wydarzenia,
            wspólnota oraz bezpieczna przestrzeń rozmowy dla parafii Matki Teresy z Kalkuty w Koszalinie.
          </p>
          <div className='actions'>
            <Link className='button' href='/community'>Wejdź do wspólnoty</Link>
            <Link className='button secondary' href='/announcements'>Zobacz ogłoszenia</Link>
          </div>
        </div>
        <div className='hero-card' aria-label='Wizytówka parafii'>
          <div className='hero-mark'>MT</div>
          <p className='hero-card-label'>Parafia Matki Teresy</p>
          <strong>Koszalin</strong>
          <span>W duchu bliskości, prostoty i służby drugiemu człowiekowi.</span>
        </div>
      </section>

      <section className='highlight-grid' aria-label='Najważniejsze informacje o parafii'>
        {parishHighlights.map(item => (
          <article className='stat-card' key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section>
        <div className='section-heading'>
          <p className='eyebrow'>Szybki dostęp</p>
          <h2>Co możesz zrobić w aplikacji?</h2>
        </div>
        <div className='cards feature-cards'>
          {quickLinks.map(item => (
            <article className='card feature-card' key={item.href}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={item.href}>Przejdź dalej</Link>
            </article>
          ))}
        </div>
      </section>

      <section className='split-section'>
        <div>
          <p className='eyebrow'>Aktualności</p>
          <h2>Najnowsze ogłoszenia</h2>
          <AnnouncementList />
        </div>
        <div>
          <p className='eyebrow'>Kalendarz</p>
          <h2>Nadchodzące wydarzenia</h2>
          <EventList />
        </div>
      </section>

      <section className='card mission-card'>
        <div>
          <p className='eyebrow'>Duch patronki</p>
          <h2>Parafia blisko codziennych spraw</h2>
          <p>
            Aplikacja pomaga budować widoczną, życzliwą i uporządkowaną komunikację parafialną —
            tak, aby osoby z Koszalina od razu wiedziały, że są we właściwym miejscu.
          </p>
        </div>
        <ul className='check-list'>
          {serviceCards.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section id='kontakt' className='card contact-card'>
        <div>
          <p className='eyebrow'>Kontakt</p>
          <h2>Parafia św. Matki Teresy z Kalkuty w Koszalinie</h2>
          <p>
            To miejsce można uzupełnić o aktualny adres kancelarii, godziny dyżurów i telefon parafii.
            Już teraz strona jasno identyfikuje wspólnotę i prowadzi do najważniejszych działów aplikacji.
          </p>
        </div>
        <Link className='button secondary' href='/community'>Zadaj pytanie we wspólnocie</Link>
      </section>
    </div>
  )
}
