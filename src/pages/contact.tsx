import styled from 'styled-components';
import { Container, FormRow, Input, TextArea, FormButton } from '../components';
import { Button as AntButton, Card, Col, message, Row, Space } from 'antd';
import * as Yup from 'yup';
import { useFormData } from '../hooks';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { encode } from '../helpers';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { Form } from 'formik-antd'

const Button = styled(FormButton)`
  margin-top: 15px;
`;

const Hidden = styled.div`
  display: none;
`;

const contactSchema = Yup.object().shape({
  question: Yup.string()
    .nullable()
    .label('First name'),
  name: Yup.string()
    .required()
    .label('Your name'),
  email: Yup.string()
    .required()
    .label('Email Address'),
  contactNumber: Yup.string()
    .required()
    .label('Contact Number'),
  message: Yup.string()
    .nullable()
    .label('Your message (Optional)'),
});

interface IProps {
  [x: string]: any;
}

const Contact: React.FC<IProps> = ({ }) => {


  const { fields, ...formikCTX } = useFormData(contactSchema, {
    onSubmit: async (values: FormikValues, actions: FormikHelpers<any>) => {
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact", ...values })
        });
        message.success({ content: 'Thanks, we will be in contact!' });
        actions.resetForm()
      } catch (e: any) {
        message.error({ content:  e?.message ?? 'Unable to submit contact request.' });
      } finally {
        actions.setSubmitting(false)
      }
    }
  });

  return (
    <>
      <div style={{ background: '#222'}}>
        <Container centered inverse>
          <Zoom><h1>Contact Us</h1></Zoom>
          <Zoom><h3>We look forward to hearing from you! We are happy to assist you with any queries!</h3></Zoom>
        </Container>
      </div>
      <Container width={'1200px'}>
        <Row>
          <Col md={12} sm={24} xs={24}>
            <Zoom><h2>Contact Details:</h2></Zoom>
            <br />
            <div>
              <Zoom><b>South Africa</b></Zoom>

              <Zoom>
                <p>
                  Sandton
                  <br />
                  Johannesburg
                  <br />
                  Bruce Kay: <a href={'tel:+27618751975'}>+27 61 875 1975</a>
                  <br />
                  Email: <a href={'mailto:bruce@necta.co.za'}>bruce@necta.co.za</a>
                </p>
              </Zoom>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Zoom>
              <Card
                type="inner"
                title="Get in touch!"
              >
                <Formik {...formikCTX} enableReinitialize validateOnBlur>
                  {({ handleSubmit, values, isSubmitting, setFieldValue }: any) => (
                    <Form layout={'vertical'} name="contact" data-netlify={true} netlify-honeypot="question">
                      <Hidden><Input {...fields.question} /></Hidden>
                      <FormRow gutter={6}>
                        <Input {...fields.name} />
                        <Input {...fields.contactNumber} />
                        <Input {...fields.email} />
                        <TextArea rows={4} {...fields.message} />
                        <Button>Submit</Button>
                      </FormRow>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Zoom>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Contact.defaultProps = {};

export default Contact;
