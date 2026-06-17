const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function upsertSection(data) {
  return prisma.avestaSection.upsert({
    where: { slug: data.slug },
    update: data,
    create: data
  });
}

async function upsertSectionTranslation(sectionId, locale, data) {
  return prisma.avestaSectionTranslation.upsert({
    where: { sectionId_locale: { sectionId, locale } },
    update: data,
    create: { sectionId, locale, ...data }
  });
}

async function upsertChapter(sectionId, data) {
  return prisma.avestaChapter.upsert({
    where: { sectionId_slug: { sectionId, slug: data.slug } },
    update: data,
    create: { sectionId, ...data }
  });
}

async function upsertChapterTranslation(chapterId, locale, data) {
  return prisma.avestaChapterTranslation.upsert({
    where: { chapterId_locale: { chapterId, locale } },
    update: data,
    create: { chapterId, locale, ...data }
  });
}

async function upsertVerse(chapterId, order, data) {
  return prisma.avestaVerse.upsert({
    where: { chapterId_order: { chapterId, order } },
    update: data,
    create: { chapterId, order, ...data }
  });
}

async function upsertVerseTranslation(verseId, locale, data) {
  return prisma.avestaVerseTranslation.upsert({
    where: { verseId_locale: { verseId, locale } },
    update: data,
    create: { verseId, locale, ...data }
  });
}

