import { useState } from "react";

import "./index.css"

const ConfirmBookingModal = ({onClose, onConfirm, children }) => {
    const [message, setMessage] = useState("");

    return (
        <div className="custom-confirm">
            {children}
            <input
                type="text"
                placeholder="Enter your message to the mentor"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        onConfirm(message);
                        onClose();
                    }}
                >
                    Confirm
                </button>
                <button onClick={onClose} className="btn btn-danger">
                    Cancel
                </button>
            </div>
        </div>
    );
};


export default ConfirmBookingModal