import React from 'react';
import { FileUploadAnalyzer } from '@/components/FileUploadAnalyzer';

export const AnalisadorArquivos: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Analisador de Relatórios</h1>
      <FileUploadAnalyzer />
    </div>
  );
};
