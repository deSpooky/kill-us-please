import { Generated } from 'kysely';

export interface DB {
  creators: {
    id: Generated<number>
    creator_nickname: string
    email: string
    password: string
    creator_description: string | null
  }

  cases: {
    id: Generated<number>
    title: string
    case_description: string | null
    source_file_url: string | null
    creator_nickname: string | null
    created_at: Generated<string>
  }
}