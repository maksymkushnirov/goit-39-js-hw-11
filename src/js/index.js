import { fetchImages } from './api.js';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  getImages();
}

function getImages() {
  const query = formEl.elements.searchQuery.value.trim();
  fetchImages(query)
    .then(({ data }) => {
      if (data.hits.length === 0) {
      }
      renderGallery(data.hits);
    })
    .catch(error => console.log(error));
}

function createMarkup(images) {
  return images
    .map(image => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
      return `<a class="gallery__link" href="${largeImageURL}">
      <div class="photo-card">
          <div class="photo-thumb">
            <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy"/>
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${downloads}
            </p>
          </div>
      </div>
      </a>`;
    })
    .join('');
}

function renderGallery(images) {
  galleryEl.insertAdjacentHTML('beforeend', createMarkup(images));
}

// Галерея и карточка изображения

// {
// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>;
// }

// Библиотека SimpleLightbox
// // Описан в документации
// import SimpleLightbox from 'simplelightbox';
// // Дополнительный импорт стилей
// import 'simplelightbox/dist/simple-lightbox.min.css';

// Прокрутка страницы
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
