"use client";

import Barcode from "react-barcode";

interface Props {
  value: string;
}

export default function BarcodeLabel({ value }: Props) {
  return <Barcode value={value} width={2} height={70} displayValue />;
}
