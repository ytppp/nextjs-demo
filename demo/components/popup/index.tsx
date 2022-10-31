import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useContext,
  useMemo,
} from "react";
import ReactDom from "react-dom";
import styles from "./styles.module.scss";
import cName from "classnames";
import { UserAgentContext } from "@/stores/userAgent";
import { Environment } from "@/constants/enum";
import PropTypes from 'prop-types';

export interface IPopupRef {
  open: () => void;
}

interface IProps {
  children: JSX.Element;
}

export const Popup = forwardRef<IPopupRef, IProps>(({ children }, ref) => {
  const [visible, setVisible] = useState(false);
  const [enter, setEnter] = useState(false);
  const [leave, setLeave] = useState(false);
  const { userAgent } = useContext(UserAgentContext);

  const maskClass = useMemo(() => {
    return userAgent === Environment.mobile ? "forbidScroll" : "pcForbidScroll";
  }, [userAgent]);

  useEffect(() => {
    document.body.className = visible ? maskClass : "";
    let timeout;
    if (visible) {
      setEnter(true);
      timeout = setTimeout((): void => {
        setEnter(false);
      }, 300);
    } else {
      setLeave(true);
      timeout = setTimeout((): void => {
        setLeave(false);
      }, 300);
    }
    return () => {
      timeout = null;
    }
  }, [visible])

  useImperativeHandle(ref, () => ({
    open: (): void => {
      setVisible(true);
      setEnter(true);
      setTimeout((): void => {
        setEnter(false);
      }, 300);
    },
  }));

  const renderDom = visible ? (
    <div
      className={cName({
        [styles.popup]: true,
        [styles.enter]: enter,
        [styles.leave]: leave,
      })}
    >
      <div className={styles.mask} />
      <div className={styles.popupContent}>
        <div
          className={styles.closeBtn}
          onClick={(): void => {
            setLeave(true);
            setTimeout((): void => {
              setLeave(false);
              setVisible(false);
            }, 300);
          }}
        />
        {children}
      </div>
    </div>
  ) : (
    <></>
  );

  return typeof document !== "undefined"
    ? ReactDom.createPortal(renderDom, document.body)
    : renderDom;
});

Popup.propTypes = {
  children: PropTypes.element.isRequired
}

Popup.displayName = 'Popup';