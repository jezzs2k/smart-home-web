import { useEffect, useState } from "react";
import {
  List,
  Avatar,
  Row,
  Col,
  Card,
  Button,
  Skeleton,
  Empty,
  Modal,
  Input,
  notification,
} from "antd";
import { AlertOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  deleteDevice,
  DeviceT,
  getDevices,
} from "../../stores/factories/device";
import { Button as ButtonBT } from "react-bootstrap";

import "./index.css";
import { RootState, useAppDispatch } from "../../stores/stores";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  off,
  onDisconnect,
  set,
} from "firebase/database";
import { KeyStogare } from "../../config/KeyStorage";
import { Colors } from "../../config";
import { resetDeleteDevice } from "../../stores/device";
import useDebounce from "../../hooks/useDebounce";

const { Search } = Input;

let cacheDataDevices: DeviceT[] = [];

const openNotification = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  notification.open({
    message: title,
    description: content,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

const Home = () => {
  const getItem = localStorage.getItem(KeyStogare.CHOOSE_ITEM);
  const choosedItem = getItem ? JSON.parse(getItem) : null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [chooseItem, setChooseItem] = useState<DeviceT | null>(choosedItem);
  const [dataFirebaseConnected, setDataFirebaseConnected] = useState<any>(null);
  const { loading, data, deleteSuccess } = useSelector(
    (state: RootState) => state.device
  );
  const { token: tokenAcc } = useSelector((state: RootState) => state.auth);
  const [dataDevices, setDataDevices] = useState<DeviceT[] | null>(null);
  const [itemDelete, setItemDelete] = useState<DeviceT | null>(null);
  const [listItem, setListItem] = useState([
    {
      title: "Thời gian sử dụng: ",
      value: "0 Phút",
    },
    {
      title: "Lượng điện tiêu thụ: ",
      value: "0 KWH",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [text, setText] = useState("");

  const showModal = (item: DeviceT) => {
    setItemDelete(item);
    setModalText(
      "Bạn có chắn chắn muốn xóa " +
        item.deviceName +
        " " +
        "ra khỏi tài khoản của bạn!"
    );
    setVisible(true);
  };

  const handleOk = () => {
    if (itemDelete) {
      setModalText("Thiết bị sẽ được xóa trong 2s");
      setConfirmLoading(true);
      localStorage.removeItem(KeyStogare.CHOOSE_ITEM);
      setTimeout(() => {
        dispatch(deleteDevice(itemDelete.deviceId));
        setVisible(false);
        setConfirmLoading(false);
        dispatch(getDevices());
      }, 2000);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCheckData = (data?: DeviceT[] | null) => {
    if (!data) {
      return false;
    }

    return data.findIndex((item) => item.isConnected === true) !== -1;
  };

  const handleTurnOnOff = () => {
    if (chooseItem) {
      const db = getDatabase();
      const starCountRef = ref(db, "/" + chooseItem.deviceId + "/isTurnOn");

      set(
        starCountRef,
        dataFirebaseConnected.isTurnOn === "true" ? "false" : "true"
      );
    }
  };

  const handleChooseItem = (item: DeviceT) => {
    if (item.id !== chooseItem?.id) {
      localStorage.setItem(KeyStogare.CHOOSE_ITEM, JSON.stringify(item));
      setChooseItem(item);
      setListItem([
        {
          title: "Thời gian sử dụng: ",
          value: "0 Phút",
        },
        {
          title: "Lượng điện tiêu thụ: ",
          value: "0 KWH",
        },
      ]);
    }
  };

  const handleToDetailDevice = () => {
    navigate("/device-detail/" + chooseItem?.deviceId, { replace: false });
  };

  const handleSetDataMinute = (data: any) => {
    let valueEnrgy: any = {};
    if (!data?.energy) {
      return;
    }

    data.energy.split(",").forEach((item: string, index: number) => {
      if (index === 0) {
        valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
      }

      if (item !== "}") {
        valueEnrgy[item.split(":")[0]] = item.split(":")[1];
      }
    });

    const temps = listItem.map((item, index) => {
      if (index === 0) {
        if (data.isTurnOn === "true") {
          return {
            ...item,
            value:
              String(
                Math.floor(
                  (data.totalTimeOn + new Date().getTime() - data.startTime) /
                    (1000 * 60)
                )
              ) + " Phút",
          };
        }
        return {
          ...item,
          value: String(Math.floor(data.totalTimeOn / (1000 * 60))) + " Phút",
        };
      } else {
        return { ...item, value: String(valueEnrgy.power || 0) + " KWH" };
      }
    });

    setListItem(temps);
  };

  const handleSearch = (value: string) => {
    if (value && dataDevices) {
      const newDataDevice = cacheDataDevices?.filter((item) =>
        item.deviceName.toLocaleUpperCase().includes(value.toLocaleUpperCase())
      );
      setDataDevices(newDataDevice);
    } else {
      cacheDataDevices.length > 0 && setDataDevices(cacheDataDevices);
    }
  };

  useDebounce(
    () => {
      handleSearch(text);
    },
    200,
    [text]
  );

  useEffect(() => {
    if (deleteSuccess) {
      openNotification({
        title: "Đã xóa thiết bị",
        content: "Thiết bị đã bị xóa, bạn có thể kết nối lại bằng điện thoại",
      });
      dispatch(resetDeleteDevice());
    }
  }, [deleteSuccess]);

  useEffect(() => {
    dispatch(getDevices());
  }, []);

  useEffect(() => {
    const dataReceiver = data?.filter((item) => item.isConnected);
    if (dataReceiver && dataReceiver?.length > 0) {
      setDataDevices(dataReceiver);
      cacheDataDevices = dataReceiver;
      localStorage.setItem(
        KeyStogare.CHOOSE_ITEM,
        JSON.stringify(dataReceiver[0])
      );

      if (itemDelete) {
        dataReceiver[0].id !== chooseItem?.id && setChooseItem(dataReceiver[0]);
        setItemDelete(null);
      }

      !localStorage.getItem(KeyStogare.CHOOSE_ITEM) &&
        dataReceiver[0].id !== chooseItem?.id &&
        setChooseItem(dataReceiver[0]);
    }
  }, [data]);

  useEffect(() => {
    if (chooseItem && chooseItem.deviceId) {
      const db = getDatabase();
      const starCountRef = ref(db, "/" + chooseItem.deviceId);

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
        const starCountRef = ref(db, "/" + chooseItem.deviceId);

        off(starCountRef, "value");
      }
    };
  }, [chooseItem]);

  useEffect(() => {
    if (dataFirebaseConnected) {
      const dataReceiver = data?.filter((item) => item.isConnected);
      if (dataReceiver && dataReceiver?.length > 0) {
        if (dataDevices && dataDevices?.length > 0) {
          const values = dataDevices?.map((item: DeviceT) => {
            if (item.deviceId === chooseItem?.deviceId) {
              return {
                ...item,
                isTurnOn:
                  dataFirebaseConnected.isTurnOn === "true" ? true : false,
              };
            }

            return item;
          });
          setDataDevices(values);
        }
      }
    }
  }, [dataFirebaseConnected]);

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
      <Modal
        title="Xóa thiết bị khỏi tài khoản"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
      <div className="home">
        <Row>
          <Col xl={12} lg={{ order: 1, span: 12 }} md={15}>
            <div className="list-device">
              <div className="header-left">
                <h3 style={{ paddingTop: 30, marginBottom: 30 }}>
                  Các thiết bị đã kết nối
                </h3>
                <Search
                  className="search-form"
                  placeholder="Tìm kiếm"
                  onSearch={(value) => setText(value)}
                  style={{ width: 200 }}
                  onChange={(value) => {
                    setText(value.target.value);
                  }}
                />
              </div>
              <div className={'list-item-h'} style={{height: 580,  overflow: 'auto',}}>
                <List
                  itemLayout="horizontal"
                  dataSource={dataDevices as DeviceT[]}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        borderRadius: "8px",
                        borderBottom: "0px",
                        backgroundColor: Colors.BG,
                        marginTop: "6px",
                        marginBottom: "6px",
                        ...(item.isTurnOn
                          ? { backgroundColor: "rgb(255 210 63)" }
                          : {}),
                      }}
                      actions={[
                        <div
                          style={{ flexDirection: "column", display: "flex" }}
                        >
                          <Button
                            type="link"
                            onClick={() => handleChooseItem(item)}
                          >
                            Theo dõi thiết bị
                          </Button>
                          <Button
                            type="link"
                            style={{ color: "red" }}
                            onClick={() => showModal(item)}
                            disabled={item.isTurnOn}
                          >
                            Xóa
                          </Button>
                        </div>,
                        <div>
                          <AlertOutlined
                            className={"icon"}
                            style={item.isTurnOn ? { color: Colors.WHITE } : {}}
                          />
                        </div>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://image.flaticon.com/icons/png/512/1255/1255694.png" />
                        }
                        title={item.deviceName}
                        description={
                          "Thiết bị đang " + (item?.isTurnOn ? "bật" : "tắt")
                        }
                        style={{ padding: "0 8px" }}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Col>
          <Col xl={12} lg={{ order: 1, span: 10 }} md={9}>
            <div className="detail-device">
              {dataFirebaseConnected && chooseItem ? (
                <Card
                  title={chooseItem.deviceName}
                  extra={
                    dataFirebaseConnected?.isTurnOn === "false" ? (
                      <ButtonBT onClick={handleTurnOnOff} variant="success">
                        Bật
                      </ButtonBT>
                    ) : (
                      <ButtonBT onClick={handleTurnOnOff} variant="danger">
                        Tắt
                      </ButtonBT>
                    )
                  }
                  style={{ width: 300, borderRadius: "8px", padding: 16 }}
                >
                  <p>Thời gian sữ dụng: {listItem[0].value}</p>
                  <p>Công suất tiêu thụ: {listItem[1].value}</p>
                  <Button onClick={handleToDetailDevice}>Xem chi tiết</Button>
                </Card>
              ) : (
                <Skeleton />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
