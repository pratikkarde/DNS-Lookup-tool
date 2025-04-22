export interface DnsRecord {
  value: string;
  ttl: number;
  priority?: number;
}

export interface AuthRule {
  exists: boolean;
  valid: boolean;
  value?: string;
  selector?: string;
  domain?: string;
}

export interface DnsResult {
  domain: string;
  recordType: string;
  timestamp: string;
  records: DnsRecord[];
  authRules: {
    spf: AuthRule;
    dkim: AuthRule;
    dmarc: AuthRule;
  };
}

export interface RecentLookup {
  id: number;
  domain: string;
  recordType: string;
  timestamp: string;
  success: boolean;
}