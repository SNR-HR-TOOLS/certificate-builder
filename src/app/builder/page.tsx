"use client";

import snrLogo from "@/assets/snr-logo-without-bg.png";
import {
  AcademicTemplate,
  ClassicTemplate,
  CorporateTemplate,
  CreativeTemplate,
  ElegantTemplate,
  ExecutiveTemplate,
  GeometricTemplate,
  MinimalistTemplate,
  ModernTemplate,
  PremiumDarkTemplate,
} from "@/components/templates/CertificateTemplates";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Image as ImageIcon, PenLine, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const TEMPLATES = {
  Classic: ClassicTemplate,
  Modern: ModernTemplate,
  Minimalist: MinimalistTemplate,
  Corporate: CorporateTemplate,
  Elegant: ElegantTemplate,
  Geometric: GeometricTemplate,
  PremiumDark: PremiumDarkTemplate,
  Academic: AcademicTemplate,
  Creative: CreativeTemplate,
  Executive: ExecutiveTemplate,
} as const;

type TemplateKey = keyof typeof TEMPLATES;

/* ─── Main page ────────────────────────────────────────────────── */
function HomePage() {
  const [logo, setLogo] = useState<string>(snrLogo.src);
  const [sigImg, setSigImg] = useState<string>("");
  const [sigImgRight, setSigImgRight] = useState<string>("");
  const [title, setTitle] = useState("Certificate of Internship");
  const [name, setName] = useState("D.Karthik");
  const [body, setBody] = useState(
    "This is to certify that D.Karthik has successfully completed an internship at SNR Edatas.\nDuring this period, his/her conduct and performance were found to be satisfactory.\nWe wish him/her all the best for future opportunities.",
  );
  const [period, setPeriod] = useState("1st April 2026 to 31st May 2026");
  const [ceoName, setCeoName] = useState("Mr. Charles Adams");
  const [ceoRole, setCeoRole] = useState("Chief Executive Officer");
  const [hrName, setHrName] = useState("Mr. Charles Adams");
  const [hrRole, setHrRole] = useState("Human Resource and Management");
  const [serial, setSerial] = useState("HL-34783242");
  const [date, setDate] = useState("31/05/2026");
  const [showWatermark, setShowWatermark] = useState(true);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateKey>("Classic");

  const certRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const exportImage = async () => {
    if (!certRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(certRef.current, {
        pixelRatio: 2,
        backgroundColor: "#f6f2e7",
      });

      const sanitizedName = name
        .trim()
        .replace(/[^a-zA-Z0-9.\- ]/g, "")
        .replace(/\s+/g, "_");
      const fileName = `${sanitizedName}_${serial || "export"}`;

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  const exportPdf = async () => {
    if (!certRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(certRef.current, {
        pixelRatio: 2,
        backgroundColor: "#f6f2e7",
      });

      const sanitizedName = name
        .trim()
        .replace(/[^a-zA-Z0-9.\- ]/g, "")
        .replace(/\s+/g, "_");
      const fileName = `${sanitizedName}_${serial || "export"}`;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [certRef.current.offsetWidth, certRef.current.offsetHeight],
      });
      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        certRef.current.offsetWidth,
        certRef.current.offsetHeight,
      );
      pdf.save(`${fileName}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 gap-6 bg-[#e8e6df]">
      {/* ── Certificate Preview ──────────────────────────────────── */}
      {(() => {
        const ActiveTemplate = TEMPLATES[selectedTemplate];
        return (
          <ActiveTemplate
            ref={certRef}
            logo={logo}
            title={title}
            name={name}
            body={body}
            period={period}
            ceoName={ceoName}
            ceoRole={ceoRole}
            sigImg={sigImg}
            hrName={hrName}
            hrRole={hrRole}
            sigImgRight={sigImgRight}
            serial={serial}
            date={date}
            showWatermark={showWatermark}
          />
        );
      })()}

      {/* ── Customize Panel ─────────────────────────────────────── */}
      <div className="w-full max-w-[1100px] bg-white rounded-lg shadow-lg p-6 border border-[#d8d4c8]">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h3 className="text-lg font-semibold text-[#1f2536]">
            Customize Certificate
          </h3>
          <div className="flex gap-2">
            <button
              onClick={exportImage}
              disabled={isExporting}
              className={`px-4 py-2 bg-[#1f2536] text-white rounded-md text-sm font-medium hover:bg-[#2c3450] transition-colors ${isExporting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isExporting ? "Exporting..." : "Export as Image"}
            </button>
            <button
              onClick={exportPdf}
              disabled={isExporting}
              className={`px-4 py-2 bg-[#b8862e] text-white rounded-md text-sm font-medium hover:bg-[#a17527] transition-colors ${isExporting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isExporting ? "Exporting..." : "Export as PDF"}
            </button>
          </div>
        </div>

        {/* Template Selector */}
        <div className="mb-6 pt-1 pb-4 border-b border-[#e6e1d2]">
          <Label>Select Template</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(Object.keys(TEMPLATES) as TemplateKey[]).map((tmpl) => (
              <button
                key={tmpl}
                onClick={() => setSelectedTemplate(tmpl)}
                className={`px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors ${
                  selectedTemplate === tmpl
                    ? "bg-[#1f2536] text-white"
                    : "bg-[#f6f2e7] text-[#1f2536] border border-[#d8d4c8] hover:bg-[#ebe5d5]"
                }`}
              >
                {tmpl.replace(/([A-Z])/g, " $1").trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Basic info */}
          <Field label="Certificate Title" value={title} onChange={setTitle} />
          <Field label="Recipient Name" value={name} onChange={setName} />

          <div className="md:col-span-2">
            <Label>Body Text</Label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full border border-[#d8d4c8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e] resize-none"
            />
          </div>

          <Field
            label="Internship Period"
            value={period}
            onChange={setPeriod}
          />
          <Field label="ID" value={serial} onChange={setSerial} />
          <Field
            label="Date of Certification"
            value={date}
            onChange={setDate}
          />

          {/* Watermark Toggle */}
          <div className="md:col-span-2 pt-4 border-t border-[#e6e1d2] flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1f2536]">
                Watermark
              </p>
              <p className="text-[11px] text-[#9b9383] mt-0.5">
                Display SNR logo as a faint background watermark on the
                certificate
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showWatermark}
              onClick={() => setShowWatermark((v) => !v)}
              className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#b8862e] focus:ring-offset-2 ${
                showWatermark ? "bg-[#b8862e]" : "bg-[#d8d4c8]"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                  showWatermark ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Company Logo */}
          <div className="md:col-span-2 pt-2 border-t border-[#e6e1d2]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6b6657] mb-3">
              Company Logo
            </p>
          </div>
          <ImageUpload
            label="Logo Image"
            value={logo}
            onChange={setLogo}
            onClear={() => setLogo(snrLogo.src)}
            icon={<ImageIcon className="w-5 h-5" />}
            hint="PNG/SVG with transparent background works best"
            wide
          />

          {/* Left signature — CEO */}
          <div className="md:col-span-2 pt-2 border-t border-[#e6e1d2]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6b6657] mb-3">
              Left Signature — CEO
            </p>
          </div>
          <Field label="Name" value={ceoName} onChange={setCeoName} />
          <Field label="Role" value={ceoRole} onChange={setCeoRole} />
          <ImageUpload
            label="Signature Image"
            value={sigImg}
            onChange={setSigImg}
            onClear={() => setSigImg("")}
            icon={<PenLine className="w-5 h-5" />}
            hint="Optional — shows above the name on the left"
          />

          {/* Right signature — HR */}
          <div className="md:col-span-2 pt-2 border-t border-[#e6e1d2]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6b6657] mb-3">
              Right Signature — Human Resource and Management
            </p>
          </div>
          <Field label="Name" value={hrName} onChange={setHrName} />
          <Field label="Role" value={hrRole} onChange={setHrRole} />
          <ImageUpload
            label="Signature Image"
            value={sigImgRight}
            onChange={setSigImgRight}
            onClear={() => setSigImgRight("")}
            icon={<PenLine className="w-5 h-5" />}
            hint="Optional — shows above the name on the right"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Shared UI helpers ────────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-[#1f2536] mb-1 uppercase tracking-wide">
      {children}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#d8d4c8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e]"
      />
    </div>
  );
}

function ImageUpload({
  label,
  value,
  onChange,
  onClear,
  icon,
  hint,
  wide,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  onClear: () => void;
  icon: React.ReactNode;
  hint?: string;
  wide?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(f);
  };
  return (
    <div>
      <Label>{label}</Label>
      <div
        onClick={() => inputRef.current?.click()}
        className="group relative flex items-center gap-3 border-2 border-dashed border-[#d8d4c8] rounded-lg p-3 cursor-pointer hover:border-[#b8862e] hover:bg-[#faf8f2] transition-colors"
      >
        <div
          className={`flex-shrink-0 rounded-md bg-[#f6f2e7] border border-[#e6e1d2] flex items-center justify-center overflow-hidden ${wide ? "w-28 h-16" : "w-14 h-14"}`}
        >
          {value ? (
            <img
              src={value}
              alt={label}
              className={`w-full object-contain ${wide ? "h-full" : "h-full"}`}
              style={wide ? { maxHeight: "100%", width: "100%" } : {}}
            />
          ) : (
            <span className="text-[#b8862e]">{icon}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#1f2536]">
            <Upload className="w-3.5 h-3.5" />
            {value ? "Replace image" : "Click to upload"}
          </div>
          <p className="text-[11px] text-[#6b6657] mt-0.5 truncate">
            {hint || "PNG, JPG up to ~2MB"}
          </p>
        </div>
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="flex-shrink-0 p-1.5 rounded-md text-[#1f2536]/60 hover:text-[#1f2536] hover:bg-[#f6f2e7]"
            title="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handle}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default HomePage;
