export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export class FormValidator {
  private rules: ValidationRules;
  private errors: ValidationErrors = {};

  constructor(rules: ValidationRules) {
    this.rules = rules;
  }

  validate(data: Record<string, any>): { isValid: boolean; errors: ValidationErrors } {
    this.errors = {};

    for (const [field, rule] of Object.entries(this.rules)) {
      const value = data[field];
      const error = this.validateField(field, value, rule);
      
      if (error) {
        this.errors[field] = error;
      }
    }

    return {
      isValid: Object.keys(this.errors).length === 0,
      errors: { ...this.errors }
    };
  }

  validateField(field: string, value: any, rule: ValidationRule): string | null {
    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${this.getFieldDisplayName(field)}是必填项`;
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }

    // String length validations
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return `${this.getFieldDisplayName(field)}至少需要${rule.minLength}个字符`;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        return `${this.getFieldDisplayName(field)}不能超过${rule.maxLength}个字符`;
      }
    }

    // Pattern validation
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return `${this.getFieldDisplayName(field)}格式不正确`;
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        return customError;
      }
    }

    return null;
  }

  private getFieldDisplayName(field: string): string {
    const fieldNames: Record<string, string> = {
      phone: '手机号',
      password: '密码',
      confirmPassword: '确认密码',
      realName: '真实姓名',
      verificationCode: '验证码',
      targetName: '目标姓名',
      age: '年龄',
      occupation: '职业',
      education: '教育背景',
      location: '所在地区',
      email: '邮箱地址'
    };

    return fieldNames[field] || field;
  }
}

// Common validation rules
export const commonRules = {
  phone: {
    required: true,
    pattern: /^1[3-9]\d{9}$/,
    custom: (value: string) => {
      if (value && !/^1[3-9]\d{9}$/.test(value)) {
        return '请输入正确的手机号码';
      }
      return null;
    }
  },

  password: {
    required: true,
    minLength: 6,
    maxLength: 20,
    custom: (value: string) => {
      if (value && value.length < 6) {
        return '密码至少需要6位字符';
      }
      if (value && !/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
        return '密码必须包含字母和数字';
      }
      return null;
    }
  },

  confirmPassword: (originalPassword: string) => ({
    required: true,
    custom: (value: string) => {
      if (value !== originalPassword) {
        return '两次输入的密码不一致';
      }
      return null;
    }
  }),

  realName: {
    required: true,
    minLength: 2,
    maxLength: 10,
    pattern: /^[\u4e00-\u9fa5a-zA-Z\s]+$/,
    custom: (value: string) => {
      if (value && !/^[\u4e00-\u9fa5a-zA-Z\s]+$/.test(value)) {
        return '姓名只能包含中文、英文和空格';
      }
      return null;
    }
  },

  verificationCode: {
    required: true,
    pattern: /^\d{6}$/,
    custom: (value: string) => {
      if (value && !/^\d{6}$/.test(value)) {
        return '请输入6位数字验证码';
      }
      return null;
    }
  },

  targetName: {
    required: true,
    minLength: 2,
    maxLength: 20,
    pattern: /^[\u4e00-\u9fa5a-zA-Z\s]+$/
  },

  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return '请输入正确的邮箱地址';
      }
      return null;
    }
  },

  age: {
    custom: (value: number) => {
      if (value && (value < 18 || value > 100)) {
        return '年龄必须在18-100岁之间';
      }
      return null;
    }
  }
};

// Hook for form validation
import { useState, useCallback } from 'react';

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const validator = new FormValidator(rules);

  const validateForm = useCallback((data: Record<string, any>) => {
    const result = validator.validate(data);
    setErrors(result.errors);
    return result.isValid;
  }, [validator]);

  const validateField = useCallback((field: string, value: any) => {
    const rule = rules[field];
    if (!rule) return;

    const error = validator.validateField(field, value, rule);
    setErrors(prev => ({
      ...prev,
      [field]: error || ''
    }));

    return !error;
  }, [validator, rules]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  }, []);

  return {
    errors,
    validateForm,
    validateField,
    clearErrors,
    clearFieldError,
    hasErrors: Object.values(errors).some(error => error !== '')
  };
};