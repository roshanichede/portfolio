import { Heart, Coffee } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black text-white py-8 border-t-4 border-black">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <p className="text-lg font-semibold flex items-center justify-center gap-2 flex-wrap">
                        Made with <Heart className="w-5 h-5 text-red-400 animate-pulse" fill="currentColor" />
                        and lots of <Coffee className="w-5 h-5 text-yellow-400 animate-bounce" />
                    </p>
                    <p className="text-gray-400 mt-2 text-sm">© 2024 Roshani. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
