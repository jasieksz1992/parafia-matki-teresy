import type { Timestamp } from 'firebase/firestore'

export type Role = 'member' | 'moderator' | 'admin' | 'superadmin'
export type RoomCategory = 'official' | 'prayer' | 'help' | 'groups' | 'casual'
export type ReportStatus = 'pending' | 'reviewed' | 'dismissed'
export type ReactionEmoji = '🙏' | '❤️' | '👍'

export type Profile = {
  uid: string
  displayName: string
  role: Role
  banned?: boolean
  acceptedRulesAt?: Timestamp
}

export type Room = {
  id: string
  name: string
  description: string
  category: RoomCategory
  official?: boolean
  closed?: boolean
  memberCount?: number
  lastMessageText?: string
  lastMessageAt?: Timestamp
  lastMessageAuthorName?: string
  createdAt?: Timestamp
  createdBy?: string
}

export type Message = {
  id: string
  uid: string
  authorName: string
  text: string
  createdAt?: Timestamp
  deleted?: boolean
  replyToMessageId?: string
  replyToText?: string
  replyToAuthorName?: string
  mentions: string[]
}

export type Reaction = {
  uid: string
  emoji: ReactionEmoji
  createdAt?: Timestamp
}

export type Report = {
  id: string
  roomId: string
  messageId: string
  messageText: string
  authorUid: string
  authorName: string
  reporterUid: string
  reason: string
  status: ReportStatus
  createdAt?: Timestamp
  reviewedBy?: string
  reviewedAt?: Timestamp
}

export const roomCategories: Record<RoomCategory, string> = {
  official: 'Ogłoszenia oficjalne',
  prayer: 'Modlitwa',
  help: 'Pomoc sąsiedzka',
  groups: 'Grupy parafialne',
  casual: 'Rozmowy'
}

export const reactionEmojis: ReactionEmoji[] = ['🙏', '❤️', '👍']
