import { Btn } from '@/components/Btn';
import { Metadata } from 'next';

const pageTitle = 'Page not found - Moda';
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
            <Btn theme="dark-green" label="Go back home" to="/" />
        </div>
    );
}

export default NotFoundPage;
