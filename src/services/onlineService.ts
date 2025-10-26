// 在线人数统计服务
export interface OnlineStats {
  count: number;
  timestamp: number;
}

class OnlineService {
  private baseCount = 120; // 基础在线人数
  private lastCount = this.baseCount;
  private lastUpdate = Date.now();

  /**
   * 获取当前在线人数
   * 模拟真实的在线人数变化，包含自然波动
   */
  async getOnlineCount(): Promise<OnlineStats> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

    const now = Date.now();
    const timeDiff = now - this.lastUpdate;
    
    // 基于时间的自然变化
    const timeBasedChange = this.getTimeBasedChange();
    
    // 随机小幅波动 (-5 到 +5)
    const randomChange = Math.floor(Math.random() * 11) - 5;
    
    // 计算新的在线人数
    let newCount = this.baseCount + timeBasedChange + randomChange;
    
    // 确保变化不会太剧烈（相对于上次的变化不超过±10）
    const maxChange = 10;
    if (Math.abs(newCount - this.lastCount) > maxChange) {
      if (newCount > this.lastCount) {
        newCount = this.lastCount + maxChange;
      } else {
        newCount = this.lastCount - maxChange;
      }
    }
    
    // 确保在合理范围内 (50-200)
    newCount = Math.max(50, Math.min(200, newCount));
    
    this.lastCount = newCount;
    this.lastUpdate = now;
    
    return {
      count: newCount,
      timestamp: now
    };
  }

  /**
   * 基于时间的在线人数变化模拟
   * 模拟一天中不同时段的在线人数变化
   */
  private getTimeBasedChange(): number {
    const hour = new Date().getHours();
    
    // 模拟一天中的活跃度变化
    if (hour >= 9 && hour <= 12) {
      // 上午活跃期
      return Math.floor(Math.random() * 20) + 10;
    } else if (hour >= 14 && hour <= 17) {
      // 下午活跃期
      return Math.floor(Math.random() * 25) + 15;
    } else if (hour >= 19 && hour <= 22) {
      // 晚上高峰期
      return Math.floor(Math.random() * 30) + 20;
    } else if (hour >= 23 || hour <= 6) {
      // 深夜低谷期
      return Math.floor(Math.random() * 10) - 20;
    } else {
      // 其他时间
      return Math.floor(Math.random() * 15) - 5;
    }
  }

  /**
   * 模拟用户进入游戏广场
   */
  simulateUserJoin(): void {
    this.baseCount += Math.floor(Math.random() * 3) + 1;
  }

  /**
   * 模拟用户离开游戏广场
   */
  simulateUserLeave(): void {
    this.baseCount -= Math.floor(Math.random() * 2) + 1;
    this.baseCount = Math.max(30, this.baseCount); // 确保不会太低
  }
}

// 导出单例实例
export const onlineService = new OnlineService();