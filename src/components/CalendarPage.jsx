import { Page, Text, View, Link, Image } from '@react-pdf/renderer';
import { aboutContent } from '../constants/aboutContent';
import MonthGrid from './MonthGrid';
import { styles } from '../constants/styles';

const CalendarPage = ({ data }) => {
  const currentYear = data[0]?.year || '';
  const calendarType = data[0]?.calendarType || 'nufi';
  
  // Organiser les données par mois
  const monthsData = data.reduce((acc, item) => {
    const month = item.date.split(' ')[0];
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});

  return (
    <>
      <Page size="A4" style={styles.page}>
        <View style={styles.firstPageContainer}>
        <Image 
          src={`${process.env.PUBLIC_URL}/logo512.png`} 
          style={styles.logo}
          alt="Logo Resulam"
        />
          {/* Titre principal */}
          <View>
            <Text style={styles.yearTitle}>
              Calendrier {calendarType.toUpperCase()} {currentYear}
            </Text>
          </View>
          
          {/* Section À propos */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>{aboutContent.title}</Text>
            
            {aboutContent.paragraphs.map((paragraph, index) => (
              <Text key={`para-${index}`} style={styles.aboutText}>
                {paragraph}
              </Text>
            ))}
            
            <View style={styles.linksContainer}>
              <Text style={styles.aboutText}>{aboutContent.links.github.text}</Text>
              <Link 
                src={aboutContent.links.github.url} 
                style={styles.link}
              >
                {aboutContent.links.github.label}
              </Link>
            </View>
            
            <View style={styles.linksContainer}>
              <Text style={styles.aboutText}>
                {aboutContent.links.contact.text}
                <Link 
                  src={`mailto:${aboutContent.links.contact.email}`} 
                  style={styles.link}
                >
                  {aboutContent.links.contact.email}
                </Link>
              </Text>
            </View>

            <Text style={styles.signature}>
              Généré le {new Date().toLocaleDateString('fr-FR')}
            </Text>
          </View>
        </View>
      </Page>

      {Object.entries(monthsData).map(([month, monthData]) => (
        <Page key={month} size="A4" style={styles.page}>
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