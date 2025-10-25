import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ReportData {
  basicInfo: {
    name: string;
    age: number;
    gender: string;
    height: string;
    weight: string;
    education: string;
    occupation: string;
    monthlyIncome: string;
    hasHouse: string;
    hasCar: string;
    maritalStatus: string;
  };
  personalityAnalysis: {
    traits: Array<{ name: string; value: number; description: string }>;
    overallScore: number;
    summary: string;
  };
  interestAnalysis: {
    hobbies: Array<{ name: string; value: number; details: string[] }>;
    compatibilityScore: number;
  };
  lifestyleAnalysis: {
    values: Array<{ name: string; score: number; status: string }>;
  };
  matchingScore: {
    overall: number;
    categories: Array<{ name: string; score: number; weight: number }>;
    recommendation: string;
  };
  riskAssessment: {
    level: string;
    factors: Array<{ type: string; text: string }>;
    trustScore: number;
  };
}

export class PDFGenerator {
  private pdf: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private currentY: number;

  constructor() {
    this.pdf = new jsPDF('p', 'mm', 'a4');
    this.pageWidth = this.pdf.internal.pageSize.getWidth();
    this.pageHeight = this.pdf.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
  }

  // 添加新页面
  private addNewPage(): void {
    this.pdf.addPage();
    this.currentY = this.margin;
  }

  // 检查是否需要新页面
  private checkPageBreak(height: number): void {
    if (this.currentY + height > this.pageHeight - this.margin) {
      this.addNewPage();
    }
  }

  // 设置字体
  private setFont(size: number, style: 'normal' | 'bold' = 'normal'): void {
    this.pdf.setFontSize(size);
    this.pdf.setFont('helvetica', style);
  }

