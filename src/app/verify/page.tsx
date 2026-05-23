"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-3 border-b border-[#e6e1d2] last:border-b-0">
      <div className="text-xs uppercase tracking-wide text-[#6b6657] font-semibold sm:w-44 flex-shrink-0">
        {label}
      </div>
      <div className="text-[15px] text-[#1f2536] mt-1 sm:mt-0">{value}</div>
    </div>
  );
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const s = {
    name: searchParams.get("name") ?? undefined,
    serial: searchParams.get("serial") ?? undefined,
    date: searchParams.get("date") ?? undefined,
    period: searchParams.get("period") ?? undefined,
    mentor: searchParams.get("mentor") ?? undefined,
    role: searchParams.get("role") ?? undefined,
    brand: searchParams.get("brand") ?? undefined,
    title: searchParams.get("title") ?? undefined,
    body: searchParams.get("body") ?? undefined,
  };

  return (
    <div className="min-h-screen bg-[#e8e6df] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#f6f2e7] rounded-lg shadow-2xl overflow-hidden border border-[#d8d4c8]">
        <div className="bg-[#1f2536] text-white px-8 py-6">
          <div className="text-xs uppercase tracking-[0.2em] text-[#b8a98a]">
            Certificate Verification
          </div>
          <h1
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-3xl mt-1"
          >
            {s.brand || "Certificate Details"}
          </h1>
        </div>
        <div className="px-8 py-6">
          <div className="mb-4">
            <div className="inline-block px-3 py-1 rounded-full bg-[#e6f4e6] text-[#1d6f2b] text-xs font-semibold">
              ✓ Verified Certificate
            </div>
          </div>
          <Row label="Certificate Title" value={s.title} />
          <Row label="Issued To" value={s.name} />
          <Row label="ID" value={s.serial} />
          <Row label="Date of Certification" value={s.date} />
          <Row label="Period" value={s.period} />
          <Row label="Mentor" value={s.mentor} />
          <Row label="Mentor Role" value={s.role} />
          <Row label="Description" value={s.body} />
          {!s.name && !s.serial && (
            <p className="text-sm text-[#6b6657] py-6 text-center">
              No certificate details provided in the link.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#e8e6df]" />}>
      <VerifyContent />
    </Suspense>
  );
}
