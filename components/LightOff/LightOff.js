import React from 'react';
import { useRecoilState } from 'recoil';
import AtomProvider from '../../recoil/AtomProvider';

const LightOff = props => {

    const [showCreatePost, setShowCreatePost] = useRecoilState(AtomProvider.showCreatePost);

    return (
        <>
            {
                showCreatePost ? <div className="lightoff" onClick={() => {
                    if (showCreatePost) setShowCreatePost(false);
                }} /> : null
            }
        </>

    )
}

export default LightOff;