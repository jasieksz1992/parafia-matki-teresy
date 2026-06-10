import Image from 'next/image'
import Link from 'next/link'
import AnnouncementList from '@/components/AnnouncementList'
import EventList from '@/components/EventList'
import { givingAccounts, massSchedule, officialSiteUrl, parishContact, parishStory, youtubeUrl } from '@/lib/parish-data'

const parishHighlights = [
  {
    icon: 'place',
    value: 'Koszalin · Jamno',
    label: 'wspólnota parafialna i kościół filialny',
  },
  {
    icon: 'event_available',
    value: parishContact.founded,
    label: 'data wejścia w życie dekretu erygującego parafię',
  },
  {
    icon: 'schedule',
    value: 'Msze i kontakt',
    label: 'najważniejsze informacje dostępne od razu na starcie',
  },
]

const quickLinks = [
  {
    href: '/announcements',
    icon: 'campaign',
    title: 'Ogłoszenia parafialne',
    description: 'Skrót najnowszych komunikatów duszpasterskich i link do pełnej treści na stronie parafii.',
  },
  {
    href: '/events',
    icon: 'celebration',
    title: 'Wydarzenia i nabożeństwa',
    description: 'Nabożeństwa czerwcowe, transmisje online i inicjatywy, które warto mieć pod ręką.',
  },
  {
    href: '/community',
    icon: 'groups',
    title: 'Wspólnota online',
    description: 'Miejsce na intencje, pytania organizacyjne oraz pomoc sąsiedzką w duchu św. Matki Teresy.',
  },
]

const serviceCards = [
  'Intencje modlitewne i duchowe wsparcie',
  'Pytania organizacyjne do parafii',
  'Pomoc sąsiedzka w duchu Matki Teresy',
]

const parishPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    alt: 'Rozświetlone wnętrze kościoła podczas modlitwy',
    title: 'Liturgia',
    description: 'Najważniejsze godziny Mszy i nabożeństw bez szukania po całej stronie.',
  },
  {
    src: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=900&q=80',
    alt: 'Detal sakralnej architektury z łukami i światłem',
    title: 'Przestrzeń modlitwy',
    description: 'Czytelny układ dla parafian, gości i osób wracających do wspólnoty.',
  },
  {
    src: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=900&q=80',
    alt: 'Płonące świece jako znak pamięci i intencji',
    title: 'Intencje',
    description: 'Wspólnota online na prośby, pytania i sąsiedzką pomoc.',
  },
]

const heroBadges = ['Niedziela 10:00', 'Ogłoszenia', 'Transmisje online']

function ChurchLoaderMark({ className = '' }: { className?: string }) {
  return (
    <svg className={`church-loader-mark ${className}`} viewBox='0 0 180 180' role='img' aria-label='Animowany znak kościoła'>
      <defs>
        <linearGradient id='churchGold' x1='28' x2='154' y1='150' y2='18' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#ff5a35' />
          <stop offset='0.55' stopColor='#f6b54d' />
          <stop offset='1' stopColor='#fff2cf' />
        </linearGradient>
        <filter id='churchGlow' x='-25%' y='-25%' width='150%' height='150%'>
          <feGaussianBlur stdDeviation='5' result='blur' />
          <feMerge>
            <feMergeNode in='blur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>
      <circle className='church-loader-mark__halo' cx='90' cy='90' r='78' />
      <path className='church-loader-mark__stroke church-loader-mark__roof' d='M30 150V82L90 32l60 50v68' />
      <path className='church-loader-mark__stroke church-loader-mark__body' d='M48 150V92h84v58M72 150v-28a18 18 0 0 1 36 0v28' />
      <path className='church-loader-mark__stroke church-loader-mark__cross' d='M90 20v38M74 38h32' />
      <path className='church-loader-mark__stroke church-loader-mark__window' d='M65 112V96M115 112V96' />
    </svg>
  )
}

