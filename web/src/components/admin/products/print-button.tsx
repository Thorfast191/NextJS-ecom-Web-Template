"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="mt-10 bg-black text-white px-6 py-3 rounded-xl"
    >
      Print
    </button>
  );
}
