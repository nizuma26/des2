import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    lineHeight: 1.5,
    flexDirection: 'column',
    width: '58mm',
    height: 'auto',
  },
  spaceBetween: {
    justifyContent: 'center',
    gap: '10px',
    color: '#3E3E3E',
  },
  titleContainer: { flexDirection: 'column'},
  labTitle: { flexDirection: 'column'},
  logo: { width: 280, height: 50, marginLeft: 'auto', marginRight: 'auto' },
  reportTitle: { fontSize: 15, textAlign: 'center', fontWeight: 'bold' },
  labInfo: { textAlign: 'center', fontSize: 9, fontStyle: 'bold' },
  invoice: { fontWeight: 'bold', fontSize: 20 },
  invoiceNumber: { fontSize: 9, fontWeight: 'bold' },
  theader: {
    marginTop: 2,
    fontSize: 10,
    fontStyle: 'bold',
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: '#F4F6F8',
    borderColor: 'whitesmoke',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: '#F4F6F8',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  invoiceSummary: {
    borderRadius: 3,
    flex: 1,
    marginTop: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 1,
    paddingRight: 1,
  },
  invoiceSummaryContent: {
    flexDirection: 'column',
    flex: 1,
    borderColor: '#F9FAFB',
    borderTopWidth: 1,
    paddingTop: 5

  },
  invoiceSummaryItem: {
    padding: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tbody2: { flex: 2, borderRightWidth: 1 },
});
