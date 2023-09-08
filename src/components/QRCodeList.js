import React, {useEffect, useState} from 'react';
import {List, Card} from 'antd';
import {getAll} from '../api/QRCode'
import DashboardLayout from "./layouts/dashboard";
import {Link} from "react-router-dom";

const QRCodeList = () => {
  const [qrCodes, setQRCodes] = useState([]);

  useEffect(() => {
    getAll()
      .then((response) => response.json())
      .then(({qr_codes}) => setQRCodes(qr_codes));
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h2>QR Code List</h2>
        {qrCodes.length ? (
          <List
            grid={{gutter: 16, column: 3}}
            dataSource={qrCodes}
            renderItem={(qrCode) => (
              <List.Item>
                <Link to={`/detail/${qrCode.id}`}>
                  <Card title={qrCode.content} hoverable>
                    <img src={qrCode.image} alt={qrCode.content}/>
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default QRCodeList;
