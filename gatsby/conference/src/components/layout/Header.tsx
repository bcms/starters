import React, { useState } from 'react';
import Logo from '../../assets/icons/logo.inline.svg';
import { Link } from 'gatsby';
import ContactForm from '../ContactForm';

const Header: React.FC = () => {
    const [showContactForm, setShowContactForm] = useState(false);

    const nav = [
        {
            label: 'Contact us',
            onClick: () => {
                setShowContactForm(true);
            },
        },
        {
            label: 'Ticket',
            href: '#ticket',
        },
    ];

    return (
        <header>
            <div className="container">
                <nav className="flex items-center justify-between pt-6 pb-8 lg:pt-12 lg:pb-[72px]">
                    <Link to="/" className="flex" aria-label="Home page">
                        <Logo className="w-[140px]" />
                    </Link>
                    <ul className="flex items-center space-x-4 lg:space-x-10">
                        {nav.map((item, index) => (
                            <li key={index}>
                                {item.onClick ? (
                                    <button
                                        onClick={item.onClick}
                                        className="flex text-sm leading-none font-medium tracking-[-0.41px] uppercase lg:text-xl lg:leading-none"
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <Link
                                        to={item.href}
                                        className="flex text-sm leading-none font-medium tracking-[-0.41px] uppercase lg:text-xl lg:leading-none"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            {showContactForm && (
                <ContactForm onClose={() => setShowContactForm(false)} />
            )}
        </header>
    );
};

export default Header;
