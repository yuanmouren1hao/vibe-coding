// VPN协议类型
export enum VPNProtocol {
  SHADOWSOCKS = 'shadowsocks',
  VMESS = 'vmess',
  TROJAN = 'trojan',
}

// 服务器状态
export enum ServerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  MAINTENANCE = 'maintenance',
}

// 连接状态
export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTING = 'disconnecting',
  ERROR = 'error',
}

// 服务器接口
export interface Server {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city?: string;
  protocol: VPNProtocol;
  address: string;
  port: number;
  latency?: number; // 延迟(ms)
  load?: number; // 负载(0-100)
  status: ServerStatus;
  isFavorite?: boolean;
  isPremium?: boolean; // 是否为付费专属服务器
}

// 订阅配置
export interface Subscription {
  id: string;
  name: string;
  url: string;
  serverCount: number;
  lastUpdate: string;
  autoUpdate: boolean;
  servers: Server[];
}

// 用户信息
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  subscriptionType: SubscriptionType;
  subscriptionExpiry?: string;
  createdAt: string;
}

// 订阅类型
export enum SubscriptionType {
  FREE = 'free',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

// 流量统计
export interface TrafficStats {
  uploadSpeed: number; // bytes/s
  downloadSpeed: number; // bytes/s
  totalUpload: number; // bytes
  totalDownload: number; // bytes
  todayUsage: number; // bytes
  monthlyUsage: number; // bytes
  monthlyLimit?: number; // bytes (null表示无限制)
}

// VPN配置
export interface VPNConfig {
  serverId: string;
  protocol: VPNProtocol;
  autoReconnect: boolean;
  killSwitch: boolean;
  splitTunneling: boolean;
  excludedApps: string[];
  dnsServers: string[];
}

// 应用设置
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  autoConnect: boolean;
  showNotifications: boolean;
  hapticFeedback: boolean;
}
