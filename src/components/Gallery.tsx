import React, { FC, useCallback, useMemo, useState, memo } from 'react';
import Lightbox from 'react-image-lightbox';
import { Row } from 'antd';
import Product, { ProductPropsExtra } from './Product';
import { Gutter } from 'antd/es/grid/row';

// img = src of image to display in card head
// title = optional title for image, if null then the image will be the only content in the card
// desc = optional description, recommended if you have a title
// handleClick = custom click event
export interface GalleryItem {
  img: string;
  title?: string | React.ReactElement;
  desc?: string | React.ReactElement;
  handleClick?: (e?: any) => void;
}

interface IProps {
  items: GalleryItem[];
  type?: 'card' | 'image';
  gutter?: Gutter | [Gutter, Gutter];
  [x: string]: any;
}

const GalleryComponent: FC<IProps & ProductPropsExtra> = ({ items, type, gutter, ...productProps }) => {

  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const images = useMemo(() => items.map((i: GalleryItem) => i.img), [items]);

  const handleClose = useCallback((e?: any) => setIsOpen(false), [setIsOpen]);
  const handleOpen = useCallback((i: number) => (e?: any) => {
    setPhotoIndex(i);
    setIsOpen(true);
  }, [setIsOpen]);

  const handleNext = useCallback(() => setPhotoIndex((p: number) => (p + images.length - 1) % images.length), [setPhotoIndex, images]);
  const handleBack = useCallback(() => setPhotoIndex((p: number) => (p + 1) % images.length), [setPhotoIndex, images]);

  const mainSrc = useMemo(() => images[photoIndex], [images, photoIndex]);
  const nextSrc = useMemo(() => images[(photoIndex + 1) % images.length], [images, photoIndex]);
  const prevSrc = useMemo(() => images[(photoIndex + images.length - 1) % images.length], [images, photoIndex]);

  const Items = useMemo(() => items.map((item: GalleryItem, i: number) => (
    <Product key={i} onClick={item.handleClick ? item.handleClick : handleOpen(i)} image={item.img} title={item.title} desc={item.desc} {...productProps} reveal />
  )), [items, handleOpen, productProps])

  return (
    <>

      <Row gutter={gutter}>
        {Items}
      </Row>
      {isOpen && (
        <Lightbox
          mainSrc={mainSrc}
          nextSrc={nextSrc}
          prevSrc={prevSrc}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleNext}
          onMoveNextRequest={handleBack}
        />
      )}
    </>
  );
}

GalleryComponent.displayName = 'Gallery';

export const Gallery: FC<IProps> = memo(GalleryComponent);

Gallery.defaultProps = {
  gutter: [8, 8],
  type: 'card'
};

export default Gallery;
