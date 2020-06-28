import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CreatePostInput from '../CreatePostInput/CreatePostInput';
import Post from '../Post/Post';

const SharePostModal = ({ open, handleClose, sharedPost, user }) => {

    if (sharedPost.isShared && !sharedPost.sharedPost) {
        return null;
    } else {
        return (
            <Dialog style={{ zIndex: 1000 }} maxWidth="md" fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <CreatePostInput isShare={true} sharedPost={sharedPost.isShared ? sharedPost.sharedPost.id : sharedPost.id} handleCloseShare={handleClose} />
                    <div style={{ padding: 12, margin: "0 32px", borderLeft: "5px solid #dddfe2" }}>
                        <Post data={sharedPost.isShared ? sharedPost.sharedPost : sharedPost} user={user} sharing={true} />
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}

export default SharePostModal;