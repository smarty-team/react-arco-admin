import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Confirm({
  title,
  message,
  btnText = '确定',
  callback,
}: {
  title: string;
  message: string;
  btnText?: string;
  callback?: () => void;
}) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log(mounted);
    
  })
  function onClick() {
    // 关闭
    setMounted(false)
    // 执行回调
    callback && callback()
  }
  
  return mounted && ref.current
    ? createPortal(
        <>
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="py-4">{message}</p>
              <div className="modal-action">
                <label
                  htmlFor="my-modal"
                  className="btn"
                  onClick={onClick}
                >
                  {btnText}
                </label>
              </div>
            </div>
          </div>
        </>,
        ref.current
      )
    : null;
}
