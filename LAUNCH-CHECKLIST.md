# Koeo Website Launch Checklist

**Target Launch Date:** 3 weeks from now  
**Last Updated:** December 8, 2025

---

## 🔴 Critical (Must Fix Before Launch)

### Security & Credentials
- [ ] **Rotate Airtable API key** - Current key may have been exposed
- [ ] **Rotate Vercel Blob token** - Regenerate for production
- [ ] **Set environment variables in Vercel Dashboard:**
  - `AIRTABLE_API_KEY`
  - `AIRTABLE_BASE_ID`
  - `BLOB_READ_WRITE_TOKEN`
- [ ] **Remove `.env.local` from any backups** - Contains sensitive data

### Domain & DNS
- [ ] **Configure custom domain** (`koeo.ai`) in Vercel
- [ ] **Set up SSL certificate** (automatic with Vercel)
- [ ] **Configure www redirect** (www.koeo.ai → koeo.ai or vice versa)

---

## 🟠 High Priority (Should Fix Before Launch)

### Code Cleanup
- [x] **Update package.json name** - ~~Change `"name": "nextjs"` → `"name": "koeo-www"`~~ Done ✓
- [x] **Add test artifacts to .gitignore** - Done ✓

### Broken/Missing Links to Fix
| Link | Location | Status | Action |
|------|----------|--------|--------|
| `/whitepaper.pdf` | Homepage hero (EN/FR) | ❌ Missing | Create or remove link |
| `/docs/api` | Homepage "View API Docs" | ❌ Missing | Create docs page or remove |
| `https://github.com/koeo-ai/feedback` | Footer | ⚠️ Verify | Ensure repo exists and is public |
| `https://github.com/koeo-ai/feedback/issues` | Footer | ⚠️ Verify | Ensure issues are enabled |

### External Links to Verify
| Link | Location | Action |
|------|----------|--------|
| `https://twitter.com/koeo_ai` | SEO config, Footer | Verify account exists |
| `https://linkedin.com/company/koeoai` | SEO config | Verify page exists |
| `https://discord.gg/koeo` | SEO config | Verify invite link works |
| `https://github.com/koeoai` | SEO config | Verify org exists |
| `https://www.reddit.com/r/koeo/` | SEO config | Verify subreddit exists |
| `mailto:hello@koeo.ai` | Contact links | Verify email is set up |

---

## 🟡 Medium Priority (Recommended Before Launch)

### French Translation Review
Review these files for natural-sounding French:

#### Homepage (`content/fr/homepage.ts`)
- [ ] "Nous nous occupons de la complexité GPU" - Consider: "Nous gérons la complexité GPU"
- [ ] "sans tracas d'infrastructure" - Good ✓
- [ ] "Trop de pièces mobiles" - Consider: "Trop de composants à gérer"
- [ ] "L'infrastructure vole le focus" - Consider: "L'infrastructure détourne l'attention"

#### Beta Page (`content/fr/beta.ts`)
- [ ] "Postulez pour notre bêta privée" - Good ✓
- [ ] "Nous intégrons les équipes progressivement" - Good ✓

#### Forms (`content/fr/forms.ts`)
- [ ] "courriel" vs "email" - Decide on consistency (courriel is more formal Quebec French)
- [ ] "téléverser" vs "télécharger" - téléverser is correct for upload ✓
- [ ] Review all form labels for natural phrasing

#### Navigation (`content/fr/navigation.ts`)
- [x] ~~**Bug:** French nav links missing `/fr` prefix~~ - Fixed ✓

#### About Page (`content/fr/about.ts`)
- [ ] "Rendez-le sans effort" - Consider: "Simplifiez tout"
- [ ] "tissu de confiance" - Consider: "réseau de confiance" (fabric → réseau)

#### Product Page (`content/fr/product.ts`)
- [ ] "Runtime d'inférence Koeo" - Good ✓
- [ ] "serverless" - Keep as-is (tech term) or use "sans serveur"

#### Providers Page (`content/fr/providers.ts`)
- [ ] "Devenez fournisseur GPU" - Good ✓
- [ ] Review FAQ answers for natural phrasing

---

## 🔵 SEO & Analytics Setup

