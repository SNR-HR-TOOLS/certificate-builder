"use client";

import snrWatermark from "@/assets/snr-logo-without-bg-water-mark.png";
import { forwardRef, useEffect, useRef, useState } from "react";

export interface TemplateProps {
  logo: string;
  title: string;
  name: string;
  body: string;
  period: string;
  ceoName: string;
  ceoRole: string;
  sigImg: string;
  hrName: string;
  hrRole: string;
  sigImgRight: string;
  serial: string;
  date: string;
  showWatermark: boolean;
}

/* ─── Recipient name with auto-shrink ─────────────────────────── */
function RecipientName({
  name,
  align = "center",
  width = 680,
}: {
  name: string;
  align?: "center" | "left";
  width?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(72);
  const [underlineWidth, setUnderlineWidth] = useState(200);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      const maxWidth = container.clientWidth || width;
      let size = 72;
      text.style.fontSize = `${size}px`;

      while (size > 28 && text.scrollWidth > maxWidth) {
        size -= 1;
        text.style.fontSize = `${size}px`;
      }

      setFontSize(size);
      setUnderlineWidth(Math.min(text.scrollWidth + 16, maxWidth));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [name, width]);

  return (
    <div
      ref={containerRef}
      className={`mt-8 w-full max-w-[${width}px] flex flex-col ${align === "center" ? "items-center" : "items-start"} px-4`}
    >
      <h2
        ref={textRef}
        style={{
          fontFamily: "var(--font-great-vibes)",
          fontSize: `${fontSize}px`,
        }}
        className="leading-none whitespace-nowrap text-[#1f2536] max-w-full"
      >
        {name || "\u00A0"}
      </h2>
      <div
        className="mt-2 h-px bg-[#1f2536]/50 transition-all duration-150"
        style={{ width: underlineWidth }}
      />
    </div>
  );
}

/* ─── Signature block (left / right / center) ──────────────────────────── */
function SignatureBlock({
  align,
  signature,
  name,
  role,
}: {
  align: "left" | "right" | "center";
  signature: string;
  name: string;
  role: string;
}) {
  const isRight = align === "right";
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col ${isRight ? "items-end text-right" : isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      {signature ? (
        <img
          src={signature}
          alt="signature"
          className="h-14 object-contain -mb-1 max-w-[200px]"
        />
      ) : (
        <div className="h-14" />
      )}
      <div className="w-[220px] h-px bg-[#1f2536]/60 mt-1" />
      <p className="mt-2 text-[13px] font-semibold tracking-wide text-[#1f2536]">
        {name}
      </p>
      <p className="text-[12px] text-[#1f2536]/70 mt-0.5">{role}</p>
    </div>
  );
}

/* ─── 1. Classic Template (Base) ──────────────────────────── */
export const ClassicTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden"
        style={{
          backgroundColor: "#fdfbf7",
          backgroundImage:
            "radial-gradient(circle at center, #ffffff 0%, #f6f2e7 100%)",
        }}
      >
        {/* decorative double border */}
        <div className="absolute inset-[16px] border border-[#b8a98a]/60 pointer-events-none" />
        <div className="absolute inset-[23px] border border-[#b8a98a]/30 pointer-events-none" />

        {/* Watermark — centered behind content */}
        {props.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[55%] max-w-[420px] object-contain opacity-[0.07]"
            />
          </div>
        )}

        {/* content */}
        <div className="relative z-10 h-full flex flex-col items-center px-20 pt-10 pb-8 text-[#1f2536]">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <img
              src={props.logo}
              alt="Company logo"
              className="object-contain"
              style={{ width: "180px", height: "100%" }}
            />
          </div>

          {/* thin gold rule under logo */}
          <div className="mt-4 w-24 h-px bg-[#b8862e]/60" />

          {/* Certificate title */}
          <h1
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="mt-5 text-[54px] leading-none font-semibold text-center tracking-wide"
          >
            {props.title}
          </h1>

          {/* Recipient name */}
          <RecipientName name={props.name} />

          {/* Body text */}
          <p className="mt-7 max-w-[680px] text-center text-[14.5px] leading-[1.9] whitespace-pre-wrap text-[#1f2536]/90">
            {props.body.split("SNR Edatas").map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && (
                  <strong className="font-bold text-[#1f2536]">
                    SNR Edatas
                  </strong>
                )}
              </span>
            ))}
          </p>

          {/* Internship period */}
          <p className="mt-5 text-[14px] tracking-wide">
            Internship Period:{" "}
            <strong className="font-semibold">{props.period}</strong>
          </p>

          {/* Signatures + footer */}
          <div className="mt-auto w-full">
            <div className="grid grid-cols-2 gap-8 items-end">
              <SignatureBlock
                align="left"
                signature={props.sigImg}
                name={props.ceoName}
                role={props.ceoRole}
              />
              <SignatureBlock
                align="right"
                signature={props.sigImgRight}
                name={props.hrName}
                role={props.hrRole}
              />
            </div>

            <div className="mt-5 pt-3 border-t border-[#1f2536]/12 flex flex-wrap justify-center gap-x-10 gap-y-1 text-[10.5px] text-[#1f2536]/60 tracking-widest uppercase">
              <span>
                ID.&nbsp;
                <strong className="text-[#1f2536]/80">{props.serial}</strong>
              </span>
              <span>
                Date of Certification&nbsp;
                <strong className="text-[#1f2536]/80">{props.date}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ClassicTemplate.displayName = "ClassicTemplate";

