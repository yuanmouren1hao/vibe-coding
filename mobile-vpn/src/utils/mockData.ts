import {Server, VPNProtocol, ServerStatus} from '@types/index';

/**
 * Mock服务器数据 - 东南亚地区
 */
export const mockServers: Server[] = [
  // 新加坡
  {
    id: 'sg-01',
    name: 'Singapore Premium #1',
    country: 'Singapore',
    countryCode: 'SG',
    city: 'Singapore',
    protocol: VPNProtocol.VMESS,
    address: 'sg1.example.com',
    port: 443,
    latency: 45,
    load: 35,
    status: ServerStatus.ONLINE,
    isPremium: true,
  },
  {
    id: 'sg-02',
    name: 'Singapore #2',
    country: 'Singapore',
    countryCode: 'SG',
    protocol: VPNProtocol.SHADOWSOCKS,
    address: 'sg2.example.com',
    port: 8388,
    latency: 52,
    load: 58,
    status: ServerStatus.ONLINE,
  },
  {
    id: 'sg-03',
    name: 'Singapore #3',
    country: 'Singapore',
    countryCode: 'SG',
    protocol: VPNProtocol.TROJAN,
    address: 'sg3.example.com',
    port: 443,
    latency: 48,
    load: 42,
    status: ServerStatus.ONLINE,
  },

  // 泰国
  {
    id: 'th-01',
    name: 'Thailand Bangkok #1',
    country: 'Thailand',
    countryCode: 'TH',
    city: 'Bangkok',
    protocol: VPNProtocol.VMESS,
    address: 'th1.example.com',
    port: 443,
    latency: 68,
    load: 45,
    status: ServerStatus.ONLINE,
  },
  {
    id: 'th-02',
    name: 'Thailand Bangkok #2',
    country: 'Thailand',
    countryCode: 'TH',
    city: 'Bangkok',
    protocol: VPNProtocol.SHADOWSOCKS,
    address: 'th2.example.com',
    port: 8388,
    latency: 72,
    load: 55,
    status: ServerStatus.ONLINE,
  },

  // 越南
  {
    id: 'vn-01',
    name: 'Vietnam Hanoi #1',
    country: 'Vietnam',
    countryCode: 'VN',
    city: 'Hanoi',
    protocol: VPNProtocol.TROJAN,
    address: 'vn1.example.com',
    port: 443,
    latency: 85,
    load: 60,
    status: ServerStatus.ONLINE,
  },
  {
    id: 'vn-02',
    name: 'Vietnam Ho Chi Minh #2',
    country: 'Vietnam',
    countryCode: 'VN',
    city: 'Ho Chi Minh',
    protocol: VPNProtocol.VMESS,
    address: 'vn2.example.com',
    port: 443,
    latency: 88,
    load: 50,
    status: ServerStatus.ONLINE,
  },

  // 马来西亚
  {
    id: 'my-01',
    name: 'Malaysia Kuala Lumpur #1',
    country: 'Malaysia',
    countryCode: 'MY',
    city: 'Kuala Lumpur',
    protocol: VPNProtocol.SHADOWSOCKS,
    address: 'my1.example.com',
    port: 8388,
    latency: 62,
    load: 48,
    status: ServerStatus.ONLINE,
    isPremium: true,
  },

  // 印度尼西亚
  {
    id: 'id-01',
    name: 'Indonesia Jakarta #1',
    country: 'Indonesia',
    countryCode: 'ID',
    city: 'Jakarta',
    protocol: VPNProtocol.VMESS,
    address: 'id1.example.com',
    port: 443,
    latency: 95,
    load: 65,
    status: ServerStatus.ONLINE,
  },

  // 菲律宾
  {
    id: 'ph-01',
    name: 'Philippines Manila #1',
    country: 'Philippines',
    countryCode: 'PH',
    city: 'Manila',
    protocol: VPNProtocol.TROJAN,
    address: 'ph1.example.com',
    port: 443,
    latency: 78,
    load: 52,
    status: ServerStatus.ONLINE,
  },

  // 香港
  {
    id: 'hk-01',
    name: 'Hong Kong Premium #1',
    country: 'Hong Kong',
    countryCode: 'HK',
    protocol: VPNProtocol.VMESS,
    address: 'hk1.example.com',
    port: 443,
    latency: 38,
    load: 32,
    status: ServerStatus.ONLINE,
    isPremium: true,
  },
  {
    id: 'hk-02',
    name: 'Hong Kong #2',
    country: 'Hong Kong',
    countryCode: 'HK',
    protocol: VPNProtocol.SHADOWSOCKS,
    address: 'hk2.example.com',
    port: 8388,
    latency: 42,
    load: 45,
    status: ServerStatus.ONLINE,
  },

  // 台湾
  {
    id: 'tw-01',
    name: 'Taiwan Taipei #1',
    country: 'Taiwan',
    countryCode: 'TW',
    city: 'Taipei',
    protocol: VPNProtocol.TROJAN,
    address: 'tw1.example.com',
    port: 443,
    latency: 55,
    load: 38,
    status: ServerStatus.ONLINE,
  },

  // 日本
  {
    id: 'jp-01',
    name: 'Japan Tokyo Premium #1',
    country: 'Japan',
    countryCode: 'JP',
    city: 'Tokyo',
    protocol: VPNProtocol.VMESS,
    address: 'jp1.example.com',
    port: 443,
    latency: 65,
    load: 40,
    status: ServerStatus.ONLINE,
    isPremium: true,
  },
  {
    id: 'jp-02',
    name: 'Japan Osaka #2',
    country: 'Japan',
    countryCode: 'JP',
    city: 'Osaka',
    protocol: VPNProtocol.SHADOWSOCKS,
    address: 'jp2.example.com',
    port: 8388,
    latency: 70,
    load: 55,
    status: ServerStatus.ONLINE,
  },

  // 韩国
  {
    id: 'kr-01',
    name: 'South Korea Seoul #1',
    country: 'South Korea',
    countryCode: 'KR',
    city: 'Seoul',
    protocol: VPNProtocol.TROJAN,
    address: 'kr1.example.com',
    port: 443,
    latency: 58,
    load: 48,
    status: ServerStatus.ONLINE,
  },
];

/**
 * 获取推荐服务器
 */
export const getRecommendedServers = (servers: Server[]) => {
  const sorted = [...servers].sort((a, b) => (a.latency || 999) - (b.latency || 999));
  return sorted.slice(0, 3);
};

/**
 * 按国家分组服务器
 */
export const groupServersByCountry = (servers: Server[]) => {
  return servers.reduce((acc, server) => {
    const country = server.country;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(server);
    return acc;
  }, {} as Record<string, Server[]>);
};
