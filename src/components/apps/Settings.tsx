import React from 'react';
import { Monitor } from 'lucide-react';

export const SettingsApp: React.FC = () => {
    return (
        <div className="h-full bg-gray-100 p-8 flex flex-col items-center justify-center text-gray-500">
            <Monitor size={64} className="mb-4 text-gray-400" />
            <h2 className="text-xl font-bold text-gray-700">System Preferences</h2>
            <p className="mt-2 text-center">Theme customization and other settings currently under development.</p>
        </div>
    );
};
