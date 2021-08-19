import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { useDeviceSize } from '../hooks';
import { Carousel } from 'antd';
import styled from 'styled-components';

const Slide = styled.div<{ image?: string }>`
  height: 600px;
  background: url(${p => p.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    height: 500px;
  }
`;

// images = list of images to display
// component = optional component to place images in (eg you want different height etc)
// Defaults to Slide component
interface IProps {
  images: string[];
  component?: React.FC;
  [x: string]: any;
}

export const Slides: FC<IProps> = ({ images, component }) => {

  const ref = useRef<any>(null);

  const [width] = useDeviceSize();

  const [_slides] = useState<string[]>([...images]);

  const Component: React.FC<any> = useMemo(() => component ?? Slide, [component]);

  const handleClick = useCallback((e?: any) => {
    e.stopPropagation();
    if (e.clientX > width/2) ref?.current?.next();
    if (e.clientX <= width/2) ref?.current?.prev();
  }, [width, ref]);
  return (
    <Carousel autoplay autoplaySpeed={3000} ref={ref}>
      { _slides.map((slide: string, i: number) => <Component key={i} image={slide} onClick={handleClick} />)}
    </Carousel>
  );
};

Slides.defaultProps = {};

export default Slides;
