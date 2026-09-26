import { Route, Routes } from "react-router-dom"
import { AppShell } from "../components/AppShell.tsx"
import { ImportPage } from "../pages/import/ImportPage.tsx"
import { PortfolioPage } from "../pages/portfolio/PortfolioPage.tsx"
import { TokenDetailPage } from "../pages/tokens/TokenDetailPage.tsx"
import { TokenSearchPage } from "../pages/tokens/TokenSearchPage.tsx"
import { TradePage } from "../pages/trade/TradePage.tsx"
import { WatchlistPage } from "../pages/watchlist/WatchlistPage.tsx"
import { paths } from "./paths.ts"
import { WalletUiProvider } from "./wallet-ui.tsx"

export function App() {
  return (
    <WalletUiProvider>
      <Routes>
        <Route path={paths.import} element={<ImportPage />} />
        <Route element={<AppShell />}>
          <Route path={paths.portfolio} element={<PortfolioPage />} />
          <Route path={paths.tokens} element={<TokenSearchPage />} />
          <Route path={paths.trade} element={<TradePage />} />
          <Route path={paths.token} element={<TokenDetailPage />} />
          <Route path={paths.watchlist} element={<WatchlistPage />} />
        </Route>
      </Routes>
    </WalletUiProvider>
  )
}
