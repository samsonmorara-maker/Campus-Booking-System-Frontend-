function StatusBadge({ status }) {
  const colors = {
    Pending: "bg-[#F59E0B] text-white",
    Approved: "bg-[#22C55E] text-white",
    Rejected: "bg-[#EF4444] text-white",
    Cancelled: "bg-gray-500 text-white",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold ${
        colors[status] || "bg-gray-300 text-black"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;