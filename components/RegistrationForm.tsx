import React, { useState } from 'react';

const BACKEND_API_URL = "https://b.imanakhmedovna.uz/users";
const TELEGRAM_BOT_USERNAME = "ImanAkhmedovna_bot";

interface RegistrationFormProps {
  onSubmit?: (data: { name: string; phone: string }) => void;
  isModal?: boolean;
  onClose?: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, isModal = false, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (!value.startsWith('998')) {
      if (value.length > 0) {
        value = '998' + value;
      }
    }
    
    if (value.length > 12) {
      value = value.slice(0, 12);
    }
    
    setFormData({ 
      ...formData, 
      phone: value 
    });
    
    e.target.value = formatPhoneNumber(value);
  };

  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '+998';
    
    let formatted = '+' + phone.slice(0, 3);
    if (phone.length > 3) {
      formatted += ' ' + phone.slice(3, 5);
    }
    if (phone.length > 5) {
      formatted += ' ' + phone.slice(5, 8);
    }
    if (phone.length > 8) {
      formatted += ' ' + phone.slice(8, 12);
    }
    return formatted;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Backendga ma'lumotlarni jo'natish
      const backendPromise = fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.name,
          phone_number: formData.phone,
          address: "b", // Doim "b" qiymati
          timestamp: new Date().toISOString(),
        })
      }).catch(err => {
        console.error('Backend yuborishda xatolik:', err);
      });

      // Telegram botga yuborish
      const telegramUrl = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(formData.phone)}`;
      window.open(telegramUrl, '_blank');

      // Orqada backend ishlashini kutamiz
      backendPromise.then(() => {
        console.log('Ma\'lumotlar backendga muvaffaqiyatli yuborildi');
      });

      // Agar tashqaridan onSubmit funksiya kelsa, uni chaqiramiz
      if (onSubmit) {
        onSubmit(formData);
      }

      // Modal bo'lsa yopamiz
      if (isModal && onClose) {
        setTimeout(() => {
          onClose();
          setIsLoading(false);
          setFormData({ name: '', phone: '' });
        }, 1000);
      } else {
        setIsLoading(false);
        setFormData({ name: '', phone: '' });
      }

    } catch (error) {
      console.error('Xatolik:', error);
      setIsLoading(false);
      
      // Xatolik bo'lsa ham Telegram botga ochamiz
      const telegramUrl = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(formData.phone)}`;
      window.open(telegramUrl, '_blank');
    }
  };

  return (
    <div className={`max-w-md mx-auto border-3 border-purple-400/50 rounded-3xl p-6 md:p-8 mb-6 bg-gradient-to-br from-purple-500/10 via-purple-600/10 to-purple-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(139,92,246,0.3)] ${isModal ? 'z-[1000]' : ''}`}>
      {isModal && onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-purple-300 transition-colors"
        >
          &times;
        </button>
      )}
      
      <h3 className="text-2xl md:text-3xl font-black text-center mb-6 bg-gradient-to-r from-purple-300 to-purple-400 text-transparent bg-clip-text">
        KURSGA QATNASHISH UCHUN<br/>RO'YXATDAN O'TING:
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-2 text-white">Ismingizni kiriting:</label>
          <input
            type="text"
            placeholder="Ismingiz"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border-2 border-purple-400/30 focus:border-purple-400 outline-none transition-all hover:border-purple-300 backdrop-blur-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2 text-white">Telefon raqamingiz:</label>
          <div className="flex gap-2">
            <select className="px-3 py-3 rounded-xl bg-purple-700/50 text-white border-2 border-purple-400/50 hover:border-purple-400 transition-all backdrop-blur-sm" disabled>
              <option>UZ</option>
            </select>
            <input
              type="tel"
              placeholder="+998"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white border-2 border-purple-400/30 focus:border-purple-400 outline-none transition-all hover:border-purple-300 backdrop-blur-sm"
              value={formatPhoneNumber(formData.phone)}
              onChange={handlePhoneChange}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] text-white font-black py-6 rounded-full text-xl md:text-2xl shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-[#7c3aed] hover:via-[#6d28d9] hover:to-[#5b21b6]'}`}
        >
          {isLoading ? 'Yuborilmoqda...' : 'Ro\'yxatdan o\'tish'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;