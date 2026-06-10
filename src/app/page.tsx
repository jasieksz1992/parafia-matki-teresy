import Image from 'next/image'
import Link from 'next/link'
import AnnouncementList from '@/components/AnnouncementList'
import EventList from '@/components/EventList'
import { givingAccounts, massSchedule, officialSiteUrl, parishContact, parishStory, youtubeUrl } from '@/lib/parish-data'

const parishHighlights = [
  {
    value: 'Koszalin · Jamno',
    label: 'wspólnota parafialna i kościół filialny',
  },
  {
    value: parishContact.founded,
    label: 'data wejścia w życie dekretu erygującego parafię',
  },
  {
    value: 'Msze i kontakt',
    label: 'najważniejsze informacje dostępne od razu na starcie',
  },
]

const quickLinks = [
  {
    href: '/announcements',
    title: 'Ogłoszenia parafialne',
    description: 'Skrót najnowszych komunikatów duszpasterskich i link do pełnej treści na stronie parafii.',
  },
  {
    href: '/events',
    title: 'Wydarzenia i nabożeństwa',
    description: 'Nabożeństwa czerwcowe, transmisje online i inicjatywy, które warto mieć pod ręką.',
  },
  {
    href: '/community',
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

export default function HomePage() {
  return (
    <div className='stack home-stack'>
      <section className='hero parish-hero'>
        <div className='hero-copy'>
          <p className='eyebrow'>Parafia rzymskokatolicka w Koszalinie</p>
          <h1>Parafia św. Matki Teresy z Kalkuty</h1>
          <p className='lead'>
            Przejrzysta strona startowa dla parafian i gości: aktualne ogłoszenia, godziny Mszy Świętych,
            kontakt do duszpasterzy, transmisje online oraz przestrzeń rozmowy wspólnoty.
          </p>
          <div className='actions'>
            <Link className='button' href='/announcements'>Sprawdź ogłoszenia</Link>
            <Link className='button secondary' href='#msze'>Godziny Mszy Św.</Link>
          </div>
        </div>
        <div className='hero-visual' aria-label='Zdjęcie i wizytówka parafii'>
          <Image
            className='hero-photo'
            src={parishPhotos[0].src}
            alt={parishPhotos[0].alt}
            fill
            priority
            sizes='(min-width: 920px) 48vw, 100vw'
          />
          <div className='hero-card'>
            <div className='hero-mark'>MT</div>
            <p className='hero-card-label'>Adres kancelarii</p>
            <strong>{parishContact.address}</strong>
            <span>{parishContact.pastor}: {parishContact.pastorPhone}</span>
            <span>{parishContact.vicar}: {parishContact.vicarPhone}</span>
          </div>
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

      <section className='split-section priority-section'>
        <article id='msze' className='card schedule-card'>
          <p className='eyebrow'>Msze święte i nabożeństwa</p>
          <h2>Plan liturgii</h2>
          <div className='schedule-grid'>
            {massSchedule.map(place => (
              <div className='schedule-place' key={place.place}>
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
        <article className='card online-card'>
          <p className='eyebrow'>Online</p>
          <h2>Transmisje z Jamna</h2>
          <p>
            Oficjalna strona parafii publikuje transmisje Mszy Świętej z kościoła filialnego pw. Matki Bożej
            Różańcowej w Jamnie. Ostatni wskazany termin to niedziela, godz. 10:00.
          </p>
          <div className='actions'>
            <a className='button' href={youtubeUrl} target='_blank' rel='noreferrer'>Otwórz YouTube</a>
            <a className='button secondary' href={officialSiteUrl} target='_blank' rel='noreferrer'>Strona parafii</a>
          </div>
        </article>
      </section>


      <section className='photo-section' aria-label='Zdjęcia parafialne'>
        <div className='section-heading photo-heading'>
          <p className='eyebrow'>Zdjęcia i klimat miejsca</p>
          <h2>Strona od razu wygląda jak żywa parafia, nie jak surowy panel</h2>
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
        <Link className='button secondary' href='/community'>Zadaj pytanie we wspólnocie</Link>
      </section>
    </div>
  )
}
