import { BarChart, Layers, PieChart, Rocket, TrendingUp, Users } from "lucide-react";

const Features = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container space-y-12 mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm">Features</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Unlock the Power of Trendalyzer
                        </h2>
                        <p className="max-w-[900px] md:text-lg/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform offers a comprehensive suite of tools to help you stay ahead of the competition. Explore
                            our key features and discover how they can transform your business.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                    <div className="flex items-start gap-4">
                        <TrendingUp className="h-8 w-8" />
                        <div>
                            <h3 className="text-lg font-bold">
                                Trend Tracking
                            </h3>
                            <p>
                                Monitor and analyze the latest trends in your industry to stay ahead of the curve.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <PieChart className="h-8 w-8" />
                        <div>
                            <h3 className="text-lg font-bold">
                                Advanced Analytics
                            </h3>
                            <p>
                                Leverage our powerful data analysis tools to uncover valuable insights and make informed decisions.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Rocket className="h-8 w-8" />
                        <div>
                            <h3 className="text-lg font-bold">
                                Growth Strategies
                            </h3>
                            <p>
                                Identify growth opportunities and implement strategies to propel your business forward.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <BarChart className="h-8 w-8" />
                        <div>
                            <h3 className="text-lg font-bold">
                                Customizable Dashboards
                            </h3>
                            <p>
                                Tailor our platform to your specific needs and preferences for a personalized experience.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Users className="h-8 w-8" />
                        <div>
                            <h3 className="text-lg font-bold">
                                Collaboration Tools
                            </h3>
                            <p>
                                Empower your team to work together seamlessly and effectively with our collaboration features.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Layers className="h-8 w-8" />
                        <div>
                            <h3 className="text-lg font-bold">
                                Scalable Platform
                            </h3>
                            <p>
                                Our platform is designed to grow with your business, ensuring you always have the tools you need.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;