import { AppProvider } from "./state/AppProvider";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
