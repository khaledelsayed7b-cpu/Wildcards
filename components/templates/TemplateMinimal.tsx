'use client';

import { Provider } from '@/types/provider';
import Image from 'next/image';
import { MapPin, Phone, Clock, Stethoscope, Sparkles, Activity, CheckCircle2, ArrowUpLeft, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function TemplateMinimal({ provider }: { provider: Provider }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-200 selection:text-teal-900" dir="rtl">
      {/* Light Professional Hero Section */}
      <section className="relative bg-gradient-to-b from-teal-50 to-white overflow-hidden pt-32 pb-40 px-6 lg:px-12">
        {/* Animated Background Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-24 right-[10%] text-teal-200 pointer-events-none"
        >
          <Sparkles size={120} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute bottom-20 left-[15%] text-teal-100 pointer-events-none"
        >
          <Stethoscope size={160} />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-40 left-[30%] text-teal-100 pointer-events-none"
        >
          <Activity size={80} />
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100/50 border border-teal-200 text-teal-700 text-sm font-medium backdrop-blur-sm"
            >
              <Stethoscope className="w-4 h-4" />
              {provider.specialty}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-sans font-bold leading-[1.2] text-teal-950"
            >
              {provider.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 font-light leading-relaxed max-w-lg"
            >
              {provider.tagline}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a href="#contact" className="px-8 py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 flex items-center gap-2">
                احجز موعدك الآن
                <ArrowUpLeft className="w-5 h-5" />
              </a>
              <a href="#about" className="px-8 py-4 bg-white text-teal-700 font-medium rounded-xl hover:bg-teal-50 transition-colors border border-teal-100 shadow-sm">
                تعرف علينا
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {provider.photos?.[0] && (
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-8 border-white shadow-2xl shadow-teal-900/10">
                <Image src={provider.photos[0].url} alt={provider.photos[0].label} fill className="object-cover" />
              </div>
            )}
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-6 md:-right-12 bg-white text-slate-900 p-6 rounded-2xl shadow-xl border border-teal-50 max-w-[240px]"
            >
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-3 rounded-full text-teal-600 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-lg mb-1 text-teal-950">رعاية متقدمة</div>
                  <div className="text-sm text-slate-500 leading-tight">أحدث التقنيات الطبية لابتسامتك</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About & Services */}
      <section id="about" className="py-24 px-6 lg:px-12 max-w-6xl mx-auto -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-teal-600"></span> عن الطبيب
            </h2>
            <p className="text-2xl md:text-3xl font-sans text-slate-800 leading-relaxed mb-8">
              {provider.about}
            </p>
          </div>
          
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-teal-600"></span> الخدمات الطبية
            </h2>
            {provider.services && provider.services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {provider.services.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-teal-50/50 border border-teal-100 hover:border-teal-300 hover:bg-teal-50 transition-colors">
                    <Sparkles className="w-5 h-5 text-teal-500 shrink-0" />
                    <span className="font-medium text-slate-700">{service}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">لا توجد خدمات مضافة حالياً.</p>
            )}
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="py-12 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-teal-100 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-2">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-teal-950">موقع العيادة</h3>
            <p className="text-slate-600">{provider.location}</p>
          </div>
          
          {provider.workingHours && (
            <div className="bg-white p-8 rounded-2xl border border-teal-100 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-teal-950">ساعات العمل</h3>
              <p className="text-slate-600">{provider.workingHours}</p>
            </div>
          )}
          
          {provider.phone && (
            <div className="bg-white p-8 rounded-2xl border border-teal-100 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-2">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-teal-950">للتواصل</h3>
              <p className="text-slate-600" dir="ltr">{provider.phone}</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {provider.photos && provider.photos.length > 0 && (
        <section className="py-24 px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-4">جولة في العيادة</h2>
            <h3 className="text-4xl font-sans font-bold text-teal-950">مرافقنا الطبية</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {provider.photos.map((photo, i) => (
              <div key={i} className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-lg group border-4 border-white">
                <Image src={photo.url} alt={photo.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-6 right-6 text-white">
                  <div className="font-medium text-lg">{photo.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer id="contact" className="bg-teal-50 text-teal-900 py-20 border-t border-teal-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-sans font-bold text-teal-950 mb-2">{provider.name}</h2>
            <p className="text-teal-600 mb-6 font-medium">{provider.specialty}</p>
            <p className="max-w-sm leading-relaxed text-teal-800/80">
              نلتزم بتقديم أعلى مستويات الرعاية الطبية في بيئة احترافية ومريحة لجميع مرضانا.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-6">
            <h3 className="text-teal-950 font-bold mb-2">تواصل معنا عبر</h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(provider.social || {}).map(([platform, url]) => url && (
                <a key={platform} href={url} className="w-12 h-12 rounded-full bg-white border border-teal-200 flex items-center justify-center hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all text-teal-700 shadow-sm">
                  <span className="sr-only">{platform}</span>
                  {platform === 'website' && <Globe className="w-5 h-5" />}
                  {platform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                  {platform === 'twitter' && <Twitter className="w-5 h-5" />}
                  {platform === 'instagram' && <Instagram className="w-5 h-5" />}
                  {!['website', 'linkedin', 'twitter', 'instagram'].includes(platform) && <ArrowUpLeft className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
