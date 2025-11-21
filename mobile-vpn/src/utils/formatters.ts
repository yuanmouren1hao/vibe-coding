/**
 * 格式化字节为可读的大小
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * 格式化速度 (bytes/s)
 */
export const formatSpeed = (bytesPerSecond: number): string => {
  return formatBytes(bytesPerSecond) + '/s';
};

/**
 * 格式化延迟
 */
export const formatLatency = (ms: number | undefined): string => {
  if (ms === undefined) return '--';
  return `${ms}ms`;
};

/**
 * 获取延迟质量等级
 */
export const getLatencyLevel = (
  ms: number | undefined,
): 'excellent' | 'good' | 'fair' | 'poor' => {
  if (ms === undefined) return 'poor';
  if (ms < 50) return 'excellent';
  if (ms < 100) return 'good';
  if (ms < 200) return 'fair';
  return 'poor';
};

/**
 * 获取延迟颜色
 */
export const getLatencyColor = (ms: number | undefined): string => {
  const level = getLatencyLevel(ms);
  const colorMap = {
    excellent: '#10B981',
    good: '#3B82F6',
    fair: '#F59E0B',
    poor: '#EF4444',
  };
  return colorMap[level];
};

/**
 * 格式化日期时间
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * 计算剩余天数
 */
export const getDaysRemaining = (expiryDate: string): number => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};
