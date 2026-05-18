import type { VCInvestor } from "@/config/airtableConfig";

const API_URL = process.env.GATSBY_API_URL || "";

interface VCInvestorResponse {
  "Funds"?: string[];
  "Cheque Size"?: string[];
  "Created"?: string;
  "Industry Tags"?: string[];
  "Firm"?: string[];
  "True/False"?: string;
  "Website"?: string[];
  "Contacts"?: string[];
  "Contact Email"?: string[];
  "Contact LinkedIn"?: string[];
  "Company Country"?: string[];
  "Contact Location"?: string[];
  "Target Geography"?: string[];
  "Type"?: string;
  "Co-Investor Name (Deal)"?: string;
  "From field: Country (from Country)"?: string[];
  "Stage"?: string[];
  [key: string]: any;
}

export interface VCInvestorWithContacts extends VCInvestor {
  contacts: string[];
  contactEmail: string[];
  contactLinkedIn: string[];
  contactLocation: string[];
}

function normalizeArray(val: string | string[] | undefined): string[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

function normalizeFirst(val: string | string[] | undefined): string {
  if (!val) return "";
  return Array.isArray(val) ? val[0] || "" : val;
}

function mapResponseToInvestor(raw: VCInvestorResponse, index: number): VCInvestorWithContacts {
  const rawWebsite = normalizeFirst(raw["Website"]);
  const website = rawWebsite && !/^https?:\/\//i.test(rawWebsite)
    ? `https://${rawWebsite}`
    : rawWebsite;

  const domain = normalizeFirst(raw["Firm"]);

  return {
    id: String(index),
    name: raw["Co-Investor Name (Deal)"] || "",
    type: raw["Type"] || "",
    stage: normalizeArray(raw["Stage"]),
    industryTags: normalizeArray(raw["Industry Tags"]),
    targetGeography: normalizeArray(raw["Target Geography"]),
    chequeSize: normalizeArray(raw["Cheque Size"]),
    companyCountry: normalizeArray(raw["Company Country"]),
    website,
    domain,
    notes: "",
    contacts: normalizeArray(raw["Contacts"]),
    contactEmail: normalizeArray(raw["Contact Email"]),
    contactLinkedIn: normalizeArray(raw["Contact LinkedIn"]),
    contactLocation: normalizeArray(raw["Contact Location"]),
  };
}

export async function fetchVCInvestors(): Promise<VCInvestorWithContacts[]> {
  const res = await fetch(`${API_URL}/api/vc-investors`, {
    credentials: "include",
    mode: "cors",
  });
  if (!res.ok) throw new Error(`Failed to fetch VC investors: ${res.status}`);
  const data: VCInvestorResponse[] = await res.json();
  return data.map(mapResponseToInvestor);
}
