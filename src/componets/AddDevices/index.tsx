import { Image } from "antd";
import "./index.css";

const AddDevice = () => {
  return (
    <div
      className="add-device"
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
      }}
    >
      <h5>Tải app để có thể thêm thiết bị</h5>
      <a href="https://play.google.com/store/apps/details?id=com.smarthome.iot.hhc">
        <Image
          width={190}
          src="https://lh3.googleusercontent.com/cjsqrWQKJQp9RFO7-hJ9AfpKzbUb_Y84vXfjlP0iRHBvladwAfXih984olktDhPnFqyZ0nu9A5jvFwOEQPXzv7hr3ce3QVsLN8kQ2Ao=s0"
          style={{
            marginTop: "8px",
            marginBottom: "8px",
          }}
          preview={{ visible: false }}
        />
      </a>
      <Image
        width={190}
        preview={{ visible: false }}
        src="https://upload.wikimedia.org/wikipedia/commons/4/40/Apple_Store.png"
      />
    </div>
  );
};

export default AddDevice;
