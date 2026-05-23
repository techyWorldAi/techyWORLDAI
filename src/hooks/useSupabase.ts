import { Company, Story } from "../types";

export interface SupabaseConfig {
  url: string;
  key: string;
}

function getStoredConfig(): SupabaseConfig {
  return {
    url: localStorage.getItem("tw_sb_url") ?? "",
    key: localStorage.getItem("tw_sb_key") ?? "",
  };
}

async function sbFetch<T>(
  path: string,
  opts: RequestInit = {},
  config?: SupabaseConfig
): Promise<T> {
  const { url, key } = config ?? getStoredConfig();
  if (!url || !key) throw new Error("Supabase not configured.");

  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(opts.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  // DELETE returns 204 no-content
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

/* ── Public API ───────────────────────────────────── */

export async function testConnection(config: SupabaseConfig): Promise<void> {
  await sbFetch("companies?select=id&limit=1", {}, config);
}

export async function loadCompanies(config?: SupabaseConfig): Promise<Company[]> {
  return sbFetch<Company[]>(
    "companies?select=*&order=created_at.desc",
    {},
    config
  );
}

export async function loadStories(config?: SupabaseConfig): Promise<Story[]> {
  return sbFetch<Story[]>(
    "stories?select=*&order=created_at.desc",
    {},
    config
  );
}

export async function addCompany(
  data: Omit<Company, "id" | "created_at">,
  config?: SupabaseConfig
): Promise<Company[]> {
  return sbFetch<Company[]>(
    "companies",
    { method: "POST", body: JSON.stringify(data) },
    config
  );
}

export async function addStory(
  data: Omit<Story, "id" | "created_at">,
  config?: SupabaseConfig
): Promise<Story[]> {
  return sbFetch<Story[]>(
    "stories",
    { method: "POST", body: JSON.stringify(data) },
    config
  );
}

export async function deleteRecord(
  table: "companies" | "stories",
  id: string,
  config?: SupabaseConfig
): Promise<void> {
  await sbFetch(`${table}?id=eq.${id}`, { method: "DELETE" }, config);
}

/* ── SQL helper ───────────────────────────────────── */

export const CREATE_TABLES_SQL = `-- Run this in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS companies (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  industry    text,
  logo_url    text,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stories (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title         text NOT NULL,
  company_name  text,
  description   text,
  platform      text DEFAULT 'linkedin',
  link          text,
  created_at    timestamptz DEFAULT now()
);

-- Row-level security + open policies (adjust for production)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read companies"  ON companies FOR SELECT USING (true);
CREATE POLICY "Public write companies" ON companies FOR ALL    USING (true);
CREATE POLICY "Public read stories"    ON stories  FOR SELECT USING (true);
CREATE POLICY "Public write stories"   ON stories  FOR ALL    USING (true);
`;
