import React, {useEffect, useState} from 'react';
import {Form, Input, Button, InputNumber, ColorPicker, Row, Col, Card, Layout, Menu} from 'antd';
import {useQRCodeContext} from "../context/QRCodeContext";
import {useNavigate} from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";

const QRCode = () => {
  const {createQRCode, state} = useQRCodeContext();
  const [form] = Form.useForm();
  const [qrCodeData, setQRCodeData] = useState(null);
  const navigate = useNavigate();


  const onFinish = (values) => {
    if (typeof values.background_color !== 'string') {
      values.background_color = values.background_color.toRgbString();
    }
    if (typeof values.fill_color !== 'string') {
      values.fill_color = values.fill_color.toRgbString();
    }

    createQRCode(values)
  };

  useEffect(() => {
    if (state.creatingQrCodeSuccess) {
      return navigate("/list");
    }
  }, [state]);

  return (
    <DashboardLayout>
      <Row>
        <Col
          lg={{span: 6, offset: 9}}
          xs={{span: 20, offset: 2}}
        >
          <Card title="Create Qr code">
            <Form
              form={form}
              name="qrCodeForm"
              onFinish={onFinish}
              layout="vertical"
              initialValues={{
                size: 50,
                background_color: 'rgba(255,255,255,1)',
                fill_color: 'rgba(0, 0, 0,1)',
              }}
            >
              <Form.Item
                label="Content"
                name="content"
                rules={[
                  {
                    required: true,
                    message: 'Please enter content for the QR code!',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Size"
                name="size"
                rules={[
                  {
                    required: true,
                    type: 'number',
                    message: 'Please enter the size of the QR code!',
                  },
                ]}
              >
                <InputNumber min={1}/>
              </Form.Item>
              <Form.Item
                label="Background Color"
                name="background_color"
                rules={[
                  {
                    required: true,
                    message: 'Please select a background color!',
                  },
                ]}
              >
                <ColorPicker format={'rgb'}/>
              </Form.Item>
              <Form.Item
                label="Fill Color"
                name="fill_color"
                rules={[
                  {
                    required: true,
                    message: 'Please select a fill color!',
                  },
                ]}
              >
                <ColorPicker format={'rgb'}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Generate QR Code
                </Button>
              </Form.Item>
            </Form>

            {qrCodeData && (
              <div>
                <h2>Generated QR Code Data</h2>
                <pre>{JSON.stringify(qrCodeData, null, 2)}</pre>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default QRCode;
