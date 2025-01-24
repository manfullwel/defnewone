import { Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { DailyReport } from '@/components/DailyReport';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { DocumentViewer } from '@/components/DocumentViewer';
import { SheetImport } from '@/components/SheetImport';
import { useState } from 'react';
import { DailyReport as DailyReportType } from '@/types/report';

export default function Index() {
  const location = useLocation();
  const [data, setData] = useState<DailyReportType[]>([]);
  const [rawData, setRawData] = useState<any[][]>([]);
  const [fileName, setFileName] = useState<string>();

  const handleDataImported = (importedData: DailyReportType[], name?: string) => {
    setData(importedData);
    setFileName(name);
  };

  const handleRawDataImported = (data: any[][], name?: string) => {
    setRawData(data);
    setFileName(name);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPath={location.pathname} />
      <div className="max-w-screen-xl mx-auto p-4">
        <SheetImport
          onDataImported={handleDataImported}
          onRawDataImported={handleRawDataImported}
        />

        <div className="mt-4">
          <Routes>
            <Route path="/" element={<DailyReport data={data} fileName={fileName} />} />
            <Route path="/analytics" element={<AnalyticsDashboard data={data} />} />
            <Route path="/data" element={<DocumentViewer data={rawData} fileName={fileName} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
