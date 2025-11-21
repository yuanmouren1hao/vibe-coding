import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button, Text, HelperText} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import WebLinearGradient from '@components/WebLinearGradient';
const LinearGradient = WebLinearGradient;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthStore} from '@store/authStore';
import {AuthStackParamList} from '@navigation/types';
import {colors} from '../../theme/colors';
import {spacing, typography} from '../../theme/theme';

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const {register} = useAuthStore();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码长度至少为6位');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(email, username, password);
    } catch (err) {
      setError('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={colors.primary.gradient}
      style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          {/* 返回按钮 */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          {/* Logo区域 */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Icon name="account-plus" size={50} color={colors.primary.main} />
            </View>
            <Text style={styles.title}>创建账号</Text>
            <Text style={styles.subtitle}>开始您的安全上网之旅</Text>
          </View>

          {/* 注册表单 */}
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              label="邮箱"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email" />}
              style={styles.input}
              outlineColor={colors.border.default}
              activeOutlineColor={colors.primary.main}
              textColor={colors.text.primary}
            />

            <TextInput
              mode="outlined"
              label="用户名"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              left={<TextInput.Icon icon="account" />}
              style={styles.input}
              outlineColor={colors.border.default}
              activeOutlineColor={colors.primary.main}
              textColor={colors.text.primary}
            />

            <TextInput
              mode="outlined"
              label="密码"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
              outlineColor={colors.border.default}
              activeOutlineColor={colors.primary.main}
              textColor={colors.text.primary}
            />

            <TextInput
              mode="outlined"
              label="确认密码"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              left={<TextInput.Icon icon="lock-check" />}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
              style={styles.input}
              outlineColor={colors.border.default}
              activeOutlineColor={colors.primary.main}
              textColor={colors.text.primary}
            />

            {error ? (
              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
            ) : null}

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.registerButton}
              contentStyle={styles.registerButtonContent}
              labelStyle={styles.registerButtonLabel}>
              注册
            </Button>
          </View>

          {/* 登录链接 */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>已有账号？</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>立即登录</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.overlay.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  formContainer: {
    backgroundColor: colors.overlay.light,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  registerButton: {
    marginTop: spacing.md,
    backgroundColor: colors.accent.main,
    borderRadius: 8,
  },
  registerButtonContent: {
    height: 50,
  },
  registerButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: colors.text.secondary,
    marginRight: spacing.sm,
  },
  loginLink: {
    color: colors.accent.light,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default RegisterScreen;
