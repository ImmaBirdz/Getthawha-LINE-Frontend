import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTranslation } from './TranslationContext';

// Initialize SweetAlert with React content
const MySwal = withReactContent(Swal);

// Alert context interface
interface AlertContextType {
  // Warning alerts
  showIncompleteDataWarning: () => void;
  showInvalidDateWarning: () => void;
  showInvalidTimeWarning: () => void;
  showBookingConflictError: () => void;
  
  // Confirmation alerts
  showInvalidVoucherConfirmation: () => Promise<boolean>;
  showDeleteBookingConfirmation: () => Promise<boolean>;
  
  // Success alerts
  showBookingSuccessAlert: () => Promise<void>;
  showBookingDeletedAlert: () => void;
  
  // Error alerts
  showBookingErrorAlert: () => void;
  showDeleteErrorAlert: () => void;
  
  // Custom alert with existing styles
  showCustomAlert: (config: AlertConfig) => Promise<any>;
}

// Alert configuration interface
interface AlertConfig {
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'question';
  showCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
}

// Alert context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Alert provider component
export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language, t } = useTranslation();

  // Common styles based on existing alerts
  const getCommonStyles = () => ({
    confirmButtonColor: "#7E4300",
    cancelButtonColor: "#7E4300",
  });

  const getTitleElement = (text: string) => (
    <div className={language === 'TH' ? 'font-athiti font-black text-[#7E4300] text-lg' : 'font-tiroTamil text-[#7E4300] text-lg'}>
      {text}
    </div>
  );

  const getContentElement = (text: string) => (
    <div className={language === 'TH' ? 'font-athiti font-black text-[#6B4423] text-sm' : 'font-tiroTamil text-[#6B4423] text-sm'}>
      {text}
    </div>
  );

  const getButtonElement = (text: string) => (
    <span className={language === 'TH' ? 'font-athiti font-black' : 'font-tiroTamil'}>
      {text}
    </span>
  );

  // Warning alerts
  const showIncompleteDataWarning = () => {
    MySwal.fire({
      title: getTitleElement(language === 'TH' ? 'ข้อมูลไม่ครบถ้วน' : 'Incomplete Information'),
      html: getContentElement(language === 'TH' ? 'กรุณากรอกข้อมูลให้ครบถ้วน และเลือกบริการหรือโปรโมชัน' : 'Please fill in all required fields. Choose either a service or promotion.'),
      icon: "warning",
      ...getCommonStyles(),
      confirmButtonText: getButtonElement('OK')
    });
  };

  const showInvalidDateWarning = () => {
    MySwal.fire({
      title: getTitleElement(language === 'TH' ? 'วันที่ไม่ถูกต้อง' : 'Invalid Date'),
      html: getContentElement(language === 'TH' ? 'ไม่สามารถจองในวันที่ผ่านมาแล้วได้ กรุณาเลือกวันที่และเวลาในอนาคต' : 'Cannot book on past dates. Please select a future date and time.'),
      icon: "warning",
      ...getCommonStyles(),
      confirmButtonText: getButtonElement('OK')
    });
  };

  const showInvalidTimeWarning = () => {
    MySwal.fire({
      title: getTitleElement(language === 'TH' ? 'เวลาไม่ถูกต้อง' : 'Invalid Time'),
      html: getContentElement(language === 'TH' ? 'กรุณาเลือกเวลาระหว่าง 08:00 - 21:30 เท่านั้น' : 'Please select time between 08:00 - 21:30 only'),
      icon: "warning",
      ...getCommonStyles(),
      confirmButtonText: getButtonElement('OK')
    });
  };

  const showBookingConflictError = () => {
    MySwal.fire({
      title: getTitleElement(language === 'TH' ? 'เวลาจองซ้ำซ้อน' : 'Booking Conflict'),
      html: getContentElement(t.conflictBookingNote),
      icon: "error",
      ...getCommonStyles(),
      confirmButtonText: getButtonElement('OK')
    });
  };

  // Confirmation alerts
  const showInvalidVoucherConfirmation = async (): Promise<boolean> => {
    const result = await MySwal.fire({
      title: getTitleElement(language === 'TH' ? 'รหัสส่วนลดไม่ถูกต้อง' : 'Invalid Voucher Code'),
      html: getContentElement(language === 'TH' ? 'คุณต้องการทำการจองโดยไม่ใช้รหัสส่วนลดหรือไม่?' : 'Do you want to continue booking without voucher?'),
      icon: "question",
      showCancelButton: true,
      ...getCommonStyles(),
      confirmButtonText: getButtonElement(language === 'TH' ? 'ดำเนินการต่อ' : 'Continue'),
      cancelButtonText: getButtonElement(language === 'TH' ? 'ยกเลิก' : 'Cancel')
    });

    return result.isConfirmed;
  };

  const showDeleteBookingConfirmation = async (): Promise<boolean> => {
    const result = await MySwal.fire({
      title: getTitleElement(t.areYouSureDelete),
      html: getContentElement(t.cantChangeDecision),
      icon: "warning",
      showCancelButton: true,
      ...getCommonStyles(),
      confirmButtonText: getButtonElement(t.yesDeleteIt),
      cancelButtonText: getButtonElement(t.noKeepIt)
    });

    return result.isConfirmed;
  };

  // Success alerts
  const showBookingSuccessAlert = async (): Promise<void> => {
    await MySwal.fire({
      title: getTitleElement(language === 'TH' ? 'จองเสร็จสิ้น!' : 'Booking Created!'),
      html: getContentElement(language === 'TH' ? 'การจองของคุณถูกสร้างเรียบร้อยแล้ว' : 'Your booking has been created successfully'),
      icon: "success",
      ...getCommonStyles(),
      confirmButtonText: getButtonElement('OK')
    });
  };

  const showBookingDeletedAlert = () => {
    MySwal.fire({
      title: getTitleElement(t.bookingCancelled),
      html: getContentElement(t.bookingDeleted),
      icon: "success",
      ...getCommonStyles(),
      confirmButtonText: getButtonElement('OK')
    });
  };

  // Error alerts
  const showBookingErrorAlert = () => {
    MySwal.fire({
      title: getTitleElement(language === 'TH' ? 'เกิดข้อผิดพลาด!' : 'Error!'),
      html: getContentElement(language === 'TH' ? 'ไม่สามารถสร้างการจองได้ กรุณาลองใหม่อีกครั้ง' : 'Failed to create booking. Please try again.'),
      icon: "error",
      ...getCommonStyles(),
      confirmButtonText: getButtonElement('OK')
    });
  };

  const showDeleteErrorAlert = () => {
    MySwal.fire({
      title: getTitleElement(t.error),
      html: getContentElement(t.failedToCancel),
      icon: "error",
      ...getCommonStyles(),
      confirmButtonText: getButtonElement('OK')
    });
  };

  // Custom alert with existing styles
  const showCustomAlert = async (config: AlertConfig): Promise<any> => {
    const alertConfig: any = {
      title: getTitleElement(config.title),
      icon: config.type,
      ...getCommonStyles(),
      confirmButtonText: getButtonElement(config.confirmText || 'OK')
    };

    if (config.message) {
      alertConfig.html = getContentElement(config.message);
    }

    if (config.showCancel) {
      alertConfig.showCancelButton = true;
      alertConfig.cancelButtonText = getButtonElement(config.cancelText || (language === 'TH' ? 'ยกเลิก' : 'Cancel'));
    }

    return await MySwal.fire(alertConfig);
  };

  const contextValue: AlertContextType = {
    showIncompleteDataWarning,
    showInvalidDateWarning,
    showInvalidTimeWarning,
    showBookingConflictError,
    showInvalidVoucherConfirmation,
    showDeleteBookingConfirmation,
    showBookingSuccessAlert,
    showBookingDeletedAlert,
    showBookingErrorAlert,
    showDeleteErrorAlert,
    showCustomAlert
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to use alert context
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export default AlertContext;
