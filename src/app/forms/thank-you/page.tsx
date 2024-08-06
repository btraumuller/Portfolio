import Link from "next/link";
export default function thankYou(){
    return (
        <div className="w-full mx-auto max-w-screen-xl flex flex-col h-[100vh]">
            <div className="py-8">
            <h1 className="text-center text-4xl">Thank you for your Submission</h1>
            <p className="text-center py-2">I will get in contact with you soon!</p>
            <div className="py-2 flex justify-center">
                <Link className="text-center" href="/">Back To Home Page</Link>
            </div>
            </div>
        </div>
    )
}
    