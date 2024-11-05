import HeadphonesIcon from '../assets/icons/headphones.svg?raw';

const ContactUs = ({ className }: { className?: string }) => {
    return (
        <a
            href="/contact"
            className={`${className} flex items-center gap-2 flex-shrink-0 bg-white px-[9px] py-2 rounded-[7px] transition-colors duration-300 hover:bg-appAccent-300 hover:text-appText-light lg:px-4 lg:py-3`}
            style={{
                boxShadow:
                    '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
            }}
        >
            <div
                dangerouslySetInnerHTML={{ __html: HeadphonesIcon }}
                className="w-4 h-4"
            />
            <span className="font-Inter text-sm font-medium leading-none tracking-[-0.28px]">
                Contact Us
            </span>
        </a>
    );
};

export default ContactUs;
