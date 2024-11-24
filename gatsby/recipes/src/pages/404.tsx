import { Link, PageProps } from 'gatsby';
import PageWrapper from '../components/PageWrapper';
import React from 'react';

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <div className="flex flex-col items-center gap-6 justify-center my-auto h-screen lg:gap-10">
            <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
                Page Not Found
            </h1>
            <Link
                to="/"
                className="flex items-center leading-none font-medium transition-colors duration-300 border border-transparent focus:outline-none lg:text-xl lg:leading-none bg-appAccent text-appGray-200 hover:bg-appGray-200 hover:text-appAccent hover:border-appAccent p-2.5 rounded-[5px] text-xs lg:px-6 lg:py-4 lg:rounded-lg"
            >
                Go back home
            </Link>
        </div>
    );
};

export default NotFoundPage;
