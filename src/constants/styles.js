import { StyleSheet } from '@react-pdf/renderer';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  document: {
    fontFamily: 'NotoSans',
  },
  page: {
    padding: 40,
    backgroundColor: '#ffffff'
  },
  yearTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  monthContainer: {
    marginBottom: 25,
    border: `1pt solid ${COLORS.light}`,
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  monthHeader: {
    backgroundColor: COLORS.primary,
    color: 'white',
    padding: 12,
    textAlign: 'center',
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 16
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  dayHeader: {
    width: '14.28%',
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: COLORS.secondary,
    color: 'white',
    fontSize: 10,
    borderRight: `1pt solid ${COLORS.light}`,
    borderBottom: `1pt solid ${COLORS.light}`,
    ':last-child': {
      borderRight: 'none'
    }
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    padding: 5,
    borderRight: `1pt solid ${COLORS.light}`,
    borderBottom: `1pt solid ${COLORS.light}`,
    ':nth-child(7n)': {
      borderRight: 'none'
    }
  },
  dayContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  dayNumber: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: COLORS.dark,
    fontSize: 12
  },
  dayName: {
    fontSize: 9,
    color: COLORS.text,
    //textTransform: 'uppercase',
    includeFontPadding: false,
    textAlign: 'center'
  },
  weekendDay: {
    backgroundColor: '#c8e4ea'
  },
  currentDay: {
    backgroundColor: '#fff8e1',
    border: `1pt solid ${COLORS.accent}`
  },
  emptyCell: {
    width: '14.28%',
    height: 40,
    backgroundColor: '#fdfdfd'
  },
  monthSubtitle: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 10,
    marginTop: 3
  },
  weekRow: {
    flexDirection: 'row',
    width: '100%'
  },
  firstPageContainer: {
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },

  aboutSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f9f9f9',
    border: `1pt solid ${COLORS.light}`,
    borderRadius: 8,
    flexGrow: 1
  },

  aboutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.primary,
    borderBottom: `1pt solid ${COLORS.secondary}`,
    paddingBottom: 4
  },

  aboutText: {
    fontSize: 10,
    marginBottom: 8,
    lineHeight: 1.5,
    textAlign: 'left',
    color: COLORS.dark
  },

  // Conteneur principal pour tous les liens
  linksContainer: {
    marginTop: 15,
    marginBottom: 10,
  },

  // Style pour chaque bloc de lien (github, contact)
  linkBlock: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderLeft: `3pt solid ${COLORS.accent}`
  },

  // Style spécifique pour les liens GitHub (conteneur du tableau)
  githubLinksContainer: {
    marginBottom: 8,
  },

  // Style pour chaque élément GitHub dans le tableau
  githubLinkItem: {
    marginBottom: 6,
  },

  // Style pour le texte descriptif du lien
  linkText: {
    fontSize: 9,
    marginBottom: 4,
    lineHeight: 1.4,
    color: COLORS.dark
  },

  // Style pour le lien lui-même
  link: {
    color: COLORS.accent,
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 9,
  },

  // Style pour le label du lien
  linkLabel: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 9,
  },

  linkBlockTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 6,
    color: COLORS.primary,
  },
  
  linkContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 2,
  },
  
  signature: {
    marginTop: 15,
    fontStyle: 'italic',
    fontSize: 9,
    color: COLORS.text,
    textAlign: 'right'
  },
  
  logo: {
    width: 80,
    maxHeight: 60,
    margin: '0 auto 20 auto',
    opacity: 0.9,
    alignSelf: 'center'
  }
});