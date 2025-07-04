import { Generated } from 'kysely';

export interface DB {
  creators: {
    id: Generated<number>
    first_name: string
    last_name: string
    email: string
    password: string
    creator_description: string | null
    avatar: string
  }

  cases: {
    id: Generated<number>
    title: string
    case_description: string | null
    source_file_url: string | null
    creator_id: number
    likes: number
    views: number
    tag: string
    created_at: Generated<string>
  }
}