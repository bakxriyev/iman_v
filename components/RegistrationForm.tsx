import React, { useState } from 'react';

interface RegistrationFormProps {
  onSubmit?: (data: { name: string; phone: string }) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', phone: '+998' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div className="max-w-md mx-auto border-3 border-purple-400/50 rounded-3xl p-6 md:p-8 mb-6 bg-gradient-to-br from-purple-500/10 via-purple-600/10 to-purple-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(139,92,246,0.3)]">
      <h3 className="text-xl md:text-2xl font-black text-center mb-6 bg-gradient-to-r from-purple-300 to-purple-400 text-transparent bg-clip-text">
        KURSGA QATNASHISH UCHUN<br/>RO'YXATDAN O'TING:
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Ismingizni kiriting:</label>
          <input
            type="text"
            placeholder="Ismingiz"
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 border-2 border-purple-200 focus:border-purple-400 outline-none transition-all hover:border-purple-300"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2">Telefon raqamingiz:</label>
          <div className="flex gap-2">
            <select className="px-3 py-3 rounded-xl bg-gray-600 text-white border-2 border-purple-300 hover:border-purple-400 transition-all">
              <option>UZ</option>
            </select>
            <input
              type="tel"
              placeholder="+998"
              className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-800 border-2 border-purple-200 focus:border-purple-400 outline-none transition-all hover:border-purple-300"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:via-[#6d28d9] hover:to-[#5b21b6] text-white font-black py-6 rounded-full text-xl md:text-2xl shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
        >
          Ro'yxatdan o'tish
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;