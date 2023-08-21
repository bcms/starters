import { BlogLight } from '~~/types';
import {BCMSImage} from '~~/bcms-components';
import {OpenIcon} from '@/assets/icons/open';
import {ContentManager} from "~/components/ContentManager";
import {dateUtil} from '~/utils/date'
import NextLink from "next/link";
interface BlogsCardProps {
    blog: BlogLight;
}

export function  BlogsCard ({ blog }: BlogsCardProps): JSX.Element {
    return (
        <article>
            <NextLink href={`/blog/${blog.slug}`} passHref={true}>
              <a>
                  <BCMSImage
                      media={blog.cover}
                      options={{
                          sizes: {
                              exec: [
                                  {
                                      width: 800,
                                      height: 800,
                                  },
                              ],
                          },
                      }}
                      className="w-full cover aspect-[1.48] rounded-2xl overflow-hidden mb-4 xl:aspect-[1.04] xl:mb-6"
                  />
                  <div className="text-xs leading-none font-medium tracking-[-0.82px] text-appGray-400 mb-2 xl:text-base xl:leading-none xl:mb-4">
                      {dateUtil.format(blog.date)}
                  </div>
                  <div className="flex items-center mb-2.5 xl:mb-4">
                      <div className="text-sm leading-none font-medium tracking-[-0.41px] mr-2 xl:text-2xl xl:leading-none">
                          {blog.title}
                      </div>
                      <div className="flex items-center justify-center p-0.5 rounded bg-[#F2F2F2] xl:p-1">
                          <OpenIcon className="w-3 h-3 xl:w-4 xl:h-4" />
                      </div>
                  </div>
                  <ContentManager
                      item={blog.description}
                      className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 xl:text-xl xl:leading-[1.3]"
                  />
              </a>
            </NextLink>
        </article>
    );
}
