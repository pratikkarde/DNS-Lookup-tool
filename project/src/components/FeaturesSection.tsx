import React from 'react';
import { Server, BarChart4, Clock, Globe, FileLock2, Layers } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Powerful DNS Analysis Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to verify, troubleshoot, and secure your domain's DNS infrastructure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          <FeatureCard
            icon={<Server className="h-6 w-6" />}
            title="Complete Record Support"
            description="Look up A, AAAA, MX, TXT, CNAME, NS, and other DNS record types with detailed information."
          />
          <FeatureCard
            icon={<FileLock2 className="h-6 w-6" />}
            title="Email Security Analysis"
            description="Verify SPF, DKIM, and DMARC records to ensure proper email security and deliverability."
          />
          <FeatureCard
            icon={<BarChart4 className="h-6 w-6" />}
            title="Visual Health Score"
            description="Get a comprehensive domain health score based on DNS and security configurations."
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6" />}
            title="Historical Lookups"
            description="Access your recent DNS lookups with one click for efficient workflow."
          />
          <FeatureCard
            icon={<Globe className="h-6 w-6" />}
            title="Propagation Checking"
            description="Verify DNS propagation status across different global DNS servers."
          />
          <FeatureCard
            icon={<Layers className="h-6 w-6" />}
            title="Batch Processing"
            description="Check multiple domains at once for efficient administration of large domain portfolios."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="relative flex flex-col h-full">
      <div className="absolute -left-3 -top-3 p-3 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl shadow-md">
        <div className="text-white">
          {icon}
        </div>
      </div>
      <div className="bg-white pl-6 pr-6 pt-10 pb-6 rounded-xl shadow-sm hover:shadow transition-shadow h-full border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeaturesSection;