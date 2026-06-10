import AnnouncementList from '@/components/AnnouncementList'
import { officialSiteUrl } from '@/lib/parish-data'

export default function AnnouncementsPage() {
  return (
    <section className='stack'>
      <div className='page-intro'>
        <p className='eyebrow'>Aktualności</p>
        <h1>Ogłoszenia parafialne</h1>
        <p className='lead'>
          Najważniejsze komunikaty parafii św. Matki Teresy z Kalkuty w Koszalinie. Gdy baza aplikacji
          nie jest jeszcze uzupełniona, pokazujemy startowy skrót z oficjalnej strony parafii.
        </p>
        <a className='button secondary' href={officialSiteUrl} target='_blank' rel='noreferrer'>Pełne archiwum ogłoszeń</a>
      </div>
      <AnnouncementList />
    </section>
  )
}
