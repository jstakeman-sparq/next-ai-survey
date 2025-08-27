"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { SurveyLayout } from '@/app/components/survey/SurveyLayout';
import { QuestionCard } from '@/app/components/survey/QuestionCard';
import { SurveyNavigation } from '@/app/components/survey/SurveyNavigation';
import { SurveyProvider, useSurveyContextProvider } from '@/app/components/survey/SurveyProvider';
import { useSurvey } from '@/hooks/useSurvey';
import { getQuestionById, calculateProgress, TOTAL_QUESTIONS, isValidQuestionId } from '@/lib/survey-data';
import { submitSurveyResponse } from '@/lib/amplify-client';
import { useSurveyStorage } from '@/hooks/useSurveyStorage';

const QuestionPageContent: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const questionId = parseInt(params.id as string, 10);
  const shortCode = searchParams.get('code');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { clearAll } = useSurveyStorage();
  const surveyContext = useSurveyContextProvider();
  const {
    surveyState,
    updateAnswer,
    nextQuestion,
    previousQuestion,
    navigateToQuestion,
    canNavigatePrevious,
    isLastQuestion
  } = useSurvey(shortCode || undefined, surveyContext?.surveyId);

  // Validate question ID and sync survey state
  useEffect(() => {
    if (!isValidQuestionId(questionId)) {
      router.push(shortCode ? `/survey?code=${shortCode}` : '/survey');
      return;
    }
    
    // Ensure survey state is synchronized with URL question index
    const urlQuestionIndex = questionId - 1;
    if (surveyState.currentQuestionIndex !== urlQuestionIndex) {
      navigateToQuestion(urlQuestionIndex);
    }
  }, [questionId, router, shortCode, surveyState.currentQuestionIndex, navigateToQuestion]);

  const question = getQuestionById(questionId);
  
  if (!question) {
    return <div>Question not found</div>;
  }

  const currentQuestionIndex = questionId - 1;
  const progress = calculateProgress(currentQuestionIndex);
  const selectedValue = surveyState.answers[questionId];

  const handleAnswerSelect = (value: 'A' | 'B' | 'C' | 'D') => {
    updateAnswer(questionId, value);
    setError(null);
  };

  const handleNext = async () => {
    if (isLastQuestion()) {
      await handleSubmitSurvey();
    } else {
      nextQuestion();
      const nextQuestionId = questionId + 1;
      const url = shortCode 
        ? `/survey/question/${nextQuestionId}?code=${shortCode}`
        : `/survey/question/${nextQuestionId}`;
      router.push(url);
    }
  };

  const handlePrevious = () => {
    previousQuestion();
    const prevQuestionId = questionId - 1;
    const url = shortCode 
      ? `/survey/question/${prevQuestionId}?code=${shortCode}`
      : `/survey/question/${prevQuestionId}`;
    router.push(url);
  };

  const handleSubmitSurvey = async () => {
    const surveyId = surveyContext?.surveyId || surveyState.surveyId;
    if (!surveyId) {
      setError('Survey ID not found. Please start over.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    console.log('Submitting survey with answers:', surveyState.answers);
    console.log('Total answers:', Object.keys(surveyState.answers).length);

    try {
      await submitSurveyResponse(surveyId, surveyState.answers);
      
      console.log('Survey submitted successfully, navigating to results...');
      // Navigate to results (keep localStorage for results page to read)
      const url = shortCode 
        ? `/survey/results?code=${shortCode}`
        : '/survey/results';
      router.push(url);
    } catch (err) {
      console.error('Error submitting survey:', err);
      setError('Failed to submit survey. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
    const url = shortCode ? `/survey?code=${shortCode}` : '/survey';
    router.push(url);
  };

  return (
    <SurveyLayout
      currentQuestion={questionId}
      totalQuestions={TOTAL_QUESTIONS}
      progress={progress}
      onBackToHome={handleBackToHome}
    >
      <QuestionCard
        question={question}
        selectedValue={selectedValue}
        onAnswerSelect={handleAnswerSelect}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <SurveyNavigation
        canGoBack={canNavigatePrevious()}
        canGoNext={!!selectedValue}
        isLastQuestion={isLastQuestion()}
        isSubmitting={isSubmitting}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </SurveyLayout>
  );
};

const QuestionPageWrapper: React.FC = () => {
  const searchParams = useSearchParams();
  const shortCode = searchParams.get('code');

  return (
    <SurveyProvider shortCode={shortCode || undefined}>
      <QuestionPageContent />
    </SurveyProvider>
  );
};

export default function QuestionPage() {
  return (
    <Suspense fallback={<div>Loading question...</div>}>
      <QuestionPageWrapper />
    </Suspense>
  );
}