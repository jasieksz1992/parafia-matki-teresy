import type { Announcement, ParishEvent } from './types'

export const officialSiteUrl = 'https://parafiamatkiteresyzkalkuty.pl/'
export const youtubeUrl = 'https://www.youtube.com/@parafiamatkiteresyzkal8721'

export const parishContact = {
  name: 'Parafia pw. św. Matki Teresy z Kalkuty w Koszalinie',
  address: '75-430 Koszalin, ul. Włoska 81',
  pastor: 'Proboszcz ks. Jarosław Krylik',
  pastorPhone: '+48 789 414 653',
  vicar: 'Wikariusz ks. Grzegorz Toporkiewicz',
  vicarNote: 'duszpasterstwo chorych',
  vicarPhone: '+48 730 723 760',
  founded: '1 marca 2009',
}

export const massSchedule = [
  {
    place: 'Kościół parafialny w Koszalinie',
    rows: [
      { label: 'Niedziela i święta', value: '8:00 · 11:30 · 13:00 · 18:00' },
      { label: 'Dni powszednie z wyjątkiem środy', value: '18:00' },
    ],
  },
  {
    place: 'Kościół filialny w Jamnie',
    rows: [
      { label: 'Niedziela i święta', value: '10:00' },
      { label: 'Środa', value: '18:00' },
    ],
  },
]

export const givingAccounts = [
  {
    title: 'Budujemy kościół',
    account: 'BOŚ o/Koszalin 67 1540 1043 2104 8105 6424 0001',
    note: 'Wsparcie budowy kościoła parafialnego.',
  },
  {
    title: 'Kościół w Jamnie',
    account: 'BOŚ o/Koszalin 13 1540 1043 2104 8105 6424 0003',
    note: 'Wsparcie renowacji kościoła filialnego.',
  },
]

export const parishStory = [
  'Parafia powstała po podziale parafii Ducha Świętego w Koszalinie. Dekret wszedł w życie 1 marca 2009 roku.',
  'Wspólnota obejmuje północną część Koszalina, między linią kolejową Koszalin–Słupsk, końcem miasta od strony Jamna, ul. Władysława IV i ul. Batalionów Chłopskich.',
  'Patronką parafii jest św. Matka Teresa z Kalkuty — znak prostoty, bliskości i służby najbardziej potrzebującym.',
]

export const fallbackAnnouncements: Announcement[] = [
  {
    id: 'official-2026-06-07',
    title: 'Ogłoszenia parafialne 07.06.2026',
    content: 'Dzień Dziękczynienia i zbiórka na Świątynię Opatrzności Bożej. Parafia zaprasza również na nabożeństwa czerwcowe po Mszy Świętej o 18:00 w dni powszednie.',
    createdAt: new Date('2026-06-07T10:00:00+02:00'),
    updatedAt: new Date('2026-06-07T10:00:00+02:00'),
    createdBy: 'official-site',
    isPinned: true,
    isPublished: true,
  },
  {
    id: 'official-2026-05-31',
    title: 'Ogłoszenia parafialne 31.05.2026',
    content: 'Zapowiedź mszy prymicyjnej ks. Filipa Gonciarka oraz informacje organizacyjne przed Uroczystością Bożego Ciała i procesjami.',
    createdAt: new Date('2026-05-31T10:00:00+02:00'),
    updatedAt: new Date('2026-05-31T10:00:00+02:00'),
    createdBy: 'official-site',
    isPinned: false,
    isPublished: true,
  },
]

export const fallbackEvents: ParishEvent[] = [
  {
    id: 'devotion-june-2026',
    title: 'Nabożeństwa czerwcowe',
    description: 'Nabożeństwa do Najświętszego Serca Pana Jezusa w dni powszednie po Mszy Świętej o godzinie 18:00.',
    location: 'Kościół parafialny w Koszalinie',
    startAt: new Date('2026-06-10T18:30:00+02:00'),
    endAt: new Date('2026-06-30T19:00:00+02:00'),
    createdAt: new Date('2026-06-07T10:00:00+02:00'),
    updatedAt: new Date('2026-06-07T10:00:00+02:00'),
    createdBy: 'official-site',
    isPublished: true,
  },
  {
    id: 'online-mass-jamno-2026-06-07',
    title: 'Msza Święta online z Jamna',
    description: 'Transmisja Mszy Świętej z kościoła filialnego pw. Matki Bożej Różańcowej w Jamnie.',
    location: 'YouTube parafii · Jamno, godz. 10:00',
    startAt: new Date('2026-06-07T10:00:00+02:00'),
    endAt: new Date('2026-06-07T11:00:00+02:00'),
    createdAt: new Date('2026-06-07T10:00:00+02:00'),
    updatedAt: new Date('2026-06-07T10:00:00+02:00'),
    createdBy: 'official-site',
    isPublished: true,
  },
]
