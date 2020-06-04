import React, { useEffect, useState, Fragment } from "react";
import classNames from 'classnames';
import PreviewImage from "./PreviewImage";

const ImageGallery = ({ images, startCount }) => {
  const [ openPreview, setOpenPreview ] = useState(false);
  const [ countImg, setCountImg ] = useState(0);
  const [ indexOfImage, setIndexOfImage ] = useState(0);

  useEffect(() => {
    if (images && images.length > startCount) {
      setCountImg(images.length - startCount);
    }
  }, [images]);

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

  if (!images) {
    return null;
  }

  return (
    <Fragment>
      {openPreview && <PreviewImage indexOfImage={indexOfImage} images={images} isOpen={openPreview} toggle={togglePrivew} />}

      <div className="image-gallery">
        {images.slice(0, startCount).map((img, index) => (
          <div key={img + index} className="image-gallery__item" onClick={onClickToImage(index)}>
            <img src={img} />
            <div className={classNames("overlay", {"is-more": activeOverlay(index, countImg)})}>
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