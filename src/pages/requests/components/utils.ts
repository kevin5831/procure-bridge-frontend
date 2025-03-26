
export function getStatusColor(status: string) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700 border border-green-200";
    case "Rejected":
      return "bg-red-100 text-red-700 border border-red-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    case "In Approval":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "Not Started":
      return "bg-gray-100 text-gray-700 border border-gray-200";
    case "Draft":
      return "bg-slate-100 text-slate-700 border border-slate-200";
    case "Delivered":
      return "bg-blue-100 text-blue-700 border border-blue-200";
    case "Processing":
      return "bg-purple-100 text-purple-700 border border-purple-200";
    case "Cancelled":
      return "bg-rose-100 text-rose-700 border border-rose-200";
    case "Completed":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    default:
      return "bg-indigo-100 text-indigo-700 border border-indigo-200";
  }
}

// Add utility function for tag colors
export function getTagColor(tag: string) {
  const colors = {
    "High": "bg-red-100 text-red-700 border border-red-200",
    "Medium": "bg-yellow-100 text-yellow-700 border border-yellow-200",
    "Low": "bg-green-100 text-green-700 border border-green-200",
    "IT": "bg-blue-100 text-blue-700 border border-blue-200",
    "Finance": "bg-purple-100 text-purple-700 border border-purple-200",
    "HR": "bg-pink-100 text-pink-700 border border-pink-200",
    "Operations": "bg-indigo-100 text-indigo-700 border border-indigo-200",
    "Sales": "bg-teal-100 text-teal-700 border border-teal-200",
    "Marketing": "bg-orange-100 text-orange-700 border border-orange-200",
  };
  
  return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-700 border border-gray-200";
}

// Add utility function for priority colors
export function getPriorityColor(priority: string) {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-700 border border-red-200";
    case "High":
      return "bg-orange-100 text-orange-700 border border-orange-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    case "Low":
      return "bg-green-100 text-green-700 border border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
}
