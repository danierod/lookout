import { Link, NavLink, Outlet } from "react-router-dom"
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
  const short = shortenAddress(address)

  return (
    <div className="shell">
      <aside className="side">
        <Link to={paths.portfolio} className="brand">
          Lookout
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <Link to={paths.import} className="button secondary" aria-label={`Wallet ${short}. Change wallet.`}>
            {short}
          </Link>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
