export default function ERPIntegration() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ERP Integration</h1>
      <p className="text-muted-foreground">
        Configure and manage ERP system integration settings
      </p>
      <div className="grid gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Connection Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ERP System</label>
              <select className="w-full border rounded-md p-2">
                <option>SAP</option>
                <option>Oracle</option>
                <option>Microsoft Dynamics</option>
                <option>NetSuite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">API Endpoint</label>
              <input type="text" className="w-full border rounded-md p-2" placeholder="https://api.erp-system.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Authentication Method</label>
              <select className="w-full border rounded-md p-2">
                <option>OAuth 2.0</option>
                <option>API Key</option>
                <option>Basic Auth</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sync Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Asset Data Sync</h3>
                <p className="text-sm text-muted-foreground">Sync asset data with ERP system</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Financial Data Sync</h3>
                <p className="text-sm text-muted-foreground">Sync financial transactions and records</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sync History</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm">Last successful sync: <span className="font-medium">2024-02-14 15:30:22</span></p>
              <p className="text-sm">Status: <span className="text-green-600">Connected</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
