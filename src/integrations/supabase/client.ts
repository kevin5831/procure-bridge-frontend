
// Mock Supabase client for demo purposes - no real Supabase connection needed
const mockData = {
  requests: [
    {
      id: 'REQ001',
      title: 'New Laptops for Development Team',
      status: 'APPROVED',
      grn_status: 'PENDING',
      created_at: '2025-02-23T17:35:41Z',
      created_by: 'current-user-id',
      total_cost: 5000,
      current_approval_step: 3,
      total_approval_steps: 3,
      approver_role: 'IT_MANAGER',
      workflow_status: 'Approved by all approvers',
      creator: {
        name: 'John Doe',
        department: 'Engineering'
      }
    },
    {
      id: 'REQ002',
      title: 'Office Furniture - Standing Desks',
      status: 'PENDING',
      grn_status: 'PENDING',
      created_at: '2025-02-22T10:15:00Z',
      created_by: 'current-user-id',
      total_cost: 2000,
      current_approval_step: 1,
      total_approval_steps: 3,
      approver_role: 'PROCUREMENT',
      workflow_status: 'Pending procurement approval',
      creator: {
        name: 'John Doe',
        department: 'Engineering'
      }
    },
    {
      id: 'REQ003',
      title: 'Conference Room AV Equipment',
      status: 'IN_REVIEW',
      grn_status: 'PENDING',
      created_at: '2025-02-21T14:20:00Z',
      created_by: 'other-user-id',
      total_cost: 10000,
      current_approval_step: 2,
      total_approval_steps: 3,
      approver_role: 'FINANCE',
      workflow_status: 'Pending finance approval',
      creator: {
        name: 'Jane Smith',
        department: 'Operations'
      }
    },
    {
      id: 'REQ004',
      title: 'Marketing Team iPads',
      status: 'DRAFT',
      grn_status: 'PENDING',
      created_at: '2025-02-20T09:45:00Z',
      created_by: 'current-user-id',
      total_cost: 3000,
      current_approval_step: 0,
      total_approval_steps: 3,
      approver_role: null,
      workflow_status: 'Draft',
      creator: {
        name: 'John Doe',
        department: 'Engineering'
      }
    }
  ],
  purchase_orders: [
    {
      id: 'PO001',
      po_number: 'PO-2024-001',
      po_date: '2024-03-01',
      supplier_name: 'Tech Solutions Inc.',
      supplier_tin: '123-456-789',
      supplier_address: '123 Tech Street, Silicon Valley',
      terms_of_payment: 'Net 30',
      advance_payment: 0,
      terms_of_delivery: 'Free Shipping',
      time_of_delivery: '2024-03-15T10:00:00Z',
      place_of_delivery: 'Main Office',
      status: 'APPROVED',
      total_amount: 15000.00,
      notes: 'IT Equipment procurement',
      created_at: '2024-02-28T09:00:00Z',
      updated_at: '2024-02-28T09:00:00Z'
    },
    {
      id: 'PO002',
      po_number: 'PO-2024-002',
      po_date: '2024-03-02',
      supplier_name: 'Office Depot',
      supplier_tin: '987-654-321',
      supplier_address: '456 Office Boulevard',
      terms_of_payment: 'Net 15',
      advance_payment: 500,
      terms_of_delivery: 'Standard Shipping',
      time_of_delivery: '2024-03-20T14:00:00Z',
      place_of_delivery: 'Branch Office',
      status: 'DRAFT',
      total_amount: 5000.00,
      notes: 'Office supplies and furniture',
      created_at: '2024-03-01T11:00:00Z',
      updated_at: '2024-03-01T11:00:00Z'
    },
    {
      id: 'PO003',
      po_number: 'PO-2024-003',
      po_date: '2024-03-03',
      supplier_name: 'Industrial Equipment Co.',
      supplier_tin: '456-789-123',
      supplier_address: '789 Industrial Park',
      terms_of_payment: 'Net 45',
      advance_payment: 1000,
      terms_of_delivery: 'Freight',
      time_of_delivery: '2024-04-01T09:00:00Z',
      place_of_delivery: 'Warehouse',
      status: 'SUBMITTED',
      total_amount: 25000.00,
      notes: 'Heavy machinery purchase',
      created_at: '2024-03-02T15:30:00Z',
      updated_at: '2024-03-02T15:30:00Z'
    },
    {
      id: 'PO004',
      po_number: 'PO-2024-004',
      po_date: '2024-03-04',
      supplier_name: 'Global Electronics',
      supplier_tin: '789-123-456',
      supplier_address: '321 Global Street',
      terms_of_payment: 'Net 60',
      advance_payment: 2000,
      terms_of_delivery: 'Express Shipping',
      time_of_delivery: '2024-03-25T13:00:00Z',
      place_of_delivery: 'Tech Center',
      status: 'REJECTED',
      total_amount: 8000.00,
      notes: 'Electronic components',
      created_at: '2024-03-03T10:15:00Z',
      updated_at: '2024-03-03T10:15:00Z'
    }
  ],
  goods_receipt_notes: [
    {
      id: 'GRN001',
      purchase_order_id: 'PO001',
      received_date: '2024-03-10',
      supplier_name: 'Tech Solutions Inc.',
      status: 'AUTHORIZED',
      workflow_step: 3,
      created_by: 'user-001',
      checked_by: 'user-002',
      authorized_by: 'user-003',
      submitted_by: 'user-001',
      submitted_at: '2024-03-10T09:00:00Z',
      checked_at: '2024-03-10T10:00:00Z',
      authorized_at: '2024-03-10T11:00:00Z',
      notes: 'All items received in good condition',
      total_items: 15,
      total_value: 14850.00,
      created_at: '2024-03-10T09:00:00Z',
      updated_at: '2024-03-10T11:00:00Z',
      items: [
        {
          id: 'GRNI001',
          grn_id: 'GRN001',
          item_name: 'Dell XPS 15 Laptop',
          description: 'Intel Core i7, 16GB RAM, 512GB SSD',
          quantity: 10,
          unit_price: 1200.00,
          total_price: 12000.00,
          asset_category: 'IT Equipment',
          condition_notes: 'New'
        },
        {
          id: 'GRNI002',
          grn_id: 'GRN001',
          item_name: 'Microsoft Surface Pro',
          description: 'Intel Core i5, 8GB RAM, 256GB SSD',
          quantity: 5,
          unit_price: 950.00,
          total_price: 4750.00,
          asset_category: 'IT Equipment',
          condition_notes: 'New'
        }
      ]
    },
    {
      id: 'GRN002',
      purchase_order_id: 'PO002',
      received_date: '2024-03-15',
      supplier_name: 'Office Depot',
      status: 'CHECKED',
      workflow_step: 2,
      created_by: 'user-001',
      checked_by: 'user-002',
      submitted_by: 'user-001',
      submitted_at: '2024-03-15T14:00:00Z',
      checked_at: '2024-03-15T16:00:00Z',
      notes: 'Missing 2 chairs, will be delivered next week',
      total_items: 18,
      total_value: 4800.00,
      created_at: '2024-03-15T14:00:00Z',
      updated_at: '2024-03-15T16:00:00Z',
      items: [
        {
          id: 'GRNI003',
          grn_id: 'GRN002',
          item_name: 'Adjustable Standing Desk',
          description: 'Electric Height Adjustable, 60x30 inch',
          quantity: 8,
          unit_price: 450.00,
          total_price: 3600.00,
          asset_category: 'Furniture',
          condition_notes: 'New'
        },
        {
          id: 'GRNI004',
          grn_id: 'GRN002',
          item_name: 'Ergonomic Office Chair',
          description: 'Adjustable height and armrests',
          quantity: 10,
          unit_price: 120.00,
          total_price: 1200.00,
          asset_category: 'Furniture',
          condition_notes: 'New, 2 pending delivery'
        }
      ]
    },
    {
      id: 'GRN003',
      purchase_order_id: 'PO003',
      received_date: '2024-04-05',
      supplier_name: 'Industrial Equipment Co.',
      status: 'SUBMITTED',
      workflow_step: 1,
      created_by: 'user-004',
      submitted_by: 'user-004',
      submitted_at: '2024-04-05T08:30:00Z',
      notes: 'Heavy equipment requires special installation',
      total_items: 2,
      total_value: 25000.00,
      created_at: '2024-04-05T08:30:00Z',
      updated_at: '2024-04-05T08:30:00Z',
      items: [
        {
          id: 'GRNI005',
          grn_id: 'GRN003',
          item_name: 'Industrial Press Machine',
          description: 'Model IPM-2000, 20-ton capacity',
          quantity: 1,
          unit_price: 15000.00,
          total_price: 15000.00,
          asset_category: 'Heavy Machinery',
          condition_notes: 'New, requires installation'
        },
        {
          id: 'GRNI006',
          grn_id: 'GRN003',
          item_name: 'Metal Cutting Machine',
          description: 'Model MCM-500, Precision cutting',
          quantity: 1,
          unit_price: 10000.00,
          total_price: 10000.00,
          asset_category: 'Heavy Machinery',
          condition_notes: 'New, requires calibration'
        }
      ]
    },
    {
      id: 'GRN004',
      purchase_order_id: 'PO004',
      received_date: '2024-03-26',
      supplier_name: 'Global Electronics',
      status: 'DRAFT',
      workflow_step: 0,
      created_by: 'user-001',
      notes: 'Initial receipt, pending full inventory check',
      total_items: 200,
      total_value: 8000.00,
      created_at: '2024-03-26T11:00:00Z',
      updated_at: '2024-03-26T11:00:00Z',
      items: [
        {
          id: 'GRNI007',
          grn_id: 'GRN004',
          item_name: 'Electronic Components - Assorted',
          description: 'Capacitors, resistors, ICs, etc.',
          quantity: 200,
          unit_price: 40.00,
          total_price: 8000.00,
          asset_category: 'Electronic Components',
          condition_notes: 'New, needs detailed inspection'
        }
      ]
    }
  ]
};

