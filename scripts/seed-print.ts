import { defaultRooms, parishId } from '../src/lib/constants'

const now = new Date().toISOString()

const parish = {
  id: parishId,
  name: 'Kościół pw. św. Matki Teresy z Kalkuty',
  city: '',
  createdAt: now,
  updatedAt: now
}

const rooms = defaultRooms.map(room => ({
  path: `parishes/${parishId}/rooms/${room.id}`,
  data: {
    name: room.name,
    description: room.description,
    createdBy: 'manual-seed',
    createdAt: now,
    updatedAt: now,
    isActive: true,
    isOfficial: room.isOfficial
  }
}))

console.log(JSON.stringify({ parish: { path: `parishes/${parishId}`, data: parish }, rooms }, null, 2))
