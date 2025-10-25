# 相亲对象背调AI - 技术架构文档

**文档版本：** v1.0  
**创建日期：** 2024年12月  
**最后更新：** 2024年12月  
**文档状态：** 正式版  

---

## 1. 架构设计

### 1.1 整体架构图

```mermaid
graph TB
    subgraph "用户层"
        A[Web浏览器]
        B[移动端浏览器]
        C[API客户端]
    end
    
    subgraph "CDN层"
        D[CloudFlare CDN]
        E[静态资源缓存]
    end
    
    subgraph "前端应用层"
        F[React 18 应用]
        G[Tailwind CSS]
        H[Zustand状态管理]
        I[React Query缓存]
    end
    
    subgraph "API网关层"
        J[Express.js Gateway]
        K[JWT认证中间件]
        L[Rate Limiting]
        M[API版本控制]
    end
    
    subgraph "微服务层"
        N[用户管理服务]
        O[AI查询服务]
        P[报告生成服务]
        Q[文件处理服务]
        R[通知服务]
    end
    
    subgraph "AI平台层"
        S[DeepSeek API]
        T[豆包 API]
        U[GPT-4V API]
        V[自研风险模型]
        W[向量数据库]
    end
    
    subgraph "数据存储层"
        X[Supabase PostgreSQL]
        Y[Redis缓存集群]
        Z[MinIO对象存储]
        AA[Elasticsearch搜索]
    end
    
    subgraph "基础设施层"
        BB[Docker容器]
        CC[Kubernetes集群]
        DD[Prometheus监控]
        EE[ELK日志系统]
    end
    
    A --> D
    B --> D
    C --> D
    D --> F
    F --> J
    J --> N
    J --> O
    J --> P
    J --> Q
    J --> R
    O --> S
    O --> T
    O --> U
    O --> V
    N --> X
    O --> Y
    P --> Z
    Q --> AA
    
    BB --> CC
    CC --> DD
    CC --> EE
```

### 1.2 微服务架构设计

```mermaid
graph LR
    subgraph "API Gateway"
        A[Express.js Gateway]
        B[认证中间件]
        C[限流中间件]
        D[日志中间件]
    end
    
    subgraph "Core Services"
        E[用户服务]
        F[AI查询服务]
        G[报告服务]
        H[文件服务]
    end
    
    subgraph "AI Services"
        I[DeepSeek服务]
        J[豆包服务]
        K[GPT-4V服务]
        L[风险评估服务]
    end
    
    subgraph "Support Services"
        M[通知服务]
        N[缓存服务]
        O[搜索服务]
        P[监控服务]
    end
    
    A --> E
    A --> F
    A --> G
    A --> H
    F --> I
    F --> J
    F --> K
    F --> L
    E --> M
    F --> N
    G --> O
    All --> P
```

---

## 2. 技术描述

### 2.1 前端技术栈

- **核心框架**：React@18.2.0 + TypeScript@5.0
- **构建工具**：Vite@5.0 + SWC编译器
- **样式方案**：Tailwind CSS@3.4 + PostCSS@8.4
- **状态管理**：Zustand@4.4 + React Query@5.0
- **路由管理**：React Router@6.8
- **UI组件库**：Headless UI + Radix UI
- **动画库**：Framer Motion@10.0
- **图表库**：Recharts@2.8 + D3.js@7.8
- **表单处理**：React Hook Form@7.45 + Zod@3.22
- **工具库**：Lodash@4.17 + Date-fns@2.30

### 2.2 后端技术栈

- **运行时环境**：Node.js@20.10.0 LTS
- **Web框架**：Express.js@4.18.2
- **开发语言**：TypeScript@5.0
- **数据库**：Supabase (PostgreSQL@15.0)
- **缓存系统**：Redis@7.2 + Redis Cluster
- **对象存储**：MinIO@2023.12 / Supabase Storage
- **消息队列**：Bull Queue@4.12 + Redis
- **任务调度**：node-cron@3.0
- **文档生成**：Puppeteer@21.0 + jsPDF@2.5
- **图像处理**：Sharp@0.32 + Canvas@2.11

### 2.3 AI集成技术

- **DeepSeek SDK**：@deepseek/api@1.0.0
- **豆包 API**：@bytedance/doubao@1.2.0
- **OpenAI SDK**：openai@4.20.0
- **向量数据库**：Pinecone@1.1.0 / Weaviate@1.22.0
- **机器学习**：TensorFlow.js@4.15 + ONNX.js@1.16
- **自然语言处理**：compromise@14.10 + natural@6.5
- **图像识别**：@tensorflow/tfjs-models@1.0

### 2.4 基础设施技术

- **容器化**：Docker@24.0 + Docker Compose@2.23
- **编排平台**：Kubernetes@1.28 + Helm@3.13
- **监控系统**：Prometheus@2.47 + Grafana@10.2
- **日志系统**：Elasticsearch@8.11 + Logstash@8.11 + Kibana@8.11
- **服务网格**：Istio@1.19 (可选)
- **CI/CD**：GitHub Actions + ArgoCD@2.9

---

## 3. 路由定义

### 3.1 前端路由

| 路由路径 | 组件名称 | 功能描述 | 权限要求 |
|----------|----------|----------|----------|
| `/` | HomePage | 产品首页，功能介绍和用户引导 | 公开访问 |
| `/login` | LoginPage | 用户登录页面 | 公开访问 |
| `/register` | RegisterPage | 用户注册页面 | 公开访问 |
| `/dashboard` | DashboardPage | 用户仪表板，查询概览 | 需要登录 |
| `/query/new` | QueryInputPage | 新建AI查询，多模态输入 | 需要登录 |
| `/query/:id` | QueryDetailPage | 查询详情和实时进度 | 需要登录 |
| `/query/:id/result` | QueryResultPage | 查询结果和AI分析 | 需要登录 |
| `/reports` | ReportsPage | 报告管理和历史记录 | 需要登录 |
| `/reports/:id` | ReportDetailPage | 报告详情和可视化展示 | 需要登录 |
| `/ai-assistant` | AIAssistantPage | AI对话助手 | 需要登录 |
| `/settings` | SettingsPage | 用户设置和偏好配置 | 需要登录 |
| `/settings/models` | ModelConfigPage | AI模型配置和参数调优 | 高级用户 |
| `/profile` | ProfilePage | 个人资料和账户管理 | 需要登录 |
| `/subscription` | SubscriptionPage | 套餐管理和升级 | 需要登录 |
| `/privacy` | PrivacyPage | 隐私政策和数据管理 | 公开访问 |
| `/admin/*` | AdminRoutes | 管理后台路由 | 管理员 |

