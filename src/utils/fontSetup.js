import { Font } from '@react-pdf/renderer';

// Enregistrement des polices
Font.register({
    family: 'NotoSans',
    fonts: [
      { 
        src: `${process.env.PUBLIC_URL}/fonts/NotoSans-Regular.ttf`,
        fontWeight: 400
      },
      { 
        src: `${process.env.PUBLIC_URL}/fonts/NotoSans-Bold.ttf`, 
        fontWeight: 700 
      },
    ],
    fallbackFamily: 'sans-serif'
  });

// Optionnel : exporter pour utilisation ailleurs
export default Font;