import EventList from '@/components/EventList'
import { massSchedule } from '@/lib/parish-data'

export default function EventsPage() {
  return (
    <section className='stack'>
      <div className='page-intro'>
        <p className='eyebrow'>Kalendarz</p>
        <h1>Wydarzenia i nabożeństwa</h1>
        <p className='lead'>
          Terminy nabożeństw, transmisji i spotkań. Poniżej znajdziesz również stały porządek Mszy Świętych.
        </p>
      </div>
      <EventList />
      <div className='card schedule-card'>
        <p className='eyebrow'>Stały porządek</p>
        <h2>Msze Święte</h2>
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
      </div>
    </section>
  )
}