### Google Search Console
- [ ] **Verify domain ownership** in Google Search Console
- [ ] **Submit sitemap** (`https://koeo.ai/sitemap.xml`)
- [ ] **Request indexing** for key pages
- [ ] **Set preferred domain** (with or without www)

### Google Analytics / Vercel Analytics
- [ ] **Enable Vercel Analytics** (recommended - zero config)
- [ ] OR **Set up Google Analytics 4:**
  - Create GA4 property
  - Add tracking code to `app/layout.tsx`
  - Configure goals/conversions for form submissions

### Bing Webmaster Tools
- [ ] **Verify domain** in Bing Webmaster Tools
- [ ] **Submit sitemap**

### Social Media Verification
- [ ] **Twitter Card Validator** - Test OG tags at cards-dev.twitter.com
- [ ] **Facebook Sharing Debugger** - Test at developers.facebook.com/tools/debug
- [ ] **LinkedIn Post Inspector** - Test at linkedin.com/post-inspector

### SEO Verification Checklist
- [x] Sitemap generated at `/sitemap.xml`
- [x] Robots.txt at `/robots.txt`
- [x] Hreflang tags for EN/FR
- [x] OG tags with locale
- [x] Canonical URLs
- [x] Meta descriptions on all pages
- [ ] **Test with Lighthouse** - Aim for 90+ SEO score
- [ ] **Test with ahrefs/SEMrush** (optional)

---

## 🟢 Pre-Launch Testing

### Functional Testing
- [ ] **Test all forms:**
  - Beta signup form (EN + FR)
  - Career application form (EN + FR)
  - Partner signup form (EN + FR)
- [ ] **Verify Airtable integration** - Records created correctly
- [ ] **Test file upload** - Resume upload works
- [ ] **Test language switcher** - Preserves path correctly
- [ ] **Test language suggestion banner** - Shows for French browsers

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing
- [ ] **Run Lighthouse audit** - Target scores:
  - Performance: 90+
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100
- [ ] **Test Core Web Vitals:**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

### Accessibility Testing
- [ ] **Keyboard navigation** - All interactive elements reachable
- [ ] **Screen reader test** - VoiceOver/NVDA
- [ ] **Color contrast** - WCAG AA compliance
- [ ] **Focus indicators** - Visible on all interactive elements

---

## 📋 Deployment Checklist

### Vercel Configuration
- [ ] **Production branch** set to `main`
- [ ] **Environment variables** configured for production
- [ ] **Custom domain** configured and verified
- [ ] **Analytics** enabled (optional)
- [ ] **Speed Insights** enabled (optional)

### Post-Deployment Verification
- [ ] **All pages load** (EN + FR)
- [ ] **Forms submit successfully**
- [ ] **Images load correctly**
- [ ] **No console errors**
- [ ] **SSL certificate valid**
- [ ] **Redirects work** (if any)

---

## 📝 Content Checklist

### Legal Pages (if needed)
- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Cookie Policy (if using analytics)

### Contact Information
- [ ] `hello@koeo.ai` email configured
- [ ] Social media accounts created and linked

---

## 🚀 Launch Day

### Morning of Launch
- [ ] Final deployment to production
- [ ] Verify all environment variables
- [ ] Test critical user flows one more time
- [ ] Monitor error logs

### After Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Announce on social media
- [ ] Monitor analytics for first 24 hours
- [ ] Check for any 404 errors in logs

---

## ✅ Current Status Summary

| Category | Status |
|----------|--------|
| CI/CD Pipeline | ✅ All checks pass (lint, types, 264 tests, build) |
| i18n | ✅ EN + FR fully implemented |
| SEO | ✅ Sitemap, robots.txt, hreflang, OG tags |
| Security Headers | ✅ CSP, X-Frame-Options, etc. |
| Forms | ✅ Beta, Career, Partner forms working |
| Accessibility | ✅ ARIA labels, semantic HTML |
| Performance | ✅ Image optimization, security headers |

---

## Notes

- The middleware deprecation warning (`"middleware" file convention is deprecated`) is informational and doesn't affect functionality
- Canvas warnings in tests are expected (jsdom limitation) and don't affect production
