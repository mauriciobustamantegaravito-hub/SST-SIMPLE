import Link from "next/link";

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
        <Link className="brand" href="/"><span className="brand-mark">S</span><span>SST SIMPLE</span></Link>
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
