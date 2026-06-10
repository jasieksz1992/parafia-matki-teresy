'use client'

import MessageComposer from './MessageComposer'
import MessageList from './MessageList'

export default function RoomClient({ roomId }: { roomId: string }) {
  return (
    <section className='stack'>
      <div>
        <h1>Pokój wspólnoty</h1>
        <p className='muted'>Wiadomości są widoczne dla zalogowanych parafian.</p>
      </div>
      <MessageList roomId={roomId} />
      <MessageComposer roomId={roomId} />
    </section>
  )
}
