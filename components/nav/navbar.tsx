import { TrendingUp } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="px-4 lg:px-6 h-14 flex items-center border-b border-zinc-200">
            <Link href="/" className="flex items-center justify-center" prefetch={false}>
                <TrendingUp className="size-6" />
                <span className="sr-only">Trendalyzer</span>
            </Link>
            <div className="ml-auto flex gap-4 sm:gap-6">
                <Link href="/#about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    About
                </Link>
                <Link href="/demo" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Demo
                </Link>
                <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Login
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;