interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({
  icon,
  label,
  value,
  valueClass = "",
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 text-slate-400">
      {icon}
      <span className="text-sm font-semibold uppercase tracking-wider">
        {label}
      </span>
    </div>
    <span
      className={`text-slate-800 font-medium text-lg truncate ${valueClass}`}
    >
      {value}
    </span>
  </div>
);

export default DetailItem;
