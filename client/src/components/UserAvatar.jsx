import { useState } from "react"

export  default function UserAvatar({ user, size = "w-9 h-9", textSize = "text-sm" }) {
    const [failed, setFailed] = useState(false)
    const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase()

    if (!user.avatar || failed) {
        return (
            <div
                className={`${size} ${textSize} shrink-0 rounded-full border border-pink-200 bg-neutral text-primary flex items-center justify-center font-bold`}
                aria-label={user.name || "User"}
            >
                {initial}
            </div>
        )
    }

    return (
        <img
            src={user.avatar}
            alt={user.name || "User"}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className={`${size} shrink-0 rounded-full border border-pink-200 object-cover`}
        />
    )
}
