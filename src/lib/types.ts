import type { Timestamp } from 'firebase/firestore'

export type MemberRole = 'user' | 'moderator' | 'admin' | 'superadmin'
export type ReportStatus = 'open' | 'reviewed' | 'dismissed'
export type AppTimestamp = Timestamp | Date | null

export type Parish = {
  id: string
  name: string
  city: string
  createdAt: AppTimestamp
  updatedAt: AppTimestamp
}

export type Member = {
  uid: string
  parishId: string
  role: MemberRole
  displayName: string
  email: string
  photoURL: string
  isBanned: boolean
  acceptedRulesAt?: AppTimestamp
  createdAt: AppTimestamp
  updatedAt: AppTimestamp
}

export type Room = {
  id?: string
  name: string
  description: string
  createdBy: string
  createdAt: AppTimestamp
  updatedAt: AppTimestamp
  isActive: boolean
  isOfficial: boolean
}

export type Message = {
  id?: string
  text: string
  authorId: string
  authorName: string
  createdAt: AppTimestamp
  deletedAt: AppTimestamp
  deletedBy: string
  isDeleted: boolean
}

export type Report = {
  id?: string
  messageId: string
  roomId: string
  reason: string
  createdBy: string
  createdAt: AppTimestamp
  status: ReportStatus
}

export type Ban = {
  uid: string
  reason: string
  createdBy: string
  createdAt: AppTimestamp
  active: boolean
}

export type Announcement = {
  id?: string
  title: string
  content: string
  createdAt: AppTimestamp
  updatedAt: AppTimestamp
  createdBy: string
  isPinned: boolean
  isPublished: boolean
}

export type ParishEvent = {
  id?: string
  title: string
  description: string
  location: string
  startAt: AppTimestamp
  endAt: AppTimestamp
  createdAt: AppTimestamp
  updatedAt: AppTimestamp
  createdBy: string
  isPublished: boolean
}
