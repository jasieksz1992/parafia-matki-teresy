'use client'

import { useEffect, useState } from 'react'
import { onSnapshot, orderBy, query } from 'firebase/firestore'
import { banMember, membersRef, updateMemberRole } from '@/lib/firestore'
import type { Member, MemberRole } from '@/lib/types'
import { useAuth } from './AuthProvider'

const roles: MemberRole[] = ['user', 'moderator', 'admin']

export default function AdminMembersPanel() {
  const { member } = useAuth()
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    const q = query(membersRef, orderBy('createdAt', 'desc'))
    return onSnapshot(q, snapshot => setMembers(snapshot.docs.map(item => item.data() as Member)))
  }, [])

  if (member?.role !== 'moderator' && member?.role !== 'admin' && member?.role !== 'superadmin') {
    return null
  }

  function canEdit(target: Member) {
    if (member?.role === 'superadmin') {
      return target.role !== 'superadmin'
    }
    return target.role === 'user' || target.role === 'moderator'
  }

  function canBan(target: Member) {
    if (!member || target.isBanned) {
      return false
    }
    if (member.role === 'superadmin') {
      return target.role !== 'superadmin'
    }
    if (member.role === 'admin') {
      return target.role === 'user' || target.role === 'moderator'
    }
    if (member.role === 'moderator') {
      return target.role === 'user'
    }
    return false
  }

  return (
    <section className='panel'>
      <h2>Użytkownicy</h2>
      <div className='table-list'>
        {members.map(item => (
          <div className='table-row' key={item.uid}>
            <span><strong>{item.displayName}</strong><small>{item.email}</small></span>
            <span>{item.role}</span>
            {canEdit(item) && (
              <select value={item.role} onChange={event => updateMemberRole(item.uid, event.target.value as MemberRole)}>
                {roles.filter(role => member?.role === 'superadmin' || role !== 'admin').map(role => <option key={role} value={role}>{role}</option>)}
              </select>
            )}
            {canBan(item) && member && <button className='button secondary' onClick={() => banMember(item.uid, window.prompt('Powód blokady') || 'Naruszenie regulaminu', member.uid)}>Zablokuj</button>}
            {item.isBanned && <span className='badge'>Zablokowany</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
