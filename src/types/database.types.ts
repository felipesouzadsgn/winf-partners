
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'Licenciado' | 'Admin' | 'Member'
          avatar_url: string | null
          company_name: string | null
          cnpj: string | null
          phone: string | null
          address_data: Json | null
          winf_coins: number
          w_rank_xp: number
          w_rank_level: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          role?: 'Licenciado' | 'Admin' | 'Member'
          avatar_url?: string | null
          company_name?: string | null
          cnpj?: string | null
          phone?: string | null
          address_data?: Json | null
          winf_coins?: number
          w_rank_xp?: number
          w_rank_level?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'Licenciado' | 'Admin' | 'Member'
          avatar_url?: string | null
          company_name?: string | null
          cnpj?: string | null
          phone?: string | null
          address_data?: Json | null
          winf_coins?: number
          w_rank_xp?: number
          w_rank_level?: string
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          user_id: string
          name: string
          contact: string
          source: string
          interest: string
          status: string
          ai_score: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          contact: string
          source: string
          interest: string
          status?: string
          ai_score?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          contact?: string
          source?: string
          interest?: string
          status?: string
          ai_score?: number
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          category: string | null
          stock_quantity: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          category?: string | null
          stock_quantity?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          category?: string | null
          stock_quantity?: number
          is_active?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          status?: string
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
        }
      }
      warranties: {
        Row: {
          id: string
          licenciado_id: string
          customer_name: string
          customer_email: string | null
          product_line: string
          serial_number: string
          installation_date: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          licenciado_id: string
          customer_name: string
          customer_email?: string | null
          product_line: string
          serial_number: string
          installation_date?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          licenciado_id?: string
          customer_name?: string
          customer_email?: string | null
          product_line?: string
          serial_number?: string
          installation_date?: string | null
          status?: string
          created_at?: string
        }
      }
      vehicles: {
        Row: {
          id: string
          owner_id: string
          model: string
          plate: string | null
          status: string | null
          battery_level: number | null
          created_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          model: string
          plate?: string | null
          status?: string | null
          battery_level?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          model?: string
          plate?: string | null
          status?: string | null
          battery_level?: number | null
          created_at?: string
        }
      }
      ai_generations: {
        Row: {
          id: string
          user_id: string
          tool_used: string
          prompt: string | null
          output_url: string | null
          media_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_used: string
          prompt?: string | null
          output_url?: string | null
          media_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_used?: string
          prompt?: string | null
          output_url?: string | null
          media_type?: string | null
          created_at?: string
        }
      }
      social_posts: {
        Row: {
          id: string
          user_id: string
          title: string | null
          caption: string | null
          platform: string | null
          status: string
          scheduled_date: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          caption?: string | null
          platform?: string | null
          status?: string
          scheduled_date?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          caption?: string | null
          platform?: string | null
          status?: string
          scheduled_date?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      user_module_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          track_id: string
          progress_percentage: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          track_id: string
          progress_percentage?: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          track_id?: string
          progress_percentage?: number
          status?: string
          created_at?: string
        }
      }
      coin_ledger: {
        Row: {
          id: string
          user_id: string
          amount: number
          description: string | null
          action_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          description?: string | null
          action_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          description?: string | null
          action_type?: string | null
          created_at?: string
        }
      }
      platform_events: {
        Row: {
          id: string
          title: string
          date: string
          type: string | null
          host: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          date: string
          type?: string | null
          host?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          date?: string
          type?: string | null
          host?: string | null
          created_at?: string
        }
      }
      documents_master: {
        Row: {
          id: string
          title: string
          content: string | null
          category: string | null
          access_role: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          category?: string | null
          access_role?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          category?: string | null
          access_role?: string
          created_at?: string
        }
      }
      users_performance: {
        Row: {
          id: string
          user_id: string
          metric_name: string
          metric_value: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          metric_name: string
          metric_value: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          metric_name?: string
          metric_value?: number
          created_at?: string
        }
      }
      media_storage: {
        Row: {
          id: string
          user_id: string | null
          file_url: string
          mime_type: string | null
          size_bytes: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          file_url: string
          mime_type?: string | null
          size_bytes?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          file_url?: string
          mime_type?: string | null
          size_bytes?: number | null
          created_at?: string
        }
      }
      content_calendar: {
        Row: {
          id: string
          user_id: string
          title: string
          date: string
          type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          date: string
          type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          date?: string
          type?: string | null
          created_at?: string
        }
      }
      partner_tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          due_date: string | null
          priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          category: 'SALES' | 'TECHNICAL' | 'ADMIN' | 'MARKETING' | 'OTHER'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          due_date?: string | null
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          category?: 'SALES' | 'TECHNICAL' | 'ADMIN' | 'MARKETING' | 'OTHER'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          due_date?: string | null
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          category?: 'SALES' | 'TECHNICAL' | 'ADMIN' | 'MARKETING' | 'OTHER'
          created_at?: string
        }
      }
    };
  };
}