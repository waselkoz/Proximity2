import React from "react";

export default function TestPage() {
    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-white text-black p-4 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Image Rendering Test</h1>
            
            <p className="mb-2 font-bold">1. Native IMG Tag (Mobile bg):</p>
            <img src="/monolith-bg-mobile.jpg" className="w-full h-[400px] object-cover border-4 border-blue-500 mb-8" />
            
            <p className="mb-2 font-bold">2. Native IMG Tag (Desktop bg):</p>
            <img src="/monolith-bg-v2.jpg" className="w-full h-[200px] object-cover border-4 border-green-500 mb-8" />

            <p className="mb-2 font-bold">3. CSS Background Inline Style:</p>
            <div className="w-full h-[400px] border-4 border-purple-500" style={{ backgroundImage: "url('/monolith-bg-mobile.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        </div>
    );
}
