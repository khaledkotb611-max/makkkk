document.documentElement.classList.add("js");

const WHATSAPP_NUMBER = "201282708833";
const ORDER_EMAIL = "khaledkotb611@icloud.com";
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getStoredValue = (key, fallback) => {
    try {
        return localStorage.getItem(key) || fallback;
    } catch {
        return fallback;
    }
};

const setStoredValue = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch {
        // The setting still applies for the current visit.
    }
};

let storedTheme = getStoredValue("theme", preferredTheme);
let currentLanguage = getStoredValue("language", "ar");

if (!["ar", "en"].includes(currentLanguage)) {
    currentLanguage = "ar";
}

document.documentElement.setAttribute("data-theme", storedTheme);
document.documentElement.lang = currentLanguage;
document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
}[character]));

const slugify = (...parts) => parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const uiText = {
    ar: {
        siteTitle: "MAK Plumbing Solutions | ماك للسباكة والتوزيع",
        siteDescription: "MAK توفر مواسير وقطع ووصلات ومحابس سباكة للمشروعات والتجار في مصر مع طلب سريع عبر واتساب.",
        skip: "تخطي للمحتوى",
        topbar: "تأكيد مخزون سريع للمشروعات والطلبات بالجملة",
        whatsappDirect: "واتساب مباشر",
        nav: ["الرئيسية", "المنتجات", "الأسعار", "عن الشركة", "المشروعات", "أسئلة", "تواصل"],
        quoteLink: "اطلب عرض سعر",
        languageLabel: "Switch to English",
        languageButton: "EN",
        menuOpen: "فتح القائمة",
        menuClose: "إغلاق القائمة",
        themeDark: "تغيير للوضع الداكن",
        themeLight: "تغيير للوضع الفاتح",
        heroEyebrow: "MAK | المصرية للتجارة والتوزيع",
        heroTitle: "مواسير وقطع صحية جاهزة للمشروعات والتجار.",
        heroText: "كتالوج واضح للأسعار والمقاسات، تجهيز سريع للطلبات، ودعم في اختيار المواسير والقطع المناسبة قبل الشراء.",
        heroPrimary: "شوف قائمة الأسعار",
        heroSecondary: "اطلب على واتساب",
        heroProof: ["أسعار منظمة", "مقاسات واضحة", "طلب سريع"],
        heroHighlights: [
            ["توريد سريع", "للمقاولين والمحلات"],
            ["خامات موثوقة", "مواسير وقطع متعددة"],
            ["تجهيز كميات", "حسب المقاس والعدد"]
        ],
        heroCardLabel: "طلبك في خطوة واحدة",
        heroCardTitle: "ابعت المقاس والعدد واحصل على رد سريع",
        heroCardItems: ["مواسير جولد و B ورمادي", "قطع ووصلات صرف", "بولي أخضر ومعزول"],
        heroCardAction: "جهز طلبي",
        stats: ["سنة خبرة", "عميل ومشروع", "صنف ومقاس", "تواصل سريع"],
        servicesKicker: "المنتجات",
        servicesTitle: "كل احتياجات السباكة في مكان واحد",
        servicesText: "مواسير، قطع، وصلات، محابس، وبولي بروبلين للمشروعات السكنية والتجارية.",
        serviceCards: [
            ["مواسير PVC و B", "مواسير صرف ومياه بمقاسات مختلفة وأسعار واضحة لكل ماسورة.", ["صرف", "مقاسات متعددة", "توريد بالجملة"], "عرض الأسعار"],
            ["بولي بروبلين PPR", "حلول مياه ساخنة وباردة، أخضر ومعزول، مع قطع لحام ومحابس.", ["مياه ساخنة", "مياه باردة", "قطع لحام"], "عرض أسعار البولي"],
            ["قطع ووصلات ومحابس", "أكواع، جلب، مشتركات، طبات، محابس، ولاكور حسب المقاس.", ["وصلات", "مقايسات", "صيانة"], "عرض القطع"]
        ],
        catalogKicker: "قائمة الأسعار",
        catalogTitle: "كل صنف في صفحة لوحده",
        catalogText: "ابحث بالاسم أو المقاس، وافتح تفاصيل أي صنف بصورة ومقاس وسعر ورابط طلب مباشر.",
        productsPageKicker: "المنتجات",
        productsPageTitle: "كل منتجات MAK",
        productsPageText: "كل صنف ظاهر لوحده بالصورة والمقاس والمواصفة والسعر، ومعاه صفحة تفاصيل مستقلة.",
        confirmPrice: "تأكيد السعر على واتساب",
        searchLabel: "بحث",
        searchPlaceholder: "اكتب: 4 أو كوع أو PN20",
        tabs: { all: "الكل", pipes: "مواسير", fittings: "قطع ووصلات", poly: "بولي" },
        catalogCount: (count) => `ظاهر ${count} صنف من قائمة الأسعار`,
        noResults: "مفيش نتائج مطابقة للبحث",
        details: "تفاصيل",
        order: "اطلب الصنف",
        price: "السعر",
        size: "المقاس",
        spec: "المواصفة",
        type: "النوع",
        finish: "التشطيب",
        unit: "الوحدة",
        category: "التصنيف",
        stockNote: "يفضل تأكيد السعر والمخزون قبل الطلب.",
        egp: "جنيه",
        perPipe: "سعر / ماسورة",
        perPiece: "سعر / قطعة",
        backToCatalog: "رجوع للكتالوج",
        productNotFoundTitle: "الصنف غير موجود",
        productNotFoundText: "ارجع للكتالوج واختار الصنف المطلوب من القائمة.",
        relatedTitle: "أصناف قريبة",
        productRequest: "اطلب الصنف على واتساب",
        stockKicker: "تأكيد سريع",
        stockTitle: "ابعت صورة الصنف أو المقاس قبل الشراء.",
        stockText: "لو مش متأكد من الاسم أو المقاس، ابعت صورة المنتج أو المقاس أو جزء من المقايسة، ونساعدك تحدد البديل المناسب.",
        stockItems: ["اسم الصنف أو صورته", "المقاس والعدد المطلوب", "مكان التسليم أو الاستلام"],
        stockButton: "تأكيد المخزون",
        stockCaption: "الأفضل تأكيد السعر والمخزون قبل تثبيت الطلب.",
        aboutKicker: "عن الشركة",
        aboutTitle: "توريد منظم وخدمة واضحة من أول رسالة لحد التسليم.",
        aboutText: "MAK بتساعد المقاولين والمحلات وأصحاب المشروعات في تجهيز مواسير وقطع السباكة بالمقاسات المناسبة، مع تواصل مباشر لتأكيد السعر والكمية.",
        aboutLink: "تواصل مع الفريق",
        processKicker: "طريقة الطلب",
        processTitle: "من الليستة للطلب في 3 خطوات",
        processText: "اختار الصنف، راجع المقاس والسعر، ثم أرسل الطلب مباشرة على واتساب.",
        processCards: [
            ["01", "حدد المنتج", "اختار من المواسير، القطع، أو البولي من قائمة الأسعار."],
            ["02", "راجع التفاصيل", "كل صنف له صفحة فيها الصورة والمقاس والسعر."],
            ["03", "استلم التأكيد", "الفريق يراجع التوفر والسعر النهائي ويرتب معك الطلب."]
        ],
        projectsKicker: "المشروعات",
        projectsTitle: "توريد للمنازل والمحلات والمقاولات",
        projectsText: "اضغط على أي نوع مشروع لفتح طلب جاهز وتعديله حسب احتياجك.",
        projectCards: [
            ["سكني", "شبكات المنازل", "مياه وصرف وصيانة للشقق والفيلات.", "مواسير وقطع لصيانة أو تأسيس الشقق والفيلات، مع تجهيز المقاسات والكميات المطلوبة.", "أحتاج تجهيز مواد سباكة لشبكة منزلية."],
            ["مقاولات", "توريد للمقاولين", "كميات ومقاسات للمواقع والمشروعات.", "تجهيز طلبات بالجملة من مواسير وقطع ووصلات حسب المقايسة، مع متابعة المقاسات والكميات.", "أحتاج عرض سعر توريد مقاولات."],
            ["تجارة", "طلبات المحلات والصيانة", "قطع سريعة وبدائل حسب المخزون.", "تجهيز قطع ووصلات ومحابس للصيانة اليومية والمحلات، مع بدائل حسب المتوفر.", "أحتاج توريد قطع للمحل أو الصيانة."]
        ],
        faqKicker: "أسئلة مهمة",
        faqTitle: "قبل ما تطلب",
        faqText: "إجابات مختصرة تساعدك تبعت الطلب صح من أول مرة.",
        faqs: [
            ["هل الأسعار نهائية؟", "الأسعار المعروضة من الليستة، ويفضل تأكيد السعر والمخزون على واتساب قبل الطلب."],
            ["ينفع أبعت صورة المنتج بدل الاسم؟", "نعم. ابعت صورة المنتج أو المقاس أو جزء من المقايسة والفريق يساعدك في تحديد الصنف."],
            ["هل فيه طلبات جملة؟", "نعم، يتم تجهيز طلبات الجملة والمقاولات حسب الكمية والمقاسات المطلوبة."],
            ["الشركة فين؟", "الشركة في إيتاي البارود، البحيرة، مع توريد حسب الاتفاق والتوفر."]
        ],
        contactKicker: "تواصل معنا",
        contactTitle: "جاهز تبعت طلبك؟",
        contactText: "اكتب الصنف والمقاس والعدد، أو ابعت صورة المنتج، وهنرد عليك بتأكيد السعر والتوفر.",
        address: ["إيتاي البارود، البحيرة، مصر", "السبت إلى الخميس | 9 صباحا - 4 مساء"],
        callNow: "اتصل الآن",
        quickRequest: "طلب سريع",
        presets: ["مواسير PVC", "بولي PPR", "قطع ومحابس"],
        labels: ["الاسم", "البريد الإلكتروني", "رقم الموبايل", "نوع الطلب", "تفاصيل الطلب"],
        placeholders: ["اسمك", "example@email.com", "01000000000", "اكتب الصنف، المقاس، العدد، ومكان التسليم"],
        selectOptions: ["طلب منزل", "طلب مقاولات", "طلب محل", "صيانة"],
        submit: "إرسال على واتساب وجيميل",
        openingWhatsapp: "هفتح لك واتساب وجيميل برسالة الطلب...",
        orderEmailSubject: "طلب جديد من موقع MAK",
        orderLinksReady: "لو المتصفح منع فتح أي نافذة، استخدم أزرار الإرسال الجاهزة.",
        openWhatsapp: "فتح واتساب",
        openGmail: "فتح Gmail",
        orderPanelTitle: "ملخص الطلب",
        orderSummaryEmpty: "طلب جديد جاهز للاستقبال. اكتب التفاصيل وسيظهر الملخص هنا.",
        copyOrder: "نسخ الطلب",
        copiedOrder: "تم نسخ الطلب",
        orderReadyStatus: "تم تجهيز الطلب",
        footerText: "مواسير وقطع صحية للمشروعات والمحلات والمنازل في مصر.",
        quickLinks: "روابط سريعة",
        contactInfo: "بيانات التواصل",
        copyright: "MAK Plumbing Solutions. جميع الحقوق محفوظة.",
        dialogKicker: "توريد مشروع",
        dialogAction: "اطلب هذا التوريد",
        closeDialog: "إغلاق",
        toTop: "العودة للأعلى",
        mobileContact: "تواصل سريع للموبايل",
        contact: "اتصال",
        whatsapp: "واتساب",
        email: "إيميل"
    },
    en: {
        siteTitle: "MAK Plumbing Solutions | Pipes, Fittings, and Project Supply",
        siteDescription: "MAK supplies plumbing pipes, fittings, valves, and PPR products in Egypt with fast WhatsApp ordering.",
        skip: "Skip to content",
        topbar: "Fast stock confirmation for projects and wholesale orders",
        whatsappDirect: "WhatsApp",
        nav: ["Home", "Products", "Prices", "About", "Projects", "FAQ", "Contact"],
        quoteLink: "Request a Quote",
        languageLabel: "Switch to Arabic",
        languageButton: "عربي",
        menuOpen: "Open menu",
        menuClose: "Close menu",
        themeDark: "Switch to dark mode",
        themeLight: "Switch to light mode",
        heroEyebrow: "MAK | Egyptian Trading and Distribution",
        heroTitle: "Plumbing pipes and fittings ready for contractors and traders.",
        heroText: "A clear catalog with prices and sizes, fast order preparation, and support choosing the right pipes and fittings before purchase.",
        heroPrimary: "View Price List",
        heroSecondary: "Order on WhatsApp",
        heroProof: ["Organized prices", "Clear sizes", "Fast ordering"],
        heroHighlights: [
            ["Fast supply", "For contractors and stores"],
            ["Reliable materials", "Multiple pipe and fitting lines"],
            ["Quantity preparation", "By size and count"]
        ],
        heroCardLabel: "Your order in one step",
        heroCardTitle: "Send the size and quantity for a fast reply",
        heroCardItems: ["Gold, B, and grey pipes", "PVC drainage fittings", "Green and insulated PPR"],
        heroCardAction: "Prepare my order",
        stats: ["Years of experience", "Clients and projects", "Items and sizes", "Quick contact"],
        servicesKicker: "Products",
        servicesTitle: "Everything your plumbing order needs in one place",
        servicesText: "Pipes, fittings, valves, and polypropylene products for residential and commercial projects.",
        serviceCards: [
            ["PVC and B Pipes", "Drainage and water pipes in different sizes with clear pricing per pipe.", ["Drainage", "Multiple sizes", "Wholesale supply"], "View prices"],
            ["PPR Polypropylene", "Hot and cold water solutions, green and insulated, with welding fittings and valves.", ["Hot water", "Cold water", "Welding fittings"], "View PPR prices"],
            ["Fittings, Connectors, and Valves", "Elbows, couplings, tees, caps, valves, and unions by size.", ["Fittings", "BOQs", "Maintenance"], "View fittings"]
        ],
        catalogKicker: "Price List",
        catalogTitle: "Every item has its own page",
        catalogText: "Search by name or size, then open any item to see its image, size, price, and direct order link.",
        productsPageKicker: "Products",
        productsPageTitle: "All MAK Products",
        productsPageText: "Every item appears on its own with image, size, specification, price, and an independent detail page.",
        confirmPrice: "Confirm price on WhatsApp",
        searchLabel: "Search",
        searchPlaceholder: "Try: 4, elbow, or PN20",
        tabs: { all: "All", pipes: "Pipes", fittings: "Fittings", poly: "PPR" },
        catalogCount: (count) => `Showing ${count} items from the price list`,
        noResults: "No matching items found",
        details: "Details",
        order: "Order item",
        price: "Price",
        size: "Size",
        spec: "Specification",
        type: "Type",
        finish: "Finish",
        unit: "Unit",
        category: "Category",
        stockNote: "Please confirm price and stock before ordering.",
        egp: "EGP",
        perPipe: "Price / pipe",
        perPiece: "Price / piece",
        backToCatalog: "Back to catalog",
        productNotFoundTitle: "Item not found",
        productNotFoundText: "Return to the catalog and choose the item you need.",
        relatedTitle: "Related items",
        productRequest: "Order this item on WhatsApp",
        stockKicker: "Fast Confirmation",
        stockTitle: "Send a product photo or size before buying.",
        stockText: "If you are unsure about the item name or size, send a product photo, the size, or part of the BOQ, and we will help identify the right alternative.",
        stockItems: ["Item name or photo", "Required size and quantity", "Delivery or pickup location"],
        stockButton: "Confirm stock",
        stockCaption: "It is better to confirm price and stock before placing the order.",
        aboutKicker: "About",
        aboutTitle: "Organized supply and clear service from first message to delivery.",
        aboutText: "MAK helps contractors, stores, and project owners prepare plumbing pipes and fittings in the right sizes, with direct contact to confirm price and quantity.",
        aboutLink: "Contact the team",
        processKicker: "How to Order",
        processTitle: "From price list to order in 3 steps",
        processText: "Choose the item, review size and price, then send the order directly on WhatsApp.",
        processCards: [
            ["01", "Choose the product", "Select pipes, fittings, or PPR products from the price list."],
            ["02", "Review details", "Every item has a page with image, size, and price."],
            ["03", "Get confirmation", "The team reviews availability and final price, then arranges your order."]
        ],
        projectsKicker: "Projects",
        projectsTitle: "Supply for homes, stores, and contractors",
        projectsText: "Tap any project type to open a ready message and edit it for your order.",
        projectCards: [
            ["Residential", "Home networks", "Water, drainage, and maintenance for apartments and villas.", "Pipes and fittings for maintenance or setup of apartments and villas, with required sizes and quantities.", "I need plumbing materials for a home network."],
            ["Contracting", "Contractor supply", "Quantities and sizes for sites and projects.", "Wholesale orders of pipes, fittings, and connectors according to the BOQ, with size and quantity follow-up.", "I need a contractor supply quote."],
            ["Trade", "Store and maintenance orders", "Fast fittings and alternatives based on stock.", "Fittings, connectors, and valves for daily maintenance and store supply, with alternatives based on availability.", "I need fittings for a store or maintenance order."]
        ],
        faqKicker: "Key Questions",
        faqTitle: "Before You Order",
        faqText: "Short answers that help you send the right order from the first message.",
        faqs: [
            ["Are prices final?", "Prices are shown from the list. Please confirm price and stock on WhatsApp before ordering."],
            ["Can I send a product photo instead of the name?", "Yes. Send the product photo, size, or part of the BOQ and the team will help identify it."],
            ["Do you supply wholesale orders?", "Yes, wholesale and contractor orders are prepared by quantity and required sizes."],
            ["Where is the company located?", "The company is in Itay El Baroud, Beheira, with supply according to agreement and availability."]
        ],
        contactKicker: "Contact Us",
        contactTitle: "Ready to send your order?",
        contactText: "Write the item, size, and quantity, or send a product photo, and we will confirm price and availability.",
        address: ["Itay El Baroud, Beheira, Egypt", "Saturday to Thursday | 9 AM - 4 PM"],
        callNow: "Call now",
        quickRequest: "Quick request",
        presets: ["PVC Pipes", "PPR", "Fittings and valves"],
        labels: ["Name", "Email", "Mobile number", "Order type", "Order details"],
        placeholders: ["Your name", "example@email.com", "01000000000", "Write the item, size, quantity, and delivery location"],
        selectOptions: ["Home order", "Contractor order", "Store order", "Maintenance"],
        submit: "Send on WhatsApp and Gmail",
        openingWhatsapp: "Opening WhatsApp and Gmail with your order message...",
        orderEmailSubject: "New order from MAK website",
        orderLinksReady: "If your browser blocks a window, use the ready send buttons.",
        openWhatsapp: "Open WhatsApp",
        openGmail: "Open Gmail",
        orderPanelTitle: "Order summary",
        orderSummaryEmpty: "New order ready to receive. Add details and the summary will appear here.",
        copyOrder: "Copy order",
        copiedOrder: "Order copied",
        orderReadyStatus: "Order prepared",
        footerText: "Plumbing pipes and fittings for projects, stores, and homes in Egypt.",
        quickLinks: "Quick Links",
        contactInfo: "Contact Info",
        copyright: "MAK Plumbing Solutions. All rights reserved.",
        dialogKicker: "Project Supply",
        dialogAction: "Request this supply",
        closeDialog: "Close",
        toTop: "Back to top",
        mobileContact: "Quick mobile contact",
        contact: "Call",
        whatsapp: "WhatsApp",
        email: "Email"
    }
};

