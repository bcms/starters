export function OpenIcon ({className}: {className: string}): JSX.Element {
    return (
        <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask
                id="mask0_1033_871"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="12"
                height="12"
            >
                <rect width="12" height="12" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1033_871)">
                <path
                    d="M2.5 10.5C2.225 10.5 1.98958 10.4021 1.79375 10.2063C1.59792 10.0104 1.5 9.775 1.5 9.5V2.5C1.5 2.225 1.59792 1.98958 1.79375 1.79375C1.98958 1.59792 2.225 1.5 2.5 1.5H6V2.5H2.5V9.5H9.5V6H10.5V9.5C10.5 9.775 10.4021 10.0104 10.2063 10.2063C10.0104 10.4021 9.775 10.5 9.5 10.5H2.5ZM4.85 7.85L4.15 7.15L8.8 2.5H7V1.5H10.5V5H9.5V3.2L4.85 7.85Z"
                    fill="#181A2C"
                />
            </g>
        </svg>
    )
}
