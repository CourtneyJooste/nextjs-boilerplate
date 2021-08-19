// import '../styles/globals.css'
import 'react-image-lightbox/style.css';
import type { AppProps } from 'next/app'
import reportWebVitals from '../components/reportWebVitals';
import { BackTop, Button, Layout, Tooltip } from 'antd';
import styled, { ThemeProvider } from 'styled-components';
import { Navbar, Footer } from '../components';
import { UpOutlined } from '@ant-design/icons';
import { NavItem } from '../hooks';
import Head from 'next/head';
require('../styles/global.less');

const { Content } = Layout;

const Page = styled(Content)`
  overflow-y: auto;
  height: 100%;
  margin-top: 64px;
  width: 100%;
  // Change min height here if you want the height to scale based
  // on navbar and footer height
  min-height: calc(100vh - 64px - 70px);
`;

// Globally accessible theme variables here
// In styled component eg: color: ${p => p.theme.primary}
const theme = {
  primary: '#222',
  secondary: '#FFD54F',
  inverse: '#F0F2F5'
}

// Edit navbar items here
const navbarItems: NavItem[] = [
  { id: 'about', title: 'About', route: '/about'},
  { id: 'products', title: 'Products', route: '/products', subTitle: 'Our Products', subRoutes: [
      { id: 'product1', title: 'Product 1', route: '/products/product1' },
      { id: 'product2', title: 'Product 2', route: '/products/product2' },
      { id: 'product3', title: 'Product 3', route: '/products/product3' }
    ]},
  { id: 'contact', title: 'Contact', route: '/contact'},
];

// Head component can be moved into separate pages so that the title is dynamic per page
// Other meta info will be populated here
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NectaTech Starter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout style={{ height: '100%' }}>
          <Navbar items={navbarItems} logo={'/assets/logo.svg'} />
          <Page>
            <Component {...pageProps} />
            <BackTop>
              <Tooltip title="Back to top">
                <Button shape="circle" icon={<UpOutlined />} />
              </Tooltip>
            </BackTop>
          </Page>
          <Footer />
        </Layout>
      </ThemeProvider>
    </>
  );
}
export default MyApp

reportWebVitals();
