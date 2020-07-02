import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AvatarEditor from 'react-avatar-editor'
import Slider from '@material-ui/core/Slider';
import { Typography, Button } from '@material-ui/core';
class ImageEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            rotate: 0
        }
    }

    onClickSaveImage = () => {
        if (this.editor) {

            this.editor.getImageScaledToCanvas().toBlob(blob => {
                console.log(blob)
            })
        }
    }

    setEditorRef = (editor) => this.editor = editor;

    render() {

        const { imageToChange, handleCancelEditImage } = this.props;
        const { scale, rotate } = this.state;

        return (
            <Dialog style={{ zIndex: 1000 }} maxWidth="lg" fullWidth={true} open={true} onClose={handleCancelEditImage}>
                <DialogTitle>Image editor</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ width: "60%" }}>
                            <AvatarEditor
                                ref={this.setEditorRef}
                                image={imageToChange.url}
                                width={700}
                                height={700}
                                border={50}
                                color={[255, 255, 255, 0.6]}
                                scale={scale}
                                borderRadius={350}
                                disableBoundaryChecks={true}
                                rotate={rotate}
                                disableHiDPIScaling={true}
                            />
                        </div>
                        <div style={{ width: "30%" }}>
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                                Scale
                            </Typography>
                            <Slider
                                value={scale}
                                onChange={(event, newValue) => this.setState({ scale: newValue })}
                                aria-labelledby="discrete-slider-small-steps"
                                step={0.2}
                                marks
                                min={0.5}
                                max={2}
                                valueLabelDisplay="auto"
                            />
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                                Rotate
                            </Typography>
                            <Slider
                                value={rotate}
                                onChange={(event, newValue) => this.setState({ rotate: newValue })}
                                aria-labelledby="discrete-slider-small-steps"
                                step={30}
                                marks
                                min={0}
                                max={330}
                                valueLabelDisplay="auto"
                            />
                            <Button onClick={this.onClickSaveImage} style={{ marginBottom: 16 }} color="primary" fullWidth variant="contained">Save</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}

export default ImageEditor;