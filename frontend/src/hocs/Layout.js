import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { set_stomp_client } from '../actions/stompClient/stompClient';
import SockJS from 'sockjs-client';
import { API_URL } from '../config';
import { getSubscription } from '../utils/getSubscription';
import { load_user, update_last_accessed_time } from '../actions/auth/auth';

const Layout = ({title, content, children}) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const connection = useRef(false);

    const notify = async () => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            getSubscription();
        } else if (Notification.permission === "default") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    getSubscription();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            notify();
        }
    }, [isAuthenticated]);

    let stompClient = null;

    const onError = (e) => {
        connectStompClient();
    }

    const connectStompClient = () => {
        const Stomp = require("stompjs/lib/stomp.js").Stomp;
        const sockJS = new SockJS(`${API_URL}/ws/chat`);
        stompClient = Stomp.over(sockJS);
        stompClient.heartbeat.outgoing = 0;
        stompClient.heartbeat.incoming = 0;
        stompClient.debug = null;

        stompClient.connect('guest', 'guest', () => {
            connection.current = true;
            dispatch(set_stomp_client(stompClient));
        }, onError);
    };

    useEffect(() => {
        connectStompClient();

        dispatch(load_user())
        .then(() => {
            dispatch(update_last_accessed_time(true));
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return ( 
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} ></meta>
            </Head>
            <div>
                {children}
            </div>
        </>
    )
};

Layout.defaultProps = {
    title: '스꾸친',
    content: '성대 네트워킹의 모든 것, 스꾸친'
}

export default Layout;