import { Provider } from '@/types/provider';

export const mockProviders: Record<string, Provider> = {
  'drahmed': {
    slug: 'drahmed',
    name: 'د. أحمد محمود',
    specialty: 'أخصائي تقويم الأسنان',
    tagline: 'ابتسامة مثالية تدوم مدى الحياة.',
    about: 'د. أحمد هو أخصائي تقويم أسنان معتمد بخبرة تزيد عن ١٥ عاماً في علاج الحالات المعقدة. يؤمن بنهج يضع المريض أولاً، ويجمع بين أحدث التقنيات الطبية والرعاية الرحيمة لضمان أفضل النتائج لمرضاه. تركز عيادته على التقويم الشفاف، والتقويم المعدني المتقدم، وتصحيح إطباق الفكين.',
    location: 'شارع التحلية، مركز العيادات الطبية، الرياض',
    phone: '+966 50 123 4567',
    workingHours: 'الأحد - الخميس: ٩ صباحاً - ٩ مساءً',
    services: ['التقويم الشفاف (إنفزلاين)', 'التقويم المعدني والخزفي', 'مثبتات الأسنان', 'علاج إطباق الفكين'],
    template: 'minimal',
    social: { 
      website: 'https://example.com', 
      twitter: 'https://twitter.com/drahmed',
      linkedin: 'https://linkedin.com/in/drahmed'
    },
    photos: [
      { url: 'https://picsum.photos/seed/drahmed1/800/1000', label: 'د. أحمد محمود' },
      { url: 'https://picsum.photos/seed/drahmed2/800/800', label: 'مدخل العيادة' },
      { url: 'https://picsum.photos/seed/drahmed3/800/800', label: 'غرفة الاستشارة' },
      { url: 'https://picsum.photos/seed/drahmed4/800/800', label: 'منطقة الانتظار' }
    ],
    user_id: 'mock-id-1'
  },
  'drsara': {
    slug: 'drsara',
    name: 'د. سارة عبدالرحمن',
    specialty: 'تجميل وزراعة الأسنان',
    tagline: 'نصنع ابتسامتك بثقة.',
    about: 'د. سارة متخصصة في طب الأسنان التجميلي والجراحي، تساعد المرضى على تحقيق أفضل ابتسامة. من علاج الحالات المزمنة إلى تقديم الإجراءات التجميلية المتقدمة، هي مكرسة لتعزيز جمالك الطبيعي. تقدم عيادتها الفاخرة ملاذاً هادئاً حيث يلتقي العلم بالعناية الشخصية.',
    location: 'طريق الملك فهد، برج المكاتب، جدة',
    phone: '+966 55 987 6543',
    workingHours: 'السبت - الأربعاء: ١٠ صباحاً - ٨ مساءً',
    services: ['ابتسامة هوليوود', 'زراعة الأسنان الفورية', 'تبييض الأسنان بالليزر', 'الفينير واللومينير'],
    template: 'bold',
    social: { 
      instagram: 'https://instagram.com/drsara',
      website: 'https://example.com'
    },
    photos: [
      { url: 'https://picsum.photos/seed/drsara1/1200/800', label: 'أحدث الأجهزة' },
      { url: 'https://picsum.photos/seed/drsara2/1200/800', label: 'غرفة العلاج' }
    ],
    user_id: 'mock-id-2'
  },
  'dromar': {
    slug: 'dromar',
    name: 'د. عمر خالد',
    specialty: 'طب أسنان الأطفال',
    tagline: 'رعاية لطيفة لأسنان أطفالكم.',
    about: 'د. عمر يحب العمل مع الأطفال وضمان نموهم بصحة وقوة. بفضل البيئة الدافئة والمرحة، تم تصميم عيادته لجعل الأطفال يشعرون بالراحة أثناء تلقي رعاية طبية عالية الجودة. يتخصص في نمو الطفولة المبكرة، والوقاية من التسوس، وطب أسنان المراهقين.',
    location: 'حي الياسمين، مجمع العائلة الطبي، الدمام',
    phone: '+966 53 456 7890',
    workingHours: 'الأحد - الخميس: ٤ عصراً - ١٠ مساءً',
    services: ['علاج تسوس الأطفال', 'تطبيق الفلورايد', 'خلع الأسنان اللبنية', 'الغاز الضاحك للأطفال'],
    template: 'warm',
    social: { 
      linkedin: 'https://linkedin.com/in/dromar',
      instagram: 'https://instagram.com/dromar'
    },
    photos: [
      { url: 'https://picsum.photos/seed/dromar_portrait/800/1000', label: 'د. عمر خالد' },
      { url: 'https://picsum.photos/seed/dromar1/800/600', label: 'غرفة الألعاب' },
      { url: 'https://picsum.photos/seed/dromar2/800/600', label: 'منطقة الفحص' }
    ],
    user_id: 'mock-id-3'
  }
};