### 3.2 API路由结构

```
/api/v1/
├── auth/                    # 认证相关
│   ├── POST /login         # 用户登录
│   ├── POST /register      # 用户注册
│   ├── POST /refresh       # 刷新Token
│   └── POST /logout        # 用户登出
├── users/                   # 用户管理
│   ├── GET /profile        # 获取用户信息
│   ├── PUT /profile        # 更新用户信息
│   ├── GET /subscription   # 获取订阅信息
│   └── PUT /subscription   # 更新订阅
├── queries/                 # AI查询
│   ├── POST /              # 创建新查询
│   ├── GET /               # 获取查询列表
│   ├── GET /:id            # 获取查询详情
│   ├── PUT /:id            # 更新查询配置
│   ├── DELETE /:id         # 删除查询
│   └── GET /:id/progress   # 获取查询进度
├── ai/                      # AI服务
│   ├── POST /analyze       # AI分析请求
│   ├── POST /chat          # AI对话
│   ├── GET /models         # 获取可用模型
│   └── PUT /models/config  # 配置模型参数
├── reports/                 # 报告管理
│   ├── GET /               # 获取报告列表
│   ├── GET /:id            # 获取报告详情
│   ├── PUT /:id            # 更新报告
│   ├── DELETE /:id         # 删除报告
│   ├── POST /:id/export    # 导出报告
│   └── POST /:id/share     # 分享报告
├── files/                   # 文件管理
│   ├── POST /upload        # 文件上传
│   ├── GET /:id            # 文件下载
│   └── DELETE /:id         # 文件删除
└── admin/                   # 管理接口
    ├── GET /users          # 用户管理
    ├── GET /queries        # 查询监控
    ├── GET /analytics      # 数据分析
    └── GET /system         # 系统状态
```

---

## 4. API定义

### 4.1 认证相关API

#### 4.1.1 用户登录

```typescript
POST /api/v1/auth/login
```

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| email | string | 是 | 用户邮箱 |
| password | string | 是 | 用户密码 |
| remember | boolean | 否 | 是否记住登录状态 |

**响应数据：**
| 字段名 | 类型 | 描述 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data.user | User | 用户信息 |
| data.accessToken | string | 访问令牌 |
| data.refreshToken | string | 刷新令牌 |
| data.expiresIn | number | 令牌过期时间(秒) |

**示例：**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "remember": true
}
```

#### 4.1.2 用户注册

```typescript
POST /api/v1/auth/register
```

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| email | string | 是 | 用户邮箱 |
| password | string | 是 | 用户密码 |
| realName | string | 是 | 真实姓名 |
| phone | string | 否 | 手机号码 |
| agreeTerms | boolean | 是 | 是否同意服务条款 |

### 4.2 AI查询相关API

#### 4.2.1 创建AI查询

```typescript
POST /api/v1/queries
```

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| targetName | string | 是 | 目标人物姓名 |
| targetInfo | object | 否 | 目标人物基本信息 |
| images | string[] | 否 | 上传的图片ID列表 |
| queryConfig | object | 否 | 查询配置参数 |

**响应数据：**
| 字段名 | 类型 | 描述 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data.queryId | string | 查询ID |
| data.status | string | 查询状态 |
| data.estimatedTime | number | 预估完成时间(秒) |

#### 4.2.2 获取查询进度

```typescript
GET /api/v1/queries/:id/progress
```

**响应数据：**
| 字段名 | 类型 | 描述 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data.progress | number | 完成进度(0-100) |
| data.status | string | 当前状态 |
| data.platforms | object[] | 各平台查询状态 |
| data.estimatedRemaining | number | 预估剩余时间(秒) |

### 4.3 AI分析相关API

#### 4.3.1 AI分析请求

```typescript
POST /api/v1/ai/analyze
```

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| queryId | string | 是 | 查询ID |
| analysisType | string | 是 | 分析类型 |
| platforms | string[] | 否 | 指定AI平台 |
| config | object | 否 | 分析配置 |

**响应数据：**
| 字段名 | 类型 | 描述 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data.analysisId | string | 分析任务ID |
| data.results | object | 分析结果 |
| data.confidence | number | 置信度(0-1) |
| data.riskScore | number | 风险评分(0-100) |

### 4.4 报告相关API

#### 4.4.1 生成报告

```typescript
POST /api/v1/reports
```

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| queryId | string | 是 | 查询ID |
| templateId | string | 否 | 报告模板ID |
| customConfig | object | 否 | 自定义配置 |

**响应数据：**
| 字段名 | 类型 | 描述 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data.reportId | string | 报告ID |
| data.title | string | 报告标题 |
| data.content | object | 报告内容 |
| data.createdAt | string | 创建时间 |

#### 4.4.2 导出报告

```typescript
POST /api/v1/reports/:id/export
```

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| format | string | 是 | 导出格式(pdf/excel/word) |
| template | string | 否 | 模板样式 |
| options | object | 否 | 导出选项 |

**响应数据：**
| 字段名 | 类型 | 描述 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data.downloadUrl | string | 下载链接 |
| data.fileSize | number | 文件大小(字节) |
| data.expiresAt | string | 链接过期时间 |

---

## 5. 服务器架构图

### 5.1 微服务架构

```mermaid
graph TB
    subgraph "负载均衡层"
        A[Nginx Load Balancer]
        B[HAProxy]
    end
    
    subgraph "API网关层"
        C[Express.js Gateway]
        D[认证服务]
        E[限流服务]
        F[监控服务]
    end
    
    subgraph "业务服务层"
        G[用户管理服务]
        H[AI查询服务]
        I[报告生成服务]
        J[文件处理服务]
        K[通知服务]
    end
    
    subgraph "AI服务层"
        L[DeepSeek服务]
        M[豆包服务]
        N[GPT-4V服务]
        O[风险评估服务]
        P[向量搜索服务]
    end
    
    subgraph "数据服务层"
        Q[PostgreSQL主库]
        R[PostgreSQL从库]
        S[Redis集群]
        T[Elasticsearch集群]
        U[MinIO集群]
    end
    
    subgraph "基础设施层"
        V[Kubernetes集群]
        W[Prometheus监控]
        X[ELK日志系统]
        Y[Jaeger链路追踪]
    end
    
    A --> C
    C --> G
    C --> H
    C --> I
    C --> J
    C --> K
    H --> L
    H --> M
    H --> N
    H --> O
    H --> P
    G --> Q
    H --> S
    I --> T
    J --> U
    
    V --> W
    V --> X
    V --> Y