export default function HomePage() {
  return (
    <div className='stack home-stack'>
      <section className='hero parish-hero'>
        <div className='hero-copy'>
          <div className='hero-chip'><span className='material-symbol' aria-hidden='true'>auto_awesome</span> Nowa parafialna aplikacja</div>
          <p className='eyebrow'>Parafia rzymskokatolicka w Koszalinie</p>
          <h1>Parafia św. Matki Teresy z Kalkuty</h1>
          <p className='lead'>
            Przejrzysta strona startowa dla parafian i gości: aktualne ogłoszenia, godziny Mszy Świętych,
            kontakt do duszpasterzy, transmisje online oraz przestrzeń rozmowy wspólnoty.
          </p>
          <div className='actions hero-actions'>
            <Link className='button' href='/announcements'><span className='material-symbol' aria-hidden='true'>campaign</span> Sprawdź ogłoszenia</Link>
            <Link className='button secondary' href='#msze'><span className='material-symbol' aria-hidden='true'>schedule</span> Godziny Mszy Św.</Link>
          </div>
          <div className='hero-badges' aria-label='Najważniejsze funkcje'>
            {heroBadges.map(item => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className='hero-visual' aria-label='Zdjęcie i wizytówka parafii'>
          <div className='hero-photo-wrap'>
            <Image
              className='hero-photo'
              src={parishPhotos[0].src}
              alt={parishPhotos[0].alt}
              fill
              priority
              sizes='(min-width: 920px) 48vw, 100vw'
            />
          </div>
          <ChurchLoaderMark className='hero-church-mark' />
          <div className='hero-card floating-card'>
            <div className='hero-mark'>MT</div>
            <p className='hero-card-label'>Adres kancelarii</p>
            <strong>{parishContact.address}</strong>
            <span><span className='material-symbol' aria-hidden='true'>person</span>{parishContact.pastor}: {parishContact.pastorPhone}</span>
            <span><span className='material-symbol' aria-hidden='true'>call</span>{parishContact.vicar}: {parishContact.vicarPhone}</span>
          </div>
          <div className='hero-orbit hero-orbit-one'><span className='material-symbol' aria-hidden='true'>church</span></div>
          <div className='hero-orbit hero-orbit-two'><span className='material-symbol' aria-hidden='true'>favorite</span></div>
        </div>
      </section>

      <section className='highlight-grid' aria-label='Najważniejsze informacje o parafii'>
        {parishHighlights.map(item => (
          <article className='stat-card' key={item.value}>
            <span className='icon-bubble material-symbol' aria-hidden='true'>{item.icon}</span>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section className='split-section priority-section'>
        <article id='msze' className='card schedule-card elevated-card'>
          <p className='eyebrow'>Msze święte i nabożeństwa</p>
          <h2>Plan liturgii</h2>
          <div className='schedule-grid'>
            {massSchedule.map(place => (
              <div className='schedule-place' key={place.place}>
                <span className='schedule-icon material-symbol' aria-hidden='true'>church</span>
                <h3>{place.place}</h3>
                {place.rows.map(row => (
                  <p key={row.label}>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </article>
        <article className='card online-card elevated-card visual-panel'>
          <span className='panel-icon material-symbol' aria-hidden='true'>play_circle</span>
          <p className='eyebrow'>Online</p>
          <h2>Transmisje z Jamna</h2>
          <p>
            Oficjalna strona parafii publikuje transmisje Mszy Świętej z kościoła filialnego pw. Matki Bożej
            Różańcowej w Jamnie. Ostatni wskazany termin to niedziela, godz. 10:00.
          </p>
          <div className='actions'>
            <a className='button' href={youtubeUrl} target='_blank' rel='noreferrer'><span className='material-symbol' aria-hidden='true'>smart_display</span> Otwórz YouTube</a>
            <a className='button secondary' href={officialSiteUrl} target='_blank' rel='noreferrer'>Strona parafii</a>
          </div>
        </article>
      </section>

      <section className='photo-section' aria-label='Zdjęcia parafialne'>
        <div className='section-heading photo-heading'>
          <p className='eyebrow'>Zdjęcia i klimat miejsca</p>
          <h2>Landing page, który od razu prowadzi parafian do najważniejszych spraw</h2>
        </div>
        <div className='photo-grid'>
          {parishPhotos.map((photo, index) => (
            <article className={`photo-card photo-card-${index + 1}`} key={photo.title}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? '(min-width: 920px) 58vw, 100vw' : '(min-width: 920px) 42vw, 100vw'}
              />
              <div>
                <p className='eyebrow'>{photo.title}</p>
                <p>{photo.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className='section-heading'>
          <p className='eyebrow'>Szybki dostęp</p>
          <h2>Co możesz zrobić w aplikacji?</h2>
        </div>
        <div className='cards feature-cards'>
          {quickLinks.map(item => (
            <article className='card feature-card' key={item.href}>
              <span className='feature-icon material-symbol' aria-hidden='true'>{item.icon}</span>
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
          <p className='eyebrow'>Historia i duch patronki</p>
          <h2>Parafia blisko codziennych spraw</h2>
          {parishStory.map(item => <p key={item}>{item}</p>)}
        </div>
        <ul className='check-list'>
          {serviceCards.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className='cards giving-grid' aria-label='Konta bankowe parafii'>
        {givingAccounts.map(item => (
          <article className='card bank-card' key={item.title}>
            <p className='eyebrow'>Wsparcie</p>
            <h3>{item.title}</h3>
            <p>{item.note}</p>
            <strong>{item.account}</strong>
          </article>
        ))}
      </section>

      <section id='kontakt' className='card contact-card'>
        <div>
          <p className='eyebrow'>Kontakt</p>
          <h2>{parishContact.name}</h2>
          <p><strong>{parishContact.address}</strong></p>
          <p>{parishContact.pastor}: <a href={`tel:${parishContact.pastorPhone.replaceAll(' ', '')}`}>{parishContact.pastorPhone}</a></p>
          <p>{parishContact.vicar} ({parishContact.vicarNote}): <a href={`tel:${parishContact.vicarPhone.replaceAll(' ', '')}`}>{parishContact.vicarPhone}</a></p>
        </div>
        <Link className='button secondary' href='/community'><span className='material-symbol' aria-hidden='true'>forum</span> Zadaj pytanie we wspólnocie</Link>
      </section>
    </div>
  )
}
