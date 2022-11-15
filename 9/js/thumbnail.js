const pictureContainers = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;


const miniPhotos = (thumbnails) => {
  const pictureListFragment = document.createDocumentFragment();

  thumbnails.forEach(({url,likes,comments}) => {

    const thumbnailsPicture = pictureTemplate.cloneNode(true);
    thumbnailsPicture.querySelector('.picture__img').src = url;
    thumbnailsPicture.querySelector('.picture__likes').textContent = likes;
    thumbnailsPicture.querySelector('.picture__comments').textContent = comments.length;
    pictureListFragment.appendChild(thumbnailsPicture);
  });
  pictureContainers.appendChild(pictureListFragment);
};

export {miniPhotos};
