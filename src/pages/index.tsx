import type { NextPage } from 'next'
import styled from 'styled-components';
import { Gallery, Container, GalleryItem, Slides } from '../components';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { message } from 'antd';

const demoImages: string[] = [
  '/assets/one.jpg',
  '/assets/two.jpg',
  '/assets/three.jpg'
];

const demoProducts: GalleryItem[] = [
  { img: '/assets/1.svg' },
  { img: '/assets/2.svg' },
  { img: '/assets/3.svg' },
];

const demoProductsLarge: GalleryItem[] = [
  { img: '/assets/1.svg', title: 'One Product', desc: 'Lorem ipsum dolor sit amet' },
  { img: '/assets/2.svg', title: 'Another Product', desc: <>Lorem ipsum dolor sit amet<br /><a>Link</a></> },
  { img: '/assets/3.svg', title: 'My name Jeff', desc: 'Lorem ipsum dolor sit amet', handleClick: (e?: any) => message.info('Custom click event') },
];

const Home: NextPage = () => {
  return (
    <>
      <Slides images={demoImages} />
      <Container centered>
        <Zoom><h1>This is a Title</h1></Zoom>
        <Fade><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Mauris pharetra, purus sed egestas lacinia, ligula odio suscipit turpis, et malesuada odio erat non nisi.
        </p></Fade>
        <Fade><p>Mauris id dui a libero pellentesque facilisis. Duis vitae ex non leo euismod blandit quis vel lorem.
          In eleifend eros non risus egestas mattis.</p></Fade>
        <Fade><p>Duis suscipit convallis interdum. In orci eros, sollicitudin quis felis sit amet, pellentesque viverra augue.
          Aliquam ultrices eu magna ornare dictum. Sed at porta massa. Sed eget diam leo. Donec venenatis justo augue, ut egestas turpis volutpat ut.
          Ut eleifend accumsan eros, eu elementum ex fringilla vel.</p></Fade>
      </Container>
      <Container centered width={'1200px'}>
        <Zoom><h1>Gallery</h1></Zoom>
        <Gallery items={demoProducts} />
      </Container>
      <Container centered width={'1200px'}>
        <Zoom><h1>Gallery Cards</h1></Zoom>
        <Gallery items={demoProductsLarge} bgProps={{ bgSize: 'contain' }} />
      </Container>
    </>
  )
}

export default Home
