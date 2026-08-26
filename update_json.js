const fs = require('fs');
const path = require('path');

const enNew = {
  "intro": "When speed determines outcome, KRONOS delivers air freight engineered for security and reliability, supported by technology that ensures complete traceability from origin to destination. Our expertise spans the automotive, technology, and aerospace industries, where critical, fragile cargo demands a standard of precision beyond conventional air transport.",
  "advantagesTitle": "The Kronos Advantage",
  "advantages": [
    {
      "title": "Speed without compromise",
      "desc": "the fastest mode available, compressing transit times that ground or ocean freight cannot match."
    },
    {
      "title": "Reliable, on schedule",
      "desc": "consistent on-time performance and dependable transit times across every service tier, shipment after shipment."
    },
    {
      "title": "End-to-end traceability",
      "desc": "an integrated technology platform monitors every shipment in real time, ensuring full visibility from origin to final destination."
    },
    {
      "title": "Secure by design",
      "desc": "rigorous security protocols and minimized handling reduce exposure to loss, damage, or compromise throughout the supply chain."
    },
    {
      "title": "Cargo insurance, on demand",
      "desc": "optional coverage protecting the full value of your shipment throughout transit."
    },
    {
      "title": "Built for critical cargo",
      "desc": "specialized handling for the automotive, technology, and aerospace industries, where fragile and high-value materials require precision at every stage."
    },
    {
      "title": "Global network, local execution",
      "desc": "domestic agents combined with direct access to the world’s highest-traffic airports, ensuring consistent execution across every market we serve."
    },
    {
      "title": "Customs guidance, origin to destination",
      "desc": "dedicated advisory governing every regulatory requirement across the journey."
    }
  ],
  "includedTitle": "Service Offering",
  "included": [
    {
      "title": "Economy",
      "desc": "cost-efficient air transport for shipments where flexible timelines allow for greater savings."
    },
    {
      "title": "Priority Freight",
      "desc": "expedited handling and reduced transit times for shipments where schedule certainty is critical."
    },
    {
      "title": "Next Flight Out (NFO)",
      "desc": "the fastest possible dispatch, placing time-critical cargo on the next available flight."
    }
  ]
};

const esNew = {
  "intro": "Cuando la velocidad determina el resultado, KRONOS ofrece transporte aéreo diseñado para la seguridad y la confiabilidad, respaldado por tecnología que garantiza una trazabilidad completa desde el origen hasta el destino. Nuestra experiencia abarca las industrias automotriz, tecnológica y aeroespacial, donde la carga crítica y frágil exige un estándar de precisión más allá del transporte aéreo convencional.",
  "advantagesTitle": "La Ventaja de Kronos",
  "advantages": [
    {
      "title": "Velocidad sin compromisos",
      "desc": "el modo más rápido disponible, comprimiendo los tiempos de tránsito que el transporte terrestre o marítimo no pueden igualar."
    },
    {
      "title": "Confiable, a tiempo",
      "desc": "rendimiento constante y tiempos de tránsito confiables en cada nivel de servicio, envío tras envío."
    },
    {
      "title": "Trazabilidad de extremo a extremo",
      "desc": "una plataforma tecnológica integrada monitorea cada envío en tiempo real, garantizando una visibilidad total desde el origen hasta el destino final."
    },
    {
      "title": "Seguro por diseño",
      "desc": "rigurosos protocolos de seguridad y un manejo minimizado reducen la exposición a pérdidas, daños o compromisos en toda la cadena de suministro."
    },
    {
      "title": "Seguro de carga, bajo demanda",
      "desc": "cobertura opcional que protege el valor total de su envío durante el tránsito."
    },
    {
      "title": "Diseñado para carga crítica",
      "desc": "manejo especializado para las industrias automotriz, tecnológica y aeroespacial, donde los materiales frágiles y de alto valor requieren precisión en cada etapa."
    },
    {
      "title": "Red global, ejecución local",
      "desc": "agentes nacionales combinados con acceso directo a los aeropuertos de mayor tráfico del mundo, asegurando una ejecución consistente en cada mercado que servimos."
    },
    {
      "title": "Orientación aduanera, de origen a destino",
      "desc": "asesoría dedicada que rige cada requisito regulatorio a lo largo del viaje."
    }
  ],
  "includedTitle": "Oferta de Servicios",
  "included": [
    {
      "title": "Economy",
      "desc": "transporte aéreo rentable para envíos donde los plazos flexibles permiten mayores ahorros."
    },
    {
      "title": "Priority Freight",
      "desc": "manejo acelerado y tiempos de tránsito reducidos para envíos donde la certeza del cronograma es crítica."
    },
    {
      "title": "Next Flight Out (NFO)",
      "desc": "el despacho más rápido posible, colocando carga en tiempo crítico en el próximo vuelo disponible."
    }
  ]
};

