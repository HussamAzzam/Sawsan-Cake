import { Link } from "react-router-dom";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { SiYoutube, SiFacebook, SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
      <footer className="w-full h-screen flex flex-col justify-end bg-dark text-neutral px-10 py-16 gap-16 relative overflow-hidden">
        {/* Top - Links */}
        <div className={`w-full flex items-start justify-between text-lg font-semibold`}>
          {/* Right */}
          <div className={`flex items-start gap-20`}>
            {/* Quick links */}
            <div className={`flex flex-col gap-4`}>
              <a href="" className={`text-neutral font-bold hover:text-neutral transition-all ease-in-out duration-100`}>
                الرئيسية
              </a>
              <a href="" className={`text-neutral/50 hover:text-neutral transition-all ease-in-out duration-100`}>
                القائمة
              </a>
              <a href="" className={`text-neutral/50 hover:text-neutral transition-all ease-in-out duration-100`}>
                المعرض
              </a>
              <a href="" className={`text-neutral/50 hover:text-neutral transition-all ease-in-out duration-100`}>
                من نحن
              </a>
              <a href="" className={`text-neutral/50 hover:text-neutral transition-all ease-in-out duration-100`}>
                تواصل معنا
              </a>
            </div>

            {/* Login */}
            <div className={`flex flex-col gap-4`}>
              <a className={`text-neutral/50 font-bold hover:text-neutral transition-all ease-in-out duration-100 cursor-pointer`}>
                تسجيل الدخول
              </a>
              <a className={`text-neutral/50 hover:text-neutral transition-all ease-in-out duration-100 cursor-pointer`}>
                إنشاء حساب
              </a>
            </div>
          </div>

          {/* Left */}
          <div className={`flex gap-20`}>
            {/* Contact */}
            <div className={`flex flex-col gap-4`}>
              <a href="mailto:sawsancake@gmail.com" className={`flex items-center gap-2 text-neutral/50 hover:text-neutral transition-all ease-in-out duration-100`} dir={`ltr`}>
                <Mail size={18} />
                sawsancake@gmail.com
              </a>
              <a href="tel:+962000000000" className={`flex items-center gap-2 text-neutral/50 hover:text-neutral transition-all ease-in-out duration-100`} dir={`ltr`}>
                <Phone size={18} />
                +962 xxx xxx xxx
              </a>
              <div className={`flex items-center gap-2 text-neutral/50`} dir={`ltr`}>
                <MapPin size={18} />
                Jordan, Irbid
              </div>
            </div>

            {/* Socials */}
            <div className={`flex flex-col gap-4`}>
              <a href="" className={`flex items-center gap-2 text-neutral/50 font-bold hover:text-neutral transition-all ease-in-out duration-100`} dir={`ltr`}>
                <SiYoutube size={18} />
                YouTube
              </a>
              <a href="" className={`flex items-center gap-2 text-neutral/50 hover:text-neutral transition-all ease-in-out duration-100`} dir={`ltr`}>
                <SiFacebook size={18} />
                Facebook
              </a>
              <a href="" className={`flex items-center gap-2 text-neutral/50 hover:text-neutral transition-all ease-in-out duration-100`} dir={`ltr`}>
                <SiInstagram size={18} />
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Watermark logo */}
        <div className={`relative w-full flex items-center justify-center py-10`}>
          <div className={`text-[15rem] font-bold text-neutral leading-none select-none`}>
            سوسن كيك
          </div>
        </div>

        {/* Legal row */}
        <div className={`w-full flex items-center justify-between text-sm text-neutral/40 border-t border-neutral/10 pt-6`}>
          <span>© 2026 سوسن كيك. جميع الحقوق محفوظة</span>
          <div className={`flex items-center gap-6`}>
            <a href="" className={`hover:text-neutral transition-all ease-in-out duration-100`}>الشروط والأحكام</a>
            <a href="" className={`hover:text-neutral transition-all ease-in-out duration-100`}>سياسة الخصوصية</a>
          </div>
        </div>

        {/* Scroll to top - fixed, floating over the footer */}
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`absolute w-30 h-30 left-10 bottom-60 z-50 flex items-center justify-center bg-primary text-neutral p-5 rounded-full cursor-pointer
                    transition-all ease-in-out duration-100 hover:text-neutral hover:bg-transparent border-4 border-primary shadow-md`}
        >
          <ArrowUp size={40} />
        </button>
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`absolute w-30 h-30 right-10 bottom-60 z-50 flex items-center justify-center bg-primary text-neutral p-5 rounded-full cursor-pointer
                    transition-all ease-in-out duration-100 hover:text-neutral hover:bg-transparent border-4 border-primary shadow-md`}
        >
          <ArrowUp size={40} />
        </button>
      </footer>
  );
}