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

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {login} = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('请填写邮箱和密码');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError('登录失败，请检查邮箱和密码');
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
          {/* Logo区域 */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Icon name="shield-check" size={60} color={colors.primary.main} />
            </View>
            <Text style={styles.title}>SecureVPN</Text>
            <Text style={styles.subtitle}>安全、快速、稳定的VPN服务</Text>
          </View>

          {/* 登录表单 */}
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

            {error ? (
              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
            ) : null}

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              contentStyle={styles.loginButtonContent}
              labelStyle={styles.loginButtonLabel}>
              登录
            </Button>

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {}}>
              <Text style={styles.forgotPasswordText}>忘记密码？</Text>
            </TouchableOpacity>
          </View>

          {/* 注册链接 */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>还没有账号？</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>立即注册</Text>
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
    justifyContent: 'center',
    padding: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    ...typography.h1,
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
  loginButton: {
    marginTop: spacing.md,
    backgroundColor: colors.accent.main,
    borderRadius: 8,
  },
  loginButtonContent: {
    height: 50,
  },
  loginButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  forgotPasswordText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: colors.text.secondary,
    marginRight: spacing.sm,
  },
  registerLink: {
    color: colors.accent.light,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LoginScreen;