const pipeSeries = [
    {
        key: "gold",
        category: "pipes",
        image: "/images/ppr.jpg",
        ar: "MAK الجولد",
        en: "MAK Gold",
        rows: [
            [537, "2.85", "SDR 17", "1 1/2"], [423, "2.26", "SDR 21", "1 1/2"], [394, "1.86", "SDR 26", "1 1/2"],
            [775, "3.56", "SDR 17", "2"], [682, "2.88", "SDR 21", "2"], [585, "2.32", "SDR 26", "2"],
            [1415, "4.25", "SDR 21", "3"], [1037, "3.43", "SDR 26", "3"], [912, "2.75", "SDR 32.5", "3"],
            [1104, "2.5", "-", "4"], [1241, "2.8", "SDR 41", "4"], [1524, "3.5", "SDR 32.5", "4"],
            [1674, "4", "-", "4"], [1973, "5", "-", "4"], [1945, "3", "-", "6"], [2500, "4.12", "SDR 41", "6"], [3127, "5", "-", "6"]
        ]
    },
    {
        key: "b",
        category: "pipes",
        image: "/images/pvc.jpg",
        ar: "MAK B",
        en: "MAK B",
        rows: [
            [431, "2.85", "SDR 17", "1 1/2"], [353, "2.26", "SDR 21", "1 1/2"], [251, "1.86", "SDR 26", "1 1/2"],
            [536, "3.56", "SDR 17", "2"], [477, "2.88", "SDR 21", "2"], [407, "2.32", "SDR 26", "2"],
            [780, "4.25", "SDR 21", "3"], [748, "3.43", "SDR 26", "3"], [602, "2.75", "SDR 32.5", "3"],
            [705, "1.78", "SDR 64", "4"], [850, "2.8", "SDR 41", "4"], [1081, "3.5", "SDR 32.5", "4"],
            [1192, "4", "-", "4"], [1350, "5", "-", "4"], [1327, "3", "-", "6"], [1580, "4.12", "SDR 41", "6"], [1904, "5", "-", "6"]
        ]
    },
    {
        key: "grey",
        category: "pipes",
        image: "/images/hero.jpg",
        ar: "MAK رمادي",
        en: "MAK Grey",
        rows: [
            [228, "sch80", "SCH 80", "3/4"], [327, "sch80", "SCH 80", "1"],
            [175, "B.S", "B.S", "3/4"], [279, "B.S", "B.S", "1"]
        ]
    }
];

