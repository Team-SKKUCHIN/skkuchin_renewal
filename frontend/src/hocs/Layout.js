import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { load_user, update_last_accessed_time } from '../actions/auth/auth';
import { load_places_from_json } from '../actions/place/place';

const Layout = ({title, content, children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(load_places_from_json());
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