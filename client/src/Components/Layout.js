import React from 'react';

// components/Layout.js
// import components
import Header from "./Header";
import NavBar from "./NavBar";
import Head from "next/head";
import navButtons from './buttons';

// import styling
import "./Layout.scss";
import "./index.scss";

// export Layoit component
const Layout = props => {
    const appTitle = 'Leon Stevens Next.JS Profile';

    return (
        <div className="Layout">
            <Head>
                <title>Leon Stevens - Profile</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>


            <Header appTitle={appTitle} />
            <div className="Content">{props.children}</div>
            <NavBar navButtons={navButtons}  />
        </div>
    )
};

export default Layout;