const pvcFittings = [
    { slug: "elbow-90", ar: "كوع 90", en: "90 Elbow", prices: { "1.5": 19.70, "2": 32.22, "3": 72.16, "4": 117.77, "6": 285.00 } },
    { slug: "elbow-45", ar: "كوع 45", en: "45 Elbow", prices: { "1.5": 18.75, "2": 29.76, "3": 66.13, "4": 93.63, "6": 256.79 } },
    { slug: "access-elbow", ar: "كوع باب", en: "Access Elbow", prices: { "2": 41.75, "3": 100.38, "4": 153.42, "6": 322.00 } },
    { slug: "coupling", ar: "جلبة عادية", en: "Coupling", prices: { "1.5": 13.67, "2": 20.57, "3": 49.50, "4": 64.62, "6": 161.95 } },
    { slug: "super-tee", ar: "مشترك عادة سوبر", en: "Super Tee", prices: { "1.5": 26.81, "2": 45.39, "3": 105.38, "4": 172.12, "6": 417.35 } },
    { slug: "wye-tee", ar: "مشترك واي", en: "Wye Tee", prices: { "1.5": 40.24, "2": 61.15, "3": 130.82, "4": 221.16, "6": 585.00 } },
    { slug: "vent", ar: "هواية", en: "Vent", prices: { "2": 19.70, "3": 34.35, "4": 42.28 } },
    { slug: "cap", ar: "طبة سد", en: "End Cap", prices: { "2": 27.75, "3": 44.44, "4": 71.53 } }
];

