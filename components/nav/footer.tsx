import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-zinc-100 p-6 md:py-10 w-full">
            <div className="container max-w-7xl text-center text-xs">
                &copy; 2024 Trendalyzer. All rights reserved.
                <div className="mt-2 flex justify-center gap-4">
                    <Link href="#" className="hover:underline" prefetch={false}>
                        Github
                    </Link>
                    <Link href="#" className="hover:underline" prefetch={false}>
                        Reddit
                    </Link>
                    <Link href="#" className="hover:underline" prefetch={false}>
                        Twitter
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;