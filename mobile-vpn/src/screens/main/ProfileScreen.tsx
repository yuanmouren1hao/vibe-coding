import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Text, Surface, Switch, Divider} from 'react-native-paper';
import WebLinearGradient from '@components/WebLinearGradient';
const LinearGradient = WebLinearGradient;
import Icon from '@components/MaterialCommunityIcons';
import {useAuthStore} from '@store/authStore';
import {SubscriptionType} from '@types/index';
import {colors} from '../../theme/colors';
import {spacing, typography} from '../../theme/theme';
import {getDaysRemaining} from '@utils/formatters';

const ProfileScreen: React.FC = () => {
  const {user, logout} = useAuthStore();

  const handleLogout = () => {
    Alert.alert('退出登录', '确定要退出登录吗？', [
      {text: '取消', style: 'cancel'},
      {
        text: '退出',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const getSubscriptionName = (type: SubscriptionType) => {
    const names = {
      [SubscriptionType.FREE]: '免费版',
      [SubscriptionType.MONTHLY]: '月度会员',
      [SubscriptionType.QUARTERLY]: '季度会员',
      [SubscriptionType.YEARLY]: '年度会员',
    };
    return names[type];
  };

  return (
    <LinearGradient colors={colors.primary.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 用户信息卡片 */}
        <LinearGradient
          colors={['#3B82F6', '#06B6D4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Icon name="account-circle" size={60} color={colors.text.primary} />
          </View>
          <Text style={styles.username}>{user?.username || '用户'}</Text>
          <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
        </LinearGradient>

        {/* 订阅信息 */}
        <Surface style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <Icon name="crown" size={24} color={colors.status.warning} />
            <Text style={styles.subscriptionTitle}>会员状态</Text>
          </View>

          <View style={styles.subscriptionBody}>
            <View style={styles.subscriptionRow}>
              <Text style={styles.subscriptionLabel}>当前套餐</Text>
              <Text style={styles.subscriptionValue}>
                {getSubscriptionName(user?.subscriptionType || SubscriptionType.FREE)}
              </Text>
            </View>

            {user?.subscriptionExpiry && (
              <View style={styles.subscriptionRow}>
                <Text style={styles.subscriptionLabel}>到期时间</Text>
                <Text style={styles.subscriptionValue}>
                  剩余 {getDaysRemaining(user.subscriptionExpiry)} 天
                </Text>
              </View>
            )}
          </View>

          {user?.subscriptionType === SubscriptionType.FREE && (
            <TouchableOpacity style={styles.upgradeButton}>
              <LinearGradient
                colors={['#F59E0B', '#EAB308']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.upgradeGradient}>
                <Icon name="rocket-launch" size={20} color={colors.text.primary} />
                <Text style={styles.upgradeText}>升级为会员</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </Surface>

        {/* 设置列表 */}
        <Surface style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>常规设置</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="translate" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>语言</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>简体中文</Text>
              <Icon name="chevron-right" size={20} color={colors.text.secondary} />
            </View>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="theme-light-dark" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>深色模式</Text>
            </View>
            <Switch value={true} onValueChange={() => {}} color={colors.primary.main} />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="bell" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>通知</Text>
            </View>
            <Switch value={true} onValueChange={() => {}} color={colors.primary.main} />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="vibrate" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>震动反馈</Text>
            </View>
            <Switch value={false} onValueChange={() => {}} color={colors.primary.main} />
          </View>
        </Surface>

        {/* VPN设置 */}
        <Surface style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>VPN设置</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="power-plug" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>启动时自动连接</Text>
            </View>
            <Switch value={false} onValueChange={() => {}} color={colors.primary.main} />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="sync" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>自动重连</Text>
            </View>
            <Switch value={true} onValueChange={() => {}} color={colors.primary.main} />
          </View>

          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="dns" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>DNS设置</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="apps" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>分应用代理</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </Surface>

        {/* 其他选项 */}
        <Surface style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="help-circle" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>帮助与支持</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="shield-check" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>隐私政策</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="information" size={24} color={colors.text.secondary} />
              <Text style={styles.settingText}>关于应用</Text>
            </View>
            <Text style={styles.settingValue}>v1.0.0</Text>
          </TouchableOpacity>
        </Surface>

        {/* 退出登录 */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: 100,
  },
  userCard: {
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.overlay.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  username: {
    ...typography.h2,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.body,
    color: colors.text.primary,
    opacity: 0.9,
  },
  subscriptionCard: {
    backgroundColor: colors.overlay.light,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 2,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  subscriptionTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  subscriptionBody: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  subscriptionValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  upgradeButton: {
    marginTop: spacing.sm,
  },
  upgradeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 8,
  },
  upgradeText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  settingsCard: {
    backgroundColor: colors.overlay.light,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 2,
  },
  settingsTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  settingText: {
    ...typography.body,
    color: colors.text.primary,
  },
  settingValue: {
    ...typography.body,
    color: colors.text.secondary,
  },
  divider: {
    backgroundColor: colors.border.default,
  },
  logoutButton: {
    padding: spacing.lg,
    borderRadius: 12,
    backgroundColor: colors.overlay.light,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  logoutText: {
    ...typography.body,
    color: colors.status.error,
    fontWeight: '600',
  },
});

export default ProfileScreen;
