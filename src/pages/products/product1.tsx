import { FC } from 'react';
import { Container } from '../../components';
import Zoom from 'react-reveal/Zoom';

interface IProps {
  [x: string]: any;
}

const Product1: FC<IProps> = ({}) => {
  return (
    <Container centered>
      <Zoom><h1>I am a Product</h1></Zoom>
      <Zoom>
        <p>
          Nunc luctus quis ipsum ornare aliquam. Duis mollis purus eu dui porta, eu sagittis libero vehicula.
          <br />Mauris et quam nisl. Cras et feugiat ipsum, sed vulputate massa.
        </p>
      </Zoom>
    </Container>
  );
};

Product1.defaultProps = {};

export default Product1;
