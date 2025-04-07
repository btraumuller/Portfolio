'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Loading() {
    return (
        <div className="z-[100] absolute w-full flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <p className="mb-6 text-4xl text-gray-600">Loading...</p>
                <FontAwesomeIcon 
                    icon={faSpinner} 
                    className="text-6xl text-[#002d72] animate-spin"
                />
                
            </div>
        </div>
    );
}