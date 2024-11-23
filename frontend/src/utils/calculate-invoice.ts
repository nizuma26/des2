export const calculateInvoice = (
  cost: number,
  tax: number,
  quantity: number,
  discount: number
) => {
    // Validar que los parámetros sean números no negativos
    if (cost < 0 || tax < 0 || quantity < 0 || discount < 0) {
        throw new Error("Los parámetros no pueden ser negativos.");
    }
    const subtotal = cost * quantity;
    const taxApplied = subtotal * (tax / 100);
    const subtotalWithTax = subtotal + taxApplied;
    const discountApplied = subtotalWithTax * (discount / 100);
    const total = Number((subtotalWithTax - discountApplied).toFixed(2));

    return total
};
