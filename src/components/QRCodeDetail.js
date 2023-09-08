import React, {useEffect, useState} from 'react';
import {Card, Button} from 'antd';
import {useParams, useNavigate} from 'react-router-dom';
import {getById} from '../api/QRCode'
import DashboardLayout from "./layouts/dashboard";

const {Meta} = Card;

const QRCodeDetail = () => {
  const navigate = useNavigate();
  const [qrCode, setQRCode] = useState(null);
  const {id} = useParams();


  useEffect(() => {
    getById(id)
      .then((response) => response.json())
      .then(({qr_code}) => setQRCode(qr_code));
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <DashboardLayout>
      <div>
        <h2>QR Code Detail</h2>
        <Button onClick={handleBack} type="primary">
          Back
        </Button>

        {qrCode ? (
          <Card
            hoverable
            style={{width: 240}}
            cover={<img alt="example" src={qrCode.image}/>}
          >
            <Meta title={qrCode.content}/>
          </Card>
        ) : null}

      </div>
    </DashboardLayout>
  );
};

export default QRCodeDetail;
