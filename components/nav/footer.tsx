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
                <div className="mt-2 flex justify-center gap-4">
                    <Link href="mailto:team1@example.com" className="hover:underline" prefetch={false}>
                        hh14lulu@gmail.com
                    </Link>
                    <Link href="mailto:team2@example.com" className="hover:underline" prefetch={false}>
                        ptu4@go.pasadena.edu
                    </Link>
                    <Link href="mailto:team3@example.com" className="hover:underline" prefetch={false}>
                        yzhuangzhigue@go.pasadena.edu
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;