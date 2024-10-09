import React, { useState } from 'react';
import TemplateEditor from './components/TemplateEditor';
import TemplateViewer from './components/TemplateViewer';

function App() {
  const [templates, setTemplates] = useState<{ question: string; answers: string[]; correctAnswer: string }[]>([
    { question: 'The capital of France is _______.', answers: ['Paris', 'Berlin', 'Madrid'], correctAnswer: 'Paris' }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Multi-Question Template Tool</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <TemplateEditor
          templates={templates}
          setTemplates={setTemplates}
        />
        <TemplateViewer
          templates={templates}
        />
      </div>
    </div>
  );
}

export default App;