const deNew = {
  "intro": "Wenn Geschwindigkeit über den Erfolg entscheidet, liefert KRONOS Luftfracht, die auf Sicherheit und Zuverlässigkeit ausgelegt ist, unterstützt durch Technologie, die eine vollständige Rückverfolgbarkeit vom Ursprung bis zum Ziel gewährleistet. Unsere Expertise erstreckt sich auf die Automobil-, Technologie- und Luft- und Raumfahrtindustrie, wo kritische, empfindliche Fracht einen Präzisionsstandard erfordert, der über den herkömmlichen Lufttransport hinausgeht.",
  "advantagesTitle": "Der Kronos Vorteil",
  "advantages": [
    {
      "title": "Geschwindigkeit ohne Kompromisse",
      "desc": "die schnellste verfügbare Methode, die Transitzeiten verkürzt, die Straßen- oder Seefracht nicht erreichen kann."
    },
    {
      "title": "Zuverlässig, nach Plan",
      "desc": "konstante Pünktlichkeit und verlässliche Transitzeiten über jede Servicestufe hinweg, Sendung für Sendung."
    },
    {
      "title": "End-to-End Rückverfolgbarkeit",
      "desc": "eine integrierte Technologieplattform überwacht jede Sendung in Echtzeit und sorgt für volle Sichtbarkeit vom Ursprung bis zum Endziel."
    },
    {
      "title": "Sicher durch Design",
      "desc": "strenge Sicherheitsprotokolle und minimierte Handhabung reduzieren das Risiko von Verlust, Beschädigung oder Beeinträchtigung in der gesamten Lieferkette."
    },
    {
      "title": "Frachtversicherung, auf Abruf",
      "desc": "optionale Abdeckung, die den vollen Wert Ihrer Sendung während des gesamten Transits schützt."
    },
    {
      "title": "Gebaut für kritische Fracht",
      "desc": "spezielle Handhabung für die Automobil-, Technologie- und Luft- und Raumfahrtindustrie, wo empfindliche und hochwertige Materialien in jeder Phase Präzision erfordern."
    },
    {
      "title": "Globales Netzwerk, lokale Ausführung",
      "desc": "Inlandsagenten kombiniert mit direktem Zugang zu den verkehrsreichsten Flughäfen der Welt, was eine konsistente Ausführung in jedem von uns bedienten Markt gewährleistet."
    },
    {
      "title": "Zollberatung, von Ursprung bis Ziel",
      "desc": "dedizierte Beratung, die jede regulatorische Anforderung auf der gesamten Reise abdeckt."
    }
  ],
  "includedTitle": "Dienstleistungsangebot",
  "included": [
    {
      "title": "Economy",
      "desc": "kosteneffizienter Lufttransport für Sendungen, bei denen flexible Zeitpläne größere Einsparungen ermöglichen."
    },
    {
      "title": "Priority Freight",
      "desc": "beschleunigte Abwicklung und reduzierte Transitzeiten für Sendungen, bei denen Planungssicherheit entscheidend ist."
    },
    {
      "title": "Next Flight Out (NFO)",
      "desc": "die schnellstmögliche Abfertigung, bei der zeitkritische Fracht auf den nächsten verfügbaren Flug verladen wird."
    }
  ]
};

