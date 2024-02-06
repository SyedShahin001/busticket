import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf-viewer/core';
import { PDFDownloadLink, BlobProvider } from '@react-pdf-viewer/core';

const PdfDocument = ({ busid, source, destination, fare, selectedSeats, totalFair }) => {
  const data = {
    busid,
    source,
    destination,
    fare,
    selectedSeats,
    totalFair,
  };

  return (
    <div>
      <PDFDownloadLink document={<MyDocument data={data} />} fileName="booking_details.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

const MyDocument = ({ data }) => (
  <BlobProvider document={<DocumentWrapper data={data} />}>
    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <iframe title="Booking Details" src={url} style={{ width: '100%', height: '500px' }} />)}
  </BlobProvider>
);

const DocumentWrapper = ({ data }) => (
  <Document>
    <Page>
      <View style={styles.container}>
        <Text style={styles.text}>Bus ID: {data.busid}</Text>
        <Text style={styles.text}>Source: {data.source}</Text>
        <Text style={styles.text}>Destination: {data.destination}</Text>
        <Text style={styles.text}>Fare: {data.fare}</Text>
        <Text style={styles.text}>Selected Seats: {data.selectedSeats.join(', ')}</Text>
        <Text style={styles.text}>Total Fare: {data.totalFair}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    marginBottom: 10,
  },
});

export default PdfDocument;
