const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*', // Allows any origin on Render
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

const { generateAbsurdReport } = require('./reportGenerator');

const urlDatabase = new Map();

// Joke phrases based on domain
const domainJokes = {
  'youtube.com': 'procrastination-optimized',
  'linkedin.com': 'corporate-synergy-maximized',
  'instagram.com': 'dopamine-enhanced',
  'github.com': 'developer-approved-but-not-really',
  'reddit.com': 'echo-chamber-validated',
  'twitter.com': 'doomscrolling-enabled',
  'x.com': 'verified-by-blue-check',
};

// Buzzwords to randomly sprinkle
const buzzwords = [
  'enterprise-grade', 'ai-optimized', 'secure', 'blockchain-enhanced', 'cloud-native',
  'scalable', 'synergistic', 'quantum-ready', 'serverless', 'web3-integrated',
  'hyper-local', 'machine-learning-powered', 'data-driven', 'agile', 'disruptive'
];

app.post('/lengthen', (req, res) => {
  const {
    url,
    aiOptimized,
    seoBoost,
    tracking,
    blockchain,
    synergy,
    emotionalSupport
  } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'This URL lacks enterprise readiness (Please provide a URL)' });
  }

  let originalUrl;
  try {
    originalUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
  } catch (e) {
    return res.status(400).json({ error: 'This URL lacks enterprise readiness (Invalid format)' });
  }

  // Determine domain-specific joke
  const domain = originalUrl.hostname.replace('www.', '');
  const domainJoke = domainJokes[domain] || 'standard-enterprise-deployment';

  // Build the ridiculously long path
  const numBuzzwords = Math.floor(Math.random() * 4) + 2; // 2 to 5 buzzwords
  const shuffledBuzzwords = [...buzzwords].sort(() => 0.5 - Math.random());
  const selectedBuzzwords = shuffledBuzzwords.slice(0, numBuzzwords).join('-');

  let longPath = `/${selectedBuzzwords}/${domainJoke}/v2/final-final-v${Math.floor(Math.random() * 10) + 3}`;

  // Reconstruct base URL using server host
  // If run locally, it'll be something like http://localhost:3001
  let newUrl = new URL(longPath, `${req.protocol}://${req.get('host')}`);

  // Preserve original path if not just '/'
  if (originalUrl.pathname && originalUrl.pathname !== '/') {
    newUrl.searchParams.append('original_path', originalUrl.pathname);
  }

  // Add query parameters based on toggles
  if (aiOptimized) {
    newUrl.searchParams.append('ai_optimized', 'true');
    newUrl.searchParams.append('neural_net_confidence', (Math.random() * 4 + 95).toFixed(2) + '%');
    newUrl.searchParams.append('hallucination_level', 'minimal');
  }

  if (seoBoost) {
    newUrl.searchParams.append('seo_score', '9001');
    newUrl.searchParams.append('keywords', 'buy-now,subscribe,like,share');
  }

  if (tracking) {
    newUrl.searchParams.append('tracking_id', Math.random().toString(36).substring(2, 15));
    newUrl.searchParams.append('user_cohort', 'highest_LTV');
    newUrl.searchParams.append('privacy', 'lol');
  }

  if (blockchain) {
    newUrl.searchParams.append('blockchain', 'verified');
    newUrl.searchParams.append('hash', Math.random().toString(36).substring(2));
    newUrl.searchParams.append('gas_fee', 'expensive');
  }

  if (synergy) {
    newUrl.searchParams.append('synergy', 'enabled');
    newUrl.searchParams.append('management_approval', 'pending');
    newUrl.searchParams.append('action_item', 'take_offline');
  }

  if (emotionalSupport) {
    newUrl.searchParams.append('emotional_support', 'yes');
    newUrl.searchParams.append('vibe_check', 'passed');
    newUrl.searchParams.append('you_got_this', 'true');
  }

  // Save the mapping for redirect
  urlDatabase.set(newUrl.pathname + newUrl.search, originalUrl.href);

  res.json({
    originalUrl: originalUrl.href,
    enhancedUrl: newUrl.href,
    report: generateAbsurdReport(originalUrl.href, newUrl.href),
    compliance: true
  });
});

app.use((req, res, next) => {
  if (req.method !== 'GET') return next();

  const targetUrl = urlDatabase.get(req.url);
  if (targetUrl) {
    const r = Math.random();
    if (r < 0.6) {
      return res.redirect(targetUrl);
    } else if (r < 0.9) {
      return res.redirect(`https://www.google.com/search?q=site:${encodeURIComponent(targetUrl)}`);
    } else {
      setTimeout(() => {
        return res.redirect(targetUrl);
      }, Math.floor(Math.random() * 500) + 1000);
      return;
    }
  }
  res.status(404).send('<h1>404 - Enterprise Route Not Found</h1><p>Please check your synergy levels and try again.</p>');
});

app.listen(PORT, () => {
  console.log(`Enterprise Lengthining Backend running efficiently on port ${PORT}`);
});
