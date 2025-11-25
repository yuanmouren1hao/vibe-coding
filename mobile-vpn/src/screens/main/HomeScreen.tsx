import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Text, Surface, ActivityIndicator} from 'react-native-paper';
import WebLinearGradient from '@components/WebLinearGradient';
const LinearGradient = WebLinearGradient;
import Icon from '@components/MaterialCommunityIcons';
import {useVPNStore} from '@store/vpnStore';
import {useAuthStore} from '@store/authStore';
import {ConnectionStatus} from '@types/index';
import {colors} from '../../theme/colors';
import {spacing, typography} from '../../theme/theme';
import {formatBytes, formatSpeed} from '@utils/formatters';
import {mockServers} from '@utils/mockData';

const HomeScreen: React.FC = () => {
  const {
    connectionStatus,
    currentServer,
    trafficStats,
    connect,
    disconnect,
    setServers,
  } = useVPNStore();
  const {user} = useAuthStore();

  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // 加载模拟服务器数据
    setServers(mockServers);

    // 连接时的脉冲动画
    if (connectionStatus === ConnectionStatus.CONNECTED) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [connectionStatus]);

  const handleToggleConnection = async () => {
    if (connectionStatus === ConnectionStatus.CONNECTED) {
      await disconnect();
    } else if (currentServer || mockServers.length > 0) {
      const server = currentServer || mockServers[0];
      await connect(server);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return colors.connection.connected;
      case ConnectionStatus.CONNECTING:
        return colors.connection.connecting;
      case ConnectionStatus.ERROR:
        return colors.connection.error;
      default:
        return colors.connection.disconnected;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return '已连接';
      case ConnectionStatus.CONNECTING:
        return '连接中...';
      case ConnectionStatus.DISCONNECTING:
        return '断开中...';
      case ConnectionStatus.ERROR:
        return '连接失败';
      default:
        return '未连接';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return 'shield-check';
      case ConnectionStatus.CONNECTING:
        return 'shield-sync';
      case ConnectionStatus.ERROR:
        return 'shield-alert';
      default:
        return 'shield-off';
    }
  };

  return (
    <LinearGradient colors={colors.primary.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 顶部用户信息 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>你好，</Text>
            <Text style={styles.username}>{user?.username || '用户'}</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
            <Icon name="account-circle" size={40} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* 连接状态主控制器 */}
        <Surface style={styles.mainCard}>
          <Text style={styles.statusText}>{getStatusText()}</Text>

          <TouchableOpacity
            onPress={handleToggleConnection}
            disabled={
              connectionStatus === ConnectionStatus.CONNECTING ||
              connectionStatus === ConnectionStatus.DISCONNECTING
            }>
            <Animated.View
              style={[
                styles.connectButton,
                {
                  backgroundColor: getStatusColor(),
                  transform: [{scale: pulseAnim}],
                },
              ]}>
              {connectionStatus === ConnectionStatus.CONNECTING ||
              connectionStatus === ConnectionStatus.DISCONNECTING ? (
                <ActivityIndicator size={60} color={colors.text.primary} />
              ) : (
                <Icon
                  name={getStatusIcon()}
                  size={80}
                  color={colors.text.primary}
                />
              )}
            </Animated.View>
          </TouchableOpacity>

          {currentServer && (
            <View style={styles.serverInfo}>
              <Icon
                name="server"
                size={20}
                color={colors.text.secondary}
                style={styles.serverIcon}
              />
              <Text style={styles.serverName}>
                {currentServer.country} - {currentServer.name}
              </Text>
              <View
                style={[
                  styles.protocolBadge,
                  {backgroundColor: colors.protocol[currentServer.protocol]},
                ]}>
                <Text style={styles.protocolText}>
                  {currentServer.protocol.toUpperCase()}
                </Text>
              </View>
            </View>
          )}
        </Surface>

        {/* 流量统计 */}
        <View style={styles.statsContainer}>
          <Surface style={styles.statCard}>
            <Icon
              name="arrow-up"
              size={24}
              color={colors.accent.main}
              style={styles.statIcon}
            />
            <Text style={styles.statLabel}>上传速度</Text>
            <Text style={styles.statValue}>
              {formatSpeed(trafficStats.uploadSpeed)}
            </Text>
          </Surface>

          <Surface style={styles.statCard}>
            <Icon
              name="arrow-down"
              size={24}
              color={colors.status.success}
              style={styles.statIcon}
            />
            <Text style={styles.statLabel}>下载速度</Text>
            <Text style={styles.statValue}>
              {formatSpeed(trafficStats.downloadSpeed)}
            </Text>
          </Surface>
        </View>

        {/* 流量使用情况 */}
        <Surface style={styles.trafficCard}>
          <Text style={styles.cardTitle}>流量使用情况</Text>
          <View style={styles.trafficRow}>
            <View style={styles.trafficItem}>
              <Text style={styles.trafficLabel}>今日使用</Text>
              <Text style={styles.trafficValue}>
                {formatBytes(trafficStats.todayUsage)}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.trafficItem}>
              <Text style={styles.trafficLabel}>本月使用</Text>
              <Text style={styles.trafficValue}>
                {formatBytes(trafficStats.monthlyUsage)}
              </Text>
            </View>
          </View>
          {trafficStats.monthlyLimit && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(
                        100,
                        (trafficStats.monthlyUsage / trafficStats.monthlyLimit) *
                          100,
                      )}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.limitText}>
                限额: {formatBytes(trafficStats.monthlyLimit)}
              </Text>
            </View>
          )}
        </Surface>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    ...typography.body,
    color: colors.text.secondary,
  },
  username: {
    ...typography.h2,
    color: colors.text.primary,
    fontWeight: '700',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.overlay.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCard: {
    backgroundColor: colors.overlay.light,
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    elevation: 4,
  },
  statusText: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  connectButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.overlay.light,
    borderRadius: 12,
    width: '100%',
  },
  serverIcon: {
    marginRight: spacing.sm,
  },
  serverName: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  protocolBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  protocolText: {
    ...typography.small,
    color: colors.text.primary,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.overlay.light,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    elevation: 2,
  },
  statIcon: {
    marginBottom: spacing.sm,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.h3,
    color: colors.text.primary,
    fontWeight: '600',
  },
  trafficCard: {
    backgroundColor: colors.overlay.light,
    borderRadius: 16,
    padding: spacing.lg,
    elevation: 2,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  trafficRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  trafficItem: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border.default,
  },
  trafficLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  trafficValue: {
    ...typography.h3,
    color: colors.accent.main,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border.default,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.main,
  },
  limitText: {
    ...typography.small,
    color: colors.text.secondary,
    textAlign: 'right',
  },
});

export default HomeScreen;
