import { useEffect, useState } from "react";
import {
  NotificationContatiner,
  Notification,
  Message,
} from "./ToastStyleComponent";

const Toast = (props: any) => {
  const { state, close, BgColor, messageColor, textMessage } = props;
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(state);

  useEffect(() => {
    if (localVisible && !state) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }
    setLocalVisible(state);
  }, [localVisible, state]);

  return !animate && !localVisible ? (
    <></>
  ) : (
    <NotificationContatiner disappear={!state}>
      <Notification
        BgColor={BgColor}
        onClick={() => close()}
        disappear={!state}
      >
        <Message Color={messageColor}>{textMessage}</Message>
      </Notification>
    </NotificationContatiner>
  );
};

export default Toast;
