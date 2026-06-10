export default function Loading() {
  return (
    <div className='route-loader' role='status' aria-live='polite' aria-label='Ładowanie strony parafii'>
      <svg className='route-loader__church' viewBox='0 0 180 180' aria-hidden='true'>
        <defs>
          <linearGradient id='routeLoaderGold' x1='28' x2='154' y1='150' y2='18' gradientUnits='userSpaceOnUse'>
            <stop stopColor='#ff5a35' />
            <stop offset='0.55' stopColor='#f6b54d' />
            <stop offset='1' stopColor='#fff2cf' />
          </linearGradient>
        </defs>
        <circle className='route-loader__halo' cx='90' cy='90' r='78' />
        <path className='route-loader__line route-loader__roof' d='M30 150V82L90 32l60 50v68' />
        <path className='route-loader__line route-loader__body' d='M48 150V92h84v58M72 150v-28a18 18 0 0 1 36 0v28' />
        <path className='route-loader__line route-loader__cross' d='M90 20v38M74 38h32' />
        <path className='route-loader__line route-loader__window' d='M65 112V96M115 112V96' />
      </svg>
      <strong>Ładowanie parafii</strong>
      <span>Przygotowujemy najważniejsze informacje…</span>
    </div>
  )
}
