import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser, Check } from 'lucide-react';

export default function SignaturePad({ onSave, onClear }) {
    const sigCanvas = useRef({});
    const [isEmpty, setIsEmpty] = useState(true);

    const clear = () => {
        sigCanvas.current.clear();
        setIsEmpty(true);
        if (onClear) onClear();
    };

    const save = () => {
        if (sigCanvas.current.isEmpty()) return;
        const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        onSave(dataURL);
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="border-2 border-dashed border-gray-600 rounded-lg bg-white overflow-hidden relative">
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{
                        className: 'w-full h-64 cursor-crosshair',
                    }}
                    onBegin={() => setIsEmpty(false)}
                />

                {isEmpty && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 select-none">
                        <span className="text-lg italic">Sign here</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={clear}
                    className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
                >
                    <Eraser size={18} className="mr-2" />
                    Clear
                </button>

                <button
                    onClick={save}
                    disabled={isEmpty}
                    className="flex items-center px-6 py-2 bg-gold-600 text-white rounded font-bold hover:bg-gold-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Check size={18} className="mr-2" />
                    Confirm Signature
                </button>
            </div>
        </div>
    );
}
