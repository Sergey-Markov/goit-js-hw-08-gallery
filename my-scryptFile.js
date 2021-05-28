import gallery from "./gallery-items.js";
// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного
// изображения в модальном окне. Превью результата посмотри
// [по ссылке](https://take.ms/ZvBD0E).

// ![Превью](preview.jpg)

// Разбей задание на несколько подзадач:

// - Создание и рендер разметки по массиву данных и предоставленному шаблону.
// - Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого
//   изображения.
// - Открытие модального окна по клику на элементе галереи.
// - Подмена значения атрибута `src` элемента `img.lightbox__image`.
// - Закрытие модального окна по клику на кнопку
//   `button[data-action="close-lightbox"]`.
// - Очистка значения атрибута `src` элемента `img.lightbox__image`. Это необходимо
//   для того, чтобы при следующем открытии модального окна, пока грузится
//   изображение, мы не видели предыдущее.



const refs = {
    galleryList: document.querySelector('.gallery'),
    modalWindov: document.querySelector('.lightbox'),
    closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    modalImg: document.querySelector('.lightbox__image'),
    overlay: document.querySelector('.lightbox__overlay'),
};


// ===============Create renderList====================
const createGalleryList = createItemGalleryList(gallery);
refs.galleryList.insertAdjacentHTML('beforeend', createGalleryList);

// ===============Click on Img========================
refs.galleryList.addEventListener('click', onImgClickOpenModalWindow);

// ===============Click on CloseBtn===================

// refs.closeModalBtn.addEventListener('click', closeModalBtn);

// ===============Click on Keyboard key-arrow===========
const arreyOfImgSrc = gallery.map(({ original }) => original);
console.log(arreyOfImgSrc);
// ================All close Events===================
window.addEventListener('keydown', onKeydownArrow);
// =======================All functons================

function onKeydownArrow(e) {
  e.preventDefault();
  const currentIndex = arreyOfImgSrc.indexOf(e.target.href);
  
  if (e.key === 'ArrowRight') {
    if (currentIndex >= arreyOfImgSrc.length - 1) refs.modalImg.src = arreyOfImgSrc[0];
    
    refs.modalImg.src = arreyOfImgSrc[currentIndex +1];
  };
};



function onKeydownEsc(e) {
  e.preventDefault();
  if (e.key === 'Escape') {
    refs.modalWindov.classList.remove('is-open');
    refs.modalImg.src = ``;
    refs.modalImg.alt = ``;
    window.removeEventListener('keydown', onKeydownEsc);
  };
  console.log(e.key);

};

function onClickCloseModal(e) {
  e.preventDefault();
  refs.modalWindov.classList.remove('is-open');
  refs.modalImg.src = ``;
  refs.modalImg.alt = ``;
  refs.closeModalBtn.removeEventListener('click', onClickCloseModal);
  refs.overlay.removeEventListener('click', onClickCloseModal);

};

function onImgClickOpenModalWindow(e) {
  e.preventDefault();
  console.log(e.target);
  refs.modalWindov.classList.add('is-open');
  refs.modalImg.src = `${e.target.src}`;
  refs.modalImg.alt = `${e.target.alt}`;
  refs.closeModalBtn.addEventListener('click', onClickCloseModal);
  window.addEventListener('keydown', onKeydownEsc);
  refs.overlay.addEventListener('click', onClickCloseModal);

};

function createItemGalleryList(gallery) {
  return gallery.map(({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
}).join('');
};