/* ─── 2. Modern Template ──────────────────────────── */
export const ModernTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white flex"
      >
        {/* Left Accent Bar */}
        <div className="w-[40px] h-full bg-[#1f2536] shrink-0" />
        <div className="w-[8px] h-full bg-[#b8862e] shrink-0" />

        {/* Watermark — centered in remaining space */}
        {props.showWatermark && (
          <div className="absolute inset-0 pl-[48px] flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[50%] max-w-[400px] object-contain opacity-[0.05]"
            />
          </div>
        )}

        {/* Content Area */}
        <div className="relative z-10 flex-1 h-full flex flex-col justify-between px-16 py-12 text-[#1f2536]">
          {/* Header Row */}
          <div className="flex items-start justify-between w-full">
            <div className="flex-1">
              <h1
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="text-[48px] leading-tight font-bold tracking-wider uppercase text-[#1f2536]"
              >
                {props.title}
              </h1>
              <div className="mt-3 w-16 h-[3px] bg-[#b8862e]" />
            </div>
            <div className="shrink-0 ml-8">
              <img
                src={props.logo}
                alt="Company logo"
                className="object-contain"
                style={{ width: "160px", height: "100%" }}
              />
            </div>
          </div>

          {/* Recipient Section */}
          <div className="mt-6 flex-1 flex flex-col justify-center">
            <RecipientName name={props.name} align="left" width={700} />

            <p className="mt-8 max-w-[700px] text-[15px] leading-[1.8] whitespace-pre-wrap text-[#1f2536]/90 border-l-[3px] border-[#d8d4c8] pl-5">
              {props.body.split("SNR Edatas").map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <strong className="font-bold text-[#1f2536]">
                      SNR Edatas
                    </strong>
                  )}
                </span>
              ))}
            </p>

            <p className="mt-6 text-[14px] tracking-wide pl-6">
              Internship Period:{" "}
              <strong className="font-semibold text-[#b8862e]">
                {props.period}
              </strong>
            </p>
          </div>

          {/* Footer Row */}
          <div className="w-full flex justify-between items-end mt-8 border-t border-[#1f2536]/10 pt-6">
            <div className="flex gap-16">
              <SignatureBlock
                align="left"
                signature={props.sigImg}
                name={props.ceoName}
                role={props.ceoRole}
              />
              <SignatureBlock
                align="left"
                signature={props.sigImgRight}
                name={props.hrName}
                role={props.hrRole}
              />
            </div>

            <div className="flex flex-col items-end gap-1 text-[11px] text-[#1f2536]/60 tracking-widest uppercase">
              <span>
                ID.{" "}
                <strong className="text-[#1f2536]/90">{props.serial}</strong>
              </span>
              <span>
                Date <strong className="text-[#1f2536]/90">{props.date}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ModernTemplate.displayName = "ModernTemplate";

