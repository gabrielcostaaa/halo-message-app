import React from 'react';
import HaloInput from '../../../components/HaloInput';

interface LoginFormFieldsProps {
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
  onChangeText: (field: 'name' | 'username' | 'password', value: string) => void;
}

export const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  mode,
  form,
  formErrors,
  onChangeText,
}) => {
  return (
    <>
      {mode === 'register' && (
        <HaloInput
          label="Nome completo"
          placeholder="Gabriel Costa"
          onChangeText={(value) => onChangeText('name', value)}
          value={form.name}
          autoCapitalize="words"
          error={formErrors.name}
        />
      )}

      <HaloInput
        label="Usuário"
        placeholder="Nome de usuário"
        autoCapitalize="none"
        onChangeText={(value) => onChangeText('username', value)}
        value={form.username}
        error={formErrors.username}
        autoCorrect={false}
        keyboardType="default"
      />

      <HaloInput
        label="Senha"
        placeholder="••••••••"
        secureTextEntry
        onChangeText={(value) => onChangeText('password', value)}
        value={form.password}
        error={formErrors.password}
        autoCapitalize="none"
      />
    </>
  );
};
