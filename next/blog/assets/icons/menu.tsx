export function MenuIcon ({className}: {className: string}): JSX.Element {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
                <path fill="#D9D9D9" d="M0 0h24v24H0z" />
            </mask>
            <g mask="url(#a)">
                <path fill="#272424" d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z" />
            </g>
        </svg>
    )
}