/* ─── 3. Minimalist Template ──────────────────────────── */
export const MinimalistTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-[#faf9f5]"
      >
        {/* Outer subtle border only */}
        <div className="absolute inset-[10px] border border-[#e6e1d2] pointer-events-none" />

        {/* Watermark — very subtle in Minimalist */}
        {props.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[45%] max-w-[350px] object-contain opacity-[0.04] grayscale"
            />
          </div>
        )}

        {/* Content Area */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-24 py-16 text-[#2d313a]">
          {/* Logo */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2">
            <img
              src={props.logo}
              alt="Company logo"
              className="object-contain"
              style={{ width: "120px", height: "100%" }}
            />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center w-full mt-10">
            <h1 className="text-[20px] uppercase tracking-[0.3em] font-medium text-[#7a7263] mb-8">
              {props.title}
            </h1>

            <h2
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[64px] font-medium leading-none text-[#1b1c20]"
            >
              {props.name}
            </h2>
            <div className="w-12 h-px bg-[#b8862e] my-8" />

            <p className="max-w-[700px] text-center text-[15px] leading-[2] whitespace-pre-wrap text-[#50545e] font-light">
              {props.body.split("SNR Edatas").map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <strong className="font-medium text-[#1b1c20]">
                      SNR Edatas
                    </strong>
                  )}
                </span>
              ))}
            </p>

            <p className="mt-8 text-[13px] tracking-widest text-[#7a7263] uppercase">
              Period /{" "}
              <strong className="text-[#1b1c20] font-medium">
                {props.period}
              </strong>
            </p>
          </div>

          {/* Footer Area */}
          <div className="w-full flex justify-between items-end mt-auto pt-8">
            <div className="flex flex-col text-[10px] text-[#938e82] tracking-[0.2em] uppercase gap-1">
              <span>NO. {props.serial}</span>
              <span>DT. {props.date}</span>
            </div>

            <div className="flex gap-12">
              <SignatureBlock
                align="center"
                signature={props.sigImg}
                name={props.ceoName}
                role={props.ceoRole}
              />
              <SignatureBlock
                align="center"
                signature={props.sigImgRight}
                name={props.hrName}
                role={props.hrRole}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
MinimalistTemplate.displayName = "MinimalistTemplate";

/* ─── 4. Corporate Template ──────────────────────────── */
export const CorporateTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white"
      >
        <div className="absolute inset-0 border-[24px] border-[#1f2536] pointer-events-none" />
        <div className="absolute inset-[32px] border-[2px] border-[#b8862e] pointer-events-none" />

        {props.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[50%] max-w-[400px] object-contain opacity-[0.06]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col px-20 py-16 text-[#1f2536]">
          <div className="flex justify-between items-start w-full border-b-2 border-[#1f2536] pb-6">
            <img
              src={props.logo}
              alt="Company logo"
              className="object-contain h-[70px] w-auto"
            />
            <div className="text-right">
              <h1 className="text-[32px] font-bold tracking-widest uppercase text-[#1f2536]">
                {props.title}
              </h1>
              <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#b8862e] mt-2">
                Official Document
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[16px] font-semibold tracking-widest uppercase text-[#1f2536]/70 mb-4">
              This certifies that
            </p>
            <RecipientName name={props.name} align="left" width={800} />

            <p className="mt-8 max-w-[800px] text-[16px] leading-[1.8] whitespace-pre-wrap font-medium text-[#1f2536]/80">
              {props.body.split("SNR Edatas").map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <strong className="font-bold text-[#1f2536]">
                      SNR Edatas
                    </strong>
                  )}
                </span>
              ))}
            </p>
            <p className="mt-6 text-[15px] font-semibold tracking-wide">
              Internship Period:{" "}
              <span className="text-[#b8862e]">{props.period}</span>
            </p>
          </div>

          <div className="w-full flex justify-between items-end mt-8">
            <div className="flex gap-16">
              <SignatureBlock
                align="left"
                signature={props.sigImg}
                name={props.ceoName}
                role={props.ceoRole}
              />
              <SignatureBlock
                align="left"
                signature={props.sigImgRight}
                name={props.hrName}
                role={props.hrRole}
              />
            </div>
            <div className="flex flex-col items-end gap-1 text-[12px] font-bold tracking-widest uppercase bg-[#1f2536] text-white p-4">
              <span>
                NO. <span className="text-[#b8862e]">{props.serial}</span>
              </span>
              <span>
                DT. <span className="text-[#b8862e]">{props.date}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
