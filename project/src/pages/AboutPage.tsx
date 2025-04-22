import React from 'react';
import { FileWarning, RefreshCw, Laptop, Shield, Globe2, Server } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col space-y-16">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About DNSPulse</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            DNSPulse is a professional DNS lookup and authentication verification tool designed to help webmasters, 
            email administrators, and IT professionals easily check and troubleshoot domain settings.
          </p>
          <p className="text-lg text-gray-700">
            Our tool provides comprehensive information about DNS records and email authentication protocols 
            like SPF, DKIM, and DMARC, helping ensure your domains are properly configured for security and deliverability.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding DNS Records</h2>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RecordExplanation
              type="A Records"
              icon={<Laptop className="h-6 w-6 text-blue-500" />}
              description="Maps a domain to an IPv4 address. For example, mapping example.com to 93.184.216.34."
            />
            <RecordExplanation
              type="AAAA Records"
              icon={<Globe2 className="h-6 w-6 text-blue-500" />}
              description="Maps a domain to an IPv6 address, the newer internet protocol that provides more IP addresses."
            />
            <RecordExplanation
              type="MX Records"
              icon={<Mail className="h-6 w-6 text-blue-500" />}
              description="Specifies the mail servers responsible for accepting email for the domain and their priority."
            />
            <RecordExplanation
              type="TXT Records"
              icon={<FileText className="h-6 w-6 text-blue-500" />}
              description="Holds text information for various purposes, including SPF records for email authentication."
            />
            <RecordExplanation
              type="CNAME Records"
              icon={<RefreshCw className="h-6 w-6 text-blue-500" />}
              description="Creates an alias from one domain to another, often used for subdomains pointing to services."
            />
            <RecordExplanation
              type="NS Records"
              icon={<Server className="h-6 w-6 text-blue-500" />}
              description="Specifies the authoritative DNS servers for the domain that respond to DNS queries."
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Email Authentication</h2>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Why Email Authentication Matters
              </h3>
              <p className="text-gray-700">
                Email authentication helps prevent email spoofing, phishing, and spam by validating 
                that emails truly come from the domain they claim to be from. Proper configuration improves 
                deliverability and protects your brand's reputation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AuthExplanation
                type="SPF"
                title="Sender Policy Framework"
                description="Specifies which mail servers are allowed to send email on behalf of your domain."
              />
              <AuthExplanation
                type="DKIM"
                title="DomainKeys Identified Mail"
                description="Adds a digital signature to emails, allowing receivers to verify they weren't altered in transit."
              />
              <AuthExplanation
                type="DMARC"
                title="Domain-based Message Authentication, Reporting & Conformance"
                description="Tells receivers what to do with emails that fail SPF or DKIM checks and provides reporting options."
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Common DNS Issues</h2>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            <DnsIssue
              title="Propagation Delays"
              description="DNS changes can take 24-48 hours to fully propagate worldwide. This is normal behavior."
              icon={<Clock className="h-6 w-6 text-amber-500" />}
            />
            <DnsIssue
              title="Missing Records"
              description="Forgetting essential records like MX can cause email delivery failures."
              icon={<FileWarning className="h-6 w-6 text-amber-500" />}
            />
            <DnsIssue
              title="Incorrect TTL Values"
              description="Time-To-Live values that are too high can delay changes, while values too low can increase DNS server load."
              icon={<AlertCircle className="h-6 w-6 text-amber-500" />}
            />
            <DnsIssue
              title="Email Authentication Errors"
              description="Improperly configured SPF, DKIM, or DMARC records can lead to legitimate emails being marked as spam."
              icon={<Shield className="h-6 w-6 text-amber-500" />}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface RecordExplanationProps {
  type: string;
  icon: React.ReactNode;
  description: string;
}

const RecordExplanation: React.FC<RecordExplanationProps> = ({ type, icon, description }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-lg font-medium text-gray-900">{type}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

interface AuthExplanationProps {
  type: string;
  title: string;
  description: string;
}

const AuthExplanation: React.FC<AuthExplanationProps> = ({ type, title, description }) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-blue-50">
      <div className="mb-3">
        <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
          {type}
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

interface DnsIssueProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DnsIssue: React.FC<DnsIssueProps> = ({ title, description, icon }) => {
  return (
    <div className="flex items-start gap-4 p-4 border border-amber-100 rounded-lg bg-amber-50">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

import { Mail, FileText, AlertCircle } from 'lucide-react';

export default AboutPage;