import Header from "../components/shared/Header";
import DocumentScanner from "../components/patient/DocumentScanner";
import ChatBot from "../components/patient/ChatBot";

export default function PatientView() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header role="patient" userName="John D." />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-5rem)]">
          <div className="flex flex-col min-h-0">
            <DocumentScanner />
          </div>
          <div className="flex flex-col min-h-0">
            <ChatBot />
          </div>
        </div>
      </main>
    </div>
  );
}
