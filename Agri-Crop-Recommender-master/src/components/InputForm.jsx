import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, CloudRain, FlaskConical, Beaker, Zap, Activity } from 'lucide-react';
import { cn } from '../utils/cn';

const InputField = ({ label, icon: Icon, name, value, onChange, min, max, unit, step = 1 }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="w-20 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-right text-sm text-primary font-mono focus:outline-none focus:border-primary/50"
        />
        <span className="text-xs text-gray-500 font-medium">{unit}</span>
      </div>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
    />
  </div>
);

const InputForm = ({ onSubmit, isLoading, t }) => {
  const [formData, setFormData] = useState({
    N: 50,
    P: 50,
    K: 50,
    temperature: 25,
    humidity: 50,
    ph: 6.5,
    rainfall: 100
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto px-6 py-20"
    >
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full" />
        
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl font-bold mb-4">{t.predict}</h2>
          <p className="text-gray-400">Fill in the soil and climate parameters to get the best recommendation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <FlaskConical className="w-4 h-4" /> {t.soilNutrients}
              </h3>
              <InputField label={t.nitrogen} icon={Zap} name="N" value={formData.N} onChange={handleChange} min={0} max={140} unit="mg/kg" />
              <InputField label={t.phosphorus} icon={Beaker} name="P" value={formData.P} onChange={handleChange} min={5} max={145} unit="mg/kg" />
              <InputField label={t.potassium} icon={Activity} name="K" value={formData.K} onChange={handleChange} min={5} max={205} unit="mg/kg" />
            </div>

            <div className="space-y-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <CloudRain className="w-4 h-4" /> {t.climateSoil}
              </h3>
              <InputField label={t.temperature} icon={Thermometer} name="temperature" value={formData.temperature} onChange={handleChange} min={8} max={45} unit="°C" />
              <InputField label={t.humidity} icon={Droplets} name="humidity" value={formData.humidity} onChange={handleChange} min={14} max={100} unit="%" />
              <InputField label={t.phLevel} icon={FlaskConical} name="ph" value={formData.ph} onChange={handleChange} min={3.5} max={10} unit="pH" step={0.1} />
              <InputField label={t.rainfall} icon={CloudRain} name="rainfall" value={formData.rainfall} onChange={handleChange} min={20} max={300} unit="mm" />
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "btn-primary w-full md:w-auto md:min-w-[300px] flex items-center justify-center gap-3 py-4",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>{t.predict}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default InputForm;
