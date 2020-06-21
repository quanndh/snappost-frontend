import React, { useEffect, useState, Fragment } from "react";
import classNames from 'classnames';
import PreviewImage from "./PreviewImage";

const ImageGallery = ({ upload, startCount }) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [countImg, setCountImg] = useState(0);
  const [indexOfImage, setIndexOfImage] = useState(0);

  useEffect(() => {
    if (upload && upload.length > startCount) {
      setCountImg(upload.length - startCount);
    }
  }, [upload]);

  const togglePrivew = () => {
    setOpenPreview(!openPreview);
  }

  const onClickToImage = (indexOfImage) => () => {
    setIndexOfImage(indexOfImage);
    togglePrivew();
  }

  const activeOverlay = (index, countImg) => {
    return index === startCount - 1 && countImg;
  }

  if (!upload) {
    return null;
  }

  return (
    <Fragment>
      {openPreview && <PreviewImage indexOfImage={indexOfImage} upload={upload} isOpen={openPreview} toggle={togglePrivew} />}

      <div className="image-gallery">
        {upload.slice(0, startCount).map((item, index) => (
          <div key={item + index} className="image-gallery__item" onClick={onClickToImage(index)}>
            {
              item.fileType.includes("image") ? <img src={item.url} /> : (
                <video autoPlay={index === 0 ? true : false} loop muted>
                  <source src={item.url} type="video/mp4" />
                </video>
              )
            }

            <div className={classNames("overlay", { "is-more": activeOverlay(index, countImg) })}>
              <span className="image-count"> {activeOverlay(index, countImg) && '+ ' + countImg}</span>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

ImageGallery.defaultProps = {
  images: [],
  startCount: 5,
}

export default React.memo(ImageGallery);