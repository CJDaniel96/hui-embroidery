import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from '@/lib/utils';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ContactFormResponse {
  message: string;
  id: number;
}

const submitContactForm = async (data: ContactFormData): Promise<ContactFormResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/contact/form/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }

  return response.json();
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      // 重置表單
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    },
  });

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const isValid = formData.name && formData.email && formData.subject && formData.message;

  return {
    formData,
    updateField,
    handleSubmit,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    isValid,
  };
}