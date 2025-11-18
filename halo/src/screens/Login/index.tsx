import React, { useCallback, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HaloText from '../../components/HaloText';
import HaloInput from '../../components/HaloInput';
import HaloButton from '../../components/HaloButton';
import { colors } from '../../constants/colors';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { login as loginRequest, register as registerRequest } from '../../services/auth';
import { setAuthToken } from '../../services/api';
import socketService from '../../services/socket';

type Props = NativeStackScreenProps<AppStackParamList, 'Login'>;
type Mode = 'login' | 'register';
interface FormState {
  name: string;
  username: string;
  password: string;
}

type FeedbackState = {
  type: 'error' | 'success';
  message: string;
} | null;

const INITIAL_FORM: FormState = {
  name: '',
  username: '',
  password: '',
};

export default function LoginScreen({ navigation }: Props) {
  const [mode, setMode] = useState<Mode>('login');
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [submitting, setSubmitting] = useState(false);

  const isRegisterMode = useMemo(() => mode === 'register', [mode]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(current => ({ ...current, [field]: value }));
    setFormErrors(current => ({ ...current, [field]: undefined }));
  };

  const validateForm = useCallback(
    (values: FormState) => {
      const errors: Partial<FormState> = {};
      const trimmed = {
        name: values.name.trim(),
        username: values.username.trim(),
        password: values.password.trim(),
      };

      if (isRegisterMode && !trimmed.name) {
        errors.name = 'Informe seu nome completo';
      }

      if (!trimmed.username) {
        errors.username = 'Informe o nome de usuário';
      } else if (trimmed.username.length < 3) {
        errors.username = 'Usuário deve ter ao menos 3 caracteres';
      }

      if (!trimmed.password) {
        errors.password = 'Informe sua senha';
      } else if (trimmed.password.length < 6) {
        errors.password = 'A senha deve ter no mínimo 6 caracteres';
      }

      return { errors, trimmed } as const;
    },
    [isRegisterMode],
  );

  const handleSubmit = async () => {
    const { errors, trimmed } = validateForm(form);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFeedback({ type: 'error', message: 'Revise os campos destacados.' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      let userData;

      if (isRegisterMode) {
        userData = await registerRequest({
          name: trimmed.name,
          username: trimmed.username,
          password: trimmed.password,
        });
      } else {
        const response = await loginRequest(
          trimmed.username,
          trimmed.password,
        );
        userData = response;
      }

      // Armazenar dados do usuário
      await AsyncStorage.setItem('userId', userData._id);
      await AsyncStorage.setItem('username', userData.username);
      await AsyncStorage.setItem('name', userData.name);

      // Conectar ao socket
      socketService.connect(userData._id);

      setFeedback({ type: 'success', message: 'Autenticação realizada com sucesso!' });
      navigation.replace('MainTabs');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível concluir a operação.';
      setFeedback({ type: 'error', message });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(current => (current === 'login' ? 'register' : 'login'));
    setFormErrors({});
    setFeedback(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <HaloText variant="title">
            {isRegisterMode ? 'Crie sua conta Halo' : 'Bem-vindo de volta'}
          </HaloText>
          <HaloText variant="body" style={styles.subtitle}>
            {isRegisterMode
              ? 'Preencha o formulário para começar a conversar em tempo real.'
              : 'Entre com suas credenciais para acessar a lista de usuários.'}
          </HaloText>
        </View>

        {isRegisterMode && (
          <HaloInput
            label="Nome completo"
            placeholder="Gabriel Costa"
            onChangeText={value => handleChange('name', value)}
            value={form.name}
            autoCapitalize="words"
            error={formErrors.name}
          />
        )}

        <HaloInput
          label="Usuário"
          placeholder="Nome de usuário"
          autoCapitalize="none"
          onChangeText={value => handleChange('username', value)}
          value={form.username}
          error={formErrors.username}
          autoCorrect={false}
          keyboardType="default"
        />

        <HaloInput
          label="Senha"
          placeholder="••••••••"
          secureTextEntry
          onChangeText={value => handleChange('password', value)}
          value={form.password}
          error={formErrors.password}
          autoCapitalize="none"
        />

        {feedback ? (
          <HaloText
            variant="caption"
            style={[styles.feedback, feedback.type === 'error' ? styles.error : styles.success]}
          >
            {feedback.message}
          </HaloText>
        ) : null}

        <HaloButton
          label={isRegisterMode ? 'Cadastrar e entrar' : 'Entrar'}
          onPress={handleSubmit}
          loading={submitting}
          fullWidth
        />

        <View style={styles.toggleRow}>
          <HaloText variant="body" style={styles.toggleLabel}>
            {isRegisterMode ? 'Já possui conta?' : 'Ainda não tem conta?'}
          </HaloText>
          <HaloButton
            variant="text"
            label={isRegisterMode ? 'Fazer login' : 'Criar conta'}
            onPress={toggleMode}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 64,
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
    color: colors.textSecondary,
  },
  feedback: {
    marginBottom: 12,
  },
  error: {
    color: colors.error,
  },
  success: {
    color: colors.success,
  },
  toggleRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginRight: 6,
  },
});
