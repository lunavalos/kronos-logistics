const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'de', 'ko', 'zh'];

const translations = {
  es: [
    { name: "Raul Lucio", role: "Local Guide", quote: "Excelente opcion en logistica especializada, atencion rápida y bien informada. Transporte sin problemas ni letras chiquitas" },
    { name: "silvia aguirre", role: "Cliente", quote: "Excelente empresa, servicio. 100% recomendada" },
    { name: "jannet escobedo", role: "Cliente", quote: "Tiene un excelente servicio . Muy recomendable" },
    { name: "Ivan SG", role: "Local Guide", quote: "Excelente servicio y atención" }
  ],
  en: [
    { name: "Raul Lucio", role: "Local Guide", quote: "Excellent specialized logistics option, fast and well-informed service. Trouble-free transport with no hidden clauses." },
    { name: "silvia aguirre", role: "Customer", quote: "Excellent company, great service. 100% recommended." },
    { name: "jannet escobedo", role: "Customer", quote: "Has excellent service. Highly recommended." },
    { name: "Ivan SG", role: "Local Guide", quote: "Excellent service and attention." }
  ],
  de: [
    { name: "Raul Lucio", role: "Local Guide", quote: "Ausgezeichnete Option für spezialisierte Logistik, schneller und gut informierter Service. Problemloser Transport ohne Kleingedrucktes." },
    { name: "silvia aguirre", role: "Kunde", quote: "Ausgezeichnetes Unternehmen, toller Service. 100% empfehlenswert." },
    { name: "jannet escobedo", role: "Kunde", quote: "Hat einen ausgezeichneten Service. Sehr zu empfehlen." },
    { name: "Ivan SG", role: "Local Guide", quote: "Ausgezeichneter Service und Betreuung." }
  ],
  ko: [
    { name: "Raul Lucio", role: "Local Guide", quote: "전문 물류를 위한 탁월한 선택, 빠르고 정확한 서비스. 숨겨진 조항 없는 문제없는 운송." },
    { name: "silvia aguirre", role: "고객", quote: "훌륭한 회사, 훌륭한 서비스. 100% 추천합니다." },
    { name: "jannet escobedo", role: "고객", quote: "우수한 서비스를 제공합니다. 강력히 추천합니다." },
    { name: "Ivan SG", role: "Local Guide", quote: "훌륭한 서비스와 고객 지원." }
  ],
  zh: [
    { name: "Raul Lucio", role: "Local Guide", quote: "专业的物流选择，服务快捷且信息准确。运输无忧，没有隐藏条款。" },
    { name: "silvia aguirre", role: "客户", quote: "优秀的公司，一流的服务。100% 推荐。" },
    { name: "jannet escobedo", role: "客户", quote: "服务非常出色。强烈推荐。" },
    { name: "Ivan SG", role: "Local Guide", quote: "优秀的服务和态度。" }
  ]
};

locales.forEach(locale => {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.CTA) {
      // Remove old single-review fields if any
      delete data.CTA.quote;
      delete data.CTA.name;
      delete data.CTA.role;
      
      // Add reviews array
      data.CTA.reviews = translations[locale];
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated CTA reviews in ${locale}.json`);
    }
  }
});