const reducerFittings = [
    { slug: "reducer-2-1-5", ar: "نقاص 2 / 1.5", en: "Reducer 2 / 1.5", size: "2 / 1.5", price: 16.35 },
    { slug: "reducer-3-2", ar: "نقاص 3 / 2", en: "Reducer 3 / 2", size: "3 / 2", price: 40.42 },
    { slug: "reducer-4-2", ar: "نقاص 4 / 2", en: "Reducer 4 / 2", size: "4 / 2", price: 64.45 },
    { slug: "reducer-4-3", ar: "نقاص 4 / 3", en: "Reducer 4 / 3", size: "4 / 3", price: 68.25 },
    { slug: "tee-3-2-standard", ar: "مشترك 3 / 2 عادة", en: "Standard Tee 3 / 2", size: "3 / 2", price: 108.86 },
    { slug: "tee-4-2-access", ar: "مشترك 4 / 2 باب", en: "Access Tee 4 / 2", size: "4 / 2", price: 198.41 },
    { slug: "wye-4-2", ar: "واي 4 / 2", en: "Wye 4 / 2", size: "4 / 2", price: 204.23 },
    { slug: "floor-drain-3-2", ar: "بيبة 3 * 2", en: "Floor Drain 3 * 2", size: "3 * 2", price: 135.86 }
];

const polyPipes = [
    { pn: "PN20", size: "20 مم", sizeEn: "20 mm", green: 134.67 },
    { pn: "PN20", size: "25 مم", sizeEn: "25 mm", green: 213.07, insulated: 306.17 },
    { pn: "PN20", size: "32 مم", sizeEn: "32 mm", green: 307.30, insulated: 452.17 },
    { pn: "PN20", size: "50 مم", sizeEn: "50 mm", green: 717.24, insulated: 1118.22 },
    { pn: "PN20", size: "63 مم", sizeEn: "63 mm", green: 1124.21, insulated: 1513.45 },
    { pn: "PN16", size: "32 مم", sizeEn: "32 mm", green: 272.20, insulated: 398.00 },
    { pn: "PN10", size: "50 مم", sizeEn: "50 mm", green: 573.53, insulated: 741.49 }
];

const polyFittings = [
    { slug: "weld-coupling", ar: "جلبة لحام", en: "Weld Coupling", size: "25 مم", sizeEn: "25 mm", green: 13.38, insulated: 15.02 },
    { slug: "reducing-coupling", ar: "جلبة مسلوب", en: "Reducing Coupling", size: "25*32", sizeEn: "25*32", green: 24.92, insulated: 28.65 },
    { slug: "elbow-90", ar: "كوع 90", en: "90 Elbow", size: "32 مم", sizeEn: "32 mm", green: 31.85, insulated: 39.82 },
    { slug: "weld-tee", ar: "تي لحام", en: "Weld Tee", size: "32 مم", sizeEn: "32 mm", green: 42.39, insulated: 47.10 },
    { slug: "reducing-tee", ar: "تي مسلوب", en: "Reducing Tee", size: "63*32", sizeEn: "63*32", green: 176.11, insulated: 200.12 },
    { slug: "concealed-valve", ar: "محبس دفن", en: "Concealed Valve", size: "25 مم", sizeEn: "25 mm", green: 590.53 },
    { slug: "female-union", ar: "لاكور داخلي", en: "Female Union", size: "32 مم", sizeEn: "32 mm", green: 180, insulated: 210 }
];

const addLocalizedProduct = (products, product) => {
    const search = [
        product.id,
        product.category,
        product.ar.name,
        product.ar.category,
        product.ar.size,
        product.ar.spec,
        product.en.name,
        product.en.category,
        product.en.size,
        product.en.spec
    ].join(" ").toLowerCase();

    products.push({ ...product, search });
};

const buildProducts = () => {
    const products = [];

    pipeSeries.forEach((series) => {
        series.rows.forEach(([price, thickness, sdr, diameter]) => {
            const isGrey = series.key === "grey";
            const specAr = isGrey ? sdr : `${sdr === "-" ? "قياسي" : sdr} - سمك ${thickness}`;
            const specEn = isGrey ? sdr : `${sdr === "-" ? "Standard" : sdr} - ${thickness} thickness`;
            const id = slugify(series.key, "pipe", diameter, sdr, thickness);

            addLocalizedProduct(products, {
                id,
                category: "pipes",
                image: series.image,
                price,
                ar: {
                    name: `ماسورة ${series.ar} ${diameter}`,
                    category: isGrey ? "مواسير رمادي" : "مواسير",
                    size: diameter,
                    spec: specAr,
                    unit: "ماسورة",
                    description: `ماسورة ${series.ar} بمقاس ${diameter} ومواصفة ${specAr}. السعر للماسورة الواحدة حسب الليستة.`
                },
                en: {
                    name: `${series.en} Pipe ${diameter}`,
                    category: isGrey ? "Grey Pipes" : "Pipes",
                    size: diameter,
                    spec: specEn,
                    unit: "pipe",
                    description: `${series.en} pipe in size ${diameter} with ${specEn}. Price is per pipe according to the list.`
                }
            });
        });
    });

    pvcFittings.forEach((item) => {
        Object.entries(item.prices).forEach(([size, price]) => {
            addLocalizedProduct(products, {
                id: slugify("pvc", item.slug, size),
                category: "fittings",
                image: "/images/value.jpg",
                price,
                ar: {
                    name: `${item.ar} PVC ${size}`,
                    category: "قطع ووصلات PVC",
                    size: `${size} بوصة`,
                    spec: "PVC صرف",
                    unit: "قطعة",
                    description: `${item.ar} من قطع PVC بمقاس ${size} بوصة. السعر للقطعة الواحدة حسب الليستة.`
                },
                en: {
                    name: `PVC ${item.en} ${size}"`,
                    category: "PVC Fittings",
                    size: `${size}"`,
                    spec: "PVC drainage fitting",
                    unit: "piece",
                    description: `${item.en} PVC fitting in ${size}" size. Price is per piece according to the list.`
                }
            });
        });
    });

    reducerFittings.forEach((item) => {
        addLocalizedProduct(products, {
            id: slugify("fitting", item.slug),
            category: "fittings",
            image: "/images/pvc.jpg",
            price: item.price,
            ar: {
                name: item.ar,
                category: "وصلات مسلوب",
                size: item.size,
                spec: "وصلة صرف",
                unit: "قطعة",
                description: `${item.ar} من وصلات الصرف. السعر للقطعة الواحدة حسب الليستة.`
            },
            en: {
                name: item.en,
                category: "Reducing Fittings",
                size: item.size,
                spec: "Drainage fitting",
                unit: "piece",
                description: `${item.en} drainage fitting. Price is per piece according to the list.`
            }
        });
    });

    polyPipes.forEach((row) => {
        [
            ["green", "أخضر", "Green", row.green],
            ["insulated", "معزول", "Insulated", row.insulated]
        ].forEach(([key, finishAr, finishEn, price]) => {
            if (!price) {
                return;
            }

            addLocalizedProduct(products, {
                id: slugify("ppr", row.pn, key, row.sizeEn),
                category: "poly",
                image: "/images/ppr.jpg",
                price,
                ar: {
                    name: `ماسورة بولي ${row.pn} ${finishAr} ${row.size}`,
                    category: "مواسير بولي",
                    size: row.size,
                    spec: row.pn,
                    finish: finishAr,
                    unit: "ماسورة",
                    description: `ماسورة بولي ${finishAr} بمقاس ${row.size} ومواصفة ${row.pn}. السعر للماسورة الواحدة حسب الليستة.`
                },
                en: {
                    name: `PPR ${row.pn} ${finishEn} Pipe ${row.sizeEn}`,
                    category: "PPR Pipes",
                    size: row.sizeEn,
                    spec: row.pn,
                    finish: finishEn,
                    unit: "pipe",
                    description: `${finishEn} PPR pipe in ${row.sizeEn} size and ${row.pn} rating. Price is per pipe according to the list.`
                }
            });
        });
    });

    polyFittings.forEach((item) => {
        [
            ["green", "أخضر", "Green", item.green],
            ["insulated", "معزول", "Insulated", item.insulated]
        ].forEach(([key, finishAr, finishEn, price]) => {
            if (!price) {
                return;
            }

            addLocalizedProduct(products, {
                id: slugify("ppr-fitting", item.slug, key, item.sizeEn),
                category: "poly",
                image: "/images/value.jpg",
                price,
                ar: {
                    name: `${item.ar} ${finishAr} ${item.size}`,
                    category: "قطع لحام بولي",
                    size: item.size,
                    spec: "لحام بولي",
                    finish: finishAr,
                    unit: "قطعة",
                    description: `${item.ar} ${finishAr} بمقاس ${item.size}. السعر للقطعة الواحدة حسب الليستة.`
                },
                en: {
                    name: `${finishEn} PPR ${item.en} ${item.sizeEn}`,
                    category: "PPR Welding Fittings",
                    size: item.sizeEn,
                    spec: "PPR weld fitting",
                    finish: finishEn,
                    unit: "piece",
                    description: `${finishEn} PPR ${item.en} in ${item.sizeEn} size. Price is per piece according to the list.`
                }
            });
        });
    });

    return products;
};

