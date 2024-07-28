import { PieChart, Rocket, TrendingUp } from "lucide-react";

const About = () => {
    return (
        <section id="about" className="max-w-screen py-12 md:py-24 lg:py-32 bg-zinc-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                    <div className="space-y-2">
                        <div className="rounded-lg px-2 py-1 text-sm">
                            About Our Platform
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Gain Valuable Insights with Trendalyzer
                        </h2>
                        <p className="max-w-[600px] md:text-lg/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our trend analysis platform is designed to help you stay ahead of the curve. Leverage our advanced
                            analytics tools to uncover emerging patterns, identify opportunities, and make data-driven decisions
                            that drive your business and personal branding forward.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex items-start gap-4">
                            <TrendingUp className="h-8 w-8" />
                            <div>
                                <h3 className="text-lg font-bold">
                                    Identify Trends
                                </h3>
                                <p>
                                    Discover the latest trends and patterns in your industry to stay ahead of the competition.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <PieChart className="h-8 w-8" />
                            <div>
                                <h3 className="text-lg font-bold">
                                    Analyze Data
                                </h3>
                                <p>
                                    Leverage our powerful data analysis tools to gain valuable insights and make informed decisions.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Rocket className="h-8 w-8" />
                            <div>
                                <h3 className="text-lg font-bold">
                                    Drive Growth
                                </h3>
                                <p>
                                    Use our platform to identify growth opportunities and implement strategies that propel your business
                                    forward.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;