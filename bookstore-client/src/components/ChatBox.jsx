import React, { useEffect } from "react";

const DialogflowMessenger = () => {
    useEffect(() => {
        // Thêm script Dialogflow Messenger vào DOM
        if (!document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]')) {
            const script = document.createElement("script");
            script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
            script.async = true;
            document.body.appendChild(script);

            // Cleanup script khi component bị unmount
            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    useEffect(() => {
        // Thiết lập các biến CSS qua JavaScript
        const messenger = document.querySelector("df-messenger");

        if (messenger) {
            messenger.setAttribute("style", `
                position: fixed;
                bottom: 20px; /* Cách đáy 20px */
                right: 20px; /* Cách phải 20px */
                width: 300px; /* Chiều rộng khung chat */
                height: 500px; /* Chiều cao khung chat */
                z-index: 9999; /* Đặt trên các thành phần khác */
            `);

            // Thiết lập các biến giao diện cho Messenger
            messenger.setAttribute("chat-title", "Chatbot");
            messenger.setAttribute("agent-id", "2b85084a-3e3a-43e6-a157-4eddd621d675");
            messenger.setAttribute("language-code", "vi");
        }
    }, []);

    return (
        <df-messenger
            intent="WELCOME"
        ></df-messenger>
    );
};

export default DialogflowMessenger;