const products = buildProducts();

const formatPrice = (value, language = currentLanguage) => {
    const locale = language === "ar" ? "ar-EG" : "en-EG";
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
        minimumFractionDigits: Number.isInteger(value) ? 0 : 2
    }).format(value);
};

const productHref = (product) => `/product/${encodeURIComponent(product.id)}`;

const productQuote = (product, language = currentLanguage) => {
    const local = product[language];
    const labels = uiText[language];
    const price = `${formatPrice(product.price, language)} ${labels.egp}`;

    if (language === "en") {
        return `Hello MAK, I need to confirm price and stock for this item:\n\nItem: ${local.name}\nSize: ${local.size}\nSpecification: ${local.spec}\nPrice shown: ${price}\nQuantity: \nDelivery location: `;
    }

    return `السلام عليكم، أحتاج تأكيد سعر ومخزون للصنف التالي من MAK:\n\nالصنف: ${local.name}\nالمقاس: ${local.size}\nالمواصفة: ${local.spec}\nالسعر المعروض: ${price}\nالعدد: \nمكان التسليم: `;
};

const createOrderCode = () => {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}`;
    const suffix = Math.floor(1000 + Math.random() * 9000);

    return `MAK-${date}-${time}-${suffix}`;
};

const orderCodeLine = (orderCode, language = currentLanguage) => {
    if (!orderCode) {
        return "";
    }

    return language === "en"
        ? `Order code: ${orderCode}\n`
        : `رقم الطلب: ${orderCode}\n`;
};

const appendOrderCode = (message, orderCode, language = currentLanguage) => {
    if (!orderCode) {
        return message;
    }

    const label = language === "en" ? "Order code" : "رقم الطلب";
    return `${message}\n\n${label}: ${orderCode}`;
};

const defaultOrderMessage = (language = currentLanguage, orderCode = "") => language === "en"
    ? `Hello MAK, I need a quote.\n\n${orderCodeLine(orderCode, language)}Order details: `
    : `السلام عليكم، أحتاج عرض سعر من MAK.\n\n${orderCodeLine(orderCode, language)}تفاصيل الطلب: `;

const buildContactOrderMessage = (form, language = currentLanguage, orderCode = "") => {
    if (!form) {
        return defaultOrderMessage(language, orderCode);
    }

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const projectType = String(formData.get("projectType") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (![name, email, phone, message].some(Boolean)) {
        return defaultOrderMessage(language, orderCode);
    }

    return language === "en"
        ? `Hello MAK, I need a quote.\n\n${orderCodeLine(orderCode, language)}Name: ${name || "Not added"}\nEmail: ${email || "Not added"}\nMobile: ${phone || "Not added"}\nOrder type: ${projectType || "Not selected"}\nOrder details: ${message || "Not added"}`
        : `السلام عليكم، أحتاج عرض سعر من MAK.\n\n${orderCodeLine(orderCode, language)}الاسم: ${name || "غير مضاف"}\nالإيميل: ${email || "غير مضاف"}\nالموبايل: ${phone || "غير مضاف"}\nنوع الطلب: ${projectType || "غير محدد"}\nتفاصيل الطلب: ${message || "غير مضافة"}`;
};

const whatsappHref = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const gmailHref = (subject, message) => {
    const params = new URLSearchParams({
        authuser: "0",
        view: "cm",
        fs: "1",
        to: ORDER_EMAIL,
        su: subject,
        body: message
    });

    return `https://mail.google.com/mail/?${params.toString()}`;
};

const mailtoHref = (subject, message) => `mailto:${ORDER_EMAIL}?${new URLSearchParams({
    subject,
    body: message
}).toString()}`;

const setOrderDeliveryLinks = (message, language = currentLanguage) => {
    const ui = uiText[language];
    const whatsappUrl = whatsappHref(message);
    const emailUrl = gmailHref(ui.orderEmailSubject, message);

    document.querySelectorAll("[data-order-whatsapp]").forEach((link) => {
        link.setAttribute("href", whatsappUrl);
    });

    document.querySelectorAll("[data-order-email]").forEach((link) => {
        link.setAttribute("href", emailUrl);
        link.setAttribute("data-mailto", mailtoHref(ui.orderEmailSubject, message));
        link.setAttribute("rel", "noopener noreferrer");
    });

    return { whatsappUrl, emailUrl };
};

const openOrderChannels = (message, statusElement = null, language = currentLanguage) => {
    const ui = uiText[language];
    const urls = setOrderDeliveryLinks(message, language);

    if (statusElement) {
        statusElement.textContent = ui.orderLinksReady;
    }

    const whatsappWindow = window.open(urls.whatsappUrl, "_blank", "noopener,noreferrer");
    const emailWindow = window.open(urls.emailUrl, "_blank", "noopener,noreferrer");

    if (!emailWindow) {
        const emailLink = document.querySelector("[data-order-email]");
        if (emailLink) {
            emailLink.setAttribute("href", emailLink.dataset.mailto || urls.emailUrl);
        }
        if (statusElement) {
            statusElement.textContent = currentLanguage === "ar"
                ? "تم تجهيز الطلب. اضغط فتح Gmail لإرساله."
                : "Your order is ready. Click Open Gmail to send it.";
        }
    }

    return { whatsappWindow, emailWindow };
};

const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
        element.textContent = value;
    });
};

const setAttribute = (selector, attribute, value) => {
    document.querySelectorAll(selector).forEach((element) => {
        element.setAttribute(attribute, value);
    });
};

const setListText = (selector, values, childSelector = null) => {
    document.querySelectorAll(selector).forEach((element, index) => {
        const value = values[index];
        if (!value) {
            return;
        }

        const target = childSelector ? element.querySelector(childSelector) : element;
        if (target) {
            target.textContent = value;
        }
    });
};

