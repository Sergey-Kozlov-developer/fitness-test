import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@styles/index.css";
import App from "@app/App.tsx";
import { Provider } from "react-redux";
import { store } from "@app/store/store.ts";
import { TimerProvider } from "@/shared/context/timer-context";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <TimerProvider>
                <App />
            </TimerProvider>
        </Provider>
    </StrictMode>
);
