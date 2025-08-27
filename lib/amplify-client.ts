"use client";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { SurveyAnswers } from '@/types/survey';

let client: ReturnType<typeof generateClient<Schema>> | null = null;

const getClient = () => {
  if (!client) {
    client = generateClient<Schema>();
  }
  return client;
};

export const getSurveyByShortCode = async (shortCode: string) => {
  try {
    const client = getClient();
    const result = await client.models.Survey.list({
      filter: { shortCode: { eq: shortCode } }
    });
    return result.data[0] || null;
  } catch (error) {
    console.error('Error fetching survey by shortcode:', error);
    throw new Error('Failed to fetch survey data');
  }
};

export const createSurvey = async (surveyData: {
  title: string;
  shortCode: string;
  createdBy: string;
  createdFor: string;
  companyName: string;
}) => {
  try {
    const client = getClient();
    const result = await client.models.Survey.create({
      ...surveyData,
      type: 'ai-readiness',
      status: 'sent'
    });
    return result.data;
  } catch (error) {
    console.error('Error creating survey:', error);
    throw new Error('Failed to create survey');
  }
};

export const submitSurveyResponse = async (
  surveyId: string,
  responses: SurveyAnswers,
  ipAddress?: string
) => {
  try {
    const client = getClient();
    const response = await client.models.SurveyResponse.create({
      surveyId,
      responses: JSON.stringify(responses),
      submittedAt: new Date().toISOString(),
      ipAddress: ipAddress || null
    });
    
    // Update survey status to completed
    await updateSurveyStatus(surveyId, 'completed');
    
    return response.data;
  } catch (error) {
    console.error('Error submitting survey response:', error);
    throw new Error('Failed to submit survey response');
  }
};

export const updateSurveyStatus = async (surveyId: string, status: 'sent' | 'started' | 'completed') => {
  try {
    const client = getClient();
    const result = await client.models.Survey.update({
      id: surveyId,
      status
    });
    return result.data;
  } catch (error) {
    console.error('Error updating survey status:', error);
    throw new Error('Failed to update survey status');
  }
};

export const getSurveyResponse = async (surveyId: string) => {
  try {
    const client = getClient();
    const result = await client.models.SurveyResponse.list({
      filter: { surveyId: { eq: surveyId } }
    });
    return result.data[0] || null;
  } catch (error) {
    console.error('Error fetching survey response:', error);
    throw new Error('Failed to fetch survey response');
  }
};