const applyStaticLanguage = (language) => {
    const ui = uiText[language];
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body?.classList.toggle("is-ltr", language === "en");

    if (!document.body?.classList.contains("product-page")) {
        document.title = ui.siteTitle;
        setAttribute('meta[name="description"]', "content", ui.siteDescription);
        setAttribute('meta[property="og:title"]', "content", ui.siteTitle);
        setAttribute('meta[property="og:description"]', "content", ui.siteDescription);
        setAttribute('meta[name="twitter:title"]', "content", ui.siteTitle);
        setAttribute('meta[name="twitter:description"]', "content", ui.siteDescription);
    }

    setText(".skip-link", ui.skip);
    setText(".topbar-inner > span", ui.topbar);
    setText('.topbar-links a[href^="https://wa.me"]', ui.whatsappDirect);
    setListText(".nav-links a", ui.nav);
    setText(".quote-link", ui.quoteLink);
    setText(".language-toggle", ui.languageButton);
    setAttribute(".language-toggle", "aria-label", ui.languageLabel);
    setText(".hero .eyebrow", ui.heroEyebrow);
    setText("#hero-title", ui.heroTitle);
    setText(".hero-copy > p:not(.eyebrow)", ui.heroText);
    setText(".hero-actions .button-primary", ui.heroPrimary);
    setText(".hero-actions .button-secondary", ui.heroSecondary);
    setListText(".hero-proof span", ui.heroProof);

    document.querySelectorAll(".hero-highlights li").forEach((item, index) => {
        const pair = ui.heroHighlights[index];
        if (!pair) {
            return;
        }
        item.querySelector("strong").textContent = pair[0];
        item.querySelector("span").textContent = pair[1];
    });

    setText(".hero-card-label", ui.heroCardLabel);
    setText(".hero-card strong", ui.heroCardTitle);
    setListText(".hero-card li", ui.heroCardItems);
    setText(".hero-card a", ui.heroCardAction);
    setListText(".stats .stat span", ui.stats);
    setText(".services .section-kicker", ui.servicesKicker);
    setText(".services .section-heading h2", ui.servicesTitle);
    setText(".services .section-heading > p:not(.section-kicker)", ui.servicesText);

    document.querySelectorAll(".services .product-card").forEach((card, index) => {
        const item = ui.serviceCards[index];
        if (!item) {
            return;
        }
        card.querySelector("h3").textContent = item[0];
        card.querySelector(".card-body > p").textContent = item[1];
        card.querySelectorAll(".product-tags li").forEach((tag, tagIndex) => {
            tag.textContent = item[2][tagIndex] || tag.textContent;
        });
        card.querySelector("a").textContent = item[3];
    });

    setText(".pricing .section-kicker", ui.catalogKicker);
    setText(".catalog-head h2", ui.catalogTitle);
    setText(".catalog-head p:not(.section-kicker)", ui.catalogText);

    if (document.body?.classList.contains("products-page")) {
        document.title = `${ui.productsPageTitle} | MAK Plumbing Solutions`;
        setText(".pricing .section-kicker", ui.productsPageKicker);
        setText(".catalog-head h1", ui.productsPageTitle);
        setText(".catalog-head p:not(.section-kicker)", ui.productsPageText);
    }

    setText(".catalog-head .button", ui.confirmPrice);
    setText(".catalog-search span", ui.searchLabel);
    setAttribute("#catalog-search", "placeholder", ui.searchPlaceholder);
    setText('[data-catalog-tab="all"]', ui.tabs.all);
    setText('[data-catalog-tab="pipes"]', ui.tabs.pipes);
    setText('[data-catalog-tab="fittings"]', ui.tabs.fittings);
    setText('[data-catalog-tab="poly"]', ui.tabs.poly);

    setText(".stock-check .section-kicker", ui.stockKicker);
    setText("#stock-check-title", ui.stockTitle);
    setText(".stock-content > p:not(.section-kicker)", ui.stockText);
    setListText(".stock-list li", ui.stockItems);
    setText(".stock-content .button", ui.stockButton);
    setText(".stock-media figcaption", ui.stockCaption);
    setText(".about .section-kicker", ui.aboutKicker);
    setText(".about .section-content h2", ui.aboutTitle);
    setText(".about .section-content > p:not(.section-kicker)", ui.aboutText);
    setText(".about .text-link", ui.aboutLink);
    setText(".process .section-kicker", ui.processKicker);
    setText("#process-title", ui.processTitle);
    setText(".process .section-heading > p:not(.section-kicker)", ui.processText);

    document.querySelectorAll(".process-card").forEach((card, index) => {
        const item = ui.processCards[index];
        if (!item) {
            return;
        }
        card.querySelector("span").textContent = item[0];
        card.querySelector("h3").textContent = item[1];
        card.querySelector("p").textContent = item[2];
    });

    setText(".projects .section-kicker", ui.projectsKicker);
    setText(".projects .section-heading h2", ui.projectsTitle);
    setText(".projects .section-heading > p:not(.section-kicker)", ui.projectsText);

    document.querySelectorAll(".project-trigger").forEach((button, index) => {
        const item = ui.projectCards[index];
        if (!item) {
            return;
        }
        button.querySelector("span").textContent = item[0];
        button.querySelector("h3").textContent = item[1];
        button.querySelector("p").textContent = item[2];
        button.dataset.projectTitle = item[1];
        button.dataset.projectText = item[3];
        button.dataset.projectQuote = item[4];
    });

    setText(".faq .section-kicker", ui.faqKicker);
    setText(".faq .section-heading h2", ui.faqTitle);
    setText(".faq .section-heading > p:not(.section-kicker)", ui.faqText);

    document.querySelectorAll(".faq-list details").forEach((item, index) => {
        const faq = ui.faqs[index];
        if (!faq) {
            return;
        }
        item.querySelector("summary").textContent = faq[0];
        item.querySelector("p").textContent = faq[1];
    });

    setText(".contact-details .section-kicker", ui.contactKicker);
    setText(".contact-details h2", ui.contactTitle);
    setText(".contact-details > p:not(.section-kicker)", ui.contactText);
    setListText(".contact-details address span", ui.address);
    setText(".contact-actions .button-primary", ui.whatsappDirect);
    setText(".contact-actions .button-outline", ui.callNow);
    setText(".quote-presets legend", ui.quickRequest);
    setListText(".quote-presets button", ui.presets);
    setListText(".contact-form label span", ui.labels);

    const formInputs = document.querySelectorAll(".contact-form input, .contact-form textarea");
    [ui.placeholders[0], ui.placeholders[1], ui.placeholders[2], ui.placeholders[3]].forEach((placeholder, index) => {
        formInputs[index]?.setAttribute("placeholder", placeholder);
    });

    document.querySelectorAll(".contact-form select option").forEach((option, index) => {
        option.textContent = ui.selectOptions[index] || option.textContent;
        option.value = ui.selectOptions[index] || option.value;
    });

    setText(".contact-form .button[type='submit']", ui.submit);
    setText("[data-order-whatsapp]", ui.openWhatsapp);
    setText("[data-order-email]", ui.openGmail);
    setText("[data-order-panel-title]", ui.orderPanelTitle);
    setText("[data-copy-order]", ui.copyOrder);
    setText(".site-footer .footer-container > div:first-child p", ui.footerText);
    setText(".site-footer .footer-container > div:nth-child(2) h3", ui.quickLinks);
    setText(".site-footer .footer-container > div:nth-child(3) h3", ui.contactInfo);
    setListText(".site-footer .footer-container > div:nth-child(2) a", [ui.nav[0], ui.nav[1], ui.nav[2], ui.nav[4], ui.nav[5], ui.nav[6]]);
    setText(".site-footer .footer-container > div:nth-child(3) p", ui.address[0]);
    setText(".site-footer .footer-container > div:nth-child(3) small", ui.address[1]);
    setText(".social-links a:nth-child(1)", ui.whatsapp);
    setText(".social-links a:nth-child(2)", ui.contact);
    setText(".social-links a:nth-child(3)", ui.email);
    setText(".copyright", `© ${new Date().getFullYear()} ${ui.copyright}`);
    setText(".dialog-body .section-kicker", ui.dialogKicker);
    setText(".dialog-body .button", ui.dialogAction);
    setText(".dialog-close", ui.closeDialog);
    setAttribute(".dialog-close", "aria-label", ui.closeDialog);
    setAttribute(".to-top", "aria-label", ui.toTop);
    setText(".floating-whatsapp", ui.whatsapp);
    setAttribute(".floating-whatsapp", "aria-label", ui.whatsappDirect);
    setAttribute(".mobile-contact-bar", "aria-label", ui.mobileContact);
    setText(".mobile-contact-bar a:nth-child(1)", ui.contact);
    setText(".mobile-contact-bar a:nth-child(2)", ui.whatsapp);
};

