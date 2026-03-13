import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center" dir="rtl">
      <div className="mb-6 bg-blue-50 p-4 rounded-full">
        <Stethoscope className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
        هيلث كير للأسنان
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
        المنصة الحديثة لأطباء الأسنان. احصل على صفحة تعريفية احترافية لعيادتك في دقائق معدودة وابدأ في استقبال مرضاك.
      </p>
      
      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">نماذج العيادات</h2>
        <p className="text-gray-500 mb-6">شاهد القوالب المختلفة المصممة خصيصاً لأطباء الأسنان:</p>
        
        <div className="flex flex-col gap-4">
          <Link href="/drahmed" className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-right">
            <div className="font-semibold text-gray-900 text-lg">د. أحمد محمود</div>
            <div className="text-sm text-gray-500 mt-1">القالب البسيط • أخصائي تقويم الأسنان</div>
          </Link>
          
          <Link href="/drsara" className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-right">
            <div className="font-semibold text-gray-900 text-lg">د. سارة عبدالرحمن</div>
            <div className="text-sm text-gray-500 mt-1">القالب الجريء • تجميل وزراعة الأسنان</div>
          </Link>
          
          <Link href="/dromar" className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-right">
            <div className="font-semibold text-gray-900 text-lg">د. عمر خالد</div>
            <div className="text-sm text-gray-500 mt-1">القالب الدافئ • طب أسنان الأطفال</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
