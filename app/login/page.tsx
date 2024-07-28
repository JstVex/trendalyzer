import Link from "next/link";

const Login = () => {
    return (
        <div className="container py-10 px-4 md:px-6 lg:px-10 flex flex-col text-lg">
            <h1 className="">
                We are working hard to implement user authentication to our site. Stay tuned for this.
            </h1>
            <p>
                Meanwhile check out our {''}
                <Link href='/demo' className="inline underline underline-offset-4">product demo.</Link>
            </p>
        </div>
    );
}

export default Login;