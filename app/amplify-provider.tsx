"use client";

import { Amplify } from 'aws-amplify';
import config from '@/amplify_outputs.json';
import { ReactNode, useEffect, useState } from 'react';

interface AmplifyProviderProps {
  children: ReactNode;
}

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    try {
      Amplify.configure(config, {
        ssr: true
      });
      setIsConfigured(true);
      console.log('✅ Amplify configured successfully');
    } catch (error) {
      console.error('❌ Failed to configure Amplify:', error);
    }
  }, []);

  // Wait for Amplify to be configured before rendering children
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}