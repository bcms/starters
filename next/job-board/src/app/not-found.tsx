import Button from '@/components/Btn';
import { Metadata } from 'next';

const pageTitle = 'Page not found - Hospitale';
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
        <div className="my-auto h-full flex flex-col gap-6 items-center justify-center lg:gap-10">
            <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
                Page Not Found
            </h1>
            <Button to="/"> Go back home </Button>
        </div>
    );
}

export default NotFoundPage;
