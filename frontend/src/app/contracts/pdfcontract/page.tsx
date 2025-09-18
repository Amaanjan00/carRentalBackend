'use client'
import { Document, Page, PDFViewer, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import React from 'react'

export default function page() {
    const styles = StyleSheet.create({
        page: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: '#ffffff'
        },
        section: {
            margin: 0,
            padding: 0,
        },
        image: {
            width: '100%',
            padding: 10
        },
        invoicetext: {
            fontWeight: 100,
            textAlign: "center",
            marginTop: 30
        },
        detailsheader: {
            fontSize: 16,
            color: "#ffffff", 
            backgroundColor: "#038ad5",
            textAlign: "center",
            marginLeft: "20px",
            fontWeight: 600,
            width: "80",
            paddingVertical: "4px"
        },
        detailstext: {
            fontSize: 8,
            paddingBottom: "7px"
        },
        detailsbox: {
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center", 
            border: "1px", 
            marginHorizontal: "20px", 
            marginVertical: "10px", 
            padding: "7px"
        }
        });

        // Create Document Component
        const Contract = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image source='/pdfheader.png' style={styles.image} />
                <View style={styles.section}>
                    <Text style={styles.invoicetext}>INVOICE</Text>
                </View>
                <View>
                    <Text style={styles.detailsheader}>Details</Text>

                    <View style={styles.detailsbox}>
                        <View>
                            <Text style={styles.detailstext}>Vehicle Agreement Number: WOL/2025/09/10</Text>
                            <Text style={styles.detailstext}>Name: Amaan Jan</Text>
                            <Text style={styles.detailstext}>Phone No: +971 524322330</Text>
                        </View>
                        <View>
                            <Text style={styles.detailstext}>Vehicle Agreement Number: WOL/2025/09/10</Text>
                            <Text style={styles.detailstext}>Name: Amaan Jan</Text>
                            <Text style={styles.detailstext}>Phone No: +971 524322330</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );

  return (
    <>
      <div className='w-full h-full'>
        <PDFViewer width="100%" height="100%">
            <Contract/>
        </PDFViewer>
      </div>
    </>
  )
}
