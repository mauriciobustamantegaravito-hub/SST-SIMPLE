import Link from "next/link";

const BrandMark = () => (
  <span className="brand-mark" aria-hidden="true">
    <svg viewBox="0 0 32 32" focusable="false">
      <path d="M22.8 8.5c-2.4-1.5-5-2.1-7.3-1.6-2.4.5-3.9 2-3.9 3.8 0 2.2 1.9 3.2 5.3 4.1 3.3.9 4.7 1.8 4.7 3.7 0 2.4-2.1 4.2-5.3 4.2-2.4 0-4.5-.8-6.4-2.4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20.6 11.2c1.5-2.2 3.5-3.1 5.5-3.2-.2 2.5-1.5 4.3-4.2 4.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </span>
);

export function KitLayout({ active, children }: { active: string; children: React.ReactNode }) {
  const links = [
    ["Resumen", "/kit"],
    ["Mi negocio", "/kit/mi-negocio"],
    ["Auditoría 5S", "/kit/auditoria-5s"],
    ["Plan de acción", "/kit/plan-de-accion"],
    ["Seguimiento", "/kit/seguimiento"],
  ];

  return (
    <div className="kit-shell">
      <header className="kit-header">
        <Link className="brand" href="/"><BrandMark /><span>SAANVA SST</span></Link>
        <span className="kit-badge">KIT DIGITAL 5S + SST</span>
      </header>
      <div className="kit-layout">
        <aside className="kit-sidebar" aria-label="Navegación del kit">
          <p className="kit-sidebar-label">Tu espacio de trabajo</p>
          <nav>
            {links.map(([label, href]) => <Link className={active === href ? "active" : ""} href={href} key={href}>{label}</Link>)}
          </nav>
          <Link className="kit-back" href="/">← Volver a la página</Link>
        </aside>
        <main className="kit-content">{children}</main>
      </div>
    </div>
  );
}
