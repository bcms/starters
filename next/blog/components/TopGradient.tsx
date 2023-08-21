import classNames from "classnames";

export function TopGradient (props: {className?: string}): JSX.Element {
    return (
        <div
            className={classNames(
                "absolute -top-9 left-1/2 -translate-x-1/2 -translate-y-full bg-appAccent blur-[110px] w-[428px] h-[428px] rounded-full",
                         props.className
            )}
        />
    )
}
