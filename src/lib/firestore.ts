'use client'

import { addDoc, collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { parishId } from './constants'
import type { Announcement, MemberRole, Message, ParishEvent, Room } from './types'

export const parishRef = doc(db, 'parishes', parishId)
export const roomsRef = collection(db, 'parishes', parishId, 'rooms')
export const membersRef = collection(db, 'parishes', parishId, 'members')
export const announcementsRef = collection(db, 'parishes', parishId, 'announcements')
export const eventsRef = collection(db, 'parishes', parishId, 'events')

export function messagesRef(roomId: string) {
  return collection(db, 'parishes', parishId, 'rooms', roomId, 'messages')
}

export function reportsRef() {
  return collection(db, 'parishes', parishId, 'reports')
}

export function observeAnnouncements(callback: (items: Announcement[]) => void, onlyPublished = true, onError?: (error: Error) => void) {
  const q = query(announcementsRef, where('isPublished', '==', onlyPublished), orderBy('isPinned', 'desc'), orderBy('createdAt', 'desc'), limit(50))
  return onSnapshot(
    q,
    snapshot => callback(snapshot.docs.map(item => ({ id: item.id, ...item.data() }) as Announcement)),
    error => onError?.(error)
  )
}

export function observeEvents(callback: (items: ParishEvent[]) => void, onlyPublished = true, onError?: (error: Error) => void) {
  const q = query(eventsRef, where('isPublished', '==', onlyPublished), orderBy('startAt', 'asc'), limit(50))
  return onSnapshot(
    q,
    snapshot => callback(snapshot.docs.map(item => ({ id: item.id, ...item.data() }) as ParishEvent)),
    error => onError?.(error)
  )
}

export function observeRooms(callback: (items: Room[]) => void, onlyActive = true) {
  const q = query(roomsRef, where('isActive', '==', onlyActive), orderBy('isOfficial', 'desc'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, snapshot => callback(snapshot.docs.map(item => ({ id: item.id, ...item.data() }) as Room)))
}

export function observeMessages(roomId: string, callback: (items: Message[]) => void) {
  const q = query(messagesRef(roomId), orderBy('createdAt', 'asc'), limit(200))
  return onSnapshot(q, snapshot => callback(snapshot.docs.map(item => ({ id: item.id, ...item.data() }) as Message)))
}

export async function createMessage(roomId: string, text: string, uid: string, name: string) {
  await addDoc(messagesRef(roomId), {
    text: text.trim().slice(0, 1000),
    authorId: uid,
    authorName: name,
    createdAt: serverTimestamp(),
    deletedAt: null,
    deletedBy: '',
    isDeleted: false
  })
}

export async function reportMessage(roomId: string, messageId: string, reason: string, uid: string) {
  await addDoc(reportsRef(), {
    roomId,
    messageId,
    reason: reason.trim().slice(0, 500),
    createdBy: uid,
    createdAt: serverTimestamp(),
    status: 'open'
  })
}

export async function softDeleteMessage(roomId: string, messageId: string, uid: string) {
  await updateDoc(doc(db, 'parishes', parishId, 'rooms', roomId, 'messages', messageId), {
    isDeleted: true,
    deletedBy: uid,
    deletedAt: serverTimestamp()
  })
}

export async function createRoom(name: string, description: string, uid: string) {
  await addDoc(roomsRef, {
    name: name.trim(),
    description: description.trim(),
    createdBy: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    isActive: true,
    isOfficial: false
  })
}

export async function closeRoom(roomId: string) {
  await updateDoc(doc(db, 'parishes', parishId, 'rooms', roomId), {
    isActive: false,
    updatedAt: serverTimestamp()
  })
}

export async function saveAnnouncement(data: Pick<Announcement, 'title' | 'content' | 'isPinned' | 'isPublished'>, uid: string) {
  await addDoc(announcementsRef, {
    ...data,
    title: data.title.trim(),
    content: data.content.trim(),
    createdBy: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
}

export async function saveEvent(data: Pick<ParishEvent, 'title' | 'description' | 'location' | 'startAt' | 'endAt' | 'isPublished'>, uid: string) {
  await addDoc(eventsRef, {
    ...data,
    title: data.title.trim(),
    description: data.description.trim(),
    location: data.location.trim(),
    createdBy: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
}

export async function updateMemberRole(uid: string, role: MemberRole) {
  await updateDoc(doc(db, 'parishes', parishId, 'members', uid), {
    role,
    updatedAt: serverTimestamp()
  })
}

export async function acceptRules(uid: string) {
  await setDoc(doc(db, 'parishes', parishId, 'members', uid), {
    acceptedRulesAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true })
}

export async function banMember(uid: string, reason: string, createdBy: string) {
  const batch = writeBatch(db)
  batch.update(doc(db, 'parishes', parishId, 'members', uid), {
    isBanned: true,
    updatedAt: serverTimestamp()
  })
  batch.set(doc(db, 'parishes', parishId, 'bans', uid), {
    uid,
    reason: reason.trim().slice(0, 500),
    createdBy,
    createdAt: serverTimestamp(),
    active: true
  })
  await batch.commit()
}
