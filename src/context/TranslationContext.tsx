//import libaries
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'TH' | 'EN';

type Translations = {
  // Common
  email: string;
  loading: string;
  
  // Home page
  viewBooking: string;
  history: string;
  services: string;
  promotions: string;
  loadingProfile: string;
  
  // Booking pages
  yourBookings: string;
  makeBooking: string;
  noBookings: string;
  loadingBookings: string;
  loadingHistory: string;
  
  // Booking form
  selectPackage: string;
  selectBranch: string;
  selectDate: string;
  selectTime: string;
  booking: string;
  chooseBranch: string;
  chooseService: string;
  choosePromotion: string;
  selectService: string;
  selectPromotion: string;
  voucherCode: string;
  clear: string;
  enterVoucherCode: string;
  confirmBooking: string;
  creating: string;
  optional: string;
  
  // Booking details
  package: string;
  branch: string;
  date: string;
  pending: string;
  succeeded: string;
  cancelled: string;
  completed: string;
  
  // Actions
  delete: string;
  edit: string;
  back: string;
  
  // Alerts
  areYouSureDelete: string;
  cantChangeDecision: string;
  yesDeleteIt: string;
  noKeepIt: string;
  bookingCancelled: string;
  bookingDeleted: string;
  error: string;
  failedToCancel: string;
  
  // History
  noHistory: string;
  // Header
  headerTitle: string;
  headerSubtitle: string;
};

const translations: Record<Language, Translations> = {
  EN: {
    // Common
    email: 'Email',
    loading: 'Loading...',
    
    // Home page
    viewBooking: 'View Booking',
    history: 'History',
    services: 'Services',
    promotions: 'Promotions',
    loadingProfile: 'Loading profile...',
    
    // Booking pages
    yourBookings: 'Your Bookings',
    makeBooking: 'Make Booking',
    noBookings: 'You have no bookings',
    loadingBookings: 'Loading bookings...',
    loadingHistory: 'Loading history...',
    
    // Booking form
    selectPackage: 'Select Package',
    selectBranch: 'Select branch',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    booking: 'Booking',
    chooseBranch: 'Choose your branch',
    chooseService: 'Choose your service',
    choosePromotion: 'Choose your promotion',
    selectService: 'Select service',
    selectPromotion: 'Select promotion',
    voucherCode: 'Voucher Code',
    clear: 'Clear',
    enterVoucherCode: 'Enter voucher code',
    confirmBooking: 'Confirm Booking',
    creating: 'Creating...',
    optional: 'Optional',
    
    // Booking details
    package: 'Package',
    branch: 'Branch',
    date: 'Date',
    pending: 'Pending',
    succeeded: 'Succeeded',
    cancelled: 'Cancelled',
    completed: 'Completed',
    
    // Actions
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    
    // Alerts
    areYouSureDelete: 'Are you sure to delete the bookings?',
    cantChangeDecision: "You can't change your decision later.",
    yesDeleteIt: 'Yes, delete it!',
    noKeepIt: 'No, keep it',
    bookingCancelled: 'Cancelled!',
    bookingDeleted: 'Your booking has been cancelled.',
    error: 'Error!',
    failedToCancel: 'Failed to cancel booking. Please try again.',
    
    // History
    noHistory: 'No History',
    // Header
    headerTitle: 'GETTHAWHA',
    headerSubtitle: 'THAI MASSAGE',
  },
  
  TH: {
    // Common
    email: 'อีเมล',
    loading: 'กำลังโหลด...',
    
    // Home page
    viewBooking: 'ดูการจอง',
    history: 'ประวัติ',
    services: 'บริการ',
    promotions: 'โปรโมชัน',
    loadingProfile: 'กำลังโหลดโปรไฟล์...',
    
    // Booking pages
    yourBookings: 'การจองของคุณ',
    makeBooking: 'จองเลย',
    noBookings: 'คุณไม่มีการจอง',
    loadingBookings: 'กำลังโหลดการจอง...',
    loadingHistory: 'กำลังโหลดประวัติ...',
    
    // Booking form
    selectPackage: 'เลือกแพ็คเกจ',
    selectBranch: 'เลือกสาขา',
    selectDate: 'เลือกวันที่',
    selectTime: 'เลือกเวลา',
    booking: 'การจอง',
    chooseBranch: 'เลือกสาขาของคุณ',
    chooseService: 'เลือกบริการของคุณ',
    choosePromotion: 'เลือกโปรโมชันของคุณ',
    selectService: 'เลือกบริการ',
    selectPromotion: 'เลือกโปรโมชัน',
    voucherCode: 'รหัสส่วนลด',
    clear: 'ล้าง',
    enterVoucherCode: 'กรอกรหัสส่วนลด',
    confirmBooking: 'ยืนยันการจอง',
    creating: 'กำลังสร้าง...',
    optional: 'ไม่บังคับ',
    
    // Booking details
    package: 'แพ็คเกจ',
    branch: 'สาขา',
    date: 'วันที่',
    pending: 'รอดำเนินการ',
    succeeded: 'เสร็จสิ้น',
    cancelled: 'ยกเลิก',
    completed: 'เสร็จสิ้น',
    
    // Actions
    delete: 'ลบ',
    edit: 'แก้ไข',
    back: 'กลับ',
    
    // Alerts
    areYouSureDelete: 'คุณแน่ใจที่จะลบการจองนี้?',
    cantChangeDecision: 'คุณไม่สามารถเปลี่ยนใจในภายหลังได้',
    yesDeleteIt: 'ใช่, ลบเลย!',
    noKeepIt: 'ไม่, เก็บไว้',
    bookingCancelled: 'ยกเลิกแล้ว!',
    bookingDeleted: 'การจองของคุณถูกยกเลิกแล้ว',
    error: 'ข้อผิดพลาด!',
    failedToCancel: 'ไม่สามารถยกเลิกการจองได้ กรุณาลองใหม่อีกครั้ง',
    
    // History
    noHistory: 'ไม่มีประวัติ',
    // Header
    headerTitle: 'เก็ดตะหว๋า',
    headerSubtitle: 'นวดแผนไทย',
  },
};

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  // Initialize language from localStorage or default to 'EN'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('app-language');
    return (savedLanguage as Language) || 'EN';
  });

  // Save language to localStorage whenever it changes
  const updateLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('app-language', newLanguage);
  };

  const value = {
    language,
    setLanguage: updateLanguage,
    t: translations[language],
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};