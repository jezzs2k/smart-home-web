import { useEffect, useState } from "react";
import { List, Avatar, Row, Col, Card, Button, Skeleton, Empty, Progress, Spin } from "antd";
import { AlertOutlined, LoadingOutlined } from "@ant-design/icons";
import {useNavigate} from 'react-router-dom';
import { DeviceT, getDevices } from "../../stores/factories/device";
import { Button as ButtonBT } from 'react-bootstrap';

import "./index.css";
import { RootState, useAppDispatch } from "../../stores/stores";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, off, onDisconnect, set} from "firebase/database";
import { KeyStogare } from "../../config/KeyStorage";
import { Colors } from "../../config";

const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

const Home = () => {
  const getItem = localStorage.getItem(KeyStogare.CHOOSE_ITEM);
  const choosedItem = getItem ? JSON.parse(getItem) : null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [chooseItem, setChooseItem] = useState<DeviceT|null>(choosedItem);
  const [dataFirebaseConnected, setDataFirebaseConnected] = useState<any>(null);
  const { loading, data } = useSelector((state: RootState) => state.device);
  const { token: tokenAcc } = useSelector((state: RootState) => state.auth);
  const [dataDevices, setDataDevices] = useState<DeviceT[] | null>(null);
  const [listItem, setListItem] = useState([
    {
      title: 'Thời gian sử dụng: ',
      value: '0 Phút',
    },
    {
      title: 'Lượng điện tiêu thụ: ',
      value: '0 KWH',
    },
  ]);
  

  const handleCheckData = (data?: DeviceT[] | null) => {
    if (!data) {
      return false;
    }

    return data.findIndex((item) => item.isConnected === true) !== -1;
  };

  const handleTurnOnOff = () => {
    if (chooseItem) {
      const db = getDatabase();
      const starCountRef = ref(db, '/' + chooseItem.deviceId + '/isTurnOn');

      set(starCountRef,  dataFirebaseConnected.isTurnOn === 'true' ? 'false' : 'true');
    }
   
  };

  const handleChooseItem = (item: DeviceT) => {
    if (item.id !== chooseItem?.id) {
      localStorage.setItem(KeyStogare.CHOOSE_ITEM, JSON.stringify(item));
      setChooseItem(item);
      setListItem([
        {
          title: 'Thời gian sử dụng: ',
          value: '0 Phút',
        },
        {
          title: 'Lượng điện tiêu thụ: ',
          value: '0 KWH',
        },
      ])
    }
  };

  const handleToDetailDevice = () => {
    navigate('/device-detail/' + chooseItem?.deviceId, {replace: false})
  };

  const handleSetDataMinute = (data: any) => {
    let valueEnrgy: any = {};
    if (!data?.energy) {
      return;
    };

    data.energy.split(",").forEach((item: string, index: number) => {
      if(index === 0) {
        valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
      }
      
      if(item !== "}"){
        valueEnrgy[item.split(":")[0]] = item.split(":")[1]
        }
    });

    const temps = listItem.map((item, index) => {
      if (index === 0) {
        if (data.isTurnOn === 'true') {
          return {...item, value: String(Math.floor((data.totalTimeOn + new Date().getTime() - data.startTime)/(1000*60))) + ' Phút'}
        };
        return {...item, value: String(Math.floor((data.totalTimeOn)/(1000*60))) + ' Phút'}
      }else {
        return {...item, value: String(valueEnrgy.power || 0)+ ' KWH'};
      }
    });

    setListItem(temps);
  }

  useEffect(() => {
    dispatch(getDevices());
  }, []);

  useEffect(() => {
    const dataReceiver = data?.filter(item => item.isConnected);
    if (dataReceiver && dataReceiver?.length > 0) {
      setDataDevices(dataReceiver);
      localStorage.setItem(KeyStogare.CHOOSE_ITEM, JSON.stringify(dataReceiver[0]));
      !localStorage.getItem(KeyStogare.CHOOSE_ITEM) && (dataReceiver[0].id !== chooseItem?.id) &&  setChooseItem(dataReceiver[0])
    }
  }, [data])

  useEffect(() => {
    if (chooseItem && chooseItem.deviceId) {
      const db = getDatabase();
      const starCountRef = ref(db, '/' + chooseItem.deviceId);
      
      onDisconnect(starCountRef);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setDataFirebaseConnected(data);
          handleSetDataMinute(data);
        }
      });
    }

    return () => {
      if (chooseItem && chooseItem.deviceId) {
        const db = getDatabase();
        const starCountRef = ref(db, '/' + chooseItem.deviceId);

        off(starCountRef, 'value')
      }
    };
  }, [chooseItem])

  useEffect(() => {
    if (dataFirebaseConnected) {
      const dataReceiver = data?.filter(item => item.isConnected);
      if (dataReceiver && dataReceiver?.length > 0) {
        if (dataDevices && dataDevices?.length > 0) {
          const values = dataDevices?.map((item: DeviceT) => {
            if (item.deviceId === chooseItem?.deviceId) {
              return {...item, isTurnOn:  dataFirebaseConnected.isTurnOn === 'true' ? true : false}
            }
  
            return item;
          })
          setDataDevices(values);
        }
      }
    }
  }, [dataFirebaseConnected])

  if (!dataDevices && loading) {
    return (
      <div className="body-home">
        <div className="home">
          <Skeleton />
        </div>
      </div>
    );
  }

  if (!dataDevices && !loading && !handleCheckData(data)) {
    return (
      <div className="body-home">
        <div className="home">
          <Empty />
        </div>
      </div>
    );
  }

  if (!dataDevices) {
    return (
      <div className="body-home">
        <div className="home">
          <Empty />
        </div>
      </div>
    );
  }


  return (
    <div className="body-home">
      <div className="home">
        <Row>
          <Col xl={12} lg={{ order: 1,  span: 12 }} md={15}>
            <div className="list-device">
              <h3 style={{paddingTop: 30, marginBottom: 30}}>Các thiết bị đã kết nối</h3>
              <List
                itemLayout="horizontal"
                dataSource={dataDevices as DeviceT[]}
                renderItem={(item) => (
                  <List.Item
                    style={{borderRadius: '8px', borderBottom: '0px', backgroundColor: Colors.BG, marginTop: '6px', marginBottom: '6px', ...(item.isTurnOn ? {backgroundColor: 'rgb(255 210 63)'} : {})}}
                    actions={[
                      <Button type='link' onClick={() => handleChooseItem(item)}>Theo dõi thiết bị</Button>,
                      <div>
                        <AlertOutlined className={'icon'} style={item.isTurnOn ? {color: Colors.WHITE} : {}} />
                      </div>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://image.flaticon.com/icons/png/512/1255/1255694.png" />
                      }
                      title={item.deviceName}
                      description={'Thiết bị đang ' + (item?.isTurnOn ? 'bật' : 'tắt')}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col xl={12} lg={{ order: 1, span: 10 }} md={9}>
            <div className="detail-device">
              {dataFirebaseConnected && chooseItem ? <Card
                title={chooseItem.deviceName}
                extra={
                  dataFirebaseConnected?.isTurnOn === 'false'? <ButtonBT onClick={handleTurnOnOff} variant="success">Bật</ButtonBT> :
                  <ButtonBT onClick={handleTurnOnOff} variant="danger">Tắt</ButtonBT>
                }
                style={{ width: 300,borderRadius: '8px', padding: 16 }}
              >
                <p>Thời gian sữ dụng: {listItem[0].value}</p>
                <p>Công suất tiêu thụ: {listItem[1].value}</p>
                <Button onClick={handleToDetailDevice}>Xem chi tiết</Button>
              </Card>: <Skeleton />}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
