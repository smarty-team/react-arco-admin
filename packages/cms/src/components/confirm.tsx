import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Confirm({ title, message, callback }) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{message}</p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn" onClick={callback}>
                去登录
              </label>
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
}
