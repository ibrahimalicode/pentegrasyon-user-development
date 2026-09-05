function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseSubModifiers(subModifier) {
  if (Array.isArray(subModifier)) return subModifier;

  try {
    const parsed = JSON.parse(subModifier || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getLineQuantity(lineItem) {
  return Math.max(lineItem?.items?.length || 0, 1);
}

export function calculateTrendyolOrderTotals(order) {
  const grossTotal = (Array.isArray(order?.orders) ? order.orders : []).reduce(
    (sum, lineItem) => {
      const quantity = getLineQuantity(lineItem);
      const lineBaseTotal = toNumber(lineItem?.price) * quantity;

      const lineModifiersTotal = (
        Array.isArray(lineItem?.modifiers) ? lineItem.modifiers : []
      ).reduce((modifierSum, modifier) => {
        const modifierPrice = toNumber(modifier?.price);
        const subModifiersTotal = parseSubModifiers(modifier?.subModifier).reduce(
          (subSum, subModifier) => subSum + toNumber(subModifier?.price),
          0,
        );

        return modifierSum + (modifierPrice + subModifiersTotal) * quantity;
      }, 0);

      return sum + lineBaseTotal + lineModifiersTotal;
    },
    0,
  );

  const discountTotal = toNumber(order?.discountAmountTotal);
  const payableTotal = Math.max(grossTotal - discountTotal, 0);

  return {
    grossTotal,
    discountTotal,
    payableTotal,
  };
}

// Who paid the discount: sums coupon + promotion amounts across every
// package item. amount.seller is the restaurant's share, amount.trendyol
// the platform's; either can be null (→ 0). Ticket-level fields carry no
// split, so this is the only source.
export function calculateTrendyolDiscountSplit(order) {
  let sellerTotal = 0;
  let platformTotal = 0;

  for (const lineItem of Array.isArray(order?.orders) ? order.orders : []) {
    for (const item of Array.isArray(lineItem?.items) ? lineItem.items : []) {
      const entries = [
        item?.coupon,
        ...(Array.isArray(item?.promotions) ? item.promotions : []),
      ];
      for (const entry of entries) {
        sellerTotal += toNumber(entry?.amount?.seller);
        platformTotal += toNumber(entry?.amount?.trendyol);
      }
    }
  }

  return { sellerTotal, platformTotal };
}
