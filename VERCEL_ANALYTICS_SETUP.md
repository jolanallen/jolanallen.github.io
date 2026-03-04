# Vercel Web Analytics Setup Guide

This guide explains how to enable Vercel Web Analytics on your Hexo blog.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com/signup if you don't have one)
2. Your Hexo blog deployed to Vercel
3. The `@vercel/analytics` package (already added to package.json)

## Step 1: Enable Web Analytics in Vercel Dashboard

1. Go to your [Vercel dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Analytics** tab
4. Click **Enable** from the dialog

> **Note:** Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

## Step 2: Enable Analytics in Your Hexo Configuration

Open the `_config.butterfly.yml` file and find the Analytics section (around line 570).

Change:
```yaml
# Vercel Web Analytics
# https://vercel.com/docs/analytics
# Enable this after deploying to Vercel and enabling Web Analytics in your project settings
vercel_analytics: false
```

To:
```yaml
# Vercel Web Analytics
# https://vercel.com/docs/analytics
# Enable this after deploying to Vercel and enabling Web Analytics in your project settings
vercel_analytics: true
```

## Step 3: Deploy Your Site

Deploy your updated site to Vercel:

```bash
# Build locally to test
npm run build

# Deploy to Vercel
vercel deploy

# Or if using Git deployment, just push to your repository
git add .
git commit -m "Enable Vercel Web Analytics"
git push
```

## Step 4: Verify Installation

After deployment:

1. Visit your live site
2. Open your browser's Developer Tools (F12)
3. Go to the Network tab
4. Reload the page
5. Look for a request to `/_vercel/insights/view` or `/_vercel/insights/script.js`
6. If you see this request, Web Analytics is working correctly!

## Step 5: View Your Data

Once your site is live and receiving visitors:

1. Go to your [Vercel dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Analytics** tab
4. After a few hours/days, you'll see visitor data and can filter by various metrics

## Implementation Details

This implementation uses the HTML/JavaScript version of Vercel Web Analytics, which:

- Works with static sites (like Hexo)
- Automatically tracks page views
- Respects user privacy
- Has no impact on site performance
- Does not require additional configuration for route tracking in Hexo

## What Was Added

1. **Package**: Added `@vercel/analytics` to `package.json`
2. **Template**: Modified `themes/butterfly/layout/includes/head/analytics.pug` to include the Vercel Analytics script
3. **Configuration**: Added `vercel_analytics` option to `_config.butterfly.yml`

## Privacy & Compliance

Vercel Web Analytics is privacy-friendly and complies with GDPR and other regulations. Learn more at:
https://vercel.com/docs/analytics/privacy-policy

## Troubleshooting

### Analytics not showing data

- Wait at least a few hours after enabling for data to appear
- Make sure you've enabled Analytics in the Vercel dashboard
- Verify the `vercel_analytics: true` setting in `_config.butterfly.yml`
- Check that your deployment was successful
- Use browser DevTools to confirm the script is loading

### Script not loading

- Ensure you're accessing your site via the Vercel deployment URL
- Clear your browser cache
- Check that the `/_vercel/insights/script.js` route is accessible

## Additional Resources

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Vercel Analytics Pricing](https://vercel.com/docs/analytics/limits-and-pricing)
- [Custom Events](https://vercel.com/docs/analytics/custom-events)
- [Filtering Data](https://vercel.com/docs/analytics/filtering)
