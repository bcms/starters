import { Metadata } from 'next';
import Link from 'next/link';

const pageTitle = 'Page not found - Simple Blog';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center gap-6 justify-center my-auto min-h-[400px] lg:gap-10">
            <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
                Page Not Found
            </h1>
            <Link
                href="/"
                className="border border-appGray-200 bg-appGray-100 flex leading-none px-3 py-2 text-xl font-medium rounded-lg transition-colors duration-300 hover:bg-appGray-200 focus-visible:bg-appGray-200 md:px-5 md:py-4 md:text-2xl"
            >
                Go back home
            </Link>
        </div>
    );
}

export default NotFoundPage;
