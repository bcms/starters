import type {
  BCMSEntryContentParsedItem,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';
import { BCMSContentItem } from './content-item';
import classNames from "classnames";
import {CSSProperties, RefObject} from "react";
export interface BCMSWidgetComponents {
  [name: string]: any
}

export interface BCMSContentManagerI {
  id?: string
  className?: string

  style?: CSSProperties

  items: Array<BCMSPropRichTextDataParsed>

  widgetComponents: BCMSWidgetComponents

  nodeParser?: (item: BCMSEntryContentParsedItem) => string

  ref?: RefObject<any>
}


export function BCMSContentManager (props: BCMSContentManagerI): JSX.Element {
  return   (
      <div
          id={props.id}
          style={props.style}
          className={classNames('content', props.className)}
          ref={props.ref}
      >
        {props.items.map((_item, _itemIdx) => {
          return (
              <>
                {Array.isArray(_item) ? (
                    <>
                      {_item.map((item, itemIdx) => {
                        return (
                            <BCMSContentItem
                                key={`${_itemIdx}_${itemIdx}`}
                                item={item as any}
                                components={props.widgetComponents}
                                nodeParser={props.nodeParser}
                            />
                        );
                      })}
                    </>
                ) : (
                    <BCMSContentItem
                        key={_itemIdx}
                        item={_item}
                        components={props.widgetComponents}
                        nodeParser={props.nodeParser}
                    />
                )}
              </>
          );
        })}
      </div>
  )
}
