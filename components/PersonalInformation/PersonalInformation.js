import React from 'react';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

const PersonalInformation = () => {
    return (
        <div className="personal-information-container">
            <div>
                <WorkOutlineOutlinedIcon />
                <p>Working at University of Greenwich</p>
            </div>
            <div>
                <SchoolOutlinedIcon />
                <p>Graduated at Marie Curie High School</p>
            </div>
            <div>
                <HomeOutlinedIcon />
                <p>Currently living in Hà Nội</p>
            </div>
            <div>
                <RoomOutlinedIcon />
                <p>Borned in Hà Nội</p>
            </div>
            <button>Change information</button>

        </div>
    )
}

export default PersonalInformation;