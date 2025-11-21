import {create} from 'zustand';
import {
  Server,
  ConnectionStatus,
  TrafficStats,
  VPNConfig,
  VPNProtocol,
} from '@types/index';

interface VPNState {
  // State
  connectionStatus: ConnectionStatus;
  currentServer: Server | null;
  servers: Server[];
  trafficStats: TrafficStats;
  vpnConfig: VPNConfig;

  // Actions
  connect: (server: Server) => Promise<void>;
  disconnect: () => Promise<void>;
  setServers: (servers: Server[]) => void;
  updateTrafficStats: (stats: Partial<TrafficStats>) => void;
  toggleFavorite: (serverId: string) => void;
  updateVPNConfig: (config: Partial<VPNConfig>) => void;
  testServerLatency: (serverId: string) => Promise<number>;
}

export const useVPNStore = create<VPNState>((set, get) => ({
  connectionStatus: ConnectionStatus.DISCONNECTED,
  currentServer: null,
  servers: [],
  trafficStats: {
    uploadSpeed: 0,
    downloadSpeed: 0,
    totalUpload: 0,
    totalDownload: 0,
    todayUsage: 0,
    monthlyUsage: 0,
  },
  vpnConfig: {
    serverId: '',
    protocol: VPNProtocol.SHADOWSOCKS,
    autoReconnect: true,
    killSwitch: false,
    splitTunneling: false,
    excludedApps: [],
    dnsServers: ['8.8.8.8', '8.8.4.4'],
  },

  connect: async (server: Server) => {
    try {
      set({connectionStatus: ConnectionStatus.CONNECTING});

      // TODO: 调用原生VPN模块
      // await NativeVPNModule.connect(server);

      // 模拟连接延迟
      await new Promise(resolve => setTimeout(resolve, 2000));

      set({
        connectionStatus: ConnectionStatus.CONNECTED,
        currentServer: server,
      });

      // 开始流量统计
      // startTrafficMonitoring();
    } catch (error) {
      console.error('Connection failed:', error);
      set({connectionStatus: ConnectionStatus.ERROR});
      throw error;
    }
  },

  disconnect: async () => {
    try {
      set({connectionStatus: ConnectionStatus.DISCONNECTING});

      // TODO: 调用原生VPN模块
      // await NativeVPNModule.disconnect();

      await new Promise(resolve => setTimeout(resolve, 1000));

      set({
        connectionStatus: ConnectionStatus.DISCONNECTED,
        currentServer: null,
        trafficStats: {
          uploadSpeed: 0,
          downloadSpeed: 0,
          totalUpload: get().trafficStats.totalUpload,
          totalDownload: get().trafficStats.totalDownload,
          todayUsage: get().trafficStats.todayUsage,
          monthlyUsage: get().trafficStats.monthlyUsage,
        },
      });
    } catch (error) {
      console.error('Disconnection failed:', error);
      throw error;
    }
  },

  setServers: (servers: Server[]) => {
    set({servers});
  },

  updateTrafficStats: (stats: Partial<TrafficStats>) => {
    set(state => ({
      trafficStats: {...state.trafficStats, ...stats},
    }));
  },

  toggleFavorite: (serverId: string) => {
    set(state => ({
      servers: state.servers.map(server =>
        server.id === serverId
          ? {...server, isFavorite: !server.isFavorite}
          : server,
      ),
    }));
  },

  updateVPNConfig: (config: Partial<VPNConfig>) => {
    set(state => ({
      vpnConfig: {...state.vpnConfig, ...config},
    }));
  },

  testServerLatency: async (serverId: string) => {
    // TODO: 实现真实的延迟测试
    const latency = Math.floor(Math.random() * 200) + 50;
    
    set(state => ({
      servers: state.servers.map(server =>
        server.id === serverId ? {...server, latency} : server,
      ),
    }));

    return latency;
  },
}));