const koNew = {
  "intro": "속도가 결과를 좌우할 때, KRONOS는 보안과 신뢰성을 위해 설계된 항공 화물 운송을 제공하며, 출발지부터 목적지까지 완벽한 추적성을 보장하는 기술의 지원을 받습니다. 우리의 전문성은 중요하고 깨지기 쉬운 화물이 기존 항공 운송을 넘어서는 정밀도를 요구하는 자동차, 기술 및 항공 우주 산업에 걸쳐 있습니다.",
  "advantagesTitle": "Kronos의 이점",
  "advantages": [
    {
      "title": "타협 없는 속도",
      "desc": "육상 또는 해상 운송이 필적할 수 없는 운송 시간을 단축하는 가장 빠른 운송 수단입니다."
    },
    {
      "title": "신뢰할 수 있는 정시성",
      "desc": "모든 서비스 계층에 걸쳐 선적마다 일관된 정시 성과 및 신뢰할 수 있는 운송 시간을 제공합니다."
    },
    {
      "title": "엔드 투 엔드 추적성",
      "desc": "통합 기술 플랫폼이 모든 화물을 실시간으로 모니터링하여 출발지부터 최종 목적지까지 완벽한 가시성을 보장합니다."
    },
    {
      "title": "설계에 의한 보안",
      "desc": "엄격한 보안 프로토콜과 최소화된 취급으로 공급망 전체에서 분실, 손상 또는 훼손의 위험을 줄입니다."
    },
    {
      "title": "화물 보험, 온디맨드",
      "desc": "운송 내내 화물의 전체 가치를 보호하는 선택적 보장입니다."
    },
    {
      "title": "중요 화물을 위한 맞춤 설계",
      "desc": "깨지기 쉽고 고가의 재료가 모든 단계에서 정밀도를 요구하는 자동차, 기술 및 항공 우주 산업을 위한 특수 취급입니다."
    },
    {
      "title": "글로벌 네트워크, 현지 실행",
      "desc": "세계에서 가장 통행량이 많은 공항에 직접 접근할 수 있는 국내 대리점과 결합하여 우리가 서비스하는 모든 시장에서 일관된 실행을 보장합니다."
    },
    {
      "title": "세관 안내, 출발지에서 목적지까지",
      "desc": "여정 전반에 걸친 모든 규제 요건을 관장하는 전담 자문 서비스입니다."
    }
  ],
  "includedTitle": "서비스 제공",
  "included": [
    {
      "title": "Economy",
      "desc": "유연한 일정으로 비용 절감이 가능한 화물을 위한 비용 효율적인 항공 운송입니다."
    },
    {
      "title": "Priority Freight",
      "desc": "일정의 확실성이 중요한 화물을 위한 신속한 취급 및 운송 시간 단축입니다."
    },
    {
      "title": "Next Flight Out (NFO)",
      "desc": "시간에 민감한 화물을 이용 가능한 다음 항공편에 싣는 가장 빠른 발송입니다."
    }
  ]
};

const zhNew = {
  "intro": "当速度决定结果时，KRONOS 提供专为安全和可靠性设计的航空货运，并由确保从起点到终点完全可追溯性的技术提供支持。我们的专业知识涵盖汽车、技术和航空航天行业，在这些行业中，关键的易碎货物需要超越传统航空运输的精度标准。",
  "advantagesTitle": "Kronos的优势",
  "advantages": [
    {
      "title": "毫不妥协的速度",
      "desc": "最快的可用运输方式，压缩了陆运或海运无法比拟的运输时间。"
    },
    {
      "title": "可靠，按时",
      "desc": "在每一个服务层级中，每次装运都能保持一致的准时绩效和可靠的运输时间。"
    },
    {
      "title": "端到端可追溯性",
      "desc": "集成技术平台实时监控每批货物，确保从起点到最终目的地的全面可视化。"
    },
    {
      "title": "安全设计",
      "desc": "严格的安全协议和最少的处理步骤减少了整个供应链中丢失、损坏或妥协的风险。"
    },
    {
      "title": "按需货运保险",
      "desc": "可选保险，在整个运输过程中保护您货物的全部价值。"
    },
    {
      "title": "为关键货物打造",
      "desc": "针对汽车、技术和航空航天行业的专业处理，其中易碎和高价值材料在每个阶段都需要精确操作。"
    },
    {
      "title": "全球网络，本地执行",
      "desc": "国内代理商与直接访问世界上最繁忙的机场相结合，确保在我们服务的每一个市场中的一致执行。"
    },
    {
      "title": "海关指导，从起点到终点",
      "desc": "专门的咨询服务，管理整个旅程中的每一项监管要求。"
    }
  ],
  "includedTitle": "服务提供",
  "included": [
    {
      "title": "Economy",
      "desc": "经济高效的航空运输，适用于灵活时间表允许节省更多成本的货物。"
    },
    {
      "title": "Priority Freight",
      "desc": "对于时间确定性至关重要的货物，加快处理速度并缩短运输时间。"
    },
    {
      "title": "Next Flight Out (NFO)",
      "desc": "最快可能的发货，将时间紧迫的货物安排在下一班可用航班上。"
    }
  ]
};

const langs = [
  { file: 'en.json', data: enNew },
  { file: 'es.json', data: esNew },
  { file: 'de.json', data: deNew },
  { file: 'ko.json', data: koNew },
  { file: 'zh.json', data: zhNew },
];

for (const lang of langs) {
  const filePath = path.join(__dirname, 'messages', lang.file);
  if (fs.existsSync(filePath)) {
    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (json.Services && json.Services['air-freight']) {
      // Merge new data
      Object.assign(json.Services['air-freight'], lang.data);
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
      console.log(`Updated ${lang.file}`);
    } else {
      console.error(`Could not find Services.air-freight in ${lang.file}`);
    }
  }
}

