import { Font } from '@react-pdf/renderer';

// Enregistrement des polices
const registerFonts = () => {
  Font.register({
    family: 'NotoSans',
    fonts: [
      { 
        src: `${process.env.PUBLIC_URL}/fonts/CharisSILR.ttf`,
        fontWeight: 'normal',
        fontStyle: 'normal'
      },
      { 
        src: `${process.env.PUBLIC_URL}/fonts/CharisSILB.ttf`, 
        fontWeight: 'bold',
        fontStyle: 'normal'
      },
      { 
        src: `${process.env.PUBLIC_URL}/fonts/NotoSans-Italic.ttf`,
        fontWeight: 'normal',
        fontStyle: 'italic'
      },
      { 
        src: `${process.env.PUBLIC_URL}/fonts/NotoSans-BoldItalic.ttf`, 
        fontWeight: 'bold',
        fontStyle: 'italic'
      }
    ],
    fallbackFamily: 'sans-serif'
  });
};

// Vérification que les polices sont bien chargées
registerFonts();

// Pour le débogage
/*console.log('Polices NotoSans enregistrées avec succès');
console.log('Chemin des polices:', {
  regular: `${process.env.PUBLIC_URL}/fonts/CharisSILR.ttf`,
  bold: `${process.env.PUBLIC_URL}/fonts/CharisSILB.ttf`
});*/

export default registerFonts;