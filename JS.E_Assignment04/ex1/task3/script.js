const images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg'
];

renderImage(images[0]);

let index = 0;

backButton.addEventListener('click', () => {
    index--;
    if (index < 0) {
        index = 0;
    }
    renderImage(images[index]);
});

nextButton.addEventListener('click', () => {
    index++;
    if (index >= images.length) {
        index = images.length - 1;
    }
    renderImage(images[index]);
});