CorporateTemplate.displayName = "CorporateTemplate";

/* ─── 5. Elegant Template ──────────────────────────── */
export const ElegantTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-[#fffdfa]"
      >
        <div className="absolute inset-[24px] border border-[#b8862e]/40 pointer-events-none rounded-2xl" />
        <div className="absolute inset-[32px] border border-[#b8862e]/20 pointer-events-none rounded-xl" />

        {props.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[45%] max-w-[380px] object-contain opacity-[0.05]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center justify-between px-20 py-16 text-[#33302a]">
          <img
            src={props.logo}
            alt="Company logo"
            className="object-contain h-[65px] w-auto"
          />

          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <h1
              style={{ fontFamily: "var(--font-great-vibes)" }}
              className="text-[72px] leading-none text-[#b8862e] mb-10"
            >
              {props.title}
            </h1>
            <p className="text-[14px] uppercase tracking-[0.4em] text-[#33302a]/60 mb-6 font-medium">
              Presented To
            </p>

            <RecipientName name={props.name} align="center" width={700} />

            <p className="mt-8 max-w-[700px] text-center text-[15px] leading-[2.2] whitespace-pre-wrap italic text-[#33302a]/80">
              {props.body.split("SNR Edatas").map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <strong className="font-semibold not-italic text-[#33302a]">
                      SNR Edatas
                    </strong>
                  )}
                </span>
              ))}
            </p>

            <p className="mt-8 text-[14px] tracking-[0.1em] uppercase text-[#33302a]/60">
              Period of Internship:{" "}
              <strong className="text-[#33302a]">{props.period}</strong>
            </p>
          </div>

          <div className="w-full grid grid-cols-3 items-end mt-8">
            <div className="flex flex-col text-[10px] text-[#33302a]/50 tracking-[0.2em] uppercase gap-1">
              <span>Certificate No: {props.serial}</span>
              <span>Issued Date: {props.date}</span>
            </div>
            <div className="col-span-2 flex justify-end gap-16">
              <SignatureBlock
                align="center"
                signature={props.sigImg}
                name={props.ceoName}
                role={props.ceoRole}
              />
              <SignatureBlock
                align="center"
                signature={props.sigImgRight}
                name={props.hrName}
                role={props.hrRole}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ElegantTemplate.displayName = "ElegantTemplate";

/* ─── 6. Geometric Template ──────────────────────────── */
export const GeometricTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#b8862e]/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#1f2536]/5 to-transparent pointer-events-none" />
        <div className="absolute top-[20px] left-[20px] bottom-[20px] w-[8px] bg-[#1f2536]" />
        <div className="absolute top-[20px] left-[32px] bottom-[20px] w-[2px] bg-[#b8862e]" />

        {props.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[40%] max-w-[320px] object-contain opacity-[0.03] grayscale"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col pl-[100px] pr-20 py-16 text-[#1f2536]">
          <div className="flex justify-between items-end w-full border-b border-[#e6e1d2] pb-6">
            <h1 className="text-[40px] font-bold tracking-tight uppercase text-[#1f2536]">
              {props.title}
            </h1>
            <img
              src={props.logo}
              alt="Company logo"
              className="object-contain h-[55px] w-auto"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-[#b8862e] mb-4">
              Awarded To
            </p>
            <RecipientName name={props.name} align="left" width={750} />

            <div className="mt-8 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1f2536]/20" />
              <p className="pl-6 max-w-[750px] text-[15px] leading-[1.8] whitespace-pre-wrap text-[#1f2536]/80">
                {props.body.split("SNR Edatas").map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <strong className="font-bold text-[#1f2536]">
                        SNR Edatas
                      </strong>
                    )}
                  </span>
                ))}
              </p>
            </div>

            <p className="mt-6 text-[14px] font-medium tracking-wide">
              Internship Period:{" "}
              <span className="font-bold">{props.period}</span>
            </p>
          </div>

          <div className="w-full flex justify-between items-end mt-8">
            <div className="flex gap-16">
              <SignatureBlock
                align="left"
                signature={props.sigImg}
                name={props.ceoName}
                role={props.ceoRole}
              />
              <SignatureBlock
                align="left"
                signature={props.sigImgRight}
                name={props.hrName}
                role={props.hrRole}
              />
            </div>
            <div className="flex gap-8 text-[11px] font-bold tracking-widest uppercase text-[#1f2536]/50">
              <span>
                NO. <span className="text-[#1f2536]">{props.serial}</span>
              </span>
              <span>
                DATE <span className="text-[#1f2536]">{props.date}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
