import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import {
  BCMSMediaParsed,
} from '@becomes/cms-client/types'

import {BCMSMostImageProcessorProcessOptions} from '@becomes/cms-most/types'

import {
  BCMSImageConfig,
  createBcmsImageHandler,
} from '@becomes/cms-most/frontend';

interface BCMSImageProps {
  media: BCMSMediaParsed;
  className?: string;
  style?: CSSProperties;
  id?: string;
  options?: BCMSMostImageProcessorProcessOptions;
  svg?: boolean;
}

export function  BCMSImage (props: BCMSImageProps): JSX.Element{

  const [handler, setHandler] = useState(createBcmsImageHandler(props.media, props.options));
  const container = useRef<HTMLDivElement | null>(null);
  const [srcSet, setSrcSet] = useState(handler.getSrcSet());
  let mediaBuffer = JSON.stringify(props.media);
  let optionsBuffer = props.options ? JSON.stringify(props.options) : '';

  const resizeHandler = () => {
    if (container.current) {
      const el = container.current;
      setSrcSet(handler.getSrcSet({ width: el.offsetWidth }));
    }
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (
        mediaBuffer !== JSON.stringify(props.media) ||
        (!props.options && optionsBuffer) ||
        (props.options && optionsBuffer !== JSON.stringify(props.options))
    ) {
      mediaBuffer = JSON.stringify(props.media);
      optionsBuffer = props.options ? JSON.stringify(props.options) : '';
      const newHandler = createBcmsImageHandler(props.media, props.options);
      setHandler(newHandler);
      resizeHandler();
    }
  }, [props.media, props.options]);

  return (
      <div
          id={props.id}
          className={`bcmsImage ${props.className || ''}`}
          style={props.style}
          ref={container}
          data-bcms-img-w={srcSet[2]}
          data-bcms-img-h={srcSet[3]}
          data-bcms-img-src={props.media?.src}
          data-bcms-img-ops={handler.optionString}
          data-bcms-img-idx={srcSet[4]}
      >
        {handler.parsable ? (
            <picture>
              <source srcSet={srcSet[0]} />
              <source srcSet={srcSet[1]} />
              <img
                  data-bcms-image={handler.optionString + ';' + props.media.src}
                  src={
                    BCMSImageConfig.localeImageProcessing
                        ? '/bcms-media' + props.media.src
                        : srcSet[1]
                  }
                  alt={props.media.alt_text}
                  width={srcSet[2]}
                  height={srcSet[3]}
              />
            </picture>
        ) : props.svg && props.media.svg ? (
            <div dangerouslySetInnerHTML={{ __html: props.media.svg }} />
        ) : (
            <img
                src={srcSet[1]}
                alt={props.media.alt_text}
                width={props.media.width}
                height={props.media.height}
            />
        )}
      </div>
  );
}

export default BCMSImage;
