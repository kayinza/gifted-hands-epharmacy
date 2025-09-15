import React, { useRef, useState } from 'react';
import { UploadIcon, XIcon } from './icons';

interface PrescriptionUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({ isOpen, onClose }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = () => {
        // Handle form submission logic
        console.log("Prescription submitted.");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <XIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-dark mb-4">Upload Prescription</h2>
                <p className="text-gray-600 mb-6">Please upload a clear photo or PDF of your prescription for our pharmacists to review.</p>
                
                <div 
                    onClick={handleUploadClick}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
                >
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                        {fileName ? fileName : "Click to upload a file"}
                    </p>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleFileChange} 
                        accept="image/*,.pdf" 
                    />
                </div>

                <div className="mt-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes for Pharmacist (Optional)</label>
                    <textarea 
                        id="notes" 
                        rows={3} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="e.g., Preferred brand, allergies..."
                    ></textarea>
                </div>

                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={onClose} 
                        type="button" 
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        type="submit" 
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Submit Prescription
                    </button>
                </div>
            </div>
        </div>
    );
};
