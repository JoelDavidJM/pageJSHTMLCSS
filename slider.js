// slider 

const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);

slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
});
