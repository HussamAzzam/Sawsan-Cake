import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PanelProvider } from "./context/PanelContext";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./common/ErrorBoundary.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";


export default function App() {
    return (
        <ErrorBoundary fallback={<p>حدث خطأ غير متوقع في التطبيق</p>}>
            <AuthProvider>
                <BrowserRouter>
                    <PanelProvider>
                        <ErrorBoundary onReset={() => window.location.reload()}>
                            <ScrollToTop />
                            <AppRoutes />
                        </ErrorBoundary>
                    </PanelProvider>
                </BrowserRouter>
            </AuthProvider>
        </ErrorBoundary>
    );
}