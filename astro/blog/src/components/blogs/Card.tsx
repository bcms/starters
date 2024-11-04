import OpenIcon from '../../assets/icons/open.svg?raw';
import { ContentManager } from '../../components/ContentManager';
import { type FC } from 'react';
import { type BlogLite } from '../../utils/blog';
import { BCMSImage } from '@thebcms/components-react';
import { type ClientConfig } from '@thebcms/client';
import { toReadableDate } from '../../utils/date';

interface Props {
    blog: BlogLite;
    bcmsConfig: ClientConfig;
}

const BlogCard: FC<Props> = ({ blog, bcmsConfig }) => {
    return (
        <article>
            <a href={`/blog/${blog.slug}`}>
                <BCMSImage
                    media={blog.cover}
                    clientConfig={bcmsConfig}
                    className="w-full object-cover aspect-[1.48] rounded-2xl overflow-hidden mb-4 xl:aspect-[1.04] xl:mb-6"
                />
                <div className="text-xs leading-none font-medium tracking-[-0.82px] text-appGray-400 mb-2 xl:text-base xl:leading-none xl:mb-4">
                    {toReadableDate(blog.date)}
                </div>
                <div className="flex items-center mb-2.5 xl:mb-4">
                    <div className="text-sm leading-none font-medium tracking-[-0.41px] mr-2 xl:text-2xl xl:leading-none">
                        {blog.title}
                    </div>
                    <div className="flex items-center justify-center p-0.5 rounded bg-[#F2F2F2] xl:p-1">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: OpenIcon,
                            }}
                            className="w-3 h-3 xl:w-4 xl:h-4"
                        />
                    </div>
                </div>
                <ContentManager
                    items={blog.description.nodes}
                    className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 xl:text-xl xl:leading-[1.3]"
                />
            </a>
        </article>
    );
};

export default BlogCard;