  // 添加标题
  private addTitle(text: string): void {
    this.checkPageBreak(20);
    this.setFont(18, 'bold');
    this.pdf.text(text, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 15;
  }

  // 添加副标题
  private addSubtitle(text: string): void {
    this.checkPageBreak(15);
    this.setFont(14, 'bold');
    this.pdf.text(text, this.margin, this.currentY);
    this.currentY += 10;
  }

  // 添加普通文本
  private addText(text: string, indent: number = 0): void {
    this.checkPageBreak(8);
    this.setFont(10);
    const lines = this.pdf.splitTextToSize(text, this.pageWidth - 2 * this.margin - indent);
    this.pdf.text(lines, this.margin + indent, this.currentY);
    this.currentY += lines.length * 5;
  }

  // 添加表格
  private addTable(headers: string[], rows: string[][]): void {
    const colWidth = (this.pageWidth - 2 * this.margin) / headers.length;
    const rowHeight = 8;
    
    this.checkPageBreak((rows.length + 1) * rowHeight);

    // 绘制表头
    this.setFont(10, 'bold');
    headers.forEach((header, index) => {
      this.pdf.rect(this.margin + index * colWidth, this.currentY, colWidth, rowHeight);
      this.pdf.text(header, this.margin + index * colWidth + 2, this.currentY + 5);
    });
    this.currentY += rowHeight;

    // 绘制数据行
    this.setFont(10);
    rows.forEach(row => {
      row.forEach((cell, index) => {
        this.pdf.rect(this.margin + index * colWidth, this.currentY, colWidth, rowHeight);
        this.pdf.text(cell, this.margin + index * colWidth + 2, this.currentY + 5);
      });
      this.currentY += rowHeight;
    });
    this.currentY += 5;
  }

  // 添加分隔线
  private addSeparator(): void {
    this.checkPageBreak(5);
    this.pdf.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 10;
  }

  // 添加评分条
  private addScoreBar(label: string, score: number, maxScore: number = 100): void {
    this.checkPageBreak(15);
    this.setFont(10);
    
    // 标签
    this.pdf.text(label, this.margin, this.currentY);
    
    // 分数
    this.pdf.text(`${score}/${maxScore}`, this.pageWidth - this.margin - 20, this.currentY);
    
    this.currentY += 5;
    
    // 进度条背景
    const barWidth = this.pageWidth - 2 * this.margin - 30;
    this.pdf.setFillColor(240, 240, 240);
    this.pdf.rect(this.margin, this.currentY, barWidth, 4, 'F');
    
    // 进度条填充
    const fillWidth = (score / maxScore) * barWidth;
    this.pdf.setFillColor(59, 130, 246); // 蓝色
    this.pdf.rect(this.margin, this.currentY, fillWidth, 4, 'F');
    
    this.currentY += 10;
  }

  // 生成报告
  public async generateReport(reportData: ReportData): Promise<void> {
    // 报告标题
    this.addTitle('相亲背景调查报告');
    this.addText(`生成时间: ${new Date().toLocaleString('zh-CN')}`, 0);
    this.addText(`调查对象: ${reportData.basicInfo.name}`, 0);
    this.currentY += 10;

    // 基本信息
    this.addSubtitle('一、基本信息');
    const basicInfoRows = [
      ['姓名', reportData.basicInfo.name, '年龄', `${reportData.basicInfo.age}岁`],
      ['性别', reportData.basicInfo.gender, '身高', reportData.basicInfo.height],
      ['体重', reportData.basicInfo.weight, '学历', reportData.basicInfo.education],
      ['职业', reportData.basicInfo.occupation, '月收入', reportData.basicInfo.monthlyIncome],
      ['房产', reportData.basicInfo.hasHouse, '车辆', reportData.basicInfo.hasCar],
      ['婚姻状况', reportData.basicInfo.maritalStatus, '', '']
    ];
    
    basicInfoRows.forEach(row => {
      if (row[0] && row[1]) {
        this.addText(`${row[0]}: ${row[1]}`, 10);
      }
      if (row[2] && row[3]) {
        this.addText(`${row[2]}: ${row[3]}`, 10);
      }
    });

    this.addSeparator();

    // 性格分析
    this.addSubtitle('二、性格特征分析');
    this.addText(`综合评分: ${reportData.personalityAnalysis.overallScore}分`, 0);
    this.currentY += 5;
    
    reportData.personalityAnalysis.traits.forEach(trait => {
      this.addScoreBar(trait.name, trait.value);
    });
    
    this.addText('综合评价:', 0);
    this.addText(reportData.personalityAnalysis.summary, 10);
    this.addSeparator();

    // 兴趣爱好分析
    this.addSubtitle('三、兴趣爱好分析');
    this.addText(`兴趣匹配度: ${reportData.interestAnalysis.compatibilityScore}%`, 0);
    this.currentY += 5;
    
    reportData.interestAnalysis.hobbies.forEach(hobby => {
      this.addScoreBar(hobby.name, hobby.value);
      this.addText(`详细: ${hobby.details.join(', ')}`, 20);
    });
    this.addSeparator();

    // 价值观和生活方式
    this.addSubtitle('四、价值观和生活方式');
    reportData.lifestyleAnalysis.values.forEach(value => {
      this.addScoreBar(value.name, value.score);
    });
    this.addSeparator();

    // 匹配评分
    this.addSubtitle('五、综合匹配评分');
    this.addText(`总体评分: ${reportData.matchingScore.overall}分`, 0);
    this.currentY += 5;
    
    reportData.matchingScore.categories.forEach(category => {
      this.addScoreBar(`${category.name} (权重${category.weight}%)`, category.score);
    });
    
    const recommendation = reportData.matchingScore.recommendation === 'highly_recommended' ? '强烈推荐' :
                          reportData.matchingScore.recommendation === 'recommended' ? '推荐' : '一般推荐';
    this.addText(`推荐结果: ${recommendation}`, 0);
    this.addSeparator();

    // 风险评估
    this.addSubtitle('六、风险评估');
    const riskLevel = reportData.riskAssessment.level === 'low' ? '低风险' :
                     reportData.riskAssessment.level === 'medium' ? '中等风险' : '高风险';
    this.addText(`风险等级: ${riskLevel}`, 0);
    this.addText(`信任度: ${reportData.riskAssessment.trustScore}%`, 0);
    this.currentY += 5;
    
    this.addText('风险因素:', 0);
    reportData.riskAssessment.factors.forEach(factor => {
      const prefix = factor.type === 'positive' ? '✓' : 
                    factor.type === 'negative' ? '✗' : '●';
      this.addText(`${prefix} ${factor.text}`, 10);
    });

    // 页脚
    this.currentY = this.pageHeight - 30;
    this.setFont(8);
    this.pdf.text('本报告由智能相亲调查系统生成，仅供参考', this.pageWidth / 2, this.currentY, { align: 'center' });
  }

  // 下载PDF
  public downloadPDF(filename: string = '相亲调查报告.pdf'): void {
    this.pdf.save(filename);
  }

  // 获取PDF Blob
  public getPDFBlob(): Blob {
    return this.pdf.output('blob');
  }
}

// 导出便捷函数
export const generateAndDownloadReport = async (reportData: ReportData, filename?: string): Promise<void> => {
  const generator = new PDFGenerator();
  await generator.generateReport(reportData);
  generator.downloadPDF(filename);
};

// 从DOM元素生成PDF（用于包含图表的报告）
export const generatePDFFromElement = async (
  elementId: string, 
  filename: string = '相亲调查报告.pdf'
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  try {
    // 配置html2canvas选项
    const canvas = await html2canvas(element, {
      scale: 2, // 提高清晰度
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // 计算缩放比例
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;
    
    // 居中放置
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;
    
    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('PDF生成失败:', error);
    throw new Error('PDF生成失败，请重试');
  }
};