```

### 5.2 数据流架构

```mermaid
graph LR
    subgraph "数据输入层"
        A[用户输入]
        B[图片上传]
        C[API调用]
    end
    
    subgraph "数据处理层"
        D[数据验证]
        E[数据清洗]
        F[格式转换]
        G[数据增强]
    end
    
    subgraph "AI处理层"
        H[多模态融合]
        I[特征提取]
        J[模型推理]
        K[结果融合]
    end
    
    subgraph "数据存储层"
        L[关系数据库]
        M[缓存系统]
        N[对象存储]
        O[搜索引擎]
    end
    
    subgraph "数据输出层"
        P[API响应]
        Q[报告生成]
        R[文件导出]
        S[实时推送]
    end
    
    A --> D
    B --> E
    C --> F
    D --> H
    E --> I
    F --> J
    G --> K
    H --> L
    I --> M
    J --> N
    K --> O
    L --> P
    M --> Q
    N --> R
    O --> S
```

---

## 6. 数据模型

### 6.1 数据模型定义

```mermaid
erDiagram
    USERS ||--o{ AI_QUERIES : creates
    USERS ||--o{ REPORTS : owns
    USERS ||--o{ AI_CONVERSATIONS : participates
    AI_QUERIES ||--o{ AI_PLATFORM_RESPONSES : generates
    AI_QUERIES ||--o{ QUERY_RESULTS : produces
    AI_QUERIES ||--o{ RISK_ASSESSMENTS : evaluates
    AI_QUERIES ||--|| REPORTS : generates
    REPORTS ||--o{ REPORT_EXPORTS : exports
    
    USERS {
        uuid id PK
        string email UK
        string phone UK
        string password_hash
        string real_name
        string subscription_plan
        integer query_count
        boolean is_verified
        string avatar_url
        jsonb preferences
        timestamp created_at
        timestamp updated_at
    }
    
    AI_QUERIES {
        uuid id PK
        uuid user_id FK
        string target_name
        jsonb target_info
        jsonb query_config
        string status
        integer progress
        jsonb metadata
        timestamp created_at
        timestamp completed_at
    }
    
    AI_PLATFORM_RESPONSES {
        uuid id PK
        uuid query_id FK
        string platform
        jsonb request_data
        jsonb response_data
        string status
        integer response_time
        string error_message
        timestamp created_at
    }
    
    QUERY_RESULTS {
        uuid id PK
        uuid query_id FK
        string result_type
        jsonb result_data
        decimal confidence_score
        string[] source_platforms
        jsonb metadata
        timestamp created_at
    }
    
    RISK_ASSESSMENTS {
        uuid id PK
        uuid query_id FK
        integer overall_score
        integer credibility_score
        integer stability_score
        integer compatibility_score
        jsonb risk_factors
        jsonb recommendations
        jsonb analysis_details
        timestamp created_at
    }
    
    REPORTS {
        uuid id PK
        uuid query_id FK
        uuid user_id FK
        string title
        jsonb content
        string template_id
        string[] export_formats
        boolean is_shared
        string share_token UK
        jsonb sharing_config
        timestamp created_at
        timestamp updated_at
    }
    
    REPORT_EXPORTS {
        uuid id PK
        uuid report_id FK
        string format
        string file_path
        integer file_size
        string download_url
        timestamp expires_at
        timestamp created_at
    }
    
    AI_CONVERSATIONS {
        uuid id PK
        uuid user_id FK
        uuid query_id FK
        jsonb conversation_data
        integer message_count
        timestamp last_message_at
        timestamp created_at
    }
    
    FILE_UPLOADS {
        uuid id PK
        uuid user_id FK
        string original_name
        string file_path
        string mime_type
        integer file_size
        string purpose
        jsonb metadata
        timestamp created_at
        timestamp expires_at
    }
    
    SYSTEM_CONFIGS {
        uuid id PK
        string config_key UK
        jsonb config_value
        string description
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
```

### 6.2 数据定义语言

#### 6.2.1 核心业务表

```sql
-- 用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    real_name VARCHAR(100),
    subscription_plan VARCHAR(20) DEFAULT 'free' CHECK (subscription_plan IN ('free', 'standard', 'premium', 'enterprise')),
    query_count INTEGER DEFAULT 0,
    query_limit INTEGER DEFAULT 3,
    is_verified BOOLEAN DEFAULT false,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}',
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI查询表
CREATE TABLE ai_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_name VARCHAR(100) NOT NULL,
    target_info JSONB DEFAULT '{}',
    query_config JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- AI平台响应表
CREATE TABLE ai_platform_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID NOT NULL REFERENCES ai_queries(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('deepseek', 'doubao', 'gpt4v', 'custom')),
    request_data JSONB,
    response_data JSONB,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'timeout')),
    response_time INTEGER, -- 响应时间(毫秒)
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 查询结果表
CREATE TABLE query_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID NOT NULL REFERENCES ai_queries(id) ON DELETE CASCADE,
    result_type VARCHAR(50) NOT NULL CHECK (result_type IN ('basic_info', 'social_profile', 'risk_analysis', 'compatibility')),
    result_data JSONB NOT NULL,
    confidence_score DECIMAL(5,4) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    source_platforms TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 风险评估表
CREATE TABLE risk_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID NOT NULL REFERENCES ai_queries(id) ON DELETE CASCADE,
    overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
    credibility_score INTEGER CHECK (credibility_score >= 0 AND credibility_score <= 100),
    stability_score INTEGER CHECK (stability_score >= 0 AND stability_score <= 100),
    compatibility_score INTEGER CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
    risk_factors JSONB DEFAULT '[]',
    recommendations JSONB DEFAULT '[]',
    analysis_details JSONB DEFAULT '{}',
    model_version VARCHAR(20) DEFAULT 'v1.0',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 报告表
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID NOT NULL REFERENCES ai_queries(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content JSONB NOT NULL,
    template_id VARCHAR(50) DEFAULT 'default',
    export_formats TEXT[] DEFAULT '{}',
    is_shared BOOLEAN DEFAULT false,
    share_token VARCHAR(100) UNIQUE,
    sharing_config JSONB DEFAULT '{}',
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 6.2.2 索引创建

```sql
-- 用户表索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_subscription ON users(subscription_plan);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- AI查询表索引
CREATE INDEX idx_ai_queries_user_id ON ai_queries(user_id);
CREATE INDEX idx_ai_queries_status ON ai_queries(status);
CREATE INDEX idx_ai_queries_created_at ON ai_queries(created_at DESC);
CREATE INDEX idx_ai_queries_target_name ON ai_queries(target_name);
CREATE INDEX idx_ai_queries_expires_at ON ai_queries(expires_at);

-- AI平台响应表索引
CREATE INDEX idx_platform_responses_query_id ON ai_platform_responses(query_id);
CREATE INDEX idx_platform_responses_platform ON ai_platform_responses(platform);
CREATE INDEX idx_platform_responses_status ON ai_platform_responses(status);
CREATE INDEX idx_platform_responses_created_at ON ai_platform_responses(created_at DESC);

-- 查询结果表索引
CREATE INDEX idx_query_results_query_id ON query_results(query_id);
CREATE INDEX idx_query_results_type ON query_results(result_type);
CREATE INDEX idx_query_results_confidence ON query_results(confidence_score DESC);

-- 风险评估表索引
CREATE INDEX idx_risk_assessments_query_id ON risk_assessments(query_id);
CREATE INDEX idx_risk_assessments_overall_score ON risk_assessments(overall_score DESC);
CREATE INDEX idx_risk_assessments_created_at ON risk_assessments(created_at DESC);

-- 报告表索引
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_query_id ON reports(query_id);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_reports_share_token ON reports(share_token);
CREATE INDEX idx_reports_is_shared ON reports(is_shared);
```

#### 6.2.3 初始化数据

```sql
-- 系统配置初始化
INSERT INTO system_configs (config_key, config_value, description, is_active) VALUES
('ai_platforms', '{"deepseek": {"enabled": true, "priority": 1}, "doubao": {"enabled": true, "priority": 2}, "gpt4v": {"enabled": true, "priority": 3}}', 'AI平台配置', true),
('query_limits', '{"free": 3, "standard": 50, "premium": -1, "enterprise": -1}', '查询次数限制', true),
('risk_thresholds', '{"low": 30, "medium": 60, "high": 80}', '风险评估阈值', true),
('report_templates', '{"default": "标准报告", "detailed": "详细报告", "summary": "摘要报告"}', '报告模板配置', true);

-- 默认用户角色权限
INSERT INTO system_configs (config_key, config_value, description, is_active) VALUES
('user_permissions', '{
  "free": ["basic_query", "view_report"],
  "standard": ["basic_query", "advanced_query", "view_report", "export_pdf"],
  "premium": ["basic_query", "advanced_query", "view_report", "export_all", "ai_assistant", "custom_template"],
  "enterprise": ["all_permissions", "api_access", "bulk_query", "admin_panel"]
}', '用户权限配置', true);

-- AI模型配置
INSERT INTO system_configs (config_key, config_value, description, is_active) VALUES
('ai_model_configs', '{
  "deepseek": {
    "model": "deepseek-chat",
    "max_tokens": 4000,
    "temperature": 0.7,
    "timeout": 30000
  },
  "doubao": {
    "model": "doubao-pro",
    "max_tokens": 4000,
    "temperature": 0.7,
    "timeout": 30000
  },
  "gpt4v": {
    "model": "gpt-4-vision-preview",
    "max_tokens": 4000,
    "temperature": 0.7,
    "timeout": 30000
  }
}', 'AI模型参数配置', true);
```

#### 6.2.4 权限控制策略

```sql
-- 启用行级安全
ALTER TABLE ai_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE query_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- 用户只能访问自己的查询
CREATE POLICY "Users can only access their own queries" ON ai_queries
    FOR ALL USING (auth.uid() = user_id);

-- 用户只能访问自己的查询结果
CREATE POLICY "Users can only access their own query results" ON query_results
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM ai_queries 
            WHERE ai_queries.id = query_results.query_id 
            AND ai_queries.user_id = auth.uid()
        )
    );

-- 用户只能访问自己的风险评估
CREATE POLICY "Users can only access their own risk assessments" ON risk_assessments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM ai_queries 
            WHERE ai_queries.id = risk_assessments.query_id 
            AND ai_queries.user_id = auth.uid()
        )
    );

-- 用户可以访问自己的报告或公开分享的报告
CREATE POLICY "Users can access their own reports or shared reports" ON reports
    FOR SELECT USING (
        auth.uid() = user_id OR 
        (is_shared = true AND share_token IS NOT NULL)
    );

-- 用户只能修改自己的报告
CREATE POLICY "Users can only modify their own reports" ON reports
    FOR UPDATE USING (auth.uid() = user_id);

-- 用户只能删除自己的报告
CREATE POLICY "Users can only delete their own reports" ON reports
    FOR DELETE USING (auth.uid() = user_id);

-- 用户只能访问自己的对话记录
CREATE POLICY "Users can only access their own conversations" ON ai_conversations
    FOR ALL USING (auth.uid() = user_id);
```

---

## 7. 部署架构

### 7.1 容器化部署

#### 7.1.1 Docker配置

**前端Dockerfile：**
```dockerfile
# 多阶段构建
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**后端Dockerfile：**
```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
```

#### 7.1.2 Docker Compose配置

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://backend:3000

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=detective_ai
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

### 7.2 Kubernetes部署

#### 7.2.1 命名空间和配置

```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: detective-ai

---
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: detective-ai
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  API_VERSION: "v1"

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: detective-ai
type: Opaque
data:
  JWT_SECRET: <base64-encoded-secret>
  DATABASE_URL: <base64-encoded-url>
  REDIS_URL: <base64-encoded-url>
```

#### 7.2.2 应用部署

```yaml
# frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: detective-ai
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: detective-ai/frontend:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"

---
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: detective-ai
spec:
  replicas: 5
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: detective-ai/backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: NODE_ENV
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: JWT_SECRET
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

#### 7.2.3 服务和入口

```yaml
# services.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: detective-ai
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP

---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: detective-ai
spec:
  selector:
    app: backend
  ports:
  - port: 3000
    targetPort: 3000
  type: ClusterIP

---
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: detective-ai
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - detective-ai.com
    secretName: detective-ai-tls
  rules:
  - host: detective-ai.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 3000
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
```

### 7.3 监控和日志

#### 7.3.1 Prometheus监控

```yaml
# prometheus-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: detective-ai
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'backend'
      static_configs:
      - targets: ['backend-service:3000']
      metrics_path: /metrics
    - job_name: 'postgres'
      static_configs:
      - targets: ['postgres-exporter:9187']
    - job_name: 'redis'
      static_configs:
      - targets: ['redis-exporter:9121']

---
# prometheus-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: detective-ai
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
      - name: prometheus
        image: prom/prometheus:latest
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: config
          mountPath: /etc/prometheus
        - name: storage
          mountPath: /prometheus
      volumes:
      - name: config
        configMap:
          name: prometheus-config
      - name: storage
        persistentVolumeClaim:
          claimName: prometheus-pvc
```

#### 7.3.2 ELK日志系统

```yaml
# elasticsearch.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elasticsearch
  namespace: detective-ai
spec:
  serviceName: elasticsearch
  replicas: 3
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      containers:
      - name: elasticsearch
        image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
        env:
        - name: discovery.type
          value: single-node
        - name: ES_JAVA_OPTS
          value: "-Xms512m -Xmx512m"
        ports:
        - containerPort: 9200
        - containerPort: 9300
        volumeMounts:
        - name: data
          mountPath: /usr/share/elasticsearch/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi

---
# logstash.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: logstash
  namespace: detective-ai
spec:
  replicas: 2
  selector:
    matchLabels:
      app: logstash
  template:
    metadata:
      labels:
        app: logstash
    spec:
      containers:
      - name: logstash
        image: docker.elastic.co/logstash/logstash:8.11.0
        ports:
        - containerPort: 5044
        volumeMounts:
        - name: config
          mountPath: /usr/share/logstash/pipeline
      volumes:
      - name: config
        configMap:
          name: logstash-config

---
# kibana.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kibana
  namespace: detective-ai
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kibana
  template:
    metadata:
      labels:
        app: kibana
    spec:
      containers:
      - name: kibana
        image: docker.elastic.co/kibana/kibana:8.11.0
        env:
        - name: ELASTICSEARCH_HOSTS
          value: "http://elasticsearch:9200"
        ports:
        - containerPort: 5601
```

---

## 8. 安全架构

### 8.1 安全策略

#### 8.1.1 网络安全

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: detective-ai-network-policy
  namespace: detective-ai
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 80
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
  - to: []
    ports:
    - protocol: TCP
      port: 443
    - protocol: TCP
      port: 5432
    - protocol: TCP
      port: 6379
```

#### 8.1.2 RBAC权限控制

```yaml
# rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: detective-ai-sa
  namespace: detective-ai

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: detective-ai-role
  namespace: detective-ai
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: detective-ai-binding
  namespace: detective-ai
subjects:
- kind: ServiceAccount
  name: detective-ai-sa
  namespace: detective-ai
roleRef:
  kind: Role
  name: detective-ai-role
  apiGroup: rbac.authorization.k8s.io
```

### 8.2 数据安全

#### 8.2.1 加密配置

```typescript
// encryption.ts
import crypto from 'crypto';

export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyLength = 32;
  private readonly ivLength = 16;
  private readonly tagLength = 16;

  constructor(private readonly secretKey: string) {}

  encrypt(text: string): string {
    const key = crypto.scryptSync(this.secretKey, 'salt', this.keyLength);
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipher(this.algorithm, key, { iv });
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted;
  }

  decrypt(encryptedText: string): string {
    const [ivHex, tagHex, encrypted] = encryptedText.split(':');
    const key = crypto.scryptSync(this.secretKey, 'salt', this.keyLength);
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    
    const decipher = crypto.createDecipher(this.algorithm, key, { iv });
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

#### 8.2.2 JWT认证

```typescript
// auth.middleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = payload as JWTPayload;
    next();
  });
};

export const authorizePermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JWTPayload;
    
    if (!user.permissions.includes(requiredPermission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};
```

---

## 9. 性能优化

### 9.1 缓存策略

#### 9.1.1 Redis缓存配置

```typescript
// cache.service.ts
import Redis from 'ioredis';

export class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<boolean> {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await this.redis.del(key);
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache invalidate error:', error);
    }
  }
}
```

#### 9.1.2 查询结果缓存

```typescript
// query.cache.ts
export class QueryCacheService {
  constructor(private cacheService: CacheService) {}

  private generateCacheKey(targetName: string, queryConfig: any): string {
    const configHash = crypto
      .createHash('md5')
      .update(JSON.stringify(queryConfig))
      .digest('hex');
    return `query:${targetName}:${configHash}`;
  }

  async getCachedResult(targetName: string, queryConfig: any): Promise<any | null> {
    const key = this.generateCacheKey(targetName, queryConfig);
    return await this.cacheService.get(key);
  }

  async setCachedResult(
    targetName: string, 
    queryConfig: any, 
    result: any, 
    ttl: number = 7200
  ): Promise<void> {
    const key = this.generateCacheKey(targetName, queryConfig);
    await this.cacheService.set(key, result, ttl);
  }

  async invalidateUserQueries(userId: string): Promise<void> {
    await this.cacheService.invalidatePattern(`query:*:user:${userId}`);
  }
}
```

### 9.2 数据库优化

#### 9.2.1 连接池配置

```typescript
// database.config.ts
import { Pool } from 'pg';

export const createDatabasePool = () => {
  return new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    
    // 连接池配置
    min: 5,                    // 最小连接数
    max: 50,                   // 最大连接数
    idleTimeoutMillis: 30000,  // 空闲连接超时
    connectionTimeoutMillis: 5000, // 连接超时
    
    // 性能优化
    statement_timeout: 30000,   // 语句超时
    query_timeout: 30000,       // 查询超时
    application_name: 'detective-ai',
  });
};
```

#### 9.2.2 查询优化

```sql
-- 分区表设计
CREATE TABLE ai_queries_partitioned (
    LIKE ai_queries INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- 按月分区
CREATE TABLE ai_queries_2024_01 PARTITION OF ai_queries_partitioned
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE ai_queries_2024_02 PARTITION OF ai_queries_partitioned
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- 物化视图用于统计
CREATE MATERIALIZED VIEW user_query_stats AS
SELECT 
    user_id,
    DATE_TRUNC('day', created_at) as query_date,
    COUNT(*) as query_count,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count,
    AVG(EXTRACT(EPOCH FROM (completed_at - created_at))) as avg_duration
FROM ai_queries
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY user_id, DATE_TRUNC('day', created_at);

-- 定期刷新物化视图
CREATE OR REPLACE FUNCTION refresh_user_stats()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_query_stats;
END;
$$ LANGUAGE plpgsql;

-- 定时任务
SELECT cron.schedule('refresh-stats', '0 */6 * * *', 'SELECT refresh_user_stats();');
```

### 9.3 前端性能优化

#### 9.3.1 代码分割和懒加载

```typescript
// router.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// 懒加载页面组件
const HomePage = lazy(() => import('./pages/HomePage'));
const QueryInputPage = lazy(() => import('./pages/QueryInputPage'));
const QueryResultPage = lazy(() => import('./pages/QueryResultPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/query/new" element={<QueryInputPage />} />
        <Route path="/query/:id/result" element={<QueryResultPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
      </Routes>
    </Suspense>
  );
};
```

#### 9.3.2 状态管理优化

```typescript
// stores/queryStore.ts
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface QueryState {
  queries: Query[];
  currentQuery: Query | null;
  loading: boolean;
  error: string | null;
}

interface QueryActions {
  fetchQueries: () => Promise<void>;
  createQuery: (data: CreateQueryData) => Promise<string>;
  updateQuery: (id: string, data: Partial<Query>) => void;
  deleteQuery: (id: string) => Promise<void>;
  setCurrentQuery: (query: Query | null) => void;
  clearError: () => void;
}

export const useQueryStore = create<QueryState & QueryActions>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        // State
        queries: [],
        currentQuery: null,
        loading: false,
        error: null,

        // Actions
        fetchQueries: async () => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          try {
            const response = await api.get('/queries');
            set((state) => {
              state.queries = response.data;
              state.loading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
          }
        },

        createQuery: async (data) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          try {
            const response = await api.post('/queries', data);
            const newQuery = response.data;
            
            set((state) => {
              state.queries.unshift(newQuery);
              state.currentQuery = newQuery;
              state.loading = false;
            });

            return newQuery.id;
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
            throw error;
          }
        },

        updateQuery: (id, data) => {
          set((state) => {
            const index = state.queries.findIndex(q => q.id === id);
            if (index !== -1) {
              Object.assign(state.queries[index], data);
            }
            if (state.currentQuery?.id === id) {
              Object.assign(state.currentQuery, data);
            }
          });
        },

        deleteQuery: async (id) => {
          try {
            await api.delete(`/queries/${id}`);
            set((state) => {
              state.queries = state.queries.filter(q => q.id !== id);
              if (state.currentQuery?.id === id) {
                state.currentQuery = null;
              }
            });
          } catch (error) {
            set((state) => {
              state.error = error.message;
            });
            throw error;
          }
        },

        setCurrentQuery: (query) => {
          set((state) => {
            state.currentQuery = query;
          });
        },

        clearError: () => {
          set((state) => {
            state.error = null;
          });
        },
      })),
      {
        name: 'query-store',
        partialize: (state) => ({
          queries: state.queries,
          currentQuery: state.currentQuery,
        }),
      }
    )
  )
);
```

---

## 10. 监控和运维

### 10.1 应用监控

#### 10.1.1 健康检查端点

```typescript
// health.controller.ts
import { Request, Response } from 'express';
import { DatabaseService } from '../services/database.service';
import { CacheService } from '../services/cache.service';
import { AIService } from '../services/ai.service';

export class HealthController {
  constructor(
    private dbService: DatabaseService,
    private cacheService: CacheService,
    private aiService: AIService
  ) {}

  async healthCheck(req: Request, res: Response) {
    const checks = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV,
      services: {
        database: await this.checkDatabase(),
        cache: await this.checkCache(),
        ai_platforms: await this.checkAIPlatforms(),
      },
      resources: {
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
      },
    };

    const isHealthy = Object.values(checks.services).every(
      service => service.status === 'healthy'
    );

    res.status(isHealthy ? 200 : 503).json(checks);
  }

  private async checkDatabase(): Promise<ServiceHealth> {
    try {
      const start = Date.now();
      await this.dbService.query('SELECT 1');
      const responseTime = Date.now() - start;
      
      return {
        status: 'healthy',
        responseTime,
        details: 'Database connection successful',
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        details: 'Database connection failed',
      };
    }
  }

  private async checkCache(): Promise<ServiceHealth> {
    try {
      const start = Date.now();
      await this.cacheService.set('health_check', 'ok', 10);
      await this.cacheService.get('health_check');
      const responseTime = Date.now() - start;
      
      return {
        status: 'healthy',
        responseTime,
        details: 'Cache service operational',
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        details: 'Cache service unavailable',
      };
    }
  }

  private async checkAIPlatforms(): Promise<ServiceHealth> {
    try {
      const platforms = await this.aiService.checkPlatformHealth();
      const healthyCount = platforms.filter(p => p.status === 'healthy').length;
      
      return {
        status: healthyCount > 0 ? 'healthy' : 'unhealthy',
        details: `${healthyCount}/${platforms.length} AI platforms available`,
        platforms,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        details: 'AI platform health check failed',
      };
    }
  }
}

interface ServiceHealth {
  status: 'healthy' | 'unhealthy';
  responseTime?: number;
  error?: string;
  details: string;
  platforms?: any[];
}
```

#### 10.1.2 性能指标收集

```typescript
// metrics.middleware.ts
import { Request, Response, NextFunction } from 'express';
import prometheus from 'prom-client';

// 创建指标收集器
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

const activeConnections = new prometheus.Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
});

const aiQueryDuration = new prometheus.Histogram({
  name: 'ai_query_duration_seconds',
  help: 'Duration of AI queries in seconds',
  labelNames: ['platform', 'query_type'],
  buckets: [1, 5, 10, 30, 60, 120],
});

const aiQueryTotal = new prometheus.Counter({
  name: 'ai_queries_total',
  help: 'Total number of AI queries',
  labelNames: ['platform', 'status'],
});

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // 增加活跃连接数
  activeConnections.inc();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    
    // 记录请求指标
    httpRequestDuration
      .labels(req.method, route, res.statusCode.toString())
      .observe(duration);
    
    httpRequestTotal
      .labels(req.method, route, res.statusCode.toString())
      .inc();
    
    // 减少活跃连接数
    activeConnections.dec();
  });
  
  next();
};

// 导出指标端点
export const metricsEndpoint = async (req: Request, res: Response) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
};

// AI查询指标记录
export const recordAIQueryMetrics = (
  platform: string,
  queryType: string,
  duration: number,
  status: 'success' | 'error'
) => {
  aiQueryDuration
    .labels(platform, queryType)
    .observe(duration);
  
  aiQueryTotal
    .labels(platform, status)
    .inc();
};
```

### 10.2 日志管理

#### 10.2.1 结构化日志

```typescript
// logger.service.ts
import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    node: process.env.ELASTICSEARCH_URL,
    auth: {
      username: process.env.ES_USERNAME,
      password: process.env.ES_PASSWORD,
    },
  },
  index: 'detective-ai-logs',
  indexTemplate: {
    name: 'detective-ai-template',
    pattern: 'detective-ai-logs-*',
    settings: {
      number_of_shards: 1,
      number_of_replicas: 1,
    },
    mappings: {
      properties: {
        '@timestamp': { type: 'date' },
        level: { type: 'keyword' },
        message: { type: 'text' },
        service: { type: 'keyword' },
        userId: { type: 'keyword' },
        queryId: { type: 'keyword' },
        platform: { type: 'keyword' },
        duration: { type: 'integer' },
        error: {
          type: 'object',
          properties: {
            name: { type: 'keyword' },
            message: { type: 'text' },
            stack: { type: 'text' },
          },
        },
      },
    },
  },
};

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return JSON.stringify({
        timestamp,
        level,
        message,
        service: 'detective-ai',
        environment: process.env.NODE_ENV,
        ...meta,
      });
    })
  ),
  defaultMeta: {
    service: 'detective-ai',
    version: process.env.APP_VERSION,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 10485760, // 10MB
      maxFiles: 10,
    }),
  ],
});

// 生产环境添加Elasticsearch传输
if (process.env.NODE_ENV === 'production' && process.env.ELASTICSEARCH_URL) {
  logger.add(new ElasticsearchTransport(esTransportOpts));
}

// 日志记录辅助函数
export const logAIQuery = (
  userId: string,
  queryId: string,
  platform: string,
  action: string,
  duration?: number,
  error?: Error
) => {
  const logData = {
    userId,
    queryId,
    platform,
    action,
    duration,
  };

  if (error) {
    logger.error(`AI Query ${action} failed`, {
      ...logData,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  } else {
    logger.info(`AI Query ${action} completed`, logData);
  }
};

export const logUserAction = (
  userId: string,
  action: string,
  resource?: string,
  metadata?: any
) => {
  logger.info('User action', {
    userId,
    action,
    resource,
    metadata,
  });
};

export const logSystemEvent = (
  event: string,
  details: any,
  level: 'info' | 'warn' | 'error' = 'info'
) => {
  logger[level]('System event', {
    event,
    details,
  });
};
```

### 10.3 错误处理和告警

#### 10.3.1 全局错误处理

```typescript
// error.handler.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from './logger.service';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let isOperational = false;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    isOperational = error.isOperational;
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (error.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // 记录错误日志
  logger.error('Request error', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
      userId: req.user?.userId,
    },
    statusCode,
    isOperational,
  });

  // 发送告警（生产环境）
  if (process.env.NODE_ENV === 'production' && !isOperational) {
    sendErrorAlert(error, req);
  }

  // 返回错误响应
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details: error,
      }),
    },
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method,
  });
};

// 未捕获异常处理
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });
  
  sendCriticalAlert('Uncaught Exception', error);
  
  // 优雅关闭
  process.exit(1);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  logger.error('Unhandled Rejection', {
    reason,
    promise,
  });
  
  sendCriticalAlert('Unhandled Rejection', reason);
});

// 告警发送函数
async function sendErrorAlert(error: Error, req: Request) {
  // 实现告警逻辑（邮件、Slack、钉钉等）
  try {
    // 示例：发送到监控系统
    await fetch(process.env.ALERT_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'error',
        service: 'detective-ai',
        error: error.message,
        stack: error.stack,
        request: {
          method: req.method,
          url: req.url,
          userId: req.user?.userId,
        },
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (alertError) {
    logger.error('Failed to send error alert', { alertError });
  }
}

async function sendCriticalAlert(type: string, error: any) {
  try {
    await fetch(process.env.CRITICAL_ALERT_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'critical',
        service: 'detective-ai',
        alertType: type,
        error: error.message || error,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (alertError) {
    console.error('Failed to send critical alert:', alertError);
  }
}
```

---

## 11. 技术可行性评估

### 11.1 技术风险评估

| 风险类别 | 风险描述 | 影响程度 | 发生概率 | 缓解措施 |
|----------|----------|----------|----------|----------|
| AI平台依赖 | 第三方AI平台服务不稳定或API变更 | 高 | 中 | 多平台备份、本地模型备选、API版本锁定 |
| 数据安全 | 用户隐私数据泄露或被滥用 | 极高 | 低 | 端到端加密、最小权限原则、审计日志 |
| 性能瓶颈 | 高并发下系统响应缓慢 | 中 | 中 | 缓存策略、负载均衡、数据库优化 |
| 法律合规 | 背调功能涉及法律风险 | 高 | 中 | 法律咨询、用户协议、数据脱敏 |
| 技术债务 | 快速开发导致代码质量问题 | 中 | 高 | 代码审查、自动化测试、重构计划 |

### 11.2 技术选型合理性

#### 11.2.1 前端技术选型

**React 18 + TypeScript**
- ✅ 优势：成熟生态、强类型支持、组件化开发
- ✅ 适用性：复杂交互界面、状态管理需求
- ⚠️ 考虑：学习曲线、包体积

**Tailwind CSS**
- ✅ 优势：快速开发、一致性设计、响应式支持
- ✅ 适用性：现代UI设计、快速原型
- ⚠️ 考虑：CSS文件大小、定制化限制

#### 11.2.2 后端技术选型

**Node.js + Express**
- ✅ 优势：JavaScript全栈、丰富生态、高性能I/O
- ✅ 适用性：API服务、实时通信
- ⚠️ 考虑：CPU密集型任务、内存管理

**Supabase**
- ✅ 优势：快速开发、内置认证、实时功能
- ✅ 适用性：中小型项目、快速MVP
- ⚠️ 考虑：供应商锁定、定制化限制

#### 11.2.3 AI集成选型

**多平台策略**
- ✅ 优势：降低单点故障、成本优化、功能互补
- ✅ 适用性：高可用性要求、多样化需求
- ⚠️ 考虑：集成复杂度、一致性保证

### 11.3 开发资源评估

#### 11.3.1 人力资源需求

| 角色 | 人数 | 技能要求 | 工作内容 |
|------|------|----------|----------|
| 前端开发 | 2-3人 | React、TypeScript、UI/UX | 用户界面、交互逻辑、响应式设计 |
| 后端开发 | 2-3人 | Node.js、数据库、API设计 | 业务逻辑、数据处理、系统集成 |
| AI工程师 | 1-2人 | 机器学习、NLP、模型优化 | AI模型集成、算法优化、数据分析 |
| DevOps工程师 | 1人 | Docker、K8s、监控运维 | 部署自动化、系统监控、性能优化 |
| 产品经理 | 1人 | 产品设计、需求分析、项目管理 | 需求梳理、功能设计、进度管控 |
| 测试工程师 | 1-2人 | 自动化测试、性能测试、安全测试 | 质量保证、测试用例、缺陷跟踪 |

#### 11.3.2 开发周期估算

| 阶段 | 持续时间 | 主要工作 | 交付物 |
|------|----------|----------|---------|
| 需求分析 | 2周 | 需求调研、原型设计、技术选型 | PRD、技术方案、原型图 |
| 架构设计 | 1周 | 系统架构、数据库设计、API设计 | 架构文档、数据模型、API规范 |
| 基础开发 | 4周 | 基础框架、核心功能、用户系统 | 基础版本、用户管理、认证系统 |
| AI集成 | 3周 | AI平台对接、算法实现、数据处理 | AI查询功能、结果分析、风险评估 |
| 功能完善 | 3周 | 报告生成、UI优化、性能调优 | 完整功能、用户界面、性能优化 |
| 测试部署 | 2周 | 系统测试、安全测试、生产部署 | 测试报告、部署文档、线上系统 |
| **总计** | **15周** | **完整开发周期** | **生产就绪系统** |

### 11.4 成本效益分析

#### 11.4.1 开发成本

| 成本项目 | 月成本 | 年成本 | 说明 |
|----------|--------|--------|------|
| 人力成本 | ¥80,000 | ¥960,000 | 8人团队平均薪资 |
| 基础设施 | ¥5,000 | ¥60,000 | 云服务、CDN、监控 |
| AI平台费用 | ¥10,000 | ¥120,000 | API调用、模型使用 |
| 第三方服务 | ¥3,000 | ¥36,000 | 邮件、短信、存储 |
| 运维工具 | ¥2,000 | ¥24,000 | 监控、日志、安全 |
| **总计** | **¥100,000** | **¥1,200,000** | **年度总成本** |

#### 11.4.2 技术债务控制

```typescript
// 代码质量检查配置
// .eslintrc.js
module.exports = {
  extends: [
    '@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'complexity': ['error', 10],
    'max-lines': ['error', 300],
    'max-lines-per-function': ['error', 50],
    'no-console': 'warn',
    '@typescript-eslint/no-any': 'error',
  },
};

// jest.config.js - 测试覆盖率要求
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// sonar-project.properties - 代码质量门禁
sonar.projectKey=detective-ai
sonar.qualitygate.wait=true
sonar.coverage.exclusions=**/*.test.ts,**/*.spec.ts
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

---

## 12. 总结与建议

### 12.1 架构优势

1. **微服务架构**：模块化设计，便于扩展和维护
2. **多AI平台集成**：降低单点故障风险，提高服务可用性
3. **现代技术栈**：React + Node.js + TypeScript，开发效率高
4. **云原生设计**：容器化部署，支持弹性扩缩容
5. **安全优先**：端到端加密，完善的权限控制
6. **可观测性**：完整的监控、日志、告警体系

### 12.2 关键技术决策

1. **选择Supabase作为后端服务**：快速开发，降低基础设施复杂度
2. **采用多AI平台策略**：提高系统可靠性和功能丰富度
3. **实施缓存策略**：Redis多层缓存，提升系统性能
4. **容器化部署**：Docker + Kubernetes，支持云原生运维
5. **结构化日志**：ELK技术栈，便于问题排查和数据分析

### 12.3 发展建议

#### 12.3.1 短期优化（3-6个月）

- 完善AI模型调优和结果融合算法
- 优化数据库查询性能和索引策略
- 增强系统监控和告警机制
- 完善自动化测试覆盖率

#### 12.3.2 中期规划（6-12个月）

- 引入机器学习模型训练平台
- 实现智能推荐和个性化功能
- 扩展移动端应用支持
- 建设数据分析和BI系统

#### 12.3.3 长期愿景（1-2年）

- 构建自研AI模型和算法
- 实现多租户SaaS化部署
- 拓展国际化和多语言支持
- 建设开放API生态系统

### 12.4 风险控制建议

1. **技术风险**：建立技术评审机制，定期进行架构回顾
2. **安全风险**：实施安全开发生命周期，定期安全审计
3. **合规风险**：建立法务审查流程，确保业务合规
4. **运维风险**：完善灾备方案，建立应急响应机制

---

**文档版本历史：**

| 版本 | 日期 | 修改内容 | 修改人 |
|------|------|----------|--------|
| v1.0 | 2024-12 | 初始版本，完整技术架构设计 | 系统架构师 |

**审核状态：** ✅ 已审核  
**批准状态：** ✅ 已批准  
**实施状态：** 🔄 待实施