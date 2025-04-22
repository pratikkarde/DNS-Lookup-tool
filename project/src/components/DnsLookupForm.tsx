import React, { useState } from 'react';
import { Search, RotateCw, Globe } from 'lucide-react';

interface DnsLookupFormProps {
  onSubmit: (domain: string, recordType: string) => void;
  loading: boolean;
}

const DnsLookupForm: React.FC<DnsLookupFormProps> = ({ onSubmit, loading }) => {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [error, setError] = useState('');

  const recordTypes = [
    { value: 'A', label: 'A (IPv4)' },
    { value: 'AAAA', label: 'AAAA (IPv6)' },
    { value: 'MX', label: 'MX (Mail)' },
    { value: 'TXT', label: 'TXT (Text)' },
    { value: 'CNAME', label: 'CNAME (Alias)' },
    { value: 'NS', label: 'NS (Nameserver)' },
    { value: 'AUTH', label: 'Authentication (SPF/DKIM/DMARC)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate domain
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }
    
    // Simple domain validation
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain.trim())) {
      setError('Please enter a valid domain name');
      return;
    }
    
    setError('');
    onSubmit(domain.trim(), recordType);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
            Domain Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Globe className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="domain"
              className={`block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ${
                error ? 'ring-red-300 placeholder:text-red-300 focus:ring-red-500' : 'ring-gray-300 placeholder:text-gray-400 focus:ring-blue-500'
              } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={loading}
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <div className="w-full md:w-56">
          <label htmlFor="record-type" className="block text-sm font-medium text-gray-700 mb-1">
            Record Type
          </label>
          <select
            id="record-type"
            className="block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            disabled={loading}
          >
            {recordTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            type="submit"
            className={`w-full md:w-auto flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm ${
              loading 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            } transition-colors duration-200`}
            disabled={loading}
          >
            {loading ? (
              <>
                <RotateCw className="h-5 w-5 animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Lookup</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DnsLookupForm;