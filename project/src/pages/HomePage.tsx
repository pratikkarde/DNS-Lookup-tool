import React, { useState } from 'react';
import DnsLookupForm from '../components/DnsLookupForm';
import ResultsDisplay from '../components/ResultsDisplay';
import RecentLookups from '../components/RecentLookups';
import { DnsResult } from '../types';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';

const HomePage = () => {
  const [results, setResults] = useState<DnsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookupSubmit = async (domain: string, recordType: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll generate mock data
      // In a real application, this would call a real DNS API
      const mockResults = generateMockResults(domain, recordType);
      setResults(mockResults);
      
      // Save to recent lookups
      saveToRecentLookups(domain, recordType, mockResults);
    } catch (err) {
      setError('Failed to perform DNS lookup. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveToRecentLookups = (domain: string, recordType: string, results: DnsResult) => {
    try {
      const recentLookups = JSON.parse(localStorage.getItem('recentLookups') || '[]');
      const newLookup = {
        id: Date.now(),
        domain,
        recordType,
        timestamp: new Date().toISOString(),
        success: true
      };
      
      // Add to beginning, limit to 5 items
      const updatedLookups = [newLookup, ...recentLookups].slice(0, 5);
      localStorage.setItem('recentLookups', JSON.stringify(updatedLookups));
    } catch (error) {
      console.error('Failed to save to recent lookups:', error);
    }
  };

  const generateMockResults = (domain: string, recordType: string): DnsResult => {
    // This is mock data for demonstration purposes
    const commonData = {
      domain,
      recordType,
      timestamp: new Date().toISOString(),
    };

    // Different mock responses based on record type
    switch (recordType) {
      case 'A':
        return {
          ...commonData,
          records: [
            { value: '93.184.216.34', ttl: 300 }
          ],
          authRules: {
            spf: { exists: true, valid: true, value: 'v=spf1 include:_spf.example.com -all' },
            dkim: { exists: true, valid: true },
            dmarc: { exists: true, valid: true, value: 'v=DMARC1; p=reject; sp=reject; pct=100;' }
          }
        };
      case 'MX':
        return {
          ...commonData,
          records: [
            { value: 'aspmx.l.google.com', priority: 1, ttl: 3600 },
            { value: 'alt1.aspmx.l.google.com', priority: 5, ttl: 3600 },
            { value: 'alt2.aspmx.l.google.com', priority: 10, ttl: 3600 }
          ],
          authRules: {
            spf: { exists: true, valid: true, value: 'v=spf1 include:_spf.example.com -all' },
            dkim: { exists: true, valid: true },
            dmarc: { exists: true, valid: true, value: 'v=DMARC1; p=reject; sp=reject; pct=100;' }
          }
        };
      case 'TXT':
        return {
          ...commonData,
          records: [
            { value: 'v=spf1 include:_spf.example.com -all', ttl: 3600 },
            { value: 'google-site-verification=1a2b3c4d5e6f', ttl: 3600 }
          ],
          authRules: {
            spf: { exists: true, valid: true, value: 'v=spf1 include:_spf.example.com -all' },
            dkim: { exists: true, valid: true },
            dmarc: { exists: true, valid: true, value: 'v=DMARC1; p=reject; sp=reject; pct=100;' }
          }
        };
      case 'CNAME':
        return {
          ...commonData,
          records: [
            { value: 'example.com', ttl: 3600 }
          ],
          authRules: {
            spf: { exists: true, valid: true, value: 'v=spf1 include:_spf.example.com -all' },
            dkim: { exists: false, valid: false },
            dmarc: { exists: true, valid: true, value: 'v=DMARC1; p=reject; sp=reject; pct=100;' }
          }
        };
      case 'NS':
        return {
          ...commonData,
          records: [
            { value: 'ns1.example.com', ttl: 86400 },
            { value: 'ns2.example.com', ttl: 86400 }
          ],
          authRules: {
            spf: { exists: true, valid: true, value: 'v=spf1 include:_spf.example.com -all' },
            dkim: { exists: false, valid: false },
            dmarc: { exists: true, valid: true, value: 'v=DMARC1; p=reject; sp=reject; pct=100;' }
          }
        };
      case 'AUTH':
        return {
          ...commonData,
          records: [],
          authRules: {
            spf: { exists: true, valid: true, value: 'v=spf1 include:_spf.example.com ~all' },
            dkim: { exists: true, valid: true, selector: 'selector1', domain: domain },
            dmarc: { exists: true, valid: true, value: 'v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc@example.com' }
          }
        };
      default:
        return {
          ...commonData,
          records: [
            { value: '93.184.216.34', ttl: 300 }
          ],
          authRules: {
            spf: { exists: true, valid: true, value: 'v=spf1 include:_spf.example.com -all' },
            dkim: { exists: true, valid: true },
            dmarc: { exists: true, valid: true, value: 'v=DMARC1; p=reject; sp=reject; pct=100;' }
          }
        };
    }
  };

  return (
    <div className="flex flex-col space-y-16">
      <Hero />
      
      <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">DNS Lookup Tool</h2>
        <DnsLookupForm onSubmit={handleLookupSubmit} loading={loading} />
        
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          ) : results ? (
            <ResultsDisplay results={results} />
          ) : null}
        </div>
      </section>
      
      <RecentLookups onSelectLookup={(domain, recordType) => handleLookupSubmit(domain, recordType)} />
      
      <FeaturesSection />
    </div>
  );
};

export default HomePage;