import { Collections } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Document, Page, Text, View, StyleSheet, Svg, Polygon } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: "#000000",
    display: "flex",
    fontFamily: "Helvetica-Bold",
    gap: 1,
  },
  headerContainer: {
    height: 30,
    width: "100%",
    display: "flex",
    paddingHorizontal: 31,
  },
  header: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 1,
  },
  headerContent: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
    padding: 4,
  },
  headerText1: {
    color: "#000000",
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  headerText2: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "bold",
  },
  bodyContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 1,
  },
  bodyAside: {
    width: 30,
    height: "100%",
    backgroundColor: "#ffffff",
    padding: 3,
  },
  bodyContent: {
    flex: 1,
    gap: 1
  },
  tableRow: {
    flex: 1,
    flexDirection: "row",
    gap: 1
  },
  tableCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    backgroundColor: 'white'
  },
  tableCell: {
    position: "relative",
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  bodyText1: {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "#000000",
    fontSize: 40,
    fontWeight: "extrabold",
    opacity: 0.1,
  },
  bodyText2: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Helvetica",
  },
  triangle: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    transform: "translateX(-10%)",
  },
  footerContainer: {
    height: 30,
    width: "100%",
    display: "flex",
    paddingHorizontal: 31,
  },
  footer: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 1,
  },
  footerContent: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
    padding: 4,
  },
  footerText1: {
    color: "#000000",
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  footerText2: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
});

const CollectionPDF = (collection: Collections) => {
    const { label, boxTotal, boxLeft, startAt, status, endAt, boxes } = collection;
    const { day, date} = formatDate(startAt);
    const { day: endDay, date: endDate } = formatDate(endAt);

    return (
        <Document>
            <Page style={styles.page} orientation="landscape">
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Text style={styles.headerText1}>Date Started:</Text>
                            <Text style={styles.headerText2}>{day}, {date}</Text>
                        </View>
                        <View style={styles.headerContent}>
                            <Text style={styles.headerText1}>Collection Label:</Text>
                            <Text style={styles.headerText2}>{label} Collection</Text>
                        </View>
                        <View style={styles.headerContent}>
                            <Text style={styles.headerText1}>Total Boxes:</Text>
                            <Text style={styles.headerText2}>{boxTotal}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.bodyAside} />
                    <View style={styles.bodyContent}>
                        {/* Render each row */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row, rowIndex) => (
                            <View style={styles.tableRow} key={rowIndex}>
                                {/* Render each number in the row as a cell */}
                                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((number, colIndex) => (
                                    <View style={styles.tableCol} key={colIndex}>
                                        <View style={styles.tableCell}>
                                            <Text 
                                                style={{...styles.bodyText1, transform: `translate(${label.length > 1 ? "-25%" : "-15%"}, -20%)`}}
                                            >
                                                {label}
                                            </Text>
                                            <Text style={styles.bodyText2}>{row + number}</Text>
                                            { boxes[row + number - 1].status && (
                                                <Svg style={styles.triangle} height="10" width="20">
                                                    <Polygon points="10,0 0,10 20,10" fill="black"/>
                                                </Svg>
                                            )}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                    <View style={styles.bodyAside} />
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.footer}>
                        <View style={styles.footerContent}>
                            <Text style={styles.footerText1}>Date Completed:</Text>
                            <Text style={styles.footerText2}>
                                {status === "active" ? ("NOT COMPLETED") : (`${endDay}, ${endDate}`)}
                            </Text>
                        </View>
                        <View style={styles.footerContent}>
                            <Text style={styles.footerText1}>Status:</Text>
                            <Text style={styles.footerText2}>{status}</Text>
                        </View>
                        <View style={styles.footerContent}>
                            <Text style={styles.footerText1}>Boxes Left:</Text>
                            <Text style={styles.footerText2}>{boxLeft}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
)};

export default CollectionPDF;