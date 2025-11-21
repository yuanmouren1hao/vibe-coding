import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Text, Surface, FAB, Portal, Modal, TextInput, Button} from 'react-native-paper';
import WebLinearGradient from '@components/WebLinearGradient';
const LinearGradient = WebLinearGradient;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSubscriptionStore} from '@store/subscriptionStore';
import {Subscription} from '@types/index';
import {colors} from '../../theme/colors';
import {spacing, typography} from '../../theme/theme';
import {formatDateTime} from '@utils/formatters';

const SubscriptionsScreen: React.FC = () => {
  const {subscriptions, addSubscription, removeSubscription, updateSubscription, loadSubscriptions} = useSubscriptionStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [subscriptionUrl, setSubscriptionUrl] = useState('');
  const [subscriptionName, setSubscriptionName] = useState('');

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const handleAddSubscription = async () => {
    if (!subscriptionUrl.trim()) {
      Alert.alert('错误', '请输入订阅链接');
      return;
    }

    try {
      await addSubscription(subscriptionUrl, subscriptionName || undefined);
      setModalVisible(false);
      setSubscriptionUrl('');
      setSubscriptionName('');
      Alert.alert('成功', '订阅添加成功');
    } catch (error) {
      Alert.alert('错误', '添加订阅失败，请检查链接是否正确');
    }
  };

  const handleRemoveSubscription = (id: string, name: string) => {
    Alert.alert('确认删除', `确定要删除订阅"${name}"吗？`, [
      {text: '取消', style: 'cancel'},
      {
        text: '删除',
        style: 'destructive',
        onPress: async () => {
          try {
            await removeSubscription(id);
            Alert.alert('成功', '订阅已删除');
          } catch (error) {
            Alert.alert('错误', '删除失败');
          }
        },
      },
    ]);
  };

  const handleUpdateSubscription = async (id: string, name: string) => {
    try {
      await updateSubscription(id);
      Alert.alert('成功', `订阅"${name}"更新成功`);
    } catch (error) {
      Alert.alert('错误', '更新失败');
    }
  };

  const renderSubscriptionCard = ({item}: {item: Subscription}) => (
    <Surface style={styles.subscriptionCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          <Text style={styles.subscriptionName}>{item.name}</Text>
          <Text style={styles.subscriptionUrl} numberOfLines={1}>
            {item.url}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.stat}>
          <Icon name="server" size={20} color={colors.accent.main} />
          <Text style={styles.statText}>{item.serverCount} 个节点</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="clock-outline" size={20} color={colors.text.secondary} />
          <Text style={styles.statText}>{formatDateTime(item.lastUpdate)}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleUpdateSubscription(item.id, item.name)}>
          <Icon name="refresh" size={20} color={colors.primary.main} />
          <Text style={styles.actionText}>更新</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleRemoveSubscription(item.id, item.name)}>
          <Icon name="delete" size={20} color={colors.status.error} />
          <Text style={[styles.actionText, {color: colors.status.error}]}>删除</Text>
        </TouchableOpacity>
      </View>
    </Surface>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="link-variant-off" size={80} color={colors.text.secondary} />
      <Text style={styles.emptyTitle}>暂无订阅</Text>
      <Text style={styles.emptyText}>点击右下角按钮添加订阅链接</Text>
    </View>
  );

  return (
    <LinearGradient colors={colors.primary.gradient} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>订阅管理</Text>
        {subscriptions.length > 0 && (
          <TouchableOpacity style={styles.refreshAllButton}>
            <Icon name="refresh" size={20} color={colors.text.primary} />
            <Text style={styles.refreshAllText}>全部更新</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={subscriptions}
        renderItem={renderSubscriptionCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        color={colors.text.primary}
        onPress={() => setModalVisible(true)}
      />

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>添加订阅</Text>

          <TextInput
            mode="outlined"
            label="订阅名称（可选）"
            value={subscriptionName}
            onChangeText={setSubscriptionName}
            style={styles.input}
            outlineColor={colors.border.default}
            activeOutlineColor={colors.primary.main}
            textColor={colors.text.primary}
          />

          <TextInput
            mode="outlined"
            label="订阅链接"
            value={subscriptionUrl}
            onChangeText={setSubscriptionUrl}
            placeholder="https://..."
            style={styles.input}
            outlineColor={colors.border.default}
            activeOutlineColor={colors.primary.main}
            textColor={colors.text.primary}
            multiline
          />

          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
              textColor={colors.text.secondary}>
              取消
            </Button>
            <Button
              mode="contained"
              onPress={handleAddSubscription}
              style={styles.modalButton}
              buttonColor={colors.primary.main}>
              添加
            </Button>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Icon name="qrcode-scan" size={24} color={colors.accent.main} />
              <Text style={styles.quickActionText}>扫描二维码</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Icon name="clipboard-text" size={24} color={colors.accent.main} />
              <Text style={styles.quickActionText}>从剪贴板导入</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    fontWeight: '700',
  },
  refreshAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.overlay.light,
    borderRadius: 8,
  },
  refreshAllText: {
    ...typography.caption,
    color: colors.text.primary,
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 100,
  },
  subscriptionCard: {
    backgroundColor: colors.overlay.light,
    borderRadius: 16,
    padding: spacing.lg,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: spacing.md,
  },
  cardInfo: {
    flex: 1,
  },
  subscriptionName: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subscriptionUrl: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  cardBody: {
    gap: spacing.sm,
    marginBottom: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
  },
  actionText: {
    ...typography.caption,
    color: colors.primary.main,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    backgroundColor: colors.accent.main,
  },
  modal: {
    backgroundColor: colors.background.secondary,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.background.primary,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  modalButton: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.overlay.light,
    borderRadius: 12,
  },
  quickActionText: {
    ...typography.small,
    color: colors.text.primary,
  },
});

export default SubscriptionsScreen;
