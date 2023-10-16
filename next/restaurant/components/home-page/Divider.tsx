import StarIcon from '@/assets/icons/star.svg';

interface HomepageDividerProps {
  arc?: boolean;
}

const HomepageDivider: React.FC<HomepageDividerProps> = ({ arc }) => {
  return (
    <div className="relative flex flex-col items-center justify-center max-w-max mx-auto my-6 lg:my-20">
      <div className="w-px h-[50px] bg-[#D9D9D9] lg:h-24" />
      <StarIcon className="relative z-10 w-6 h-6 lg:w-8 lg:h-8" />
      <div className="w-px h-[50px] bg-[#D9D9D9] lg:h-24" />
      {arc && (
        <svg
          viewBox="0 0 1299 1222"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[52px] left-1/2 -translate-x-1/2 w-[328px] h-[328px] pointer-events-none lg:w-[1299px] lg:h-[1299px] lg:top-[73px]"
        >
          <circle
            cx="649.5"
            cy="649.5"
            r="649"
            stroke="url(#paint0_linear_582_977)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_582_977"
              x1="649.5"
              y1="0"
              x2="649.5"
              y2="1299"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C2C0B8" />
              <stop offset="0.273792" stopColor="#C2C0B8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default HomepageDivider;
