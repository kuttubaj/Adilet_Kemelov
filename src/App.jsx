import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  TrendingUp, Globe, Box, Users, ArrowRight, ArrowUpRight,
  Menu, X, Camera, Briefcase, MessageCircle, CheckCircle2,
  Calendar, Award, Handshake, Mail, Play, BookOpen, Mic 
} from 'lucide-react';

// --- Компоненты для анимаций ---
const FadeIn = ({ children, delay = 0, y = 40 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const Marquee = ({ text, reverse = false }) => (
  <div className="w-full bg-[#3D3028] text-[#F5F2ED] py-5 overflow-hidden flex whitespace-nowrap border-y border-[#DBCAB4]">
    <motion.div 
      className="flex gap-16 text-2xl md:text-3xl uppercase tracking-[0.3em] font-black"
      animate={{ x: reverse ? [-1035, 0] : [0, -1035] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
    >
      <span>• {text} • {text} • {text} • {text} • {text} • {text}</span>
      <span>• {text} • {text} • {text} • {text} • {text} • {text}</span>
    </motion.div>
  </div>
);

// --- Навигация ---
const Navbar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['Главная', 'Обо мне', 'Проекты', 'Инсайты', 'Контакты'];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#F5F2ED]/95 backdrop-blur-xl border-b border-[#DBCAB4]/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-2xl font-black tracking-tighter text-[#3D3028] cursor-pointer"
          onClick={() => setActivePage('Главная')}
        >
          ADILET.K
        </motion.div>
        
        <div className="hidden md:flex space-x-12">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 relative ${
                activePage === item ? 'text-[#3D3028] font-bold' : 'text-[#8C7E6D] hover:text-[#3D3028]'
              }`}
            >
              {item}
              {activePage === item && (
                <motion.div layoutId="underline" className="absolute -bottom-2.5 left-0 right-0 h-[1.5px] bg-[#3D3028]" />
              )}
            </button>
          ))}
        </div>

        <button 
          className="hidden md:flex bg-[#3D3028] text-[#F5F2ED] px-8 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-[#2A211B] transition-colors items-center gap-2.5"
          onClick={() => setActivePage('Контакты')}
        >
          Обсудить проект <ArrowUpRight size={15} />
        </button>

        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X color="#3D3028" /> : <Menu color="#3D3028" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#F5F2ED] flex flex-col items-center pt-24 space-y-10"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => { setActivePage(item); setIsOpen(false); }}
                className="text-4xl font-serif text-[#3D3028] italic"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Секции ---
const Hero = ({ setActivePage }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const bgOpacity = useTransform(scrollY, [0, 400], [0.15, 0]);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center px-6 overflow-hidden">
      <motion.div style={{ y, opacity: bgOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 
          className="text-[25vw] font-black whitespace-nowrap tracking-tighter select-none"
          style={{ color: 'transparent', WebkitTextStroke: '3px #3D3028' }}
        >
          GLOBALIST
        </h1>
      </motion.div>
      
      <div className="relative z-10 text-center mt-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-block px-5 py-2.5 rounded-full border border-[#DBCAB4] bg-white/60 backdrop-blur-md text-[#8C7E6D] text-xs mb-10 uppercase tracking-[0.25em] shadow-sm"
        >
          Адилет Кемелов
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-[9rem] font-serif text-[#3D3028] leading-[0.85] mb-10 tracking-tight"
        >
          Видение <br /> <span className="italic font-light text-[#6B5E53] tracking-normal">в масштабе</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto text-[#6B5E53] text-xl md:text-2xl mb-16 leading-relaxed"
        >
          Предприниматель, визионер и меценат. Основатель фонда «Muras». Объединяю ресурсы Азии и рынки СНГ, создавая возможности для нового поколения.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <motion.button 
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setActivePage('Проекты')}
            className="w-full sm:w-auto bg-[#3D3028] text-[#F5F2ED] px-10 py-5 rounded-full flex items-center justify-center gap-3.5 hover:bg-[#2A211B] transition-colors shadow-2xl shadow-[#3D3028]/25"
          >
            Смотреть проекты <ArrowRight size={19} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setActivePage('Инсайты')}
            className="w-full sm:w-auto bg-transparent border border-[#DBCAB4] text-[#3D3028] px-10 py-5 rounded-full flex items-center justify-center hover:bg-[#DBCAB4]/20 transition-colors"
          >
            Аналитика & Медиа
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// ВЕРНУЛ БЛОК СТАТИСТИКИ
const Stats = () => (
  <section className="py-28 bg-[#3D3028] text-[#F5F2ED] px-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#524136] rounded-full blur-[120px] opacity-40"></div>
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
      {[
        { num: '200M+', label: 'Годовой оборот' },
        { num: '5,000+', label: 'Активных партнеров' },
        { num: '12', label: 'Лет опыта' },
        { num: '4', label: 'Ключевых рынка' }
      ].map((stat, i) => (
        <FadeIn delay={i * 0.12} key={i}>
          <div className="text-center md:text-left border-l-0 md:border-l border-[#8C7E6D]/40 md:pl-10">
            <div className="text-6xl md:text-7xl font-serif mb-3 tracking-tight">{stat.num}</div>
            <div className="text-sm uppercase tracking-[0.2em] text-[#8C7E6D] font-medium">{stat.label}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);

// ВЕРНУЛ БЛОК ШАГОВ
const Milestones = () => {
  const events = [
    { year: '2012', event: 'Основание первого бизнеса', icon: <Handshake /> },
    { year: '2016', event: 'Запуск ООО «Пять К»', icon: <Award /> },
    { year: '2019', event: 'Выход на международные рынки', icon: <Globe /> },
    { year: '2023', event: 'Автоматизация логистики', icon: <Calendar /> },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <FadeIn>
        <h2 className="text-5xl md:text-6xl font-serif text-[#3D3028] mb-16 text-center italic">Путь лидера</h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {events.map((e, idx) => (
          <FadeIn key={idx} delay={idx * 0.1} y={20}>
            <div className="p-8 bg-white border border-[#DBCAB4]/60 rounded-3xl text-center flex flex-col items-center">
              <div className="text-4xl font-black text-[#8C7E6D] mb-3">{e.year}</div>
              <div className="w-12 h-12 rounded-full bg-[#F5F2ED] flex items-center justify-center text-[#3D3028] mb-4">
                {e.icon}
              </div>
              <p className="text-[#3D3028] font-medium">{e.event}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

// ВЕРНУЛ БЛОК ФИЧ
const Features = () => {
  const cards = [
    { title: 'Логистика под ключ', desc: 'Собственные таможенные коридоры и сквозная автоматизация цепочек поставок.', icon: <Box size={35} strokeWidth={1.2} /> },
    { title: 'Международная торговля', desc: 'Стратегическое управление товарными потоками «Пять К» в СНГ.', icon: <Globe size={35} strokeWidth={1.2} /> },
    { title: 'Инвестиционный консалтинг', desc: 'Разработка стратегий масштабирования для среднего и крупного бизнеса.', icon: <TrendingUp size={35} strokeWidth={1.2} /> },
    { title: 'Венчурные фонды', desc: 'Участие в развитии IT-решений для автоматизации ритейла.', icon: <Users size={35} strokeWidth={1.2} /> },
  ];

  return (
    <section className="py-36 px-6 max-w-7xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <h2 className="text-5xl md:text-7xl font-serif text-[#3D3028] leading-tight max-w-3xl tracking-tight">
            Экосистема <br/><span className="italic text-[#8C7E6D]">высокой эффективности</span>
          </h2>
          <p className="text-[#6B5E53] max-w-sm text-xl leading-relaxed">
            Мы не просто следуем трендам. Мы создаем инфраструктуру для вашего успеха.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, idx) => (
          <FadeIn delay={idx * 0.15} key={idx} y={60}>
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="group p-12 bg-white rounded-[2.5rem] border border-[#DBCAB4]/70 hover:border-[#3D3028] transition-all duration-500 shadow-sm hover:shadow-2xl cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-[#F5F2ED] flex items-center justify-center text-[#3D3028] mb-10 group-hover:bg-[#3D3028] group-hover:text-[#F5F2ED] transition-colors duration-500">
                {card.icon}
              </div>
              <h3 className="text-3xl font-bold text-[#3D3028] mb-5 tracking-tight">{card.title}</h3>
              <p className="text-[#6B5E53] text-lg leading-relaxed">{card.desc}</p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }, 1800);
  };

  return (
    <section className="py-36 px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-[3.5rem] p-12 md:p-24 border border-[#DBCAB4]/80 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#DBCAB4]/25 rounded-full blur-[100px]"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
          <div>
            <h2 className="text-5xl md:text-6xl font-serif text-[#3D3028] mb-8 leading-tight tracking-tight">Начать <span className="italic text-[#8C7E6D]">обсуждение</span></h2>
            <p className="text-[#6B5E53] mb-14 text-xl leading-relaxed">
              Открыт для инвестиционных предложений, партнерства в ритейле и крупных логистических проектах.
            </p>
            <div className="space-y-7">
              {[
                { label: 'WhatsApp / Telegram', icon: <MessageCircle /> },
                { label: 'LinkedIn: Adilet Kemelov', icon: <Briefcase /> },
                { label: 'adilet.k@email.com', icon: <Mail /> },
              ].map((link, idx) => (
                <a key={idx} href="#" className="flex items-center gap-5 text-[#3D3028] hover:text-[#8C7E6D] transition-colors group">
                  <div className="p-4.5 bg-[#F5F2ED] rounded-full group-hover:scale-110 transition-transform">{link.icon}</div>
                  <span className="text-xl font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-9 flex flex-col justify-center">
            {isSent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-10 bg-[#F5F2ED] rounded-3xl h-full border-2 border-green-200"
              >
                <CheckCircle2 size={70} className="text-green-600 mb-5" />
                <h3 className="text-3xl font-bold text-[#3D3028] mb-3">Сообщение отправлено!</h3>
                <p className="text-[#6B5E53] text-lg">Я свяжусь с вами в ближайшее время.</p>
              </motion.div>
            ) : (
              <>
                {[ { label: 'Ваше имя', type: 'text' }, { label: 'E-mail или Телефон', type: 'email' } ].map((field) => (
                  <div key={field.label} className="relative group">
                    <input required type={field.type} className="w-full peer p-4 bg-transparent border-b-2 border-[#DBCAB4] focus:outline-none focus:border-[#3D3028] transition-colors text-lg" placeholder=" " />
                    <label className="absolute left-4 top-4 text-[#8C7E6D] transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#3D3028] peer-focus:bg-white peer-focus:px-1.5 peer-valid:-top-3.5 peer-valid:text-xs peer-valid:bg-white peer-valid:px-1.5">
                      {field.label}
                    </label>
                  </div>
                ))}
                <div className="relative group">
                  <textarea required rows="4" className="w-full peer p-4 bg-transparent border-b-2 border-[#DBCAB4] focus:outline-none focus:border-[#3D3028] transition-colors text-lg resize-none" placeholder=" "></textarea>
                  <label className="absolute left-4 top-4 text-[#8C7E6D] transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#3D3028] peer-focus:bg-white peer-focus:px-1.5 peer-valid:-top-3.5 peer-valid:text-xs peer-valid:bg-white peer-valid:px-1.5">Суть предложения</label>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, translateY: -2 }} whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-[#3D3028] text-white py-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#2A211B] transition-colors disabled:opacity-70 flex justify-center items-center shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Отправить запрос"
                  )}
                </motion.button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('Главная');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#4A3F35] font-sans selection:bg-[#DBCAB4] selection:text-[#3D3028] antialiased">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {activePage === 'Главная' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero setActivePage={setActivePage} />
              <Marquee text="Scale • Innovation • Muras Club • Global Trade • Kyrgyzstan" />
              {/* ВЕРНУЛ ЭТИ 3 СТРОКИ СЮДА */}
              <Stats />
              <Milestones />
              <Features />
              <ContactForm />
            </motion.div>
          )}

          {activePage === 'Обо мне' && (
            <motion.div key="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-24 pb-36">
              <section className="px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-20 items-start">
                  
                  {/* WOW ЭФФЕКТ: Sticky блок с фото. Он прилипает к верху, пока текст прокручивается */}
                  <div className="w-full md:w-[45%] sticky top-32">
                    <div className="aspect-[4/5] bg-[#DBCAB4]/30 rounded-[3rem] relative group border border-[#DBCAB4]/60 overflow-hidden shadow-xl">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8C7E6D] bg-gradient-to-t from-[#DBCAB4]/70 to-transparent">
                        <Camera size={55} className="mb-5 opacity-40" />
                        <span className="italic text-xl">Премиальный портрет</span>
                      </div>
                    </div>
                  </div>

                  {/* Детальный текстовый контент */}
                  <div className="w-full md:w-[55%] space-y-12 text-xl text-[#6B5E53] leading-relaxed pb-20">
                    <div>
                      <h2 className="text-6xl md:text-7xl font-serif text-[#3D3028] leading-tight tracking-tight mb-8">От стартапа — <br/><span className="italic text-[#8C7E6D]">к наследию</span></h2>
                      <p className="mb-6">За последние 5-6 лет Адилет Кемелов совершил феноменальный рывок в бизнесе, став примером для целого поколения кыргызстанских предпринимателей. То, что начиналось с точечных поставок, сегодня превратилось в масштабную экосистему с оборотами в сотни миллионов.</p>
                      <p>Его философия базируется на жесткой дисциплине, цифровизации процессов и глубоком понимании азиатских рынков. Он не просто торгует — он выстраивает долгосрочные мосты между фабриками Юго-Восточной Азии и странами СНГ.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                      <div className="p-8 bg-white rounded-3xl border border-[#DBCAB4] shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#F5F2ED] rounded-full flex items-center justify-center text-[#3D3028] mb-6"><Users size={24} /></div>
                        <h4 className="font-bold text-[#3D3028] text-2xl mb-3">Muras Club</h4>
                        <p className="text-sm text-[#8C7E6D] leading-relaxed">Основатель общественного фонда и клуба, направленного на менторство и поддержку молодых предпринимателей.</p>
                      </div>
                      <div className="p-8 bg-white rounded-3xl border border-[#DBCAB4] shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#F5F2ED] rounded-full flex items-center justify-center text-[#3D3028] mb-6"><TrendingUp size={24} /></div>
                        <h4 className="font-bold text-[#3D3028] text-2xl mb-3">Масштаб</h4>
                        <p className="text-sm text-[#8C7E6D] leading-relaxed">Построение фабрики GRAFT с собственной IT-инфраструктурой и создание мощных ритейл-сетей.</p>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-[#DBCAB4]">
                      <p className="font-serif text-3xl text-[#3D3028] italic leading-snug">«Бизнес — это в первую очередь математика и дисциплина. Но истинный масштаб начинается там, где ты отдаешь опыт обществу».</p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activePage === 'Проекты' && (
            <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-24 pb-36">
              <section className="px-6 max-w-7xl mx-auto">
                <h2 className="text-7xl font-serif text-[#3D3028] mb-20 text-center tracking-tight">Экосистема <span className="italic text-[#8C7E6D]">проектов</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  
                  {/* Реальные проекты */}
                  {[
                    { 
                      name: 'Фабрика GRAFT', 
                      tag: 'Производство & IT',
                      desc: 'Высокотехнологичное производство, интегрированное с собственной IT-платформой. Умный подход к управлению предприятием и контролю качества.', 
                      color: 'bg-[#3D3028]',
                      url: 'https://your-link-here.com' 
                    },
                    { 
                      name: 'Фонд «Muras»', 
                      tag: 'Социальный Импакт',
                      desc: 'Общественный молодежный фонд. Развитие предпринимательства, реализация форумов формата «Кыргызстан мечты» и формирование нового бизнес-класса.', 
                      color: 'bg-[#8C7E6D]',
                      url: 'https://your-link-here.com' 
                    },
                    { 
                      name: 'Глобальный Ритейл', 
                      tag: 'Торговля',
                      desc: 'Запуск и масштабирование сетей (включая сегмент аксессуаров). Управление огромными товарными потоками с оборотами, превышающими 150 млн.', 
                      color: 'bg-[#524136]',
                      url: 'https://your-link-here.com' 
                    },
                    { 
                      name: 'China Logistics', 
                      tag: 'Импорт',
                      desc: 'Прямые контракты с цехами и фабриками Китая. Бесперебойная доставка, адаптация товаров под запросы клиента и жесткий контроль сроков.', 
                      color: 'bg-[#A49481]',
                      url: 'https://your-link-here.com' 
                    },
                  ].map((proj, i) => (
                    <motion.div whileHover={{ translateY: -10 }} key={i} className="flex flex-col bg-white rounded-[3.5rem] border border-[#DBCAB4]/70 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                      <div className={`w-full h-64 ${proj.color} flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        <span className="absolute top-6 left-6 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs uppercase tracking-widest font-bold">{proj.tag}</span>
                        <h3 className="text-4xl md:text-5xl font-serif text-white relative z-10 text-center leading-snug">{proj.name}</h3>
                      </div>
                      <div className="p-10 flex flex-col flex-grow">
                        <p className="text-xl text-[#6B5E53] leading-relaxed mb-10 flex-grow">{proj.desc}</p>
                        <a 
                          href={proj.url} target="_blank" rel="noopener noreferrer" 
                          className="self-start flex items-center gap-2.5 text-[#3D3028] font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-[#3D3028] pb-1.5 transition-all text-sm mt-auto"
                        >
                          Детали проекта <ArrowUpRight size={19} />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activePage === 'Инсайты' && (
            <motion.div key="insights" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-24 pb-36">
              <section className="px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                  <h2 className="text-7xl font-serif text-[#3D3028] tracking-tight">Медиа & <br/><span className="italic text-[#8C7E6D]">Выступления</span></h2>
                </div>

                {/* WOW ЭФФЕКТ: Блок Подкаста */}
                <motion.div whileHover={{ scale: 1.01 }} className="w-full bg-[#1A1512] text-white rounded-[3.5rem] p-12 md:p-20 mb-16 relative overflow-hidden group cursor-pointer shadow-2xl">
                  {/* Эффект свечения на фоне */}
                  <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] group-hover:bg-red-600/30 transition-colors duration-700"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-24 h-24 shrink-0 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                      <Play size={40} className="text-white ml-2" fill="currentColor" />
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 rounded-full bg-red-600 text-white text-xs uppercase tracking-widest font-bold">YouTube</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-[#8C7E6D]">Накта Подкаст</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-serif mb-6 leading-tight tracking-tight">Бир жылда 200млн кылабыз... Кытайдын сырлары</h3>
                      <p className="text-xl text-[#DBCAB4] leading-relaxed max-w-3xl">Откровенный разговор о том, как выстраиваются отношения с китайскими фабриками, почему мышление меняет всё и как управлять огромными финансовыми потоками.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Блоки с Форумами и Завтраками */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-12 bg-white rounded-[3rem] border border-[#DBCAB4]/60 hover:shadow-xl transition-shadow group">
                    <div className="w-16 h-16 bg-[#F5F2ED] rounded-full flex items-center justify-center text-[#3D3028] mb-8"><Mic size={28} /></div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#8C7E6D] mb-4">Спикерство</div>
                    <h3 className="text-3xl font-bold text-[#3D3028] mb-6 leading-snug">Форум «Кыргызстан мечты»</h3>
                    <p className="text-[#6B5E53] leading-relaxed text-lg">Как основатель Клуба «Мурас», Адилет делится опытом развития предпринимательства среди молодежи и реализации общественных инициатив.</p>
                  </div>

                  <div className="p-12 bg-white rounded-[3rem] border border-[#DBCAB4]/60 hover:shadow-xl transition-shadow group">
                    <div className="w-16 h-16 bg-[#F5F2ED] rounded-full flex items-center justify-center text-[#3D3028] mb-8"><BookOpen size={28} /></div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#8C7E6D] mb-4">Менторство</div>
                    <h3 className="text-3xl font-bold text-[#3D3028] mb-6 leading-snug">Бизнес-завтраки</h3>
                    <p className="text-[#6B5E53] leading-relaxed text-lg">Закрытые форматы встреч (Q&A), где обсуждаются реальные кейсы: от запуска фабрики GRAFT до инвестирования в IT.</p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activePage === 'Контакты' && (
            <motion.div key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ContactForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-[#3D3028] text-white py-20 px-6 rounded-t-[3.5rem] mx-2.5 mt-20 text-center relative overflow-hidden shadow-2xl shadow-[#3D3028]/30">
        <h2 className="text-7xl md:text-[11rem] font-black opacity-[0.04] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full tracking-tighter">ADILET.K</h2>
        <div className="relative z-10 flex flex-col items-center">
          <div className="text-4xl font-serif mb-10 italic leading-snug">Масштабное видение. <br/> Безупречное исполнение.</div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#8C7E6D] mb-10">
            Bishkek • Kyrgyzstan • Global Trade
          </p>
          <div className="h-px w-28 bg-[#8C7E6D]/50 mb-10"></div>
          <p className="text-xs text-[#8C7E6D] tracking-wider leading-relaxed">
            © {new Date().getFullYear()} Adilet Kemelov. Crafted with Excellence. <br/> Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}