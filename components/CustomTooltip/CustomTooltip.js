import React from 'react';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const HtmlTooltipLight = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "white",
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 500,
        maxHeight: 300,
        fontSize: theme.typography.pxToRem(12),
        padding: 10
    },
}))(Tooltip);

const HtmlTooltipDark = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "black",
        color: 'rgba(255, 255, 255, 0.87)',
        maxWidth: 500,
        maxHeight: 300,
        fontSize: theme.typography.pxToRem(12),
        padding: 10
    },
}))(Tooltip);

const CustomTooltip = (props) => {
    let { theme } = props;
    return (
        <React.Fragment>
            {
                theme == "light" ? (
                    <HtmlTooltipLight style={{ fontSize: 20, width: "auto" }} TransitionComponent={Fade} title={props.title} arrow>
                        {props.children}
                    </HtmlTooltipLight>
                ) : (
                        <HtmlTooltipDark style={{ fontSize: 20, width: "auto" }} TransitionComponent={Fade} title={props.title} arrow>
                            {props.children}
                        </HtmlTooltipDark>
                    )
            }
        </React.Fragment>


    )
}

export default CustomTooltip;