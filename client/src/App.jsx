import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./common/ErrorBoundary.jsx";

export default function App() {
    return (
        <ErrorBoundary fallback={<p>حدث خطأ غير متوقع في التطبيق</p>}>
            <AuthProvider>
                <BrowserRouter>
                    <ErrorBoundary onReset={() => window.location.reload()}>
                        <AppRoutes />
                    </ErrorBoundary>
                </BrowserRouter>
            </AuthProvider>
        </ErrorBoundary>
    );
}