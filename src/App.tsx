
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/assets";
import AssetDetails from "./pages/assets/[id]";
import CreateAssetFromPO from "./pages/assets/create-from-po";
import GRNList from "./pages/grn";
import GRNCreate from "./pages/grn/GRNCreate";
import GRNDetail from "./pages/grn/GRNDetail";
import Maintenance from "./pages/maintenance";
import PurchaseOrders from "./pages/purchase-orders";
import PurchaseOrderDetail from "./pages/purchase-orders/[id]";
import Requests from "./pages/requests";
import RequestDetail from "./pages/requests/[id]";
import RequestApprovals from "./pages/requests/approvals";
import RequestDelivery from "./pages/requests/delivery";
import AdminCompany from "./pages/admin/company";
import AdminDepartments from "./pages/admin/departments";
import AdminIntegrations from "./pages/admin/integrations";
import AdminLocations from "./pages/admin/locations";
import AdminRoles from "./pages/admin/roles";
import AdminUsers from "./pages/admin/users";
import AdminWorkflow from "./pages/admin/workflow";
import AdminAuditLogs from "./pages/admin/audit-logs";
import ItemMasterPage from "./pages/admin/item-master";
import Vendors from "./pages/vendors";
import Reports from "./pages/reports";
import FinanceSetup from "./pages/finance";
import DepreciationSchedule from "./pages/finance/DepreciationSchedule";
import DepreciationSetup from "./pages/finance/DepreciationSetup";
import ERPIntegration from "./pages/finance/ERPIntegration";
import ImpairmentRevaluation from "./pages/finance/ImpairmentRevaluation";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: (
      <TooltipProvider>
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      </TooltipProvider>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/assets",
        element: <Assets />,
      },
      {
        path: "/assets/:id",
        element: <AssetDetails />,
      },
      {
        path: "/assets/request",
        element: <Requests />,
      },
      {
        path: "/assets/create-from-po",
        element: <CreateAssetFromPO />,
      },
      {
        path: "/assets/disposal",
        element: <Assets />,
      },
      {
        path: "/assets/capitalisation",
        element: <Assets />,
      },
      {
        path: "/grn",
        element: <GRNList />,
      },
      {
        path: "/grn/create",
        element: <GRNCreate />,
      },
      {
        path: "/grn/:id",
        element: <GRNDetail />,
      },
      {
        path: "/maintenance",
        element: <Maintenance />,
      },
      {
        path: "/purchase-orders",
        element: <PurchaseOrders />,
      },
      {
        path: "/purchase-orders/:id",
        element: <PurchaseOrderDetail />,
      },
      {
        path: "/requests",
        element: <Requests />,
      },
      {
        path: "/requests/:id",
        element: <RequestDetail />,
      },
      {
        path: "/requests/approvals",
        element: <RequestApprovals />,
      },
      {
        path: "/requests/delivery",
        element: <RequestDelivery />,
      },
      {
        path: "/admin/company",
        element: <AdminCompany />,
      },
      {
        path: "/admin/departments",
        element: <AdminDepartments />,
      },
      {
        path: "/admin/integrations",
        element: <AdminIntegrations />,
      },
      {
        path: "/admin/locations",
        element: <AdminLocations />,
      },
      {
        path: "/admin/item-master",
        element: <ItemMasterPage />,
      },
      {
        path: "/admin/roles",
        element: <AdminRoles />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/workflow",
        element: <AdminWorkflow />,
      },
      {
        path: "/admin/audit-logs",
        element: <AdminAuditLogs />,
      },
      {
        path: "/vendors",
        element: <Vendors />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      // Finance routes
      {
        path: "/finance",
        element: <FinanceSetup />,
      },
      {
        path: "/finance/depreciation-schedule",
        element: <DepreciationSchedule />,
      },
      {
        path: "/finance/depreciation-setup",
        element: <DepreciationSetup />,
      },
      {
        path: "/finance/erp-integration",
        element: <ERPIntegration />,
      },
      {
        path: "/finance/impairment-revaluation",
        element: <ImpairmentRevaluation />,
      },
      // Admin finance routes (for sidebar navigation compatibility)
      {
        path: "/admin/finance",
        element: <FinanceSetup />,
      },
      {
        path: "/admin/finance/depreciation-setup",
        element: <DepreciationSetup />,
      },
      {
        path: "/admin/finance/depreciation-schedule",
        element: <DepreciationSchedule />,
      },
      {
        path: "/admin/finance/impairment-revaluation",
        element: <ImpairmentRevaluation />,
      },
      {
        path: "/admin/finance/erp-integration",
        element: <ERPIntegration />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