GeometricTemplate.displayName = "GeometricTemplate";

/* ─── 7. Premium Dark Template ──────────────────────────── */
export const PremiumDarkTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-[#1a1f2e]"
      >
        <div className="absolute inset-[20px] border-[2px] border-[#b8862e]/40 pointer-events-none" />
        <div className="absolute inset-[26px] border border-[#b8862e]/20 pointer-events-none" />

        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b8862e]/5 rounded-full blur-[100px] pointer-events-none" />

        {props.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[50%] max-w-[400px] object-contain opacity-[0.08]"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center px-20 pt-14 pb-10 text-[#f8f9fa]">
          <img
            src={props.logo}
            alt="Company logo"
            className="object-contain h-[70px] w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />

          <div className="mt-5 w-16 h-px bg-[#b8862e]" />

          <h1
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="mt-6 text-[48px] font-semibold text-center tracking-[0.15em] text-[#b8862e] uppercase"
          >
            {props.title}
          </h1>

          <div className="flex-1 flex flex-col justify-center items-center w-full mt-4">
            <p className="text-[14px] uppercase tracking-[0.3em] text-[#f8f9fa]/50 mb-4">
              Proudly Presented To
            </p>

            <h2
              style={{ fontFamily: "var(--font-great-vibes)" }}
              className="text-[72px] leading-none text-white whitespace-nowrap"
            >
              {props.name}
            </h2>
            <div className="w-[400px] h-px bg-gradient-to-r from-transparent via-[#b8862e] to-transparent mt-4" />

            <p className="mt-8 max-w-[700px] text-center text-[15px] leading-[2] whitespace-pre-wrap text-[#f8f9fa]/70">
              {props.body.split("SNR Edatas").map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <strong className="font-semibold text-white">
                      SNR Edatas
                    </strong>
                  )}
                </span>
              ))}
            </p>

            <p className="mt-6 text-[14px] tracking-wide text-[#f8f9fa]/50">
              Internship Period{" "}
              <span className="text-[#b8862e] ml-2 font-medium">
                {props.period}
              </span>
            </p>
          </div>

          <div className="w-full grid grid-cols-3 items-end mt-8 border-t border-[#f8f9fa]/10 pt-6">
            <div className="flex flex-col text-[11px] text-[#f8f9fa]/40 tracking-widest uppercase gap-1">
              <span>
                NO.{" "}
                <strong className="text-[#f8f9fa]/80">{props.serial}</strong>
              </span>
              <span>
                DT. <strong className="text-[#f8f9fa]/80">{props.date}</strong>
              </span>
            </div>

            <div className="col-span-2 flex justify-end gap-16">
              <div className="flex flex-col items-center">
                {props.sigImg ? (
                  <img
                    src={props.sigImg}
                    alt="sig"
                    className="h-12 object-contain -mb-1"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                ) : (
                  <div className="h-12" />
                )}
                <div className="w-[200px] h-px bg-[#f8f9fa]/30 mt-1" />
                <p className="mt-2 text-[12px] font-semibold tracking-wide text-white">
                  {props.ceoName}
                </p>
                <p className="text-[11px] text-[#f8f9fa]/50 mt-0.5">
                  {props.ceoRole}
                </p>
              </div>

              <div className="flex flex-col items-center">
                {props.sigImgRight ? (
                  <img
                    src={props.sigImgRight}
                    alt="sig"
                    className="h-12 object-contain -mb-1"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                ) : (
                  <div className="h-12" />
                )}
                <div className="w-[200px] h-px bg-[#f8f9fa]/30 mt-1" />
                <p className="mt-2 text-[12px] font-semibold tracking-wide text-white">
                  {props.hrName}
                </p>
                <p className="text-[11px] text-[#f8f9fa]/50 mt-0.5">
                  {props.hrRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
PremiumDarkTemplate.displayName = "PremiumDarkTemplate";

/* ─── 8. Academic Template ──────────────────────────── */
export const AcademicTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-[#faf8f5]"
      >
        <div className="absolute inset-[18px] border-[6px] border-double border-[#1f2536] pointer-events-none" />
        <div className="absolute inset-[28px] border border-[#1f2536]/30 pointer-events-none" />

        {/* Corner accents */}
        <div className="absolute top-[18px] left-[18px] w-8 h-8 border-r-[3px] border-b-[3px] border-[#b8862e] pointer-events-none" />
        <div className="absolute top-[18px] right-[18px] w-8 h-8 border-l-[3px] border-b-[3px] border-[#b8862e] pointer-events-none" />
        <div className="absolute bottom-[18px] left-[18px] w-8 h-8 border-r-[3px] border-t-[3px] border-[#b8862e] pointer-events-none" />
        <div className="absolute bottom-[18px] right-[18px] w-8 h-8 border-l-[3px] border-t-[3px] border-[#b8862e] pointer-events-none" />

        {props.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[45%] max-w-[380px] object-contain opacity-[0.06] sepia-[0.3]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center px-24 py-16 text-[#1f2536]">
          <img
            src={props.logo}
            alt="Company logo"
            className="object-contain h-[80px] w-auto"
          />

          <h1
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="mt-6 text-[54px] font-bold text-center tracking-wide text-[#1f2536]"
          >
            {props.title}
          </h1>

          <p
            className="mt-4 text-[16px] font-medium italic text-[#1f2536]/70"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            has conferred upon
          </p>

          <RecipientName name={props.name} align="center" width={800} />

          <p
            className="mt-6 text-[15px] italic text-[#1f2536]/70"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            for the successful completion of the internship requirements
          </p>

          <p className="mt-6 max-w-[750px] text-center text-[15px] leading-[1.8] whitespace-pre-wrap text-[#1f2536]/90 font-medium">
            {props.body.split("SNR Edatas").map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && (
                  <strong className="font-bold text-[#1f2536]">
                    SNR Edatas
                  </strong>
                )}
              </span>
            ))}
          </p>

          <p className="mt-6 text-[15px] font-semibold text-[#1f2536]">
            Given this <span className="text-[#b8862e]">{props.period}</span>
          </p>

          <div className="w-full flex justify-between items-end mt-auto pt-4">
            <div className="flex flex-col text-[11px] font-bold text-[#1f2536]/60 tracking-widest uppercase gap-1">
              <span>
                REG NO. <span className="text-[#1f2536]">{props.serial}</span>
              </span>
              <span>
                ISSUED <span className="text-[#1f2536]">{props.date}</span>
              </span>
            </div>

            <div className="flex gap-16">
              <SignatureBlock
                align="center"
                signature={props.sigImg}
                name={props.ceoName}
                role={props.ceoRole}
              />
              <SignatureBlock
                align="center"
                signature={props.sigImgRight}
                name={props.hrName}
                role={props.hrRole}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
AcademicTemplate.displayName = "AcademicTemplate";

/* ─── 9. Creative Template ──────────────────────────── */
export const CreativeTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f6f2e7] pointer-events-none" />
        <div className="absolute top-[40px] right-[40px] bottom-[40px] left-[40px] border-2 border-[#1f2536] pointer-events-none z-[2]" />
        <div className="absolute top-[32px] right-[48px] bottom-[48px] left-[32px] border-2 border-[#b8862e] pointer-events-none z-[2]" />

        {props.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] pr-[33%]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[60%] max-w-[400px] object-contain opacity-[0.05]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col justify-center px-[80px] py-[60px] text-[#1f2536]">
          <div className="w-[60%] pr-8">
            <img
              src={props.logo}
              alt="Company logo"
              className="object-contain h-[60px] w-auto mb-8"
            />

            <h1 className="text-[48px] font-black tracking-tight leading-none text-[#1f2536] uppercase mb-2">
              {props.title}
            </h1>
            <div className="w-12 h-2 bg-[#b8862e] mb-8" />

            <p className="text-[14px] font-bold tracking-[0.2em] uppercase text-[#1f2536]/50 mb-2">
              Presented To
            </p>
            <RecipientName name={props.name} align="left" width={600} />

            <p className="mt-8 text-[15px] leading-[1.8] whitespace-pre-wrap text-[#1f2536]/80 font-medium">
              {props.body.split("SNR Edatas").map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <strong className="font-bold text-[#b8862e]">
                      SNR Edatas
                    </strong>
                  )}
                </span>
              ))}
            </p>

            <p className="mt-6 text-[14px] font-bold text-[#1f2536]">
              Period: <span className="text-[#b8862e]">{props.period}</span>
            </p>
          </div>

          <div className="absolute right-[80px] bottom-[60px] w-[25%] flex flex-col gap-10">
            <SignatureBlock
              align="right"
              signature={props.sigImg}
              name={props.ceoName}
              role={props.ceoRole}
            />
            <SignatureBlock
              align="right"
              signature={props.sigImgRight}
              name={props.hrName}
              role={props.hrRole}
            />

            <div className="flex flex-col items-end text-[11px] font-bold tracking-widest uppercase text-[#1f2536]/50 mt-4 border-t-2 border-[#b8862e] pt-4">
              <span>
                NO. <span className="text-[#1f2536]">{props.serial}</span>
              </span>
              <span>
                DATE <span className="text-[#1f2536]">{props.date}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
