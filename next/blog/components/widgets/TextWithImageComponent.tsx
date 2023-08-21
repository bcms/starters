import {TextWithImageWidget} from "~/bcms/types";
import {ContentManager} from "~/components/ContentManager";
import {BCMSImage} from "~/bcms-components";
import {useMemo} from "react";
import {BCMSEntryContentParsedItem} from "@becomes/cms-client/types";

export function TextWithImageComponent (props: TextWithImageWidget): JSX.Element {
    const hasText = useMemo(() => {
        const text = props.text as BCMSEntryContentParsedItem[];
        return text && text[0].value;
    }, [])
    return (
        <div
            className={`flex flex-col gap-6 mb-6 md:mb-8 lg:gap-8 lg:items-start lg:mb-12 ${
                props.image_position.selected === 'LEFT' ? 'lg:flex-row-reverse' : 'lg:flex-row'
            }`}
        >
            {hasText && <ContentManager item={props.text} className="prose" />}
            <BCMSImage
                media={props.image}
                className={`aspect-[2.07] rounded-lg overflow-hidden w-full cover flex-shrink-0 lg:rounded-2xl ${
                    hasText
                        ? 'lg:aspect-[1.14] lg:w-[500px] lg:mb-0 xl:w-[728px]'
                        : 'lg:aspect-[2.43]'
                }`}
            />
        </div>
    );
}
