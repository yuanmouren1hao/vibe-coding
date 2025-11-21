import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Text, Surface, Searchbar, Chip} from 'react-native-paper';
import WebLinearGradient from '@components/WebLinearGradient';
const LinearGradient = WebLinearGradient;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useVPNStore} from '@store/vpnStore';
import {Server, VPNProtocol} from '@types/index';
import {colors} from '../../theme/colors';
import {spacing, typography} from '../../theme/theme';
import {
  formatLatency,
  getLatencyColor,
  getLatencyLevel,
} from '@utils/formatters';
import {mockServers, getRecommendedServers} from '@utils/mockData';

const ServersScreen: React.FC = () => {
  const {servers, connect, toggleFavorite, setServers} = useVPNStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState<VPNProtocol | null>(
    null,
  );
  const [filteredServers, setFilteredServers] = useState<Server[]>([]);
  const [recommendedServers, setRecommendedServers] = useState<Server[]>([]);

  useEffect(() => {
    // 初始化服务器数据
    if (servers.length === 0) {
      setServers(mockServers);
    }
  }, []);

  useEffect(() => {
    // 获取推荐服务器
    setRecommendedServers(getRecommendedServers(servers));

    // 过滤服务器
    let filtered = servers;

    if (searchQuery) {
      filtered = filtered.filter(
        server =>
          server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          server.country.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedProtocol) {
      filtered = filtered.filter(
        server => server.protocol === selectedProtocol,
      );
    }

    setFilteredServers(filtered);
  }, [servers, searchQuery, selectedProtocol]);

  const handleServerPress = async (server: Server) => {
    try {
      await connect(server);
    } catch (error) {
      console.error('Connect failed:', error);
    }
  };

  const renderServerCard = ({item}: {item: Server}) => (
    <TouchableOpacity onPress={() => handleServerPress(item)}>
      <Surface style={styles.serverCard}>
        <View style={styles.serverHeader}>
          <View style={styles.serverInfo}>
            <Text style={styles.countryCode}>{item.countryCode}</Text>
            <View style={styles.serverDetails}>
              <Text style={styles.serverName}>{item.name}</Text>
              <Text style={styles.serverLocation}>{item.country}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => toggleFavorite(item.id)}
            style={styles.favoriteButton}>
            <Icon
              name={item.isFavorite ? 'star' : 'star-outline'}
              size={24}
              color={item.isFavorite ? colors.status.warning : colors.text.secondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.serverFooter}>
          <View
            style={[
              styles.protocolBadge,
              {backgroundColor: colors.protocol[item.protocol]},
            ]}>
            <Text style={styles.protocolText}>
              {item.protocol.toUpperCase()}
            </Text>
          </View>

          {item.latency !== undefined && (
            <View style={styles.latencyContainer}>
              <View
                style={[
                  styles.latencyDot,
                  {backgroundColor: getLatencyColor(item.latency)},
                ]}
              />
              <Text style={styles.latencyText}>{formatLatency(item.latency)}</Text>
            </View>
          )}

          {item.load !== undefined && (
            <View style={styles.loadContainer}>
              <Icon
                name="gauge"
                size={16}
                color={colors.text.secondary}
                style={styles.loadIcon}
              />
              <Text style={styles.loadText}>{item.load}%</Text>
            </View>
          )}

          {item.isPremium && (
            <View style={styles.premiumBadge}>
              <Icon name="crown" size={14} color={colors.status.warning} />
              <Text style={styles.premiumText}>VIP</Text>
            </View>
          )}
        </View>
      </Surface>
    </TouchableOpacity>
  );

  const renderRecommendedCard = ({item}: {item: Server}) => (
    <TouchableOpacity onPress={() => handleServerPress(item)}>
      <LinearGradient
        colors={['#3B82F6', '#06B6D4']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.recommendedCard}>
        <Text style={styles.recommendedCountry}>{item.country}</Text>
        <Text style={styles.recommendedName}>{item.name}</Text>
        <View style={styles.recommendedFooter}>
          <Text style={styles.recommendedLatency}>
            {formatLatency(item.latency)}
          </Text>
          <Icon name="chevron-right" size={20} color={colors.text.primary} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={colors.primary.gradient} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>选择服务器</Text>
      </View>

      <View style={styles.content}>
        {/* 搜索栏 */}
        <Searchbar
          placeholder="搜索服务器或国家"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor={colors.text.secondary}
          placeholderTextColor={colors.text.secondary}
        />

        {/* 协议筛选 */}
        <View style={styles.filterContainer}>
          <Chip
            selected={selectedProtocol === null}
            onPress={() => setSelectedProtocol(null)}
            style={styles.chip}
            selectedColor={colors.primary.main}
            textStyle={styles.chipText}>
            全部
          </Chip>
          {Object.values(VPNProtocol).map(protocol => (
            <Chip
              key={protocol}
              selected={selectedProtocol === protocol}
              onPress={() =>
                setSelectedProtocol(
                  selectedProtocol === protocol ? null : protocol,
                )
              }
              style={styles.chip}
              selectedColor={colors.protocol[protocol]}
              textStyle={styles.chipText}>
              {protocol.toUpperCase()}
            </Chip>
          ))}
        </View>

        {/* 推荐服务器 */}
        {!searchQuery && !selectedProtocol && recommendedServers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🚀 智能推荐</Text>
            <FlatList
              data={recommendedServers}
              renderItem={renderRecommendedCard}
              keyExtractor={item => `rec-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recommendedList}
            />
          </View>
        )}

        {/* 服务器列表 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            所有服务器 ({filteredServers.length})
          </Text>
          <FlatList
            data={filteredServers}
            renderItem={renderServerCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.serverList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
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
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  searchBar: {
    backgroundColor: colors.overlay.light,
    elevation: 0,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  searchInput: {
    color: colors.text.primary,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    backgroundColor: colors.overlay.light,
  },
  chipText: {
    color: colors.text.primary,
    fontSize: 12,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  recommendedList: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  recommendedCard: {
    width: 200,
    padding: spacing.lg,
    borderRadius: 16,
    justifyContent: 'space-between',
    minHeight: 120,
  },
  recommendedCountry: {
    ...typography.h3,
    color: colors.text.primary,
    fontWeight: '600',
  },
  recommendedName: {
    ...typography.caption,
    color: colors.text.primary,
    opacity: 0.9,
  },
  recommendedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  recommendedLatency: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  serverList: {
    gap: spacing.md,
    paddingBottom: 100,
  },
  serverCard: {
    backgroundColor: colors.overlay.light,
    borderRadius: 16,
    padding: spacing.lg,
    elevation: 2,
  },
  serverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  countryCode: {
    ...typography.h2,
    color: colors.text.primary,
    marginRight: spacing.md,
    width: 50,
    textAlign: 'center',
  },
  serverDetails: {
    flex: 1,
  },
  serverName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  serverLocation: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  favoriteButton: {
    padding: spacing.xs,
  },
  serverFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flexWrap: 'wrap',
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
  latencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  latencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  latencyText: {
    ...typography.small,
    color: colors.text.secondary,
  },
  loadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadIcon: {
    marginRight: 4,
  },
  loadText: {
    ...typography.small,
    color: colors.text.secondary,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: colors.overlay.light,
    borderRadius: 6,
  },
  premiumText: {
    ...typography.small,
    color: colors.status.warning,
    fontWeight: '600',
  },
});

export default ServersScreen;
