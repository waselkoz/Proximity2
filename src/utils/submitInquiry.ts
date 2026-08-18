export async function submitInquiry(data: {
    name?: string;
    email?: string;
    details?: string;
    service?: string;
}) {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwA4R2tggfzFAOw-Wbe2fNqi5slpvmF_KBzyItizpZicA6I37GLTz5ljiPLMKlnC6xI/exec";
    
    // For local dev/testing before the URL is provided, simulate a successful network request
    if (GOOGLE_SCRIPT_URL.includes("YOUR_URL_HERE")) {
        console.warn("Google Apps Script URL is missing. Simulating successful submission:", data);
        return new Promise(resolve => setTimeout(() => resolve({ result: "success" }), 1500));
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors", // Required to bypass CORS blocks from Google Scripts
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        
        return { result: "success" };
    } catch (error) {
        console.error("Error submitting inquiry:", error);
        throw error;
    }
}