async function main() {
  const yasna = await upsertSection({
    title: "یسنا",
    slug: "yasna",
    description: "آیین نیایش و آتش مقدس؛ یکی از مهم‌ترین بخش‌های اوستا.",
    coverImage: "/images/ai/yasna-cover.png",
    themeColor: "#D6A84F",
    order: 1
  });

  await upsertSectionTranslation(yasna.id, "EN", {
    title: "Yasna",
    description: "The liturgical heart of the Avesta, centered on sacred fire, devotion, and ritual order.",
    seoTitle: "Yasna | AVESTA-ZOROASTER",
    seoDescription: "Read and explore Yasna with original text, translations, commentary, imagery, and audio."
  });

  const gathas = await upsertSection({
    title: "گات‌ها",
    slug: "gathas",
    description: "سروده‌های بنیادین منسوب به زرتشت با پیام خرد، راستی و انتخاب اخلاقی.",
    coverImage: "/images/ai/gathas-cover.png",
    themeColor: "#F2D58A",
    order: 2
  });

  await upsertSectionTranslation(gathas.id, "EN", {
    title: "Gathas",
    description: "The foundational hymns attributed to Zoroaster, focused on wisdom, truth, and moral choice.",
    seoTitle: "Gathas | AVESTA-ZOROASTER",
    seoDescription: "Explore the Gathas through layered translation, modern interpretation, and ethical lessons."
  });

  const yasnaChapter = await upsertChapter(yasna.id, {
    title: "یسنا ۱",
    slug: "ha-1",
    number: 1,
    description: "نمونه فصل برای نمایش ساختار مطالعه یسنا.",
    coverImage: "/images/ai/yasna-cover.png",
    order: 1
  });

  await upsertChapterTranslation(yasnaChapter.id, "EN", {
    title: "Yasna 1",
    description: "Sample chapter used to demonstrate the cinematic reading model for Yasna."
  });

  const yasnaVerse = await upsertVerse(yasnaChapter.id, 1, {
    originalText: "جایگاه متن اوستایی در نسخه نهایی.",
    transliteration: "Sample transliteration",
    classicalTranslation: "ترجمه کلاسیک این بند در نسخه نهایی قرار می‌گیرد.",
    simpleRewrite: "بازنویسی ساده برای فهم سریع‌تر مخاطب امروزی.",
    modernInterpretation: "تحلیل مفهومی درباره نیایش، روشنایی و نظم اخلاقی.",
    ethicalMessage: "نیایش تمرین توجه و انتخاب روشنایی در زندگی روزمره است.",
    imageUrl: "/images/ai/yasna-cover.png",
    audioUrl: "/audio/yasna-verse-1.mp3"
  });

  await upsertVerseTranslation(yasnaVerse.id, "EN", {
    originalText: "Placeholder for the original Avestan text.",
    transliteration: "Sample transliteration",
    classicalTranslation: "A classical translation will be placed here in the final edition.",
    simpleRewrite: "A simplified rewrite for readers entering the text for the first time.",
    modernInterpretation: "A conceptual reading about prayer, light, and moral order.",
    ethicalMessage: "Prayer becomes a daily practice of attention and choosing light."
  });

  const gathasChapter = await upsertChapter(gathas.id, {
    title: "اهونود گات",
    slug: "ahunavaiti",
    number: 1,
    description: "نمونه فصل برای شروع مطالعه گات‌ها.",
    coverImage: "/images/ai/gathas-cover.png",
    order: 1
  });

  await upsertChapterTranslation(gathasChapter.id, "EN", {
    title: "Ahunavaiti Gatha",
    description: "Sample chapter for entering the world of the Gathas."
  });

  const gathasVerse = await upsertVerse(gathasChapter.id, 1, {
    originalText: "جایگاه متن گاهانی در نسخه نهایی.",
    transliteration: "Sample gathic transliteration",
    classicalTranslation: "ترجمه کلاسیک سرود گاهانی.",
    simpleRewrite: "خرد، راهی است که انسان با آزادی و مسئولیت انتخاب می‌کند.",
    modernInterpretation: "تحلیل مفهومی درباره اشا، وهومن و انتخاب اخلاقی.",
    ethicalMessage: "پیام گات‌ها دعوت به انتخاب آگاهانه، راستی و مسئولیت اخلاقی است.",
    imageUrl: "/images/ai/gathas-cover.png",
    audioUrl: "/audio/gathas-verse-1.mp3"
  });

  await upsertVerseTranslation(gathasVerse.id, "EN", {
    originalText: "Placeholder for the Gathic text.",
    transliteration: "Sample gathic transliteration",
    classicalTranslation: "Classical translation of the Gathic hymn.",
    simpleRewrite: "Wisdom is a path chosen with freedom and responsibility.",
    modernInterpretation: "A conceptual reading of Asha, Vohu Manah, and ethical choice.",
    ethicalMessage: "The Gathas invite conscious choice, truth, and moral responsibility."
  });

  const asha = await prisma.glossaryTerm.upsert({
    where: { slug: "asha" },
    update: {
      term: "اشا",
      meaning: "راستی، نظم کیهانی و هماهنگی اخلاقی",
      root: "Asha / Arta",
      description: "اشا یکی از کلیدی‌ترین مفاهیم جهان زرتشتی است."
    },
    create: {
      term: "اشا",
      slug: "asha",
      meaning: "راستی، نظم کیهانی و هماهنگی اخلاقی",
      root: "Asha / Arta",
      description: "اشا یکی از کلیدی‌ترین مفاهیم جهان زرتشتی است."
    }
  });

  await prisma.glossaryTermTranslation.upsert({
    where: { termId_locale: { termId: asha.id, locale: "EN" } },
    update: {
      termText: "Asha",
      meaning: "Truth, cosmic order, and ethical harmony",
      root: "Asha / Arta",
      description: "Asha is one of the central ideas in Zoroastrian wisdom."
    },
    create: {
      termId: asha.id,
      locale: "EN",
      termText: "Asha",
      meaning: "Truth, cosmic order, and ethical harmony",
      root: "Asha / Arta",
      description: "Asha is one of the central ideas in Zoroastrian wisdom."
    }
  });

  await prisma.glossaryTerm.upsert({
    where: { slug: "vohuman" },
    update: {
      term: "وهومن",
      meaning: "اندیشه نیک",
      root: "Vohu Manah",
      description: "وهومن نیروی اندیشه نیک و خرد اخلاقی است."
    },
    create: {
      term: "وهومن",
      slug: "vohuman",
      meaning: "اندیشه نیک",
      root: "Vohu Manah",
      description: "وهومن نیروی اندیشه نیک و خرد اخلاقی است."
    }
  });

  const libraryItem = await prisma.libraryItem.upsert({
    where: { title_language: { title: "راهنمای مطالعه اوستا", language: "fa" } },
    update: {
      author: "AVESTA-ZOROASTER Editorial",
      description: "نمونه آیتم کتابخانه برای PDFها و منابع پژوهشی.",
      fileUrl: "/library/avesta-reading-guide.pdf",
      coverImage: "/images/ai/library-cover.png",
      type: "PDF",
      source: "Internal"
    },
    create: {
      title: "راهنمای مطالعه اوستا",
      author: "AVESTA-ZOROASTER Editorial",
      description: "نمونه آیتم کتابخانه برای PDFها و منابع پژوهشی.",
      fileUrl: "/library/avesta-reading-guide.pdf",
      coverImage: "/images/ai/library-cover.png",
      language: "fa",
      type: "PDF",
      source: "Internal"
    }
  });

  await prisma.libraryItemTranslation.upsert({
    where: { itemId_locale: { itemId: libraryItem.id, locale: "EN" } },
    update: {
      title: "Avesta Reading Guide",
      author: "AVESTA-ZOROASTER Editorial",
      description: "Sample digital library item for PDFs and research references.",
      source: "Internal"
    },
    create: {
      itemId: libraryItem.id,
      locale: "EN",
      title: "Avesta Reading Guide",
      author: "AVESTA-ZOROASTER Editorial",
      description: "Sample digital library item for PDFs and research references.",
      source: "Internal"
    }
  });

  await prisma.mediaAsset.upsert({
    where: { slug: "yasna-sacred-fire" },
    update: {
      title: "آتش مقدس یسنا",
      type: "AI Image",
      category: "یسنا",
      description: "تصویرسازی سینمایی برای فضای یسنا با آتش آرام و نور طلایی.",
      thumbnail: "/images/ai/yasna-cover.png",
      prompt:
        "Cinematic ancient Persian temple at sunrise, sacred fire altar, Avestan script mist, gold and deep navy palette",
      mood: "طلایی، آیینی، سینمایی",
      accent: "#D6A84F",
      sectionSlug: "yasna",
      chapterSlug: "ha-1",
      verseOrder: 1,
      status: "READY"
    },
    create: {
      title: "آتش مقدس یسنا",
      slug: "yasna-sacred-fire",
      type: "AI Image",
      category: "یسنا",
      description: "تصویرسازی سینمایی برای فضای یسنا با آتش آرام و نور طلایی.",
      thumbnail: "/images/ai/gathas-cover.png",
      prompt:
        "Cinematic ancient Persian temple at sunrise, sacred fire altar, Avestan script mist, gold and deep navy palette",
      mood: "طلایی، آیینی، سینمایی",
      accent: "#D6A84F",
      sectionSlug: "yasna",
      chapterSlug: "ha-1",
      verseOrder: 1,
      status: "READY"
    }
  });

  const products = [
    {
      title: "کتاب گات‌ها، نسخه مطالعه روزانه",
      slug: "gathas-daily-study-book",
      category: "BOOK",
      excerpt: "نسخه لوکس برای مطالعه روزانه گات‌ها با جایگاه یادداشت و پیام اخلاقی.",
      description: "محصول فرهنگی برای همراهی نسخه دیجیتال سایت با مطالعه فیزیکی.",
      price: 1250000,
      status: "ACTIVE",
      inventoryStatus: "PREORDER",
      stock: 0,
      reservedStock: 0,
      lowStockAlert: 5,
      materials: ["جلد سخت", "کاغذ کرم", "طراحی طلایی"],
      tags: ["کتاب گات‌ها", "اوستا", "زرتشت"],
      seoTitle: "کتاب گات‌ها | AVESTA-ZOROASTER",
      seoDescription: "نسخه مطالعه روزانه گات‌ها برای فروشگاه فرهنگی AVESTA-ZOROASTER."
    },
    {
      title: "ماگ پندار نیک",
      slug: "good-thoughts-mug",
      category: "MUG",
      excerpt: "ماگ سرامیکی تیره با نوشته طلایی پندار نیک، گفتار نیک، کردار نیک.",
      description: "هدیه روزمره برای همراهان سایت و دوستداران فرهنگ ایران باستان.",
      price: 460000,
      status: "ACTIVE",
      inventoryStatus: "AVAILABLE",
      stock: 50,
      reservedStock: 1,
      lowStockAlert: 10,
      materials: ["سرامیک", "چاپ مقاوم", "جعبه هدیه"],
      tags: ["ماگ زرتشتی", "پندار نیک", "هدیه فرهنگی"],
      seoTitle: "ماگ پندار نیک | AVESTA-ZOROASTER",
      seoDescription: "ماگ فرهنگی با شعار پندار نیک، گفتار نیک، کردار نیک."
    },
    {
      title: "پیراهن فروهر طلایی",
      slug: "golden-faravahar-shirt",
      category: "SHIRT",
      excerpt: "تی‌شرت مشکی با نشان فروهر و تایپوگرافی AVESTA-ZOROASTER.",
      description: "پوشاک فرهنگی با زبان طراحی مدرن و رنگ‌بندی مشکی طلایی.",
      price: 890000,
      status: "ACTIVE",
      inventoryStatus: "LIMITED",
      stock: 18,
      reservedStock: 0,
      lowStockAlert: 8,
      materials: ["پنبه", "چاپ طلایی", "دوخت تقویت‌شده"],
      tags: ["پیراهن فروهر", "لباس زرتشتی", "AVESTA ZOROASTER"],
      seoTitle: "پیراهن فروهر طلایی | AVESTA-ZOROASTER",
      seoDescription: "تی‌شرت فرهنگی فروهر طلایی برای فروشگاه AVESTA-ZOROASTER."
    }
  ];

  const seededProducts = [];

  for (const product of products) {
    const savedProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
    seededProducts.push(savedProduct);
  }

  const coupons = [
    {
      code: "ASHA10",
      label: "ده درصد هدیه اشا",
      type: "PERCENT",
      amount: 10,
      status: "ACTIVE",
      usageLimit: 500
    },
    {
      code: "GATHAS250",
      label: "تخفیف ثابت گات‌ها",
      type: "FIXED",
      amount: 250000,
      status: "ACTIVE",
      usageLimit: 250
    }
  ];

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: coupon,
      create: coupon
    });
  }

  const demoOrderEmail = "buyer@example.com";
  const existingDemoOrder = await prisma.order.findFirst({
    where: { email: demoOrderEmail, notes: "Seed demo commerce order" },
    include: { payments: true, shipments: true }
  });

  const demoOrder =
    existingDemoOrder ??
    (await prisma.order.create({
      data: {
        email: demoOrderEmail,
        displayName: "خریدار نمونه",
        phone: "09120000000",
        status: "SUBMITTED",
        paymentStatus: "PENDING",
        subtotal: seededProducts.slice(0, 2).reduce((sum, product) => sum + product.price, 0),
        discountCode: "ASHA10",
        discountTotal: Math.round(seededProducts.slice(0, 2).reduce((sum, product) => sum + product.price, 0) * 0.1),
        taxTotal: Math.round(
          (seededProducts.slice(0, 2).reduce((sum, product) => sum + product.price, 0) -
            Math.round(seededProducts.slice(0, 2).reduce((sum, product) => sum + product.price, 0) * 0.1)) *
            0.09
        ),
        total:
          seededProducts.slice(0, 2).reduce((sum, product) => sum + product.price, 0) -
          Math.round(seededProducts.slice(0, 2).reduce((sum, product) => sum + product.price, 0) * 0.1) +
          Math.round(
            (seededProducts.slice(0, 2).reduce((sum, product) => sum + product.price, 0) -
              Math.round(seededProducts.slice(0, 2).reduce((sum, product) => sum + product.price, 0) * 0.1)) *
              0.09
          ) +
          85000,
        currency: "IRR",
        shippingAddress: "تهران، آدرس نمونه برای تست سفارش",
        shippingMethod: "standard",
        shippingCost: 85000,
        notes: "Seed demo commerce order",
        items: {
          create: seededProducts.slice(0, 2).map((product) => ({
            productId: product.id,
            title: product.title,
            quantity: 1,
            unitPrice: product.price,
            total: product.price
          }))
        }
      },
      include: { payments: true, shipments: true }
    }));

  if (!demoOrder.payments.length) {
    await prisma.payment.create({
      data: {
        orderId: demoOrder.id,
        provider: "demo",
        authority: `DEMO-SEED-${demoOrder.id}`,
        status: "PENDING",
        amount: demoOrder.total,
        currency: "IRR",
        callbackUrl: "/api/shop/payments/callback",
        redirectUrl: `/shop/payment/demo?order=${demoOrder.id}`,
        rawResponse: {
          source: "seed",
          message: "Demo payment row for AVESTA-ZOROASTER commerce setup"
        }
      }
    });
  }

  if (!demoOrder.shipments.length) {
    await prisma.shipment.create({
      data: {
        orderId: demoOrder.id,
        carrier: "پست پیشتاز",
        method: "پست استاندارد",
        status: "PENDING",
        trackingCode: `DEMO-TRACK-${demoOrder.id.slice(-6)}`,
        shippingCost: 85000
      }
    });
  }

  const user = await prisma.user.upsert({
    where: { email: "reader@avesta-zoroaster.com" },
    update: { displayName: "همراه اوستا" },
    create: {
      email: "reader@avesta-zoroaster.com",
      displayName: "همراه اوستا",
      passwordHash: "demo-password-hash-replace-with-bcrypt",
      role: "READER"
    }
  });

  await prisma.readingPreference.upsert({
    where: { userId: user.id },
    update: { mode: "DARK", fontSize: 18, audio: true, language: "fa" },
    create: { userId: user.id, mode: "DARK", fontSize: 18, audio: true, language: "fa" }
  });

  await prisma.readingProgress.upsert({
    where: { userId_targetUrl: { userId: user.id, targetUrl: "/avesta/yasna/ha-1/verse-1" } },
    update: { progress: 18, verseId: yasnaVerse.id, lastReadAt: new Date() },
    create: {
      userId: user.id,
      verseId: yasnaVerse.id,
      title: "هات نمونه ۱",
      targetUrl: "/avesta/yasna/ha-1/verse-1",
      progress: 18
    }
  });

  await prisma.readingProgress.upsert({
    where: { userId_targetUrl: { userId: user.id, targetUrl: "/avesta/gathas/ahunavaiti/verse-1" } },
    update: { progress: 32, verseId: gathasVerse.id, lastReadAt: new Date() },
    create: {
      userId: user.id,
      verseId: gathasVerse.id,
      title: "سرود نمونه گات‌ها",
      targetUrl: "/avesta/gathas/ahunavaiti/verse-1",
      progress: 32
    }
  });

  const bookmarks = [
    {
      title: "اشا؛ نظم راستی",
      targetType: "ARTICLE",
      targetUrl: "/articles/asha-truth-order",
      description: "مقاله کلیدی برای فهم اشا"
    },
    {
      title: "اهورامزدا",
      targetType: "GLOSSARY_TERM",
      targetUrl: "/dictionary/ahura-mazda",
      description: "واژه‌نامه مفهوم اهورامزدا"
    },
    {
      title: "یکتاپرستی، خرد و روشنایی",
      targetType: "HUB",
      targetUrl: "/monotheism",
      description: "هاب مرکزی یکتاپرستی"
    }
  ];

  for (const bookmark of bookmarks) {
    await prisma.bookmark.upsert({
      where: { userId_targetUrl: { userId: user.id, targetUrl: bookmark.targetUrl } },
      update: bookmark,
      create: { userId: user.id, ...bookmark }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
