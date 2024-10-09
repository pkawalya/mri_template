import React, { useState, useEffect } from 'react';

interface TemplateViewerProps {
  templates: { question: string; answers: string[]; correctAnswer: string }[];
}

const TemplateViewer: React.FC<TemplateViewerProps> = ({ templates }) => {
  const [renderedTemplates, setRenderedTemplates] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(templates.length).fill(null));
  const [results, setResults] = useState<{ isCorrect: boolean; correctAnswer: string }[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const newRenderedTemplates = templates.map(({ question, answers }, questionIndex) => {
      const parts = question.split('_______');
      if (parts.length > 1) {
        return parts[0] + 
          `<select class="inline-block px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700" onchange="window.handleAnswerChange(${questionIndex}, this.selectedIndex - 1)" ${isChecked ? 'disabled' : ''}>` +
          '<option value="">Select an answer</option>' +
          answers.map((answer, index) => `<option value="${index}">${answer}</option>`).join('') +
          '</select>' +
          parts.slice(1).join('');
      } else {
        return question;
      }
    });
    setRenderedTemplates(newRenderedTemplates);
  }, [templates, isChecked]);

  useEffect(() => {
    // Add the handleAnswerChange function to the window object
    (window as any).handleAnswerChange = (questionIndex: number, answerIndex: number) => {
      setSelectedAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[questionIndex] = answerIndex;
        return newAnswers;
      });
    };
  }, []);

  const checkAnswers = () => {
    const newResults = templates.map((template, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const selectedAnswer = selectedAnswerIndex !== null ? template.answers[selectedAnswerIndex] : null;
      return {
        isCorrect: selectedAnswer === template.correctAnswer,
        correctAnswer: template.correctAnswer
      };
    });
    setResults(newResults);
    setIsChecked(true);
  };

  const resetTemplate = () => {
    setSelectedAnswers(new Array(templates.length).fill(null));
    setResults([]);
    setIsChecked(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Template Preview</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-8">
        {renderedTemplates.map((template, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <div dangerouslySetInnerHTML={{ __html: template }} className="text-lg" />
            {results[index] && (
              <div className={`mt-2 ${results[index].isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {results[index].isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${results[index].correctAnswer}`}
              </div>
            )}
          </div>
        ))}
      </div>
      {!isChecked ? (
        <button 
          onClick={checkAnswers}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Check Answers
        </button>
      ) : (
        <button 
          onClick={resetTemplate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Template
        </button>
      )}
    </div>
  );
};

export default TemplateViewer;