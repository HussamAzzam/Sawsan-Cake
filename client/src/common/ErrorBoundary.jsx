// src/components/ErrorBoundary.jsx
import { Component } from "react";
import { Home, RotateCcw } from "lucide-react";
import { ERROR_VARIANTS } from "@/config/errorBoundariesConfig";

const BUTTON_BASE =
    "inline-flex items-center justify-center gap-2 text-md font-semibold py-3 px-8 rounded-md border-2 cursor-pointer transition-colors";

// Main action (try again): filled
const PRIMARY_BUTTON = `${BUTTON_BASE} bg-primary border-primary text-black hover:bg-neutral hover:text-primary`;

// Second action (go home): outlined, so it is clear which one is the main action
const SECONDARY_BUTTON = `${BUTTON_BASE} bg-transparent border-black/15 text-black/70 hover:border-primary hover:text-primary`;

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error(
            `ErrorBoundary (${this.props.level}/${this.props.variant}) caught an error:`,
            error,
            errorInfo
        );
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        this.props.onReset?.();
    };

    resolveVariant() {
        const { variant } = this.props;
        const currentError = this.state.error;

        if (currentError?.status === 404) return "notFound";
        if (currentError?.status >= 500) return "server";

        return variant || "general";
    }

    // The buttons under the message
    renderActions(config, key) {
        // Trying again can't fix a missing page, so 404 only gets the "home" button
        const showRetry = key !== "notFound";

        return (
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch gap-3">
                {showRetry && (
                    <button onClick={this.handleReset} className={PRIMARY_BUTTON}>
                        <RotateCcw size={18} />
                        <span>{config.buttonText}</span>
                    </button>
                )}
                <a href="/" className={showRetry ? SECONDARY_BUTTON : PRIMARY_BUTTON}>
                    <Home size={18} />
                    <span>{config.homeButtonText || "العودة للصفحة الرئيسية"}</span>
                </a>
            </div>
        );
    }

    // Technical message: only while developing, never shown to real visitors
    renderDetails() {
        const message = this.state.error?.message;
        if (!import.meta.env.DEV || !message) return null;

        return (
            <details className="w-full max-w-xl text-start">
                <summary className="text-sm text-black/60 cursor-pointer">
                    تفاصيل تقنية (تظهر للمطور فقط)
                </summary>
                <pre
                    dir="ltr"
                    className="mt-2 p-3 rounded-md bg-black/5 text-xs text-black/80 text-left whitespace-pre-wrap break-words overflow-auto max-h-40"
                >
                    {message}
                </pre>
            </details>
        );
    }

    renderDefaultFallback() {
        const { level } = this.props;
        const key = this.resolveVariant();
        const config = ERROR_VARIANTS[key] || ERROR_VARIANTS.general;

        // A part of a page crashed: show a compact card in place of that part
        if (level === "section") {
            return (
                <div
                    role="alert"
                    className="section flex flex-col items-center justify-center gap-6 py-10 px-4 text-center"
                >
                    <img
                        src={config.image}
                        alt={config.title}
                        className="w-56 sm:w-72 md:w-80 max-w-full h-auto object-contain"
                    />
                    <div className="flex flex-col gap-2 max-w-xl">
                        <h2 className="text-xl font-bold text-black">
                            {config.title}
                        </h2>
                        <p className="text-base text-black/70 leading-relaxed">
                            {config.text}
                        </p>
                    </div>
                    {this.renderActions(config, key)}
                    {this.renderDetails()}
                </div>
            );
        }

        // level === "page" (default / full app)
        return (
            <div
                role="alert"
                className="w-full min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6 py-10"
            >
                <img
                    src={config.image}
                    alt={config.title}
                    className="w-64 sm:w-80 md:w-96 max-w-full h-auto object-contain"
                />
                <div className="flex flex-col gap-3 max-w-xl">
                    <h1 className="text-xl md:text-2xl font-bold text-black">
                        {config.title}
                    </h1>
                    <p className="text-base md:text-lg text-black/70 leading-relaxed">
                        {config.text}
                    </p>
                </div>
                {this.renderActions(config, key)}
                {this.renderDetails()}
            </div>
        );
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return typeof this.props.fallback === "function"
                    ? this.props.fallback(this.state.error, this.handleReset)
                    : this.props.fallback;
            }

            return this.renderDefaultFallback();
        }

        return this.props.children;
    }
}

ErrorBoundary.defaultProps = {
    level: "page", // "page" | "section"
    variant: "general", // "general" | "app" | "server" | "notFound"
};

export default ErrorBoundary;