CreativeTemplate.displayName = "CreativeTemplate";

/* ─── 10. Executive Template ──────────────────────────── */
export const ExecutiveTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white"
      >
        <div className="absolute top-0 left-0 w-full h-[180px] bg-[#1f2536] pointer-events-none" />
        <div className="absolute top-[176px] left-0 w-full h-[4px] bg-[#b8862e] pointer-events-none" />

        {props.showWatermark && (
          <div className="absolute inset-0 top-[180px] flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[45%] max-w-[380px] object-contain opacity-[0.04]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center">
          {/* Header */}
          <div className="w-full h-[180px] flex justify-between items-center px-24">
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[44px] font-semibold tracking-wider text-white uppercase"
            >
              {props.title}
            </h1>
            <img
              src={props.logo}
              alt="Company logo"
              className="object-contain h-[70px] w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Body */}
          <div className="flex-1 w-full px-24 py-12 flex flex-col items-center text-[#1f2536]">
            <p className="text-[14px] font-bold tracking-[0.2em] uppercase text-[#1f2536]/60 mb-6">
              This document is proudly presented to
            </p>

            <RecipientName name={props.name} align="center" width={800} />

            <p className="mt-10 max-w-[800px] text-center text-[16px] leading-[2] whitespace-pre-wrap text-[#1f2536]/80 font-medium">
              {props.body.split("SNR Edatas").map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <strong className="font-bold text-[#b8862e]">
                      SNR Edatas
                    </strong>
                  )}
                </span>
              ))}
            </p>

            <p className="mt-8 text-[15px] font-bold tracking-wide">
              Internship Period:{" "}
              <span className="text-[#b8862e]">{props.period}</span>
            </p>

            <div className="w-full flex justify-between items-end mt-auto">
              <div className="flex gap-16">
                <SignatureBlock
                  align="left"
                  signature={props.sigImg}
                  name={props.ceoName}
                  role={props.ceoRole}
                />
                <SignatureBlock
                  align="left"
                  signature={props.sigImgRight}
                  name={props.hrName}
                  role={props.hrRole}
                />
              </div>
              <div className="flex flex-col items-end text-[11px] font-bold tracking-[0.1em] text-[#1f2536]/50 bg-[#f6f2e7] px-4 py-2 rounded-md">
                <span className="uppercase">
                  Certificate No.{" "}
                  <strong className="text-[#1f2536]">{props.serial}</strong>
                </span>
                <span className="uppercase mt-1">
                  Date of Issue{" "}
                  <strong className="text-[#1f2536]">{props.date}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ExecutiveTemplate.displayName = "ExecutiveTemplate";
