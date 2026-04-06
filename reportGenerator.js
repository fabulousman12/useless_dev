function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomFloat(min, max, decimals = 2) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function generateAbsurdReport(originalUrl, enhancedUrl) {
  const levels = ["low", "medium", "high", "overkill", "unnecessary"];
  const quantum = ["yes", "no", "pending", "spiritually aligned"];
  const enterprise = ["certified", "overqualified", "questionable"];
  const intents = [
    "procrastinating heavily", 
    "debugging life choices", 
    "pretending to work", 
    "attempting synergy", 
    "lost in the cyber-sauce"
  ];
  const conclusions = [
    "We did a lot. It achieved nothing.",
    "Optimization complete. Purpose unclear.",
    "System performance improved. Usability decreased."
  ];
  const recommendations = [
    "Refactor immediately.",
    "Add more blockchain.",
    "Consider a career in agriculture.",
    "Pivot to Web4.",
    "Drink some water and reflect."
  ];

  return {
    report_id: `ENT-${Math.random().toString(36).substring(2, 10).toUpperCase()}-V2`,
    timestamp: new Date().toISOString(),
    
    summary: {
      ai_confidence_score: `${(Math.random() * 90 + 90).toFixed(2)}%`,
      optimization_level: getRandomItem(levels),
      executive_summary: getRandomItem(conclusions)
    },

    metrics: {
      original_length: originalUrl.length,
      enhanced_length: enhancedUrl.length,
      length_increase_factor: (enhancedUrl.length / originalUrl.length).toFixed(4),
      productivity_impact: `${getRandomFloat(-100, 400)}%`
    },

    compliance: {
      ai_ready: Math.random() > 0.1,
      blockchain_secured: Math.random() > 0.2,
      quantum_compatible: getRandomItem(quantum),
      enterprise_grade: getRandomItem(enterprise)
    },

    user_intent_analysis: {
      confidence: getRandomItem(["low", "medium", "high", "very confused"]),
      predicted_intent: getRandomItem(intents),
      recommendation: getRandomItem(recommendations)
    },

    redirect_behavior: {
      success_probability: `${Math.floor(Math.random() * 31) + 60}%`, // 60-90%
      google_redirect_probability: `${Math.floor(Math.random() * 31) + 10}%`, // 10-40%
      reason: "Quantum fluctuations in the routing sub-layer dictated this outcome."
    },

    blockchain_status: {
      hash: "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      gas_fee: `${(Math.random() * 0.005).toFixed(6)} ETH`,
      network: getRandomItem(["mainnet", "testnet", "unknown"]),
      verified: Math.random() > 0.05
    },

    ai_explanation: "By utilizing a multi-layered convolutional neural network mapped onto a hyper-dimensional latent space, the AI has successfully determined the path of maximum resistance. It appended mathematically proven buzzwords directly into the URL schema, guaranteeing robust enterprise compliance while exponentially increasing latency.",

    version_history: [
      "v1",
      "v2",
      "v2-final",
      "v2-final-final",
      "v2-final-final-REV1",
      "v2-final-final-REV1-use-this"
    ],

    environmental_impact: {
      co2_emitted: `${getRandomFloat(10, 500)}g`,
      trees_affected: parseFloat(getRandomFloat(0.0001, 0.001, 5)),
      guilt_level: getRandomItem(["low", "moderate", "severe"])
    },

    warnings: [
      "URL length exceeds optimal human readability standard ISO-9001.",
      "Attempting to memorize this URL may cause brain buffer overflow."
    ],

    legal_disclaimer: "This report is not accurate, useful, or legally binding in any universe."
  };
}

module.exports = { generateAbsurdReport };
