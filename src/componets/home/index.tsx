import { useEffect, useState } from "react";
import { List, Avatar, Row, Col, Card, Button, Skeleton, Empty } from "antd";
import { AlertOutlined } from "@ant-design/icons";
import { DeviceT, getDevices } from "../../stores/factories/device";


import "./index.css";
import { RootState, useAppDispatch } from "../../stores/stores";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, get, child} from "firebase/database";
import { getApp } from "firebase/app";

const Home = () => {
  const dispatch = useAppDispatch();
  const [chooseItem, setChooseItem] = useState<DeviceT|null>(null);
  const { loading, data } = useSelector((state: RootState) => state.device);
  const { token: tokenAcc } = useSelector((state: RootState) => state.auth);
  

  const handleCheckData = (data?: DeviceT[] | null) => {
    if (!data) {
      return false;
    }

    return data.findIndex((item) => item.isConnected === true) !== -1;
  };

  const handleTurnOnOff = () => {};

  const handleToDetailDevice = () => {};

  useEffect(() => {
    dispatch(getDevices());
  }, []);

  useEffect(() => {
    const dataReceiver = data?.filter(item => item.isConnected);
    if (dataReceiver && dataReceiver?.length > 0) {
      setChooseItem(dataReceiver[0])
    }
  }, [data])

  useEffect(() => {
    if (chooseItem && chooseItem.deviceId) {
      const dbRef = ref(getDatabase(getApp()));
      get(child(dbRef, `/${chooseItem.deviceId}/isActive`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      
      // database.ref('/' + chooseItem.deviceId, (snap) => {
      //   const realTimeData = snap.val();
      // })
      const db = getDatabase();
      const starCountRef = ref(db, '/' + chooseItem.deviceId);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      });
    }
  }, [chooseItem])

  if (!data && loading) {
    return (
      <div className="body-home">
        <div className="home">
          <Skeleton />
        </div>
      </div>
    );
  }

  if (!data && !loading && !handleCheckData(data)) {
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
          <Col span={12}>
            <div className="list-device">
              <h2>Cac thiet bi da ket noi</h2>
              <List
                itemLayout="horizontal"
                dataSource={data?.filter(item => item.isConnected)}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <div>
                        <AlertOutlined className={'icon'} style={item.isConnected ? {color: '#ffc147'} : {}} />
                      </div>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://image.flaticon.com/icons/png/512/1255/1255694.png" />
                      }
                      title={item.deviceName}
                      description={'Thiet bi dang ' + (item.isConnected ? 'bat' : 'tat')}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="detail-device">
              {chooseItem ? <Card
                title={chooseItem.deviceName}
                extra={
                  <Button type="primary" shape="circle" onClick={handleTurnOnOff}>
                    Bat
                  </Button>
                }
                style={{ width: 300 }}
              >
                <p>Thoi gian su dung: 45 phut</p>
                <p>Cong suat tieu thu: 35 KWH</p>
                <Button onClick={handleToDetailDevice}>Xem chi tiet</Button>
              </Card>: <Skeleton />}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
