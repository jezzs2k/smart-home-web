import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDatabase,
  ref,
  onValue,
  off,
  onDisconnect,
  set,
} from "firebase/database";
import { Progress, Row, Col, List } from "antd";
import { Line } from "react-chartjs-2";

import "./index.css";
import useTimeout from "../../hooks/useTimeout";

interface RenderItemT {
  title: string;
  value: string | number;
  unit?: string;
  index?: number;
}

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const WAT_DEFAULT = 10000;

let m15 = "";
let h1 = "";
let h6 = "";
let h12 = "";
let h24 = "";
let w1 = "";
let M1 = "";

const DeviceDetail = () => {
  const params = useParams();

  const [dataEnergy, setDataEnergy] = useState<{
    current: string;
    electricityBill: string;
    energytage: string;
    frequency: string;
    pf: string;
    power: string;
    voltage: string;
  } | null>(null);

  const [dataEnergies, setDataEnergies] = useState<
    | {
        current: string;
        electricityBill: string;
        energytage: string;
        frequency: string;
        pf: string;
        power: string;
        voltage: string;
      }[]
    | null
  >(null);
  const [testW, setTestW] = useState(0);
  const [dataWatt, setDataWatt] = useState([0, 0, 0, 0, 0, 0, 0]);
  const ListItemMeasure: RenderItemT[] = [
    {
      title: "Điện áp",
      value: dataEnergy?.voltage || 0,
      unit: "V",
    },
    {
      title: "Dòng điện",
      value: dataEnergy?.current || 0,
      unit: "A",
    },
    {
      title: "Công suất",
      value: dataEnergy?.power || 0,
      unit: "W",
    },
    {
      title: "Tần số",
      value: dataEnergy?.frequency || 0,
      unit: "Hz",
    },
    {
      title: "Tiền điện tạm tính cho thiết bị này",
      value: dataEnergy?.electricityBill || 0,
      unit: "VND",
    },
  ];
  const [m15E, setm15E] = useState(0);
  const [h1E, seth1E] = useState(0);
  const [h6E, seth6E] = useState(0);
  const [h12E, seth12E] = useState(0);
  const [h24E, seth24E] = useState(0);
  const [w1E, setw1E] = useState(0);
  const [M1E, setM1E] = useState(0);

  useEffect(() => {
    if (dataEnergy) {
      setTestW((Number(dataEnergy.power) / WAT_DEFAULT) * 100);
    }
  }, [dataEnergy]);

  useEffect(() => {
    m15 = "";
    h1 = "";
    h6 = "";
    h12 = "";
    h24 = "";
    w1 = "";
    M1 = "";
  }, []);

  useTimeout(() => {
    if (params.deviceId) {
      const db = getDatabase();
      const starCountRef = ref(db, "/" + params.deviceId);

      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // if (data.isTurnOn === 'true') {
        if (data.energy) {
          let valueEnrgy: any = {};
          data.energy.split(",").forEach((item: string, index: number) => {
            if (index === 0) {
              valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
            }

            if (item !== "}") {
              valueEnrgy[item.split(":")[0]] = item.split(":")[1];
            }
          });

          setDataEnergy(valueEnrgy);
          setDataEnergies((data) => [...(data ? data : []), valueEnrgy]);
        }

        if (data.m15 && m15 !== data.m15) {
          let valueEnrgy: any = {};
          data.m15.split(",").forEach((item: string, index: number) => {
            if (index === 0) {
              valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
            }

            if (item !== "}") {
              valueEnrgy[item.split(":")[0]] = item.split(":")[1];
            }
          });

          setm15E(valueEnrgy.energytage);
          m15 = data.m15;
        }

        if (data.h1 && h1 !== data.h1) {
          h1 = data.h1;
          let valueEnrgy: any = {};
          data.h1.split(",").forEach((item: string, index: number) => {
            if (index === 0) {
              valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
            }

            if (item !== "}") {
              valueEnrgy[item.split(":")[0]] = item.split(":")[1];
            }
          });

          seth1E(valueEnrgy.energytage);
        }

        if (data.h6 && h6 !== data.h6) {
          h6 = data.h6;
          let valueEnrgy: any = {};
          data.h6.split(",").forEach((item: string, index: number) => {
            if (index === 0) {
              valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
            }

            if (item !== "}") {
              valueEnrgy[item.split(":")[0]] = item.split(":")[1];
            }
          });

          seth6E(valueEnrgy.energytage);
        }

        if (data.h12 && h12 !== data.h12) {
          h12 = data.h12;
          let valueEnrgy: any = {};
          data.h12.split(",").forEach((item: string, index: number) => {
            if (index === 0) {
              valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
            }

            if (item !== "}") {
              valueEnrgy[item.split(":")[0]] = item.split(":")[1];
            }
          });

          seth12E(valueEnrgy.energytage);
        }

        if (data.h24 && h24 !== data.h24) {
          h24 = data.h24;
          let valueEnrgy: any = {};
          data.h24.split(",").forEach((item: string, index: number) => {
            if (index === 0) {
              valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
            }

            if (item !== "}") {
              valueEnrgy[item.split(":")[0]] = item.split(":")[1];
            }
          });

          seth24E(valueEnrgy.energytage);
        }

        if (data.w1 && w1 !== data.w1) {
          w1 = data.w1;
          let valueEnrgy: any = {};
          data.w1.split(",").forEach((item: string, index: number) => {
            if (index === 0) {
              valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
            }

            if (item !== "}") {
              valueEnrgy[item.split(":")[0]] = item.split(":")[1];
            }
          });

          setw1E(valueEnrgy.energytage);
        }

        if (data.M1 && M1 !== data.M1) {
          M1 = data.M1;
          let valueEnrgy: any = {};
          data.M1.split(",").forEach((item: string, index: number) => {
            if (index === 0) {
              valueEnrgy[item.split(":")[0].split("{")[1]] = item.split(":")[1];
            }

            if (item !== "}") {
              valueEnrgy[item.split(":")[0]] = item.split(":")[1];
            }
          });

          setM1E(valueEnrgy.energytage);
        }
        // }
      });
    }
  }, 100);

  useEffect(() => {
    return () => {
      if (params.deviceId) {
        const db = getDatabase();
        const starCountRef = ref(db, "/" + params.deviceId);

        onDisconnect(starCountRef);
      }
    };
  }, []);

  useEffect(() => {
    if (m15E !== 0) {
      dataWatt[1] = m15E;
      setDataWatt([...dataWatt]);
    }
  }, [m15E]);

  useEffect(() => {
    if (h1E !== 0) {
      dataWatt[2] = h1E;
      setDataWatt([...dataWatt]);
    }
  }, [h1E]);

  useEffect(() => {
    if (h6E !== 0) {
      dataWatt[3] = h6E;
      setDataWatt([...dataWatt]);
    }
  }, [h6E]);

  useEffect(() => {
    if (h12E !== 0) {
      dataWatt[4] = h12E;
      setDataWatt([...dataWatt]);
    }
  }, [h12E]);

  useEffect(() => {
    if (h24E !== 0) {
      dataWatt[5] = h24E;
      setDataWatt([...dataWatt]);
    }
  }, [h24E]);

  useEffect(() => {
    if (w1E !== 0) {
      dataWatt[6] = w1E;
      setDataWatt([...dataWatt]);
    }
  }, [w1E]);

  useEffect(() => {
    if (M1E !== 0) {
      dataWatt[7] = M1E;
      setDataWatt([...dataWatt]);
    }
  }, [M1E]);

  return (
    <div className="body-home">
      <div className="device-detail">
        <Row>
          <Col
            xs={{ order: 1 }}
            sm={12}
            md={10}
            lg={8}
            xl={5}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Công suất</h2>
            <Progress
              type="circle"
              percent={testW}
              width={180}
              format={(percent) => `${Number(dataEnergy?.power || 0)} W`}
            />
          </Col>
          <Col xs={{ order: 2 }} sm={12} md={14} lg={16} xl={19}>
            <div className="list-w">
              <List
                bordered
                dataSource={ListItemMeasure}
                renderItem={(item) => (
                  <List.Item>
                    {item.title}: {item.value} {item.unit}
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12} xs={{ order: 1 }}>
            <div className="chart">
              <div className="chart-dev">
                <Line
                  data={{
                    labels: dataEnergies?.map((item) => "") || [],
                    datasets: [
                      {
                        label: "Công suất (W)",
                        data: dataEnergies?.map((item) => item.power) || [],
                        fill: true,
                        backgroundColor: "#ff638466",
                        borderColor: "rgba(255, 99, 132, 0.2)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        // position: 'top' as const,
                      },
                      title: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </Col>
          <Col lg={12} xs={{ order: 1 }}>
            <div className="chart">
              <div className="chart-dev">
                <Line
                  data={{
                    labels: ["0", "15m", "1h", "6h", "12h", "24h", "1w", "1m"],
                    datasets: [
                      {
                        label: "Năng lượng tiêu thụ (KWH)",
                        data: dataWatt,
                        fill: false,
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgba(255, 99, 132, 0.2)",
                      },
                    ],
                  }}
                  options={options}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DeviceDetail;
