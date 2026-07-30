const colorMap = {
  blue: { bg: "bg-blue-50", border: "border-blue-500", icon: "text-blue-600" },
  purple: { bg: "bg-purple-50", border: "border-purple-500", icon: "text-purple-600" },
  green: { bg: "bg-green-50", border: "border-green-500", icon: "text-green-600" },
  amber: { bg: "bg-amber-50", border: "border-amber-500", icon: "text-amber-600" },
};

export default function StatCard({ icon: Icon, value, label, color = "blue" }) {
  const styles = colorMap[color];

  return (
    <div className={`${styles.bg} border-l-4 ${styles.border} rounded-lg p-4 flex items-center gap-4`}>
      <div className={`${styles.icon}`}>
        <Icon size={28} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}
