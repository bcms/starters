import { Metadata } from 'next';
import Link from 'next/link';
import ArrowIcon from '@/assets/icons/arrow.svg';

const pageTitle = 'Page not found - Blog';
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
        <div className="flex flex-col gap-6 items-center justify-center min-h-[400px] lg:gap-10 lg:min-h-[550px]">
            <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
                Page Not Found
            </h1>
            <Link
                href="/"
                className="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
            >
                <span className="text-sm leading-none tracking-[-0.41px] mr-1.5 md:text-base md:leading-none md:mr-2 lg:text-xl lg:leading-none">
                    Go back home
                </span>
                <ArrowIcon className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
            </Link>
        </div>
    );
}

export default NotFoundPage;
