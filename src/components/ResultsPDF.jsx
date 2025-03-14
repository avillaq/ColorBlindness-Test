import { Document, Page, Text, View, StyleSheet, Font, Svg, Circle, Ellipse } from "@react-pdf/renderer";


Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf"
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#f8fafc"
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 30,
    borderBottom: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 15
  },
  logo: {
    width: 40,
    height: 40
  },
  brandName: {
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#0066cc",
    fontWeight: "bold"
  },
  header: {
    marginBottom: 30,
    textAlign: "center"
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#0f172a"
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8
  },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 24,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  resultsSummary: {
    flexDirection: "row",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 24
  },
  scoreCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#0066cc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 24
  },
  scoreText: {
    fontSize: 18,
    color: "#0066cc",
    fontWeight: "bold"
  },
  scoreLabel: {
    fontSize: 12,
    color: "#64748b"
  },
  diagnosis: {
    flex: 1
  },
  diagnosisTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0f172a"
  },
  diagnosisText: {
    fontSize: 14,
    color: "#64748b"
  },
  detailsGrid: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 16
  },
  detailCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 4
  },
  detailTitle: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 4
  },
  successText: {
    fontSize: 16,
    color: "#22c55e",
    fontWeight: "bold"
  },
  dangerText: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "bold"
  },
  technicalDetails: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 4
  },
  technicalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  technicalLabel: {
    fontSize: 12,
    color: "#475569"
  },
  technicalValue: {
    fontSize: 12,
    color: "#0f172a",
    fontWeight: "bold"
  },
  disclaimer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    flexDirection: "row",
    gap: 8
  },
  disclaimerText: {
    fontSize: 10,
    color: "#64748b",
    fontStyle: "italic"
  }
});

export const ResultsPDF = ({ results }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.brand}>
        <Svg width="42" height="42" viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="10" fill="#E0E0E0" />
          <Circle cx="7" cy="7" r="2" fill="#FF5733" />
          <Circle cx="12" cy="5" r="2" fill="#33FF57" />
          <Circle cx="17" cy="7" r="2" fill="#3357FF" />
          <Circle cx="5" cy="12" r="2" fill="#FF33A8" />
          <Circle cx="19" cy="12" r="2" fill="#FFC300" />
          <Circle cx="7" cy="17" r="2" fill="#DAF7A6" />
          <Circle cx="12" cy="19" r="2" fill="#900C3F" />
          <Circle cx="17" cy="17" r="2" fill="#C70039" />
          <Ellipse cx="12" cy="12" rx="4.5" ry="2.5" fill="white" stroke="black" strokeWidth="0.6" />
          <Circle cx="12" cy="12" r="1.5" fill="black" />
          <Circle cx="12" cy="11.5" r="0.5" fill="white" />
        </Svg>
        <Text style={styles.brandName}>ColorVision</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Test Results</Text>
        <Text style={styles.headerSubtitle}>Your color vision assessment results are ready.</Text>
      </View>

      <View style={styles.resultCard}>
        <View style={styles.resultsSummary}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{results.accuracy}</Text>
            <Text style={styles.scoreLabel}>Accuracy</Text>
          </View>
          <View style={styles.diagnosis}>
            <Text style={styles.diagnosisTitle}>Diagnosis</Text>
            <Text style={styles.diagnosisText}>{results.diagnosis}</Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Correct Answers</Text>
            <Text style={styles.successText}>{results.correct}/14</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Incorrect Answers</Text>
            <Text style={styles.dangerText}>{results.incorrect}/14</Text>
          </View>
        </View>

        {results.details &&
          <View style={styles.technicalDetails}>
            <View style={styles.technicalRow}>
              <Text style={styles.technicalLabel}>Basic Plates Correct (1-11):</Text>
              <Text style={styles.technicalValue}>{results.details.basicCorrect}/11</Text>
            </View>
            <View style={styles.technicalRow}>
              <Text style={styles.technicalLabel}>Protan Indicators:</Text>
              <Text style={styles.technicalValue}>{results.details.protanMatches}/3</Text>
            </View>
            <View style={styles.technicalRow}>
              <Text style={styles.technicalLabel}>Deutan Indicators:</Text>
              <Text style={styles.technicalValue}>{results.details.deutanMatches}/3</Text>
            </View>
          </View>
        }

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            NOTE: This test is not a substitute for professional medical evaluation.
            Consult an eye specialist for confirmation.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);