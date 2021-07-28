const sharp = require('sharp');

const createAllImageFormats = (image) => {
  // Mobile displays
  // Zoom in slightly to highlight the subject
  resizeSmall({ image, name: 'mobile', offset: 50 });
  resizeSmall({ image, name: 'mobile', format: 'avif', offset: 50 });

  // Standard computer displays
  resizeSmall({ image, name: '1x' });
  resizeSmall({ image, name: '1x', format: 'avif' });

  // Retina displays
  resizeLarge({ image });
  resizeLarge({ image, format: 'avif' });

  // Recommended structured data image ratios
  // "Images should be at least 1200 pixels wide."
  // See https://developers.google.com/search/docs/data-types/article
  resizeImage({ image, width: 3000, height: 3000, name: '1x1' });
  resizeImage({ image, width: 4000, height: 3000, name: '4x3' });
  resizeImage({ image, width: 4000, height: 2250, name: '16x9' });
};

const resizeSmall = ({ image, name, format, offset }) =>
  resizeImage({ image, width: 768, height: 480, name, format, offset });

const resizeLarge = ({ image, format }) =>
  resizeImage({ image, width: 1536, height: 960, name: '2x', format });

const resizeImage = ({
  image,
  width,
  height,
  name,
  format = 'jpg',
  offset = 0,
}) =>
  sharp(image)
    .resize({ width: width + offset * 2, height: height + offset * 2 })
    .extract({ left: offset, top: offset, width: width, height: height })
    .toFormat(format, { quality: 70 })
    .toFile(
      `src/posts/21-06-18-homeServerEvolutionStoneAge/raspberry-pi-${name}.${format}`
    )
    .catch((err) => {
      console.log(err);
    });

const image =
  'src/posts/21-06-18-homeServerEvolutionStoneAge/raspberry-pi-original.jpg';

createAllImageFormats(image);
