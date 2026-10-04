export default function SectionHeader({ id, className = "", children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className={`flex items-center gap-3 text-[13px] font-medium text-muted ${className}`}>
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-rule" />
    </h2>
  );
}
