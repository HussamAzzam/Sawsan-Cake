export default function Loader({ size = "md", fullScreen = false }) {
    const sizes = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-2",
        lg: "w-20 h-20 border-5",
    };

    const spinner = (
        <div
            className={`${sizes[size]} rounded-full  border-neutral/20 border-t-primary animate-spin`}
            role="status"
            aria-label="Loading"
        />
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
                {spinner}
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center py-10">
            {spinner}
        </div>
    );
}