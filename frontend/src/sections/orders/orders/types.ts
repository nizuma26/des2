export interface InvoiceItem {
    id: number;// Tasa o precio por unidad del ítem
    price: number;       // Número de serie del ítem
    desc: string;      // Descripción del ítem
    qty: number;       // Cantidad del ítem
  }
  
export interface Invoice {
    id: string;            // Identificador único de la factura
    invoice_no: string;    // Número de la factura
    balance: string;       // Saldo de la factura (como string para incluir el símbolo de moneda)
    company: string;       // Nombre de la empresa
    email: string;         // Correo electrónico de contacto
    phone: string;         // Teléfono de contacto
    address: string;       // Dirección de la empresa
    trans_date: string;    // Fecha de transacción (en formato ISO)
    due_date: string;      // Fecha de vencimiento (en formato ISO)
    items: InvoiceItem[];  // Lista de ítems en la factura
  }