import React, { FC, memo } from 'react';
import { Card, Col } from 'antd';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

// title = has title and meta section
// matchHeight = match usual height of card with meta and title
const Bg = styled.div<{ bgSize?: string, image?: string, title?: boolean, matchHeight?: boolean }>`
  height: ${p => p.title ? '200px' : (p.matchHeight ? '361px' : '280px') };
  background: url(${p => p.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${p => p.bgSize ? p.bgSize : 'cover' };
  width: 100%;
`;

const CCard = styled(Card)<{ title?: boolean }>`
  && {
    border: ${p => !p.title && 'none'};
    .ant-card-body {
      padding: ${p => !p.title && '0'};
    }
    :hover {
      .ant-card-cover {
        -webkit-filter: brightness(70%);
      }
    }
    .ant-card-cover {
      -webkit-transition: all 0.4s ease-in-out;
      -moz-transition: all 0.4s ease-in-out;
      -o-transition: all 0.4s ease-in-out;
      -ms-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
    }
    .ant-card-head {
      display: none !important;
    }
  }
`;

interface ProductProps {
  image: any;
  title?: any;
  desc?: any;
  onClick?: (e?: any) => any;
  [x: string]: any;
}

export interface ProductPropsExtra {
  gridProps?: any;
  bgProps?: any;
  height?: string;
  reveal?: boolean;
  matchHeight?: boolean;
}

const Product: FC<ProductProps & ProductPropsExtra> = ({ gridProps = { lg:8, md:12, xs: 24 }, reveal, ...props }) => {

  if (reveal) {
    return (
      <Col {...gridProps}>
        <Fade>
          <ProductInner {...props} />
        </Fade>
      </Col>
    )
  }

  return (
    <Col {...gridProps}>
      <ProductInner {...props} />
    </Col>
  );
};

const ProductComponent: FC<any> = ({ image, bgProps, onClick, title, desc, height, matchHeight }) => {
  return (
    <CCard hoverable cover={<Bg image={image} {...bgProps} title={!!title} matchHeight={matchHeight} />} onClick={onClick} title={!!title}>
      {title && <Card.Meta title={title} description={desc} style={{ height }} />}
    </CCard>
  )
};

ProductComponent.displayName = 'ProductInner';

const ProductInner: FC<any> = memo(ProductComponent);

Product.defaultProps = {
  height: '120px',
};

export default Product;