const renderProductCard = (product, language = currentLanguage) => {
    const ui = uiText[language];
    const local = product[language];
    const price = `${formatPrice(product.price, language)} ${ui.egp}`;
    const finish = local.finish ? `
        <div>
            <dt>${escapeHtml(ui.finish)}</dt>
            <dd>${escapeHtml(local.finish)}</dd>
        </div>` : "";

    return `
        <article class="catalog-card product-item-card" data-category="${escapeHtml(product.category)}" data-search="${escapeHtml(product.search)}">
            <a class="product-item-media" href="${escapeHtml(productHref(product))}" aria-label="${escapeHtml(ui.details)} ${escapeHtml(local.name)}">
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(local.name)}" loading="lazy">
                <span>${escapeHtml(local.category)}</span>
            </a>
            <div class="catalog-card-body product-item-body">
                <div class="catalog-card-title product-item-title">
                    <h3>${escapeHtml(local.name)}</h3>
                    <small>${escapeHtml(local.unit === "ماسورة" || local.unit === "pipe" ? ui.perPipe : ui.perPiece)}</small>
                </div>
                <dl class="product-mini-specs">
                    <div>
                        <dt>${escapeHtml(ui.size)}</dt>
                        <dd>${escapeHtml(local.size)}</dd>
                    </div>
                    <div>
                        <dt>${escapeHtml(ui.spec)}</dt>
                        <dd>${escapeHtml(local.spec)}</dd>
                    </div>
                    ${finish}
                </dl>
                <div class="product-price-row">
                    <span>${escapeHtml(ui.price)}</span>
                    <strong>${escapeHtml(price)}</strong>
                </div>
                <div class="product-actions">
                    <a class="button button-outline" href="${escapeHtml(productHref(product))}">${escapeHtml(ui.details)}</a>
                    <button class="catalog-order" type="button" data-quote="${escapeHtml(productQuote(product, language))}">${escapeHtml(ui.order)}</button>
                </div>
            </div>
        </article>`;
};

const renderCatalog = () => {
    const catalogGrid = document.getElementById("catalog-grid");
    if (!catalogGrid) {
        return;
    }

    catalogGrid.innerHTML = products.map((product) => renderProductCard(product)).join("");
};

const getProductFromUrl = () => {
    const pathMatch = window.location.pathname.match(/\/product\/([^/]+)/);
    const queryId = new URLSearchParams(window.location.search).get("id");
    const id = pathMatch ? decodeURIComponent(pathMatch[1]) : queryId;
    return products.find((product) => product.id === id);
};

