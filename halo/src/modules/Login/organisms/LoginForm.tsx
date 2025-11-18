import React from 'react';
import { LoginHeader } from '../atoms/LoginHeader';
import { LoginFormFields } from '../molecules/LoginFormFields';
import { FeedbackMessage } from '../atoms/FeedbackMessage';
import { ModeToggle } from '../molecules/ModeToggle';
import HaloButton from '../../../components/HaloButton';

interface LoginFormProps {
  mode: 'login' | 'register';
  form: {
    name: string;
    username: string;
    password: string;
  };
  formErrors: Partial<{
    name: string;
    username: string;
    password: string;
  }>;
  feedback: {
    type: 'error' | 'success';
    message: string;
  } | null;
  submitting: boolean;
  onChangeText: (field: 'name' | 'username' | 'password', value: string) => void;
  onSubmit: () => void;
  onToggleMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  mode,
  form,
  formErrors,
  feedback,
  submitting,
  onChangeText,
  onSubmit,
  onToggleMode,
}) => {
  const isRegisterMode = mode === 'register';

  return (
    <>
      <LoginHeader
        title={isRegisterMode ? 'Crie sua conta Halo' : 'Bem-vindo de volta'}
        subtitle={
          isRegisterMode
            ? 'Preencha o formulário para começar a conversar em tempo real.'
            : 'Entre com suas credenciais para acessar a lista de usuários.'
        }
      />

      <LoginFormFields
        mode={mode}
        form={form}
        formErrors={formErrors}
        onChangeText={onChangeText}
      />

      {feedback && <FeedbackMessage type={feedback.type} message={feedback.message} />}

      <HaloButton
        label={isRegisterMode ? 'Cadastrar e entrar' : 'Entrar'}
        onPress={onSubmit}
        loading={submitting}
        fullWidth
      />

      <ModeToggle isRegisterMode={isRegisterMode} onToggle={onToggleMode} />
    </>
  );
};
