import { Font } from '@react-pdf/renderer';

// Enregistrement des polices
Font.register({
    family: 'NotoSans',
    fonts: [
      { 
        src: `${process.env.PUBLIC_URL}/fonts/CharisSILR.ttf`,
        fontWeight: 400
      },
      { 
        src: `${process.env.PUBLIC_URL}/fonts/CharisSILB.ttf`, 
        fontWeight: 700 
      },
      { 
        src: `${process.env.PUBLIC_URL}/fonts/NotoSans-Italic.ttf`,
        fontWeight: 'normal',
        fontStyle: 'normal'
      },
      { 
        src: `${process.env.PUBLIC_URL}/fonts/NotoSans-BoldItalic.ttf`, 
        fontWeight: 'bold',
        fontStyle: 'italic' 
      },
    ],
    fallbackFamily: 'sans-serif'
  });

export default Font;