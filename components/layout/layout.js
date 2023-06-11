import { Fragment, useContext } from "react";
import Notification from "../events/ui/notification";
import MainHeader from "./main-header";

import NotificationContext from "../../store/notification-context";

function Layout(props) {
    const notificationCtx = useContext(NotificationContext);
    const activeNotification = notificationCtx.notification;

    console.log("activeNotification:::", notificationCtx)

    return (
        <Fragment>
            <MainHeader />
            <main>
                {props.children}
            </main>
            { activeNotification && (
                <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />
            )}
        </Fragment>
    )
}

export default Layout;