const renderProductDetail = () => {
    const container = document.getElementById("product-detail");
    if (!container) {
        return;
    }

    const ui = uiText[currentLanguage];
    const product = getProductFromUrl();

    if (!product) {
        document.title = `${ui.productNotFoundTitle} | MAK Plumbing Solutions`;
        container.innerHTML = `
            <div class="product-detail-shell product-not-found">
                <a class="back-link" href="/#pricing">${escapeHtml(ui.backToCatalog)}</a>
                <h1>${escapeHtml(ui.productNotFoundTitle)}</h1>
                <p>${escapeHtml(ui.productNotFoundText)}</p>
            </div>`;
        return;
    }

    const local = product[currentLanguage];
    const price = `${formatPrice(product.price, currentLanguage)} ${ui.egp}`;
    const related = products
        .filter((item) => item.category === product.category && item.id !== product.id)
        .slice(0, 3);

    document.title = `${local.name} | MAK Plumbing Solutions`;
    setAttribute('meta[name="description"]', "content", local.description);
    setAttribute('meta[property="og:title"]', "content", `${local.name} | MAK`);
    setAttribute('meta[property="og:description"]', "content", local.description);
    setAttribute('meta[property="og:image"]', "content", product.image);
    setAttribute('meta[name="twitter:title"]', "content", `${local.name} | MAK`);
    setAttribute('meta[name="twitter:description"]', "content", local.description);

    const finishRow = local.finish ? `
        <div>
            <dt>${escapeHtml(ui.finish)}</dt>
            <dd>${escapeHtml(local.finish)}</dd>
        </div>` : "";

    container.innerHTML = `
        <div class="product-detail-shell">
            <a class="back-link" href="/#pricing">${escapeHtml(ui.backToCatalog)}</a>
            <div class="product-detail-grid">
                <figure class="product-detail-media">
                    <img src="${escapeHtml(product.image)}" alt="${escapeHtml(local.name)}">
                    <figcaption>${escapeHtml(ui.stockNote)}</figcaption>
                </figure>
                <article class="product-detail-info">
                    <p class="section-kicker">${escapeHtml(local.category)}</p>
                    <h1>${escapeHtml(local.name)}</h1>
                    <p>${escapeHtml(local.description)}</p>
                    <dl class="product-detail-specs">
                        <div>
                            <dt>${escapeHtml(ui.size)}</dt>
                            <dd>${escapeHtml(local.size)}</dd>
                        </div>
                        <div>
                            <dt>${escapeHtml(ui.spec)}</dt>
                            <dd>${escapeHtml(local.spec)}</dd>
                        </div>
                        ${finishRow}
                        <div>
                            <dt>${escapeHtml(ui.unit)}</dt>
                            <dd>${escapeHtml(local.unit)}</dd>
                        </div>
                    </dl>
                    <div class="product-detail-price">
                        <span>${escapeHtml(ui.price)}</span>
                        <strong>${escapeHtml(price)}</strong>
                    </div>
                    <div class="product-detail-actions">
                        <button class="button button-primary" type="button" data-direct-order="${escapeHtml(productQuote(product, currentLanguage))}">${escapeHtml(ui.productRequest)}</button>
                        <a class="button button-outline" href="/#pricing">${escapeHtml(ui.backToCatalog)}</a>
                    </div>
                </article>
            </div>
            <section class="related-products" aria-labelledby="related-products-title">
                <h2 id="related-products-title">${escapeHtml(ui.relatedTitle)}</h2>
                <div class="catalog-grid related-products-grid">
                    ${related.map((item) => renderProductCard(item)).join("")}
                </div>
            </section>
        </div>`;
};

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const progressBar = document.querySelector(".scroll-progress");
    const menuButton = document.querySelector(".menu-toggle");
    const navPanel = document.querySelector(".nav-panel");
    const primaryNavLinks = document.querySelectorAll(".nav-links a");
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const projectTriggers = document.querySelectorAll(".project-trigger");
    const projectDialog = document.querySelector(".project-dialog");
    const projectDialogImage = projectDialog?.querySelector("img");
    const projectDialogTitle = document.getElementById("project-dialog-title");
    const projectDialogText = document.getElementById("project-dialog-text");
    const projectDialogQuote = projectDialog?.querySelector("[data-dialog-quote]");
    const projectDialogClose = projectDialog?.querySelector(".dialog-close");
    const faqItems = document.querySelectorAll(".faq-list details");
    const toTopButton = document.querySelector(".to-top");
    const animatedItems = document.querySelectorAll("[data-animate]");
    const counters = document.querySelectorAll("[data-counter]");
    const contactForm = document.querySelector(".contact-form");
    const formStatus = document.querySelector(".form-status");
    const orderCodeNode = document.querySelector("[data-order-code]");
    const orderSummaryNode = document.querySelector("[data-order-summary]");
    const themeToggle = document.getElementById("theme-toggle");
    const languageToggles = document.querySelectorAll(".language-toggle");
    const catalogTabs = document.querySelectorAll("[data-catalog-tab]");
    const catalogSearch = document.getElementById("catalog-search");
    const catalogCount = document.getElementById("catalog-count");
    const yearNode = document.getElementById("year");
    let activeCatalogTab = "all";
    let currentOrderCode = createOrderCode();
    let currentOrderMessage = "";

    const updateThemeControl = () => {
        const theme = document.documentElement.getAttribute("data-theme");
        const ui = uiText[currentLanguage];
        themeToggle?.setAttribute("aria-label", theme === "dark" ? ui.themeLight : ui.themeDark);
    };

    const filterCatalog = () => {
        const query = String(catalogSearch?.value || "").trim().toLowerCase();
        const cards = document.querySelectorAll(".product-item-card");
        const ui = uiText[currentLanguage];
        let visibleCount = 0;

        cards.forEach((card) => {
            const categoryMatches = activeCatalogTab === "all" || card.dataset.category === activeCatalogTab;
            const haystack = String(`${card.textContent} ${card.dataset.search || ""}`).toLowerCase();
            const searchMatches = !query || haystack.includes(query);
            const isVisible = categoryMatches && searchMatches;

            card.classList.toggle("is-hidden", !isVisible);

            if (isVisible) {
                visibleCount += 1;
            }
        });

        if (catalogCount) {
            catalogCount.textContent = visibleCount ? ui.catalogCount(visibleCount) : ui.noResults;
        }
    };

    const setMenuState = (isOpen) => {
        const ui = uiText[currentLanguage];
        menuButton?.classList.toggle("is-open", isOpen);
        navPanel?.classList.toggle("is-open", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        menuButton?.setAttribute("aria-expanded", String(isOpen));
        menuButton?.setAttribute("aria-label", isOpen ? ui.menuClose : ui.menuOpen);
    };

    const closeMenu = () => setMenuState(false);

    const copyText = async (text) => {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.append(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    };

    const refreshOrderDeliveryLinks = () => {
        const ui = uiText[currentLanguage];
        currentOrderMessage = buildContactOrderMessage(contactForm, currentLanguage, currentOrderCode);
        setOrderDeliveryLinks(currentOrderMessage, currentLanguage);

        if (orderCodeNode) {
            orderCodeNode.textContent = currentOrderCode;
        }

        if (orderSummaryNode) {
            orderSummaryNode.textContent = currentOrderMessage || ui.orderSummaryEmpty;
        }
    };

    const fillQuoteMessage = (quoteText, selectedButton) => {
        const messageField = contactForm?.querySelector('textarea[name="message"]');

        if (messageField && quoteText) {
            messageField.value = quoteText;
            try {
                messageField.focus({ preventScroll: true });
            } catch {
                messageField.focus();
            }
        }

        document.querySelectorAll("[data-quote]").forEach((item) => item.classList.remove("is-selected"));

        if (selectedButton) {
            selectedButton.classList.add("is-selected");
        }

        refreshOrderDeliveryLinks();
    };

    const refreshLanguage = () => {
        applyStaticLanguage(currentLanguage);
        renderCatalog();
        renderProductDetail();
        updateThemeControl();
        filterCatalog();
        refreshOrderDeliveryLinks();
        closeMenu();
    };

    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }

    refreshLanguage();

    languageToggles.forEach((toggle) => toggle.addEventListener("click", () => {
        currentLanguage = currentLanguage === "ar" ? "en" : "ar";
        setStoredValue("language", currentLanguage);
        refreshLanguage();
    }));

    contactForm?.addEventListener("input", refreshOrderDeliveryLinks);
    contactForm?.addEventListener("change", refreshOrderDeliveryLinks);

    menuButton?.addEventListener("click", () => {
        setMenuState(!navPanel?.classList.contains("is-open"));
    });

    themeToggle?.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        storedTheme = newTheme;
        setStoredValue("theme", newTheme);
        updateThemeControl();
    });

    catalogTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activeCatalogTab = tab.dataset.catalogTab || "all";
            catalogTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
            filterCatalog();
        });
    });

    catalogSearch?.addEventListener("input", filterCatalog);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    let scrollFrame = 0;
    const updateScrollState = () => {
        if (scrollFrame) {
            return;
        }

        scrollFrame = requestAnimationFrame(() => {
            scrollFrame = 0;
            const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;
            const scrolled = window.scrollY > 20;
            progressBar?.style.setProperty("transform", `scaleX(${Math.min(Math.max(progress, 0), 1)})`);
            header?.classList.toggle("is-scrolled", scrolled);
            toTopButton?.classList.toggle("is-visible", window.scrollY > 420);
        });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        if (menuButton && navPanel && !menuButton.contains(event.target) && !navPanel.contains(event.target)) {
            closeMenu();
        }
    });

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    closeMenu();
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    document.addEventListener("click", (event) => {
        const copyButton = event.target.closest("[data-copy-order]");

        if (copyButton) {
            const ui = uiText[currentLanguage];
            copyText(currentOrderMessage || buildContactOrderMessage(contactForm, currentLanguage, currentOrderCode))
                .then(() => {
                    if (formStatus) {
                        formStatus.textContent = ui.copiedOrder;
                    }
                })
                .catch(() => {
                    if (formStatus) {
                        formStatus.textContent = currentLanguage === "ar"
                            ? "تعذر النسخ تلقائيا. حدد ملخص الطلب وانسخه."
                            : "Could not copy automatically. Select the order summary and copy it.";
                    }
                });
            return;
        }

        if (event.target.closest("[data-order-whatsapp], [data-order-email]")) {
            refreshOrderDeliveryLinks();
            return;
        }

        const directOrderButton = event.target.closest("[data-direct-order]");

        if (directOrderButton) {
            openOrderChannels(appendOrderCode(directOrderButton.dataset.directOrder, createOrderCode()));
            return;
        }

        const quoteButton = event.target.closest("[data-quote]");

        if (!quoteButton) {
            return;
        }

        fillQuoteMessage(quoteButton.dataset.quote, quoteButton);

        if (!contactForm && quoteButton.classList.contains("catalog-order")) {
            openOrderChannels(appendOrderCode(quoteButton.dataset.quote, createOrderCode()));
            return;
        }

        if (quoteButton.classList.contains("catalog-order")) {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
    });

    const closeProjectDialog = () => {
        if (typeof projectDialog?.close === "function") {
            projectDialog.close();
        } else {
            projectDialog?.removeAttribute("open");
        }
    };

    projectTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            if (projectDialogImage) {
                projectDialogImage.src = trigger.dataset.projectImage || "";
                projectDialogImage.alt = trigger.dataset.projectTitle || "";
            }

            if (projectDialogTitle) {
                projectDialogTitle.textContent = trigger.dataset.projectTitle || uiText[currentLanguage].projectsTitle;
            }

            if (projectDialogText) {
                projectDialogText.textContent = trigger.dataset.projectText || "";
            }

            if (projectDialogQuote) {
                projectDialogQuote.dataset.quote = trigger.dataset.projectQuote || "";
            }

            if (typeof projectDialog?.showModal === "function") {
                projectDialog.showModal();
            } else {
                projectDialog?.setAttribute("open", "");
            }
        });
    });

    projectDialogQuote?.addEventListener("click", () => {
        fillQuoteMessage(projectDialogQuote.dataset.quote);
        closeProjectDialog();
    });

    projectDialogClose?.addEventListener("click", () => {
        closeProjectDialog();
    });

    projectDialog?.addEventListener("click", (event) => {
        if (event.target === projectDialog) {
            closeProjectDialog();
        }
    });

    const activateNavLink = (id) => {
        primaryNavLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const isActive = href === `#${id}` || href === `/#${id}` || (id === "products" && href === "/products");
            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const sections = document.querySelectorAll("main section[id]");
    const isStandaloneProductsPage = document.body.classList.contains("products-page");
    const isStandaloneProductPage = document.body.classList.contains("product-page");

    if (isStandaloneProductsPage || isStandaloneProductPage) {
        activateNavLink("products");
    } else if (sections.length && "IntersectionObserver" in window) {
        activateNavLink("home");

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        activateNavLink(entry.target.id);
                    }
                });
            },
            { rootMargin: "-35% 0px -50% 0px", threshold: 0.1 }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

    toTopButton?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) {
                return;
            }

            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });

    const countUp = (counter) => {
        const target = parseInt(counter.dataset.target, 10) || 0;
        const suffix = counter.dataset.suffix || "";
        const duration = 1200;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = `${target}${suffix}`;
            }
        };

        requestAnimationFrame(update);
    };

    if ("IntersectionObserver" in window) {
        const animationObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        animationObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        animatedItems.forEach((item) => {
            if (item.closest(".hero")) {
                item.classList.add("is-visible");
            } else {
                animationObserver.observe(item);
            }
        });

        window.setTimeout(() => {
            animatedItems.forEach((item) => item.classList.add("is-visible"));
        }, 1400);

        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        countUp(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.45 }
        );

        counters.forEach((counter) => counterObserver.observe(counter));
    } else {
        animatedItems.forEach((item) => item.classList.add("is-visible"));
        counters.forEach(countUp);
    }

    contactForm?.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const ui = uiText[currentLanguage];
        const text = buildContactOrderMessage(contactForm, currentLanguage, currentOrderCode);

        if (formStatus) {
            formStatus.textContent = `${ui.orderReadyStatus}: ${currentOrderCode}`;
        }

        openOrderChannels(text, formStatus);
        document.querySelectorAll("[data-quote]").forEach((button) => button.classList.remove("is-selected"));
        refreshOrderDeliveryLinks();
    });
});
