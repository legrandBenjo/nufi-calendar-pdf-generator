import { Page, Text, View, Link, Image } from '@react-pdf/renderer';
import { aboutContent } from '../constants/aboutContent';
import MonthGrid from './MonthGrid';
import { styles } from '../constants/styles';

const CalendarPage = ({ data }) => {
  const currentYear = data[0]?.year || '';
  const calendarType = data[0]?.calendarType || 'nufi';
  
  // Organiser les données par mois (optimisé)
  const monthsData = data.reduce((acc, item) => {
    const month = item.date.split(' ')[0];
    acc[month] = acc[month] || [];
    acc[month].push(item);
    return acc;
  }, {});

  // Date de génération formatée
  const generationDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      {/* Première page avec informations */}
      <Page size="A4" style={styles.page}>
        <View style={styles.firstPageContainer}>
          <Image 
            src={`${process.env.PUBLIC_URL}/logo512.png`} 
            style={styles.logo}
            alt="Logo Resulam"
          />
          
          <View>
            <Text style={styles.yearTitle}>
              Calendrier {calendarType.toUpperCase()} {currentYear}
            </Text>
          </View>
          
          {/* Section À propos améliorée */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>{aboutContent.title}</Text>
            
            {aboutContent.paragraphs.map((paragraph, index) => (
              <Text key={`para-${index}`} style={styles.aboutText}>
                {paragraph}
              </Text>
            ))}
            
            <View style={styles.linksContainer}>
              {/* Section GitHub améliorée */}
              <View style={styles.linkBlock}>
                <Text style={styles.linkBlockTitle}>Liens utiles :</Text>
                {aboutContent.links.github.map((githubLink, index) => (
                  <View key={`github-${index}`} style={styles.githubLinkItem}>
                    <Text style={styles.linkText}>{githubLink.text}</Text>
                    <View style={styles.linkContent}>
                      <Text style={styles.linkLabel}>{githubLink.label} : </Text>
                      <Link src={githubLink.url} style={styles.link}>
                        {githubLink.url}
                      </Link>
                    </View>
                  </View>
                ))}
              </View>
              
              {/* Section Contact */}
              <View style={styles.linkBlock}>
                <Text style={styles.linkText}>{aboutContent.links.contact.text}</Text>
                <Link 
                  src={`mailto:${aboutContent.links.contact.email}`} 
                  style={styles.link}
                >
                  {aboutContent.links.contact.email}
                </Link>
              </View>
            </View>

            <Text style={styles.signature}>
              Généré le {generationDate}
            </Text>
          </View>
        </View>
      </Page>

      {/* Pages des mois */}
      {Object.entries(monthsData).map(([month, monthData]) => (
        <Page key={`month-${month}`} size="A4" style={styles.page}>
          <MonthGrid 
            month={month} 
            monthData={monthData} 
            currentYear={currentYear}
            calendarType={calendarType}
          />
        </Page>
      ))}
    </>
  );
};

export default CalendarPage;