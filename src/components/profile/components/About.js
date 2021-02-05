
import React from 'react';
import AboutSidebar from './about_components/AboutSidebar';
import InformationPanels from './about_components/InformationPanels';


export default ({ profile }) => {
    return (
        <>
            <AboutSidebar profile={profile} />
            <InformationPanels profile={profile} />
        </>
    );
}