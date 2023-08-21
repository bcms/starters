import {
  BCMSEntryContentNodeType,
  BCMSEntryContentParsedItem,
} from '@becomes/cms-client/types';
import type { BCMSWidgetComponents } from './content-manager';


export interface BCMSContentItemI {
  item: BCMSEntryContentParsedItem
  components: BCMSWidgetComponents

  nodeParser?: (item: BCMSEntryContentParsedItem) => string
}


export function BCMSContentItem (props:  BCMSContentItemI): JSX.Element {
  function resolveWidget(name: string) {
    if (props.components[name]) {
      const Widget = props.components[name];
      return <Widget data={props.item.value} />;
    } else {
      return (
          <div style={{ display: 'none' }} data-error>
            Widget {props.item.name} is not handled
          </div>
      );
    }
  }
  return (
      <>
        {props.item.name &&
        props.item.type === BCMSEntryContentNodeType.widget ? (
           <></>
        ) : (
            <div
                dangerouslySetInnerHTML={{__html: props.nodeParser
                      ? props.nodeParser(props.item)
                      : (props.item.value as string)}}
                className={`content-primitive content--${props.item.type}`}
            />
        )}
      </>
  );
}
