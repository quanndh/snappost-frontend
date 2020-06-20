import React from 'react';
import Router from 'next/router';

const CustomUserName = props => {
    let { mentionProps } = props;

    return (
        <React.Fragment>
            <span
                className={mentionProps.className}
                onClick={() => Router.push(`/profile/${mentionProps.mention.id}`)}
            // onMouseOver={handleToggleMention}
            // onMouseLeave={handleClose}
            >
                {mentionProps.children}
            </span>
        </React.Fragment>

    )

}
export default CustomUserName;