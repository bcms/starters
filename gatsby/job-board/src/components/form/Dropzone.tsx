import React, { useState } from 'react';

interface Props {
    value?: File | undefined;
    label?: string;
    error?: string;
    onFileUpload: (file: File | undefined) => void;
}

const Dropzone: React.FC<Props> = ({ value, label, error, onFileUpload }) => {
    const [isDropzoneActive, setIsDropzoneActive] = useState(false);

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDropzoneActive(false);

        const files = event.dataTransfer.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (
                ['application/pdf', 'text/plain'].some(
                    (type) => file.type === type,
                )
            ) {
                onFileUpload(file);
                break;
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files || [];

        onFileUpload(files[0]);
    };

    return (
        <div className="flex flex-col">
            {label && (
                <div className="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-4 lg:text-base lg:leading-none">
                    {label}
                </div>
            )}
            <label
                className={`flex flex-col items-center justify-center text-center p-5 rounded-[10px] border border-dashed w-full cursor-pointer min-h-[100px] transition-colors duration-300 ${
                    error
                        ? 'border-red-500'
                        : isDropzoneActive || value
                          ? 'border-appAccent text-appAccent'
                          : 'text-[#56565F] border-[#C2C0BC] hover:border-[#56565F]'
                }`}
                onDrop={handleDrop}
                onDragEnter={(e) => {
                    e.preventDefault();
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDropzoneActive(false);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDropzoneActive(true);
                }}
            >
                <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.txt"
                    onChange={handleChange}
                />
                <div className="flex flex-col text-xs leading-none font-medium tracking-[-0.41px] lg:text-sm lg:leading-none">
                    {!value ? (
                        <>
                            <span className="underline">Upload</span>
                            <span className="my-2.5">or</span>
                            <span>Drag your file here</span>
                        </>
                    ) : (
                        <span>{value.name}</span>
                    )}
                </div>
            </label>
        </div>
    );
};

export default Dropzone;
