import React from 'react';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#000',
        color: 'rgba(255, 255, 255, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        fontSize: 14
    },
}))(Tooltip);

const CustomTooltip = (props) => {
    return (
        <HtmlTooltip style={{ fontSize: 20 }} TransitionComponent={Fade} title={props.title} arrow >
            {props.children}
        </HtmlTooltip>
    )
}

export default CustomTooltip;