'use client';

import { Provider } from '@/types/provider';
import Image from 'next/image';
import { MapPin, Phone, Clock, Stethoscope, Sparkles, Smile, Heart, Star, ArrowUpLeft, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function TemplateWarm({ provider }: { provider: Provider }) {
  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#433422] font-sans selection:bg-[#F2C5B5] selection:text-[#433422]" dir="rtl">
      
      {/* Navigation */}
      <nav className="pt-8 px-6 lg:px-12 max-w-7xl mx-auto flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2 text-[#D97757] font-serif text-xl font-bold">
          <Smile className="w-6 h-6" />
          <span>{provider.name.split(' ')[0]} {provider.name.split(' ')[1]}</span>
        </div>
        <a href="#contact" className="px-6 py-2.5 bg-[#433422] text-[#FFFBF5] rounded-full text-sm font-medium hover:bg-[#D97757] transition-colors">
          احجز موعداً
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 lg:px-12 overflow-hidden">
        {/* Floating Background Elements */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-32 right-[15%] text-[#F2C5B5]/40 pointer-events-none"
        >
          <Star size={80} fill="currentColor" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute bottom-40 left-[10%] text-[#E8D1C5]/40 pointer-events-none"
        >
          <Heart size={120} fill="currentColor" />
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5EFE6] text-[#D97757] font-medium text-sm border border-[#E8D1C5]"
          >
            <Stethoscope className="w-4 h-4" />
            {provider.specialty}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#433422] leading-[1.1] mb-8"
          >
            {provider.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#8A7A6B] font-light max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            {provider.tagline}
          </motion.p>

          {/* Hero Image - Pill Shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-t-[12rem] rounded-b-[12rem] overflow-hidden border-[12px] border-white shadow-2xl shadow-[#E8D1C5]/50"
          >
            {provider.photos?.[0] && (
              <Image src={provider.photos[0].url} alt={provider.photos[0].label} fill className="object-cover" />
            )}
            {/* Decorative Badge */}
            <div className="absolute bottom-8 -left-4 bg-[#FFFBF5] text-[#D97757] p-4 rounded-full shadow-lg border border-[#F5EFE6]">
              <Sparkles className="w-8 h-8" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About & Services - Soft Rounded Container */}
      <section id="about" className="px-4 md:px-8 max-w-7xl mx-auto mb-24 relative z-20">
        <div className="bg-[#F5EFE6] rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 lg:p-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#D97757] mb-6 flex items-center gap-3">
                <span className="w-12 h-px bg-[#D97757]"></span> قصتنا
              </h2>
              <p className="text-2xl md:text-4xl font-serif text-[#433422] leading-relaxed mb-8">
                {provider.about}
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#D97757] mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-[#D97757]"></span> ما نقدمه
              </h2>
              {provider.services && provider.services.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {provider.services.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFFBF5] border border-[#F5EFE6] hover:border-[#F2C5B5] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#D97757] shrink-0">
                        <Star className="w-5 h-5" fill="currentColor" />
                      </div>
                      <span className="font-medium text-lg text-[#433422]">{service}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#8A7A6B]">لا توجد خدمات مضافة حالياً.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 px-6 lg:px-12 max-w-6xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-10 rounded-[2.5rem] border border-[#F5EFE6] shadow-sm flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-20 h-20 bg-[#FFFBF5] text-[#D97757] rounded-full flex items-center justify-center mb-4 border border-[#F5EFE6]">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#433422]">موقع العيادة</h3>
            <p className="text-[#8A7A6B] text-lg">{provider.location}</p>
          </div>
          
          {provider.workingHours && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#F5EFE6] shadow-sm flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-[#FFFBF5] text-[#D97757] rounded-full flex items-center justify-center mb-4 border border-[#F5EFE6]">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#433422]">ساعات العمل</h3>
              <p className="text-[#8A7A6B] text-lg">{provider.workingHours}</p>
            </div>
          )}
          
          {provider.phone && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#F5EFE6] shadow-sm flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-[#FFFBF5] text-[#D97757] rounded-full flex items-center justify-center mb-4 border border-[#F5EFE6]">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#433422]">للتواصل</h3>
              <p className="text-[#8A7A6B] text-lg" dir="ltr">{provider.phone}</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery - Staggered Layout */}
      {provider.photos && provider.photos.length > 1 && (
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#D97757] mb-4">جولة في العيادة</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#433422]">مساحتنا الدافئة</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {provider.photos.slice(1).map((photo, i) => (
              <div 
                key={i} 
                className={`relative w-full overflow-hidden shadow-lg group border-8 border-white ${
                  i % 2 === 0 ? 'aspect-square rounded-[3rem]' : 'aspect-[4/3] rounded-[4rem]'
                }`}
              >
                <Image src={photo.url} alt={photo.label} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#433422]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="font-serif font-medium text-2xl">{photo.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer id="contact" className="bg-[#433422] text-[#FFFBF5] py-24 mt-12 rounded-t-[3rem] md:rounded-t-[5rem] mx-2 md:mx-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          <Smile className="w-12 h-12 text-[#D97757] mb-8" />
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">{provider.name}</h2>
          <p className="text-[#E8D1C5] mb-12 text-xl max-w-lg">
            نصنع ابتسامات صحية وجميلة في بيئة مليئة بالدفء والرعاية.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {Object.entries(provider.social || {}).map(([platform, url]) => url && (
              <a key={platform} href={url} className="w-14 h-14 rounded-full bg-[#FFFBF5]/10 border border-[#FFFBF5]/20 flex items-center justify-center hover:bg-[#D97757] hover:border-[#D97757] transition-all text-white shadow-sm">
                <span className="sr-only">{platform}</span>
                {platform === 'website' && <Globe className="w-6 h-6" />}
                {platform === 'linkedin' && <Linkedin className="w-6 h-6" />}
                {platform === 'twitter' && <Twitter className="w-6 h-6" />}
                {platform === 'instagram' && <Instagram className="w-6 h-6" />}
                {!['website', 'linkedin', 'twitter', 'instagram'].includes(platform) && <ArrowUpLeft className="w-6 h-6" />}
              </a>
            ))}
          </div>

          <div className="w-full border-t border-[#FFFBF5]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#8A7A6B] text-sm">
            <p>© {new Date().getFullYear()} {provider.name}. جميع الحقوق محفوظة.</p>
            <p>تصميم بحب ورعاية</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
