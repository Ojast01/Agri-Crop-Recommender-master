import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, CheckCircle2, TrendingUp, Info, Download, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PredictionResult = ({ crop, confidence, onReset, t }) => {
  const resultRef = useRef(null);

  const downloadPDF = async () => {
    const element = resultRef.current;
    if (!element) return;

    try {
      // Temporarily hide elements that shouldn't be in the PDF
      const buttons = element.querySelectorAll('button');
      buttons.forEach(btn => btn.style.display = 'none');

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: document.body.classList.contains('light') ? '#f8fafc' : '#0a0a0a',
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`AgriSmart_${crop}_Report.pdf`);

      // Restore buttons
      buttons.forEach(btn => btn.style.display = 'flex');
    } catch (error) {
      console.error('PDF Generation failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto px-6 py-20"
    >
      <div 
        ref={resultRef}
        className="glass-card rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden"
      >
        {/* Success Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -z-10" />
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-2xl mb-8">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">{t.recommendedCrop}</h2>
          <h1 className="text-5xl md:text-6xl font-black mb-6 capitalize">{crop}</h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="text-xs text-gray-500 font-medium">{t.confidence}</div>
                <div className="text-lg font-bold">{confidence}%</div>
              </div>
            </div>
            <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <div className="text-xs text-gray-500 font-medium">{t.yieldPotential}</div>
                <div className="text-lg font-bold">High</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-3xl p-8 mb-10 text-left border border-white/5">
            <h3 className="font-semibold mb-3">{t.whyThisCrop}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Based on your soil's Nitrogen and pH levels, combined with the current rainfall patterns, 
              <span className="font-medium text-primary"> {crop} </span> has the highest probability of successful growth 
              and maximum yield in these conditions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={downloadPDF}
              className="btn-primary flex items-center gap-2 group w-full sm:w-auto"
            >
              <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              {t.downloadPDF}
            </button>
            <button
              onClick={onReset}
              className="btn-outline flex items-center gap-2 group w-full sm:w-auto"
            >
              <RefreshCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
              {t.tryAgain}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PredictionResult;
