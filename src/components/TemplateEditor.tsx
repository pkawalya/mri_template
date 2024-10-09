import React from 'react';

interface TemplateEditorProps {
  templates: { question: string; answers: string[]; correctAnswer: string }[];
  setTemplates: React.Dispatch<React.SetStateAction<{ question: string; answers: string[]; correctAnswer: string }[]>>;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ templates, setTemplates }) => {
  const handleTemplatesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const templateBlocks = text.split('\n\n');
    const newTemplates: { question: string; answers: string[]; correctAnswer: string }[] = [];

    templateBlocks.forEach(block => {
      const lines = block.split('\n');
      if (lines.length >= 2) {
        const question = lines[0].trim();
        const answerLine = lines[1].trim();
        const answerMatch = answerLine.match(/\[(.*?)\]\s*\[(.*?)\]/);
        
        if (answerMatch) {
          const answers = answerMatch[1].split(',').map(a => a.trim());
          const correctAnswer = answerMatch[2].trim();
          newTemplates.push({ question, answers, correctAnswer });
        }
      }
    });

    setTemplates(newTemplates);
  };

  const templatesText = templates.map(t => `${t.question}\n[${t.answers.join(', ')}] [${t.correctAnswer}]`).join('\n\n');

  return (
    <div className="mb-6">
      <label htmlFor="templates" className="block text-sm font-medium text-gray-700 mb-2">
        Enter your questions and answers (use _______ for answer gaps, enclose answer options in square brackets, and the correct answer in separate square brackets):
      </label>
      <textarea
        id="templates"
        value={templatesText}
        onChange={handleTemplatesChange}
        className="w-full h-64 p-2 border border-gray-300 rounded-md"
        placeholder="The capital of France is _______.\n[Paris, Berlin, Madrid] [Paris]\n\nWater freezes at _______ degrees Celsius.\n[0, 10, -10] [0]"
      />
    </div>
  );
};

export default TemplateEditor;