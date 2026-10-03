import { Link } from "react-router-dom";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { SiYoutube, SiFacebook, SiInstagram } from "react-icons/si";
import { usePanel } from "@/context/PanelContext.jsx"

export default function Footer() {

  const { setActiveIndex } = usePanel();

  const scrollToTop = () => {
    setActiveIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
      <footer className="w-full lg:h-screen  bg-dark text-neutral  relative overflow-hidden rounded-t-md lg:rounded-none ">
        {/* Desktop version */}
        <div className={`hidden lg:flex w-full h-full flex-col justify-between px-10 pt-nav pb-5 gap-16`}>
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
            <div className={`max-w-1/2 text-2xl font-bold text-neutral leading-30 select-none text-center `}>
              يسعدنا خدمتكم دائماً، ونرحّب بكم في سوسن كيك
              <span>

              </span>
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
              onClick={() => scrollToTop()}
              className={`absolute w-30 h-30 left-10 bottom-60 z-50 flex items-center justify-center bg-primary text-neutral p-5 rounded-full cursor-pointer
                    transition-all ease-in-out duration-100 hover:text-neutral hover:bg-transparent border-4 border-primary shadow-md`}
          >
            <ArrowUp size={40} />
          </button>
          <button
              onClick={() => scrollToTop()}
              className={`absolute w-30 h-30 right-10 bottom-60 z-50 flex items-center justify-center bg-primary text-neutral p-5 rounded-full cursor-pointer
                    transition-all ease-in-out duration-100 hover:text-neutral hover:bg-transparent border-4 border-primary shadow-md`}
          >
            <ArrowUp size={40} />
          </button>
        </div>

        {/* Mobile version */}
        <div className={`lg:hidden w-full h-full flex flex-col items-start gap-10 py-10 px-5`}>
          {/* Header */}
          <div className={`w-full flex flex-col items-center gap-5 border-b-2 border-gray/50 pb-10`}>
            <div className={`text-md font-bold`}>سوسن كيك</div>
            <div className={`text-sm opacity-80`}>أشهى المخبوزات والحلويات المنزلية</div>
          </div>

          {/* Navigation Links */}
          <div className={`w-full flex items-center justify-between text-sm border-b-2 border-gray/50 pb-10`}>
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

          {/* Contact Info */}
          <div className={`w-full flex flex-col items-center gap-5 border-b-2 border-gray/50 pb-10`}>
            <div className={`w-full flex items-center justify-between text-sm`}>
              <a
                  href=""
                  className={`bg-white/10 border border-neutral/15 py-3 px-6 rounded-[10px] flex items-center gap-2 `}
              >
                <Phone size={15} />
                <span>
                   اتصال هاتفي
                </span>
              </a>
              <a
                  href=""
                  className={`bg-white/10 border border-neutral/15 py-3 px-6 rounded-[10px] flex items-center gap-2`}
              >
                <Mail size={15} />
                <span>
                   راسلنا عبر ايميل
                </span>
              </a>
            </div>
            <div className={`text-sm opacity-80`}>
              الأردن، إربد — التوصيل متوفر لجميع المناطق
            </div>
          </div>

          {/* Social Media */}
          <div className={`w-full flex items-center justify-between border-b-2 border-gray/50 pb-10`}>
            <div className={`flex items-center gap-2`}>
              <div className={`flex items-center justify-center bg-white/10 p-4 rounded-full`}>
                <SiInstagram size={20} />
              </div>
              <div className={`flex items-center justify-center bg-white/10 p-4 rounded-full`}>
                <SiYoutube size={20} />
              </div>
              <div className={`flex items-center justify-center bg-white/10 p-4 rounded-full`}>
                <SiFacebook size={20} />
              </div>
            </div>
            <div
                className={`flex items-center justify-center bg-white/10 p-4 rounded-full`}
                onClick={() => scrollToTop()}
            >
              <ArrowUp size={18} />
            </div>
          </div>

          <div className={`w-full flex flex-col gap-3 items-center justify-between text-sm text-neutral/40 border-t border-neutral/10 pt-6`}>
            <span>© 2026 سوسن كيك. جميع الحقوق محفوظة</span>
            <div className={`flex items-center gap-3`}>
              <a href="" className={`hover:text-neutral transition-all ease-in-out duration-100`}>الشروط والأحكام</a>
              <p>.</p>
              <a href="" className={`hover:text-neutral transition-all ease-in-out duration-100`}>سياسة الخصوصية</a>
            </div>
          </div>
        </div>
      </footer>
  );
}