const mockClient = {
  auth: {
    signOut: async () => ({ error: null }),
    getSession: () => null,
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getUser: async () => ({ data: { user: { id: '1', email: 'test@example.com' } }, error: null })
  },
  channel: (name: string) => ({
    on: (event: string, schema: string, table: string, callback: Function) => ({
      subscribe: () => ({
        unsubscribe: () => {}
      })
    })
  }),
  removeChannel: (channel: any) => {},
  from: (table: string) => ({
    select: (columns: string = '*') => {
      const query = {
        eq: (column: string, value: any) => ({
          eq: (col: string, val: any) => ({
            ilike: (col: string, val: any) => ({
              limit: (num: number) => ({
                data: mockData[table]?.filter(item => 
                  item[column] === value && 
                  item[col] === val &&
                  item.title?.toLowerCase().includes(val.replace(/%/g, '').toLowerCase())
                ) || [],
                error: null
              }),
              data: mockData[table]?.filter(item => 
                item[column] === value && 
                item[col] === val
              ) || [],
              error: null,
              single: () => ({ 
                data: mockData[table]?.find(item => 
                  item[column] === value && 
                  item[col] === val
                ) || null,
                error: null 
              }),
              maybeSingle: () => ({ 
                data: mockData[table]?.find(item => 
                  item[column] === value && 
                  item[col] === val
                ) || null,
                error: null 
              })
            }),
            limit: (num: number) => ({
              data: mockData[table]?.filter(item => 
                item[column] === value && 
                item[col] === val
              ) || [],
              error: null
            }),
            data: mockData[table]?.filter(item => 
              item[column] === value && 
              item[col] === val
            ) || [],
            error: null,
            single: () => ({ 
              data: mockData[table]?.find(item => 
                item[column] === value && 
                item[col] === val
              ) || null,
              error: null 
            }),
            maybeSingle: () => ({ 
              data: mockData[table]?.find(item => 
                item[column] === value && 
                item[col] === val
              ) || null,
              error: null 
            })
          }),
          ilike: (col: string, val: any) => ({
            data: mockData[table]?.filter(item => 
              item[column] === value && 
              item.title?.toLowerCase().includes(val.replace(/%/g, '').toLowerCase())
            ) || [],
            error: null
          }),
          data: mockData[table]?.filter(item => item[column] === value) || [],
          error: null,
          single: () => ({ 
            data: mockData[table]?.find(item => item[column] === value) || null,
            error: null 
          }),
          maybeSingle: () => ({ 
            data: mockData[table]?.find(item => item[column] === value) || null,
            error: null 
          }),
          order: (col: string, { ascending }: { ascending: boolean }) => ({
            data: mockData[table]?.filter(item => item[column] === value)
              .sort((a, b) => ascending ? 
                (a[col] > b[col] ? 1 : -1) : 
                (a[col] < b[col] ? 1 : -1)
              ) || [],
            error: null
          })
        }),
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          eq: (col: string, val: any) => ({
            data: mockData[table]?.filter(item => item[col] === val)
              .sort((a, b) => ascending ? 
                (a[column] > b[column] ? 1 : -1) : 
                (a[column] < b[column] ? 1 : -1)
              ) || [],
            error: null,
            single: () => ({ 
              data: mockData[table]?.find(item => item[col] === val) || null,
              error: null 
            }),
            maybeSingle: () => ({ 
              data: mockData[table]?.find(item => item[col] === val) || null,
              error: null 
            })
          }),
          data: mockData[table]?.sort((a, b) => ascending ? 
            (a[column] > b[column] ? 1 : -1) : 
            (a[column] < b[column] ? 1 : -1)
          ) || [],
          error: null
        }),
        single: () => ({ data: mockData[table]?.[0] || null, error: null }),
        maybeSingle: () => ({ data: mockData[table]?.[0] || null, error: null }),
        data: mockData[table] || [],
        error: null
      };
      return query;
    },
    insert: (data: any) => ({
      select: () => ({
        single: () => ({ data: { id: 'NEW_ID', ...data }, error: null }),
        maybeSingle: () => ({ data: { id: 'NEW_ID', ...data }, error: null }),
        data: { id: 'NEW_ID', ...data },
        error: null
      }),
      single: () => ({ data: { id: 'NEW_ID', ...data }, error: null }),
      maybeSingle: () => ({ data: { id: 'NEW_ID', ...data }, error: null }),
      data: { id: 'NEW_ID', ...data },
      error: null
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: () => ({
          single: () => ({ data: { id: value, ...data }, error: null }),
          maybeSingle: () => ({ data: { id: value, ...data }, error: null }),
          data: { id: value, ...data },
          error: null
        }),
        data: { id: value, ...data },
        error: null,
        single: () => ({ data: { id: value, ...data }, error: null }),
        maybeSingle: () => ({ data: { id: value, ...data }, error: null })
      })
    })
  }),
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => ({ data: { path }, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: `https://example.com/${path}` }, error: null })
    })
  }
};

export const supabase = mockClient;
