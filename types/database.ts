// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          age: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          age: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          age?: number
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          is_public: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          is_public?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          is_public?: boolean
          created_at?: string
        }
      }
    }
  }
}

// Helper types for common queries
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Post = Database['public']['Tables']['posts']['Row']

export type PostWithProfile = Post & {
  profiles: Pick<Profile, 'full_name'> | null
}
