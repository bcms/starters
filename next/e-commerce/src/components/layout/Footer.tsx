import Link from 'next/link';

export const Footer: React.FC = () => {
    const nav = [
        {
            label: 'Navigation',
            items: [
                {
                    label: 'Shop',
                    to: '/shop',
                },
                {
                    label: 'Blog',
                    to: '/blog',
                },
            ],
        },
        {
            label: 'Customer care',
            items: [
                {
                    label: 'Shipping',
                    to: '/legal',
                },
                {
                    label: 'Terms and conditions',
                    to: '/legal',
                },
                {
                    label: 'Privacy and policy',
                    to: '/legal',
                },
            ],
        },
        {
            label: 'Contact',
            items: [
                {
                    label: '+1 823 1923 123',
                    to: 'tel:18231923123',
                },
                {
                    label: 'modawear@mail.com',
                    to: 'mailto:modawear@mail.com',
                },
            ],
        },
        {
            label: 'Social media',
            items: [
                {
                    label: 'Instagram',
                    to: 'https://www.instagram.com',
                },
                {
                    label: 'X',
                    to: 'https://x.com/',
                },
                {
                    label: 'Facebook',
                    to: 'https://www.facebook.com/',
                },
            ],
        },
    ];

    return (
        <footer className="bg-appGray-200 pt-[72px]">
            <div className="container">
                <nav className="grid grid-cols-1 gap-[55px] pb-14 border-b border-[#ccc] md:grid-cols-2 lg:grid-cols-4">
                    {nav.map((col, index) => {
                        return (
                            <div key={index} className="footer--col">
                                <p className="text-lg leading-none mb-4 md:text-xl md:mb-8">
                                    {col.label}
                                </p>
                                <ul className="grid grid-cols-1 gap-6">
                                    {col.items.map((colItem, itemIndex) => {
                                        return (
                                            <li
                                                key={itemIndex}
                                                className="text-xl leading-none md:text-2xl"
                                            >
                                                <Link
                                                    href={colItem.to}
                                                    className="hover:underline"
                                                >
                                                    {colItem.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </nav>
                <div className="py-10">
                    <a
                        href="https://thebcms.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5"
                    >
                        <span className="leading-none tracking-[-0.41px] text-gray-700">
                            Powered by
                        </span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo-dark.png"
                            alt="BCMS"
                            className="w-[60px] lg:w-[83px]"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};
