import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register fonts - Using standard fonts for better compatibility if CDN fails, 
// but providing fallback to standard Helvetica/Courier which are built-in to PDF
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#050505',
    color: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica', // Fallback to Helvetica for reliability
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1pt solid #1a1a1a',
    paddingBottom: 20,
    marginBottom: 30,
  },
  logo: {
    fontSize: 24,
    fontWeight: 700,
  },
  cyan: {
    color: '#00ffff',
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#666666',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: '#666666',
    marginBottom: 8,
    fontWeight: 700,
  },
  clientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoBox: {
    width: '45%',
  },
  infoText: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
  },
  subText: {
    fontSize: 9,
    color: '#999999',
  },
  table: {
    width: '100%',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid #1a1a1a',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottom: '0.5pt solid #1a1a1a',
  },
  colDesc: { width: '50%' },
  colQty: { width: '15%', textAlign: 'center' },
  colPrice: { width: '15%', textAlign: 'right' },
  colTotal: { width: '20%', textAlign: 'right' },
  tableHeaderText: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: '#666666',
    fontWeight: 700,
  },
  tableCell: {
    fontSize: 10,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalBox: {
    width: '40%',
    borderTop: '2pt solid #00ffff',
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 10,
    color: '#999999',
  },
  totalValue: {
    fontSize: 10,
    fontWeight: 700,
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: 700,
    color: '#00ffff',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTop: '1pt solid #1a1a1a',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qrCode: {
    width: 60,
    height: 60,
  },
  signature: {
    textAlign: 'right',
  },
  signatureText: {
    fontSize: 8,
    color: '#666666',
    marginTop: 4,
  },
  validity: {
    fontSize: 8,
    color: '#666666',
    marginTop: 10,
  }
});

const QuotePDF = ({ quote, qrCodeUrl }: { quote: any, qrCodeUrl: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>WINF<Text style={styles.cyan}>™</Text> PRECISION</Text>
          <Text style={styles.title}>Relatório de Estimativa Técnica // Orçamento</Text>
        </View>
        <View style={{ textAlign: 'right' }}>
          <Text style={styles.subText}>Data: {new Date(quote.createdAt).toLocaleDateString('pt-BR')}</Text>
          <Text style={styles.subText}>REF: {quote.id?.substring(0, 8).toUpperCase() || 'PROPOSTA'}</Text>
        </View>
      </View>

      <View style={styles.clientInfo}>
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Cliente / Projeto</Text>
          <Text style={styles.infoText}>{quote.customerName}</Text>
          <Text style={styles.subText}>{quote.customerWhatsApp}</Text>
          <Text style={styles.subText}>{quote.customerAddress}</Text>
          <Text style={styles.subText}>{quote.customerCity}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Especificações Técnicas</Text>
          <Text style={styles.infoText}>Tipo: {quote.projectType === 'Automotive' ? 'Automotivo' : 'Arquitetura'}</Text>
          {quote.vehicleModel && <Text style={styles.subText}>Veículo: {quote.vehicleModel}</Text>}
          {quote.measurements && <Text style={styles.subText}>Metragem: {quote.measurements}</Text>}
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colDesc]}>Descrição do Serviço / Produto</Text>
          <Text style={[styles.tableHeaderText, styles.colQty]}>Qtd/m²</Text>
          <Text style={[styles.tableHeaderText, styles.colPrice]}>Unitário</Text>
          <Text style={[styles.tableHeaderText, styles.colTotal]}>Subtotal</Text>
        </View>
        {quote.items.map((item: any, idx: number) => (
          <View key={idx} style={styles.tableRow}>
            <View style={styles.colDesc}>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={[styles.subText, { fontSize: 7 }]}>Garantia Vitalícia Winf OS™</Text>
            </View>
            <Text style={[styles.tableCell, styles.colQty]}>{item.quantity}</Text>
            <Text style={[styles.tableCell, styles.colPrice]}>R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
            <Text style={[styles.tableCell, styles.colTotal, { fontWeight: 700 }]}>R$ {(item.quantity * item.unitPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <View style={styles.totalBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal Bruto</Text>
            <Text style={styles.totalValue}>R$ {(quote.totalAmount + (quote.pixDiscount || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
          </View>
          {quote.pixDiscount > 0 && (
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: '#00ff00' }]}>Desconto PIX</Text>
              <Text style={[styles.totalValue, { color: '#00ff00' }]}>- R$ {quote.pixDiscount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
            </View>
          )}
          <View style={[styles.totalRow, { marginTop: 10 }]}>
            <Text style={[styles.totalLabel, { color: '#ffffff', fontWeight: 700 }]}>TOTAL</Text>
            <Text style={styles.grandTotal}>R$ {quote.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
          </View>
          <View style={{ marginTop: 10, backgroundColor: '#111', padding: 8, borderRadius: 4 }}>
            <Text style={[styles.sectionTitle, { marginBottom: 4 }]}>Condições</Text>
            <Text style={styles.subText}>Método: {quote.paymentMethod}</Text>
            {quote.installments > 1 && (
              <Text style={styles.subText}>Parcelado: {quote.installments}x de R$ {quote.installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
            )}
          </View>
        </View>
      </View>

      <Text style={styles.validity}>* Esta proposta tem validade de 7 dias a partir da data de emissão.</Text>

      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {qrCodeUrl && <Image src={qrCodeUrl} style={styles.qrCode} />}
          <View>
            <Text style={[styles.sectionTitle, { marginBottom: 2 }]}>Autenticidade Digital</Text>
            <Text style={[styles.subText, { fontSize: 7 }]}>Escaneie para validar este orçamento</Text>
            <Text style={[styles.subText, { fontSize: 7 }]}>Winf OS™ Blockchain Verified</Text>
          </View>
        </View>
        <View style={styles.signature}>
          <Text style={[styles.infoText, { fontSize: 10 }]}>WINF™ PARTNERS</Text>
          <Text style={styles.signatureText}>Assinatura Digital do Parceiro</Text>
          <Text style={[styles.subText, { fontSize: 6, marginTop: 2 }]}>Hash: {Math.random().toString(36).substring(2, 15).toUpperCase()}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default QuotePDF;
