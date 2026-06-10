import Link from 'next/link'
import AnnouncementList from '@/components/AnnouncementList'
import EventList from '@/components/EventList'

export default function HomePage() {
  return (
    <div className='stack'>
      <section className='hero'>
        <p className='eyebrow'>Kościół pw. św. Matki Teresy z Kalkuty</p>
        <h1>Wspólnota parafialna blisko Ciebie</h1>
        <p>Sprawdź ogłoszenia, wydarzenia i dołącz do życzliwej rozmowy parafian.</p>
        <div className='actions'>
          <Link className='button' href='/community'>Wejdź do wspólnoty</Link>
          <Link className='button secondary' href='/rules'>Regulamin</Link>
        </div>
      </section>
      <section>
        <h2>Najnowsze ogłoszenia</h2>
        <AnnouncementList />
      </section>
      <section>
        <h2>Nadchodzące wydarzenia</h2>
        <EventList />
      </section>
      <section id='kontakt' className='card'>
        <h2>Kontakt</h2>
        <p>Kancelaria parafialna: informacje kontaktowe można uzupełnić w treści strony po wdrożeniu.</p>
        <p>W sprawach pilnych skontaktuj się bezpośrednio z parafią.</p>
      </section>
    </div>
  )
}
