/**
 * GLM-4.6 API 服务
 * 基于智谱AI官方文档实现
 * https://docs.bigmodel.cn/cn/guide/models/text/glm-4.6
 */

export interface GLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GLMRequest {
  model: string;
  messages: GLMMessage[];
  thinking?: {
    type: 'enabled';
  };
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface GLMResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface GLMStreamResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason?: string;
  }>;
}

export interface GLMApiConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export class GLMApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'GLMApiError';
  }
}

export class GLMApiService {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;
  private stats: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    totalTokensUsed: number;
    totalResponseTime: number;
    lastUsed?: string;
  };

  constructor(config: GLMApiConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://open.bigmodel.cn/api/paas/v4';
    this.timeout = config.timeout || 30000;
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalTokensUsed: 0,
      totalResponseTime: 0,
    };
  }

  /**
   * 验证API密钥是否有效
   */
  async validateApiKey(): Promise<boolean> {
    try {
      const response = await this.chatCompletion({
        model: 'glm-4.6',
        messages: [{ role: 'user', content: '测试连接' }],
        max_tokens: 10,
        temperature: 0.1,
      });
      return !!response.choices?.[0]?.message?.content;
    } catch (error) {
      console.error('GLM API key validation failed:', error);
      return false;
    }
  }

  /**
   * 发送聊天完成请求
   */
  async chatCompletion(request: GLMRequest): Promise<GLMResponse> {
    const startTime = Date.now();
    this.stats.totalRequests++;
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(this.timeout),
      });

      if (!response.ok) {
        this.stats.failedRequests++;
        const errorData = await response.json().catch(() => ({}));
        throw new GLMApiError(
          `GLM API request failed: ${response.status} ${response.statusText}`,
          response.status,
          errorData
        );
      }

      const data: GLMResponse = await response.json();
      
      // 更新统计信息
      const responseTime = Date.now() - startTime;
      this.stats.successfulRequests++;
      this.stats.totalTokensUsed += data.usage?.total_tokens || 0;
      this.stats.totalResponseTime += responseTime;
      this.stats.lastUsed = new Date().toISOString();
      
      return data;
    } catch (error) {
      if (!(error instanceof GLMApiError)) {
        this.stats.failedRequests++;
      }
      
      if (error instanceof GLMApiError) {
        throw error;
      }
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new GLMApiError('Request timeout');
      }
      
      throw new GLMApiError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * 流式聊天补全API调用
   */
  async chatCompletionStream(
    request: GLMRequest,
    onChunk: (chunk: GLMStreamResponse) => void,
    onComplete?: () => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    const url = `${this.baseUrl}/chat/completions`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          ...request,
          model: 'glm-4.6',
          stream: true,
        }),
        signal: AbortSignal.timeout(this.timeout),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new GLMApiError(
          `GLM API stream request failed: ${response.status} ${response.statusText}`,
          response.status,
          errorData
        );
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new GLMApiError('Failed to get response stream reader');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            onComplete?.();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data: ')) {
              const data = trimmedLine.slice(6);
              
              if (data === '[DONE]') {
                onComplete?.();
                return;
              }

              try {
                const chunk = JSON.parse(data) as GLMStreamResponse;
                onChunk(chunk);
              } catch (parseError) {
                console.warn('Failed to parse GLM stream chunk:', parseError);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      if (error instanceof GLMApiError) {
        onError?.(error);
        throw error;
      }
      
      const glmError = new GLMApiError(
        `GLM API stream request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      onError?.(glmError);
      throw glmError;
    }
  }

  /**
   * 生成背景调查报告
   */
  async generateInvestigationReport(investigationData: any): Promise<string> {
    const prompt = this.buildInvestigationPrompt(investigationData);
    
    const response = await this.chatCompletion({
      model: 'glm-4.6',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的背景调查分析师，擅长分析个人信息并生成详细的调查报告。请基于提供的信息生成专业、客观、详细的背景调查报告。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      thinking: { type: 'enabled' }, // 启用思维链推理
      max_tokens: 4000,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || '';
  }

  /**
   * 获取AI建议
   */
  async getAiSuggestions(investigationData: any): Promise<string[]> {
    const prompt = this.buildSuggestionsPrompt(investigationData);
    
    const response = await this.chatCompletion({
      model: 'glm-4.6',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的背景调查顾问，请基于提供的调查信息，给出3-5条具体的调查建议和注意事项。每条建议应该简洁明了，具有可操作性。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      thinking: { type: 'enabled' },
      max_tokens: 1000,
      temperature: 0.6,
    });

    const content = response.choices[0]?.message?.content || '';
    
    // 解析建议列表
    const suggestions = content
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim())
      .filter(suggestion => suggestion.length > 0);

    return suggestions.slice(0, 5); // 最多返回5条建议
  }

  /**
   * 构建调查报告生成的提示词
   */
  private buildInvestigationPrompt(investigationData: any): string {
    const { targetName, targetPhone, targetLocation, targetOccupation, additionalInfo } = investigationData;
    
    return `请基于以下信息生成一份专业的背景调查报告：

调查对象信息：
- 姓名：${targetName || '未提供'}
- 电话：${targetPhone || '未提供'}
- 地址：${targetLocation || '未提供'}
- 职业：${targetOccupation || '未提供'}
- 年龄：${additionalInfo?.age || '未提供'}
- 教育背景：${additionalInfo?.education || '未提供'}
- 其他信息：${additionalInfo ? JSON.stringify(additionalInfo) : '无'}

请生成包含以下部分的详细报告：
1. 基本信息概述
2. 个人背景分析
3. 社会关系评估
4. 风险评估
5. 调查建议
6. 总结

报告应该客观、专业，基于提供的信息进行合理推断，避免主观臆测。`;
  }

  /**
   * 构建建议生成的提示词
   */
  private buildSuggestionsPrompt(investigationData: any): string {
    const { targetName, targetPhone, targetLocation, targetOccupation, additionalInfo } = investigationData;
    
    return `基于以下调查对象信息，请提供具体的调查建议：

调查对象：
- 姓名：${targetName || '未提供'}
- 电话：${targetPhone || '未提供'}
- 地址：${targetLocation || '未提供'}
- 职业：${targetOccupation || '未提供'}
- 其他信息：${additionalInfo ? JSON.stringify(additionalInfo) : '无'}

请提供3-5条具体的调查建议，包括：
- 需要重点关注的方面
- 可能的调查方向
- 潜在风险点
- 建议的调查方法

每条建议应该简洁明了，具有实际操作价值。`;
  }

  /**
   * 获取API使用统计
   */
  async getUsageStats(): Promise<{
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    totalTokensUsed: number;
    averageResponseTime: number;
    lastUsed?: string;
  }> {
    return {
      totalRequests: this.stats.totalRequests,
      successfulRequests: this.stats.successfulRequests,
      failedRequests: this.stats.failedRequests,
      totalTokensUsed: this.stats.totalTokensUsed,
      averageResponseTime: this.stats.totalRequests > 0 
        ? this.stats.totalResponseTime / this.stats.totalRequests 
        : 0,
      lastUsed: this.stats.lastUsed,
    };
  }
}

/**
 * 创建GLM API服务实例
 */
export function createGLMApiService(apiKey: string, baseUrl?: string): GLMApiService {
  return new GLMApiService({
    apiKey,
    baseUrl,
    timeout: 30000,
  });
}

/**
 * 默认的GLM API服务实例（需要在使用前设置API密钥）
 */
export let defaultGLMService: GLMApiService | null = null;

/**
 * 初始化默认GLM服务
 */
export function initializeGLMService(apiKey: string, baseUrl?: string): void {
  defaultGLMService = createGLMApiService(apiKey, baseUrl);
}

/**
 * 获取默认GLM服务实例
 */
export function getGLMService(): GLMApiService {
  if (!defaultGLMService) {
    throw new Error('GLM service not initialized. Please call initializeGLMService first.');
  }
  return defaultGLMService;
}