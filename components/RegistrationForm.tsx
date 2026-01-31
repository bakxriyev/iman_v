import React, { useState, useRef, useEffect } from 'react';

const BACKEND_API_URL = "https://b.kardioclinic.uz/userscha";
const TELEGRAM_BOT_USERNAME = "ImanAkhmedovna_bot";
const BACKEND_TIMEOUT = 2000; // 2 sekund

const COUNTRIES = [
  { code: '998', flag: '🇺🇿', name: "O'zbekiston" },
  { code: '7', flag: '🇷🇺', name: "Rossiya" },
  { code: '7', flag: '🇰🇿', name: "Qozog'iston" },
  { code: '992', flag: '🇹🇯', name: "Tojikiston" },
  { code: '993', flag: '🇹🇲', name: "Turkmaniston" },
  { code: '996', flag: '🇰🇬', name: "Qirg'iziston" },
  { code: '994', flag: '🇦🇿', name: "Ozarbayjon" },
  { code: '90', flag: '🇹🇷', name: "Turkiya" },
  { code: '1', flag: '🇺🇸', name: "AQSh" },
  { code: '44', flag: '🇬🇧', name: "Buyuk Britaniya" },
];

const RegistrationForm: React.FC<{ isModal?: boolean; onClose?: () => void }> = ({ isModal = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '998',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [phoneInputValue, setPhoneInputValue] = useState('');
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = COUNTRIES.find(c => c.code === formData.countryCode) || COUNTRIES[0];

  useEffect(() => {
    if (isModal && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isModal]);

  useEffect(() => {
    setPhoneInputValue('');
    setFormData(prev => ({ ...prev, phone: '' }));
  }, [formData.countryCode]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/\D/g, '');
    setPhoneInputValue(numbersOnly);
    setFormData({ ...formData, phone: numbersOnly });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setFormData({ 
      ...formData, 
      countryCode: code,
      phone: ''
    });
    setPhoneInputValue('');
    
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert("Iltimos, ismingizni kiriting");
      nameInputRef.current?.focus();
      return;
    }

    if (!formData.phone || formData.phone.length < 7) {
      alert("Iltimos, to'liq telefon raqamini kiriting (kamida 7 raqam)");
      phoneInputRef.current?.focus();
      return;
    }

    setIsLoading(true);

    const fullPhone = formData.countryCode + formData.phone;
    const userData = {
      full_name: formData.name.trim(),
      phone_number: fullPhone,
      address: "b"
    };

    // 1. Avval telegram botga o'tishni ochamiz (ASOSIY QISMI)
    const telegramUrl = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=site1`;
    const telegramWindow = window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    
    // 2. Keyin backendga ma'lumot yuborishga urinamiz (LEKIN HECH KUTMAYMIZ)
    const sendToBackend = async () => {
      try {
        // Timeout bilan so'rov yuboramiz
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), BACKEND_TIMEOUT)
        );

        const fetchPromise = fetch(BACKEND_API_URL, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(userData),
        });

        // Faqat 2 soniya kutamiz, keyin davom etamiz
        await Promise.race([fetchPromise, timeoutPromise]);
        
        // Agar vaqt ichida javob kelsa
        const response = await fetchPromise;
        if (response.ok) {
          console.log('Ma\'lumotlar backendga muvaffaqiyatli yuborildi');
        }
      } catch (error) {
        // Xato bo'lsa ham, hech narsa qilmaymiz (konsolga yozamiz)
        console.log('Backend xatosi (bu foydalanuvchi uchun muhim emas):', error);
      }
    };

    // Backendga yuborishni parallel bajarish
    sendToBackend();

    // 3. Formani tozalash va modalni yopish
    setTimeout(() => {
      setFormData({ name: '', phone: '', countryCode: '998' });
      setPhoneInputValue('');
      setIsLoading(false);
      
      if (isModal && onClose) {
        onClose();
      }
      
      // Telegram oynasiga focus qilish (agar foydalanuvchi uni yopmagan bo'lsa)
      if (telegramWindow && !telegramWindow.closed) {
        telegramWindow.focus();
      }
    }, 500);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      phoneInputRef.current?.focus();
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className={`max-w-md mx-auto border-3 border-purple-400/50 rounded-3xl p-6 md:p-8 mb-6 bg-gradient-to-br from-purple-500/10 via-purple-600/10 to-purple-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(139,92,246,0.3)] relative ${isModal ? 'z-[1000]' : ''}`}>
      
      {isModal && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-purple-300 transition-colors"
        >
          ×
        </button>
      )}

      <h3 className="text-2xl md:text-3xl font-black text-center mb-6 bg-gradient-to-r from-purple-300 to-purple-400 text-transparent bg-clip-text">
        KURSGA QATNASHISH UCHUN<br/>RO'YXATDAN O'TING:
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Ismingiz"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border-2 border-purple-400/30 focus:border-purple-400 outline-none transition-all hover:border-purple-300 backdrop-blur-sm"
            value={formData.name}
            onChange={handleNameChange}
            required
            disabled={isLoading}
            onKeyDown={handleNameKeyDown}
          />
        </div>

        <div>
          <div className="flex rounded-xl overflow-hidden border-2 border-purple-400/30 focus-within:border-purple-400">
            
            <select
              value={formData.countryCode}
              onChange={handleCountryChange}
              disabled={isLoading}
              className="px-3 py-3 bg-purple-700/60 text-white border-r border-purple-400/40 focus:outline-none cursor-pointer min-w-[100px] appearance-none"
            >
              {COUNTRIES.map((country) => (
                <option key={`${country.code}-${country.name}`} value={country.code}>
                  {country.flag} +{country.code}
                </option>
              ))}
            </select>
            
            <input
              ref={phoneInputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Raqamingiz"
              className="flex-1 px-4 py-3 bg-white/10 text-white placeholder-white/50 focus:outline-none"
              value={phoneInputValue}
              onChange={handlePhoneChange}
              required
              disabled={isLoading}
              onKeyDown={handlePhoneKeyDown}
              maxLength={12}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] text-white font-black py-6 rounded-full text-xl md:text-2xl shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Telegramga o\'tilmoqda...' : "Ro'yxatdan o'tish"}
        </button>
      </form>
      
   
    </div>
  );
};

export default RegistrationForm;