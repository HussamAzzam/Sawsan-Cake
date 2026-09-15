// src/components/ErrorBoundary.jsx
import { Component } from "react";
import { ERROR_VARIANTS } from "@/config/errorBoundariesConfig";

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

    renderDefaultFallback() {
        const { level } = this.props;
        const key = this.resolveVariant();
        const config = ERROR_VARIANTS[key] || ERROR_VARIANTS.general;

        if (level === "section") {
            return (
                <div className="section flex flex-col items-center justify-start gap-10 py-10 text-center ">
                    <p className="text-neutral title bg-primary p-10 rounded-sm">
                        {config.text}
                    </p>
                    <button
                        onClick={this.handleReset}
                        className="text-md text-neutral font-semibold bg-primary py-2 px-5 rounded-md cursor-pointer border-3 border-primary hover:bg-neutral hover:text-primary"
                    >
                        {config.buttonText}
                    </button>
                    <div>
                        <img src={config.image} alt={config.title} />
                    </div>
                </div>
            );
        }

        // level === "page" (default / full app)
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
                <img
                    src={config.image}
                    alt={config.title}
                    className="w-48 h-48 object-contain"
                />
                <p className="text-neutral text-lg font-bold">
                    {config.title}
                </p>
                <p className="text-neutral/60 text-sm">
                    {config.text}
                </p>
                <button
                    onClick={this.handleReset}
                    className="text-sm underline text-neutral/70"
                >
                    {config.buttonText}
                </button>
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