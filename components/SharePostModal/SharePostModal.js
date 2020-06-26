import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CreatePostInput from '../CreatePostInput/CreatePostInput';
import Post from '../Post/Post';

const SharePostModal = ({ open, handleClose, sharedPost, user }) => {

    return (
        <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <CreatePostInput isShare={true} sharedPost={sharedPost.isShared ? sharedPost.sharedPost.id : sharedPost.id} handleCloseShare={handleClose} />
                <div style={{ padding: 12, margin: "0 32px", borderLeft: "5px solid #dddfe2" }}>
                    <Post data={sharedPost.isShared ? sharedPost.sharedPost : sharedPost} user={user} sharing={true} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SharePostModal;