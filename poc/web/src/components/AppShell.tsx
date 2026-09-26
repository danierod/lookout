import { NavLink, Outlet } from "react-router-dom"
import { paths } from "../app/paths.ts"
import { useWalletUi } from "../app/wallet-ui.tsx"
import { shortenAddress } from "../lib/format.ts"

const links = [
  { to: paths.portfolio, label: "Portfolio" },
  { to: paths.tokens, label: "Tokens" },
  { to: paths.watchlist, label: "Watchlist" },
]

export function AppShell() {
  const { address } = useWalletUi()

  return (
    <div className="shell">
      <aside className="side">
        <NavLink to={paths.portfolio} className="brand">
          Lookout
        </NavLink>
        <nav className="nav" aria-label="Main">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="nav-link">
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <NavLink to={paths.import} className="address">
            {shortenAddress(address)}
          </NavLink>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
