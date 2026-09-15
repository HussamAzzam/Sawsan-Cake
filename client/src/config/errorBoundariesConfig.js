// src/components/errorBoundaryConfig.js
import notFoundImg from "/errors/not-found.jpeg";
import serverErrorImg from "/errors/server.jpeg";
import appErrorImg from "/errors/app.jpeg";
import generalErrorImg from "/errors/general.jpeg";

export const ERROR_VARIANTS = {
    notFound: {
        image: notFoundImg,
        title: "الصفحة غير موجودة 404",
        text: "الصفحة التي تبحث عنها غير متوفرة أو تم نقلها",
        buttonText: "العودة للرئيسية",
    },
    server: {
        image: serverErrorImg,
        title: "خطأ في الخادم",
        text: "حدث خطأ من جانبنا، نعمل على إصلاحه الآن",
        buttonText: "إعادة المحاولة",
    },
    app: {
        image: appErrorImg,
        title: "حدث خطأ في التطبيق",
        text: "حدث خطأ أثناء تحميل هذا القسم",
        buttonText: "إعادة المحاولة",
    },
    general: {
        image: generalErrorImg,
        title: "حدث خطأ غير متوقع",
        text: "نعتذر عن الإزعاج، جاري العمل على حل المشكلة",
        buttonText: "إعادة المحاولة",
    },
};