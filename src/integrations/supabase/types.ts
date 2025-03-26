export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      asset_transactions: {
        Row: {
          asset_id: string | null
          created_at: string | null
          from_location: string | null
          from_status: string | null
          id: string
          notes: string | null
          performed_by: string | null
          to_location: string | null
          to_status: string | null
          transaction_type: string
        }
        Insert: {
          asset_id?: string | null
          created_at?: string | null
          from_location?: string | null
          from_status?: string | null
          id?: string
          notes?: string | null
          performed_by?: string | null
          to_location?: string | null
          to_status?: string | null
          transaction_type: string
        }
        Update: {
          asset_id?: string | null
          created_at?: string | null
          from_location?: string | null
          from_status?: string | null
          id?: string
          notes?: string | null
          performed_by?: string | null
          to_location?: string | null
          to_status?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          asset_number: string
          assigned_to: string | null
          category: string
          condition_notes: string | null
          created_at: string | null
          description: string | null
          grn_id: string | null
          grn_item_id: string | null
          id: string
          location: string | null
          name: string
          purchase_cost: number | null
          purchase_date: string | null
          status: string | null
          supplier_name: string | null
          updated_at: string | null
        }
        Insert: {
          asset_number: string
          assigned_to?: string | null
          category: string
          condition_notes?: string | null
          created_at?: string | null
          description?: string | null
          grn_id?: string | null
          grn_item_id?: string | null
          id?: string
          location?: string | null
          name: string
          purchase_cost?: number | null
          purchase_date?: string | null
          status?: string | null
          supplier_name?: string | null
          updated_at?: string | null
        }
        Update: {
          asset_number?: string
          assigned_to?: string | null
          category?: string
          condition_notes?: string | null
          created_at?: string | null
          description?: string | null
          grn_id?: string | null
          grn_item_id?: string | null
          id?: string
          location?: string | null
          name?: string
          purchase_cost?: number | null
          purchase_date?: string | null
          status?: string | null
          supplier_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_grn_id_fkey"
            columns: ["grn_id"]
            isOneToOne: false
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_grn_item_id_fkey"
            columns: ["grn_item_id"]
            isOneToOne: false
            referencedRelation: "grn_items"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          entity_id: string
          entity_type: string
          id: string
          new_values: Json | null
          old_values: Json | null
          performed_at: string | null
          performed_by: string
        }
        Insert: {
          action: string
          entity_id: string
          entity_type: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          performed_at?: string | null
          performed_by: string
        }
        Update: {
          action?: string
          entity_id?: string
          entity_type?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          performed_at?: string | null
          performed_by?: string
        }
        Relationships: []
      }
      cost_centers: {
        Row: {
          code: string | null
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      goods_receipt_notes: {
        Row: {
          authorized_at: string | null
          authorized_by: string | null
          checked_at: string | null
          checked_by: string | null
          created_at: string | null
          created_by: string | null
          grn_number: string | null
          id: string
          notes: string | null
          purchase_order_id: string | null
          purchase_order_number: string | null
          received_date: string | null
          request_id: string | null
          status: Database["public"]["Enums"]["grn_status"] | null
          submitted_at: string | null
          submitted_by: string | null
          supplier_name: string
          total_items: number | null
          total_value: number | null
          updated_at: string | null
          workflow_step: number | null
        }
        Insert: {
          authorized_at?: string | null
          authorized_by?: string | null
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string | null
          created_by?: string | null
          grn_number?: string | null
          id?: string
          notes?: string | null
          purchase_order_id?: string | null
          purchase_order_number?: string | null
          received_date?: string | null
          request_id?: string | null
          status?: Database["public"]["Enums"]["grn_status"] | null
          submitted_at?: string | null
          submitted_by?: string | null
          supplier_name: string
          total_items?: number | null
          total_value?: number | null
          updated_at?: string | null
          workflow_step?: number | null
        }
        Update: {
          authorized_at?: string | null
          authorized_by?: string | null
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string | null
          created_by?: string | null
          grn_number?: string | null
          id?: string
          notes?: string | null
          purchase_order_id?: string | null
          purchase_order_number?: string | null
          received_date?: string | null
          request_id?: string | null
          status?: Database["public"]["Enums"]["grn_status"] | null
          submitted_at?: string | null
          submitted_by?: string | null
          supplier_name?: string
          total_items?: number | null
          total_value?: number | null
          updated_at?: string | null
          workflow_step?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "goods_receipt_notes_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      grn_approval_history: {
        Row: {
          action: string
          comments: string | null
          created_at: string | null
          from_status: string | null
          grn_id: string | null
          id: string
          performed_by: string | null
          to_status: string | null
        }
        Insert: {
          action: string
          comments?: string | null
          created_at?: string | null
          from_status?: string | null
          grn_id?: string | null
          id?: string
          performed_by?: string | null
          to_status?: string | null
        }
        Update: {
          action?: string
          comments?: string | null
          created_at?: string | null
          from_status?: string | null
          grn_id?: string | null
          id?: string
          performed_by?: string | null
          to_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grn_approval_history_grn_id_fkey"
            columns: ["grn_id"]
            isOneToOne: false
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      grn_items: {
        Row: {
          asset_category: string
          condition_notes: string | null
          created_at: string | null
          description: string | null
          grn_id: string | null
          id: string
          item_name: string
          quantity: number
          total_price: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          asset_category: string
          condition_notes?: string | null
          created_at?: string | null
          description?: string | null
          grn_id?: string | null
          id?: string
          item_name: string
          quantity: number
          total_price: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          asset_category?: string
          condition_notes?: string | null
          created_at?: string | null
          description?: string | null
          grn_id?: string | null
          id?: string
          item_name?: string
          quantity?: number
          total_price?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grn_items_grn_id_fkey"
            columns: ["grn_id"]
            isOneToOne: false
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          created_at: string
          department: string
          email: string
          expires_at: string
          id: string
          invited_by: string
          role: string
          status: Database["public"]["Enums"]["invitation_status"]
          token: string
        }
        Insert: {
          created_at?: string
          department: string
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          role: string
          status?: Database["public"]["Enums"]["invitation_status"]
          token?: string
        }
        Update: {
          created_at?: string
          department?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          role?: string
          status?: Database["public"]["Enums"]["invitation_status"]
          token?: string
        }
        Relationships: []
      }
      maintenance_attachments: {
        Row: {
          file_name: string
          file_type: string
          file_url: string
          id: string
          task_id: string
          uploaded_at: string | null
          uploaded_by: string
        }
        Insert: {
          file_name: string
          file_type: string
          file_url: string
          id?: string
          task_id: string
          uploaded_at?: string | null
          uploaded_by: string
        }
        Update: {
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          task_id?: string
          uploaded_at?: string | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_attachments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "maintenance_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_tasks: {
        Row: {
          asset_id: string
          assigned_to: string | null
          completed_date: string | null
          cost: number | null
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          maintenance_type: string
          notes: string[] | null
          priority: string | null
          scheduled_date: string
          status: string
          title: string
          updated_at: string | null
          vendor: string | null
        }
        Insert: {
          asset_id: string
          assigned_to?: string | null
          completed_date?: string | null
          cost?: number | null
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          maintenance_type: string
          notes?: string[] | null
          priority?: string | null
          scheduled_date: string
          status?: string
          title: string
          updated_at?: string | null
          vendor?: string | null
        }
        Update: {
          asset_id?: string
          assigned_to?: string | null
          completed_date?: string | null
          cost?: number | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          maintenance_type?: string
          notes?: string[] | null
          priority?: string | null
          scheduled_date?: string
          status?: string
          title?: string
          updated_at?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          department: string | null
          id: string
          name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id: string
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      purchase_order_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          item_number: number | null
          po_id: string | null
          quantity: number
          remarks: string | null
          total_price: number
          unit_of_measure: string | null
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          item_number?: number | null
          po_id?: string | null
          quantity: number
          remarks?: string | null
          total_price: number
          unit_of_measure?: string | null
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          item_number?: number | null
          po_id?: string | null
          quantity?: number
          remarks?: string | null
          total_price?: number
          unit_of_measure?: string | null
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_po_id_fkey"
            columns: ["po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          advance_payment: number | null
          approved_at: string | null
          approved_by: string | null
          checked_at: string | null
          checked_by: string | null
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          place_of_delivery: string | null
          po_date: string
          po_number: string
          request_id: string | null
          status: string | null
          supplier_address: string | null
          supplier_name: string
          supplier_tin: string | null
          terms_of_delivery: string | null
          terms_of_payment: string | null
          time_of_delivery: string | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          advance_payment?: number | null
          approved_at?: string | null
          approved_by?: string | null
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          place_of_delivery?: string | null
          po_date: string
          po_number: string
          request_id?: string | null
          status?: string | null
          supplier_address?: string | null
          supplier_name: string
          supplier_tin?: string | null
          terms_of_delivery?: string | null
          terms_of_payment?: string | null
          time_of_delivery?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          advance_payment?: number | null
          approved_at?: string | null
          approved_by?: string | null
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          place_of_delivery?: string | null
          po_date?: string
          po_number?: string
          request_id?: string | null
          status?: string | null
          supplier_address?: string | null
          supplier_name?: string
          supplier_tin?: string | null
          terms_of_delivery?: string | null
          terms_of_payment?: string | null
          time_of_delivery?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          asset_category: Database["public"]["Enums"]["asset_category"]
          brand_model: string | null
          color: string | null
          condition: string | null
          condition_notes: string | null
          cost_center_id: string | null
          created_at: string | null
          created_by: string
          grn_status: string | null
          id: string
          justification: string
          memory: string | null
          other_specs: string | null
          processor: string | null
          quantity: number
          status: Database["public"]["Enums"]["request_status"]
          storage: string | null
          sub_category: string | null
          submitted_at: string | null
          title: string
          total_cost: number | null
          unit_cost: number
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          asset_category: Database["public"]["Enums"]["asset_category"]
          brand_model?: string | null
          color?: string | null
          condition?: string | null
          condition_notes?: string | null
          cost_center_id?: string | null
          created_at?: string | null
          created_by: string
          grn_status?: string | null
          id?: string
          justification: string
          memory?: string | null
          other_specs?: string | null
          processor?: string | null
          quantity: number
          status?: Database["public"]["Enums"]["request_status"]
          storage?: string | null
          sub_category?: string | null
          submitted_at?: string | null
          title: string
          total_cost?: number | null
          unit_cost: number
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          asset_category?: Database["public"]["Enums"]["asset_category"]
          brand_model?: string | null
          color?: string | null
          condition?: string | null
          condition_notes?: string | null
          cost_center_id?: string | null
          created_at?: string | null
          created_by?: string
          grn_status?: string | null
          id?: string
          justification?: string
          memory?: string | null
          other_specs?: string | null
          processor?: string | null
          quantity?: number
          status?: Database["public"]["Enums"]["request_status"]
          storage?: string | null
          sub_category?: string | null
          submitted_at?: string | null
          title?: string
          total_cost?: number | null
          unit_cost?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_cost_center_id_fkey"
            columns: ["cost_center_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      convert_grn_items_to_assets: {
        Args: {
          grn_id_param: string
        }
        Returns: undefined
      }
      delete_user: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      get_user_profiles: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          email: string
          role: Database["public"]["Enums"]["user_role"]
          department: string
          status: string
          created_at: string
        }[]
      }
    }
    Enums: {
      asset_category:
        | "IT Equipment"
        | "Furniture"
        | "Vehicle"
        | "Office Equipment"
        | "Machinery"
        | "Building"
        | "Land"
      grn_status: "DRAFT" | "SUBMITTED" | "CHECKED" | "AUTHORIZED" | "REJECTED"
      invitation_status: "pending" | "accepted" | "expired"
      request_status:
        | "DRAFT"
        | "SUBMITTED"
        | "IN_APPROVAL"
        | "APPROVED"
        | "REJECTED"
      user_role: "ADMIN" | "FINANCE" | "EMPLOYEE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
