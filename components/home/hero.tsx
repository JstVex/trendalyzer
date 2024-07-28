import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="max-w-screen py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Unlock Valuable Insights with Our Trend Analysis Platform
                            </h1>
                            <p className="max-w-[600px] md:text-lg">
                                Gain a competitive edge by leveraging our powerful trend analysis tools. Uncover emerging patterns,
                                identify opportunities, and make data-driven decisions.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link
                                href="/demo"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-black text-white px-8 text-sm text-primary-foreground shadow transition-colors hover:bg-zinc-800"
                                prefetch={false}
                            >
                                Try Demo
                            </Link>
                            <Link
                                href='#'
                                className="inline-flex h-10 items-center justify-center rounded-md bg-white ring-1 ring-zinc-200 px-8 text-sm font-medium shadow transition-colors hover:bg-zinc-50"
                                prefetch={false}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                    <Image
                        src='/trend.png'
                        width="550"
                        height="310"
                        alt="Hero"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;