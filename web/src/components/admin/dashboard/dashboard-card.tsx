interface Props {
  title: string;

  value: string | number;

  subtitle?: string;
}

export default function DashboardCard({ title, value, subtitle }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <p className="text-slate-400 text-sm uppercase tracking-[3px]">{title}</p>

      <h2 className="text-5xl font-black mt-5">{value}</h2>

      {subtitle && <p className="text-slate-500 mt-3 text-sm">{subtitle}</p>}
    </div>
  );
}
