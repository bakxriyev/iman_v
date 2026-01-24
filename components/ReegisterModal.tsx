import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string }) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '' 
  });
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: '+998',
    name: 'Uzbekistan',
    flag: '🇺🇿'
  });
  const [isLoading, setIsLoading] = useState(false);

  const countries: Country[] = [
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: '+998', name: 'Uzbekistan', flag: '🇺🇿' },
    { code: '+992', name: 'Tajikistan', flag: '🇹🇯' },
    { code: '+993', name: 'Turkmenistan', flag: '🇹🇲' },
    { code: '+996', name: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+7', name: 'Kazakhstan', flag: '🇰🇿' },
    { code: '+90', name: 'Turkey', flag: '🇹🇷' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+98', name: 'Iran', flag: '🇮🇷' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+93', name: 'Afghanistan', flag: '🇦🇫' },
    { code: '+994', name: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+995', name: 'Georgia', flag: '🇬🇪' },
    { code: '+375', name: 'Belarus', flag: '🇧🇾' },
    { code: '+380', name: 'Ukraine', flag: '🇺🇦' },
    { code: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    setIsLoading(true);
    
    try {
      // Telefon raqamini tozalash
      const cleanedPhone = formData.phone.replace(/\D/g, '');
      const fullPhone = selectedCountry.code + cleanedPhone;
      
      await onSubmit({
        name: formData.name.trim(),
        phone: fullPhone
      });
      
      // Formani tozalash
      setFormData({ name: '', phone: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Faqat raqamlar qolsin
    if (value.length > 15) value = value.slice(0, 15);
    
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    // Agar telefon raqami allaqachon kiritilgan bo'lsa, davlat kodini o'zgartirish
    if (formData.phone) {
      // Telefon raqamini faqat raqamlar qilish
      const numbersOnly = formData.phone.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, phone: numbersOnly }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Orqa fon */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal oynasi */}
      <div className="relative bg-gradient-to-br from-[#1a0b2e] via-[#2d1b47] to-[#1a0b2e] rounded-3xl w-full max-w-md border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 animate-fadeIn">
        {/* Yopish tugmasi */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-gradient-to-br from-purple-600 to-purple-800 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform z-10 shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Modal kontenti */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2 bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
            KURSGA RO'YXATDAN O'TISH
          </h2>
          
          <p className="text-center text-gray-300 mb-6 text-sm">
            Barcha maydonlarni to'ldiring va kursga kirish uchun ro'yxatdan o'ting
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ism maydoni */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Ismingizni kiriting:
              </label>
              <input
                type="text"
                placeholder="Ismingiz"
                className="w-full px-4 py-4 rounded-xl bg-white/5 border-2 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all hover:border-purple-500/40"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                disabled={isLoading}
              />
            </div>
            
            {/* Telefon raqami maydoni */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Telefon raqamingiz:
              </label>
              
              {/* Davlat tanlash */}
              <div className="relative mb-3">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border-2 border-purple-500/20">
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <span className="text-white">{selectedCountry.name}</span>
                  <span className="text-gray-400 ml-auto">{selectedCountry.code}</span>
                </div>
                
                {/* Davlatlar ro'yxati */}
                <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-[#1a0b2e] border-2 border-purple-500/30 rounded-xl shadow-2xl z-20 hidden group-hover:block hover:block">
                  <div className="p-2">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        <span className="text-2xl">{country.flag}</span>
                        <div className="flex-1">
                          <div className="text-white">{country.name}</div>
                          <div className="text-gray-400 text-sm">{country.code}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Telefon raqami input */}
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-24">
                  <div className="h-full px-4 py-4 rounded-xl bg-white/5 border-2 border-purple-500/20 flex items-center justify-center">
                    <span className="text-white">{selectedCountry.code}</span>
                  </div>
                </div>
                <input
                  type="tel"
                  placeholder="Raqamingizni kiriting"
                  className="flex-1 px-4 py-4 rounded-xl bg-white/5 border-2 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all hover:border-purple-500/40"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* Submit tugmasi */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:via-[#6d28d9] hover:to-[#5b21b6] text-white font-black py-5 rounded-full text-lg shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Jo'natilmoqda...
                </div>
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </button>
            
            {/* Qo'shimcha matn */}
            <p className="text-center text-gray-400 text-sm">
              Ro'yxatdan o'tganingizdan so'ng, telegram botimizga avtomatik ravishda /start jo'natiladi
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;