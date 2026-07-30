const styles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
