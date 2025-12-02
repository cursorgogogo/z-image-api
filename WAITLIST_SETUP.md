# Waitlist Form Setup Guide

Your Z Image API landing page now has a fully functional waitlist form! Here are three options to collect user submissions:

## Option 1: Formspree (Recommended - FREE & Easy)

**Formspree** sends form submissions directly to your email. Perfect for static sites!

### Setup Steps:

1. **Go to [formspree.io](https://formspree.io/)** and sign up for a free account

2. **Create a new form:**
   - Click "New Form"
   - Give it a name like "Z Image API Waitlist"
   - You'll get a form endpoint like: `https://formspree.io/f/xwpealbo`

3. **Update your `index.html`:**
   - Find line 1373: `<form id="waitlistForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
   - Replace `YOUR_FORM_ID` with your actual form ID
   - Example: `<form id="waitlistForm" action="https://formspree.io/f/xwpealbo" method="POST">`

4. **Test it!**
   - Submit the form
   - Check your email for the submission
   - Verify the form data is complete

### Formspree Features (Free Plan):
- ✅ 50 submissions/month
- ✅ Email notifications
- ✅ Spam filtering
- ✅ Export to CSV
- ✅ No coding required

---

## Option 2: Google Sheets (FREE Alternative)

Use Google Apps Script to save submissions to a spreadsheet.

### Setup Steps:

1. **Create a Google Sheet** for your waitlist data

2. **Open Script Editor:**
   - In your Google Sheet, go to Extensions > Apps Script

3. **Paste this code:**
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.fullName,
    data.email,
    data.company,
    data.useCase,
    data.estimatedVolume,
    data.newsletter
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. **Deploy as Web App:**
   - Click Deploy > New deployment
   - Choose "Web app"
   - Execute as: Me
   - Who has access: Anyone
   - Copy the web app URL

5. **Update `index.html`:**
   - Replace the form action with your web app URL

---

## Option 3: Netlify Forms (If hosting on Netlify)

If you deploy to Netlify, you get free form handling!

### Setup Steps:

1. **Update your form tag in `index.html`:**
```html
<form id="waitlistForm" name="waitlist" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="waitlist" />
    <!-- rest of your form fields -->
</form>
```

2. **Deploy to Netlify**
   - Forms will automatically be captured
   - View submissions in Netlify dashboard

---

## Option 4: Custom Backend (Advanced)

If you prefer your own backend:

### Update the form action in `index.html`:
```html
<form id="waitlistForm" action="https://your-api.com/api/waitlist" method="POST">
```

### Backend endpoints you could use:
- **Node.js/Express** server
- **Python/Flask** or **FastAPI**
- **Supabase** (free tier available)
- **Firebase** functions

---

## Current Fallback Behavior

**Without setup**, the form currently:
- ✅ Shows success message to user
- ✅ Stores data in browser's `localStorage`
- ✅ Logs data to browser console
- ⚠️ Does NOT email you (needs Formspree or alternative)

---

## Testing Your Setup

1. **Fill out the form** with test data
2. **Submit** and wait for success message
3. **Check your email** (if using Formspree)
4. **Verify all fields** were captured correctly

---

## Form Fields Captured

Your waitlist form collects:
- Full Name (required)
- Email Address (required)
- Company/Project (optional)
- Use Case (required)
- Estimated Monthly Volume (optional)
- Newsletter opt-in (checkbox)

---

## Recommended: Use Formspree

For most users, **Formspree is the best choice** because:
- 🚀 Takes 2 minutes to setup
- 📧 Instant email notifications
- 💰 Free forever (50 submissions/month)
- 🔒 Built-in spam protection
- 📊 Easy data export

---

## Need Help?

1. **Formspree not working?**
   - Check that you replaced `YOUR_FORM_ID` with actual ID
   - Verify form is published (not in draft mode)
   - Check spam folder for notifications

2. **Want to test locally?**
   - Form will store in `localStorage`
   - Check browser console (F12) to see submitted data
   - Success message will still show

3. **Questions?**
   - Open an issue on GitHub
   - Check Formspree documentation: https://help.formspree.io/

---

## Marketing Alternative

If you prefer **NOT to collect data** right now, you can replace the waitlist section with a marketing message. See the section below for a ready-to-use alternative.

---

## Alternative: Coming Soon Message (No Form)

If you want to show interest without collecting data yet, replace the waitlist section with this:

```html
<section id="waitlist" class="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">Coming Soon</span>
        <h2 class="text-3xl sm:text-4xl font-bold mb-6">Managed API Service Launching Q2 2025</h2>
        <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            While Z Image API is fully open-source and available now, we're building a managed cloud service for even easier integration.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div class="text-3xl font-bold mb-2">$0.02</div>
                <div class="text-white/80">per image</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div class="text-3xl font-bold mb-2">&lt; 1s</div>
                <div class="text-white/80">average response</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div class="text-3xl font-bold mb-2">99.9%</div>
                <div class="text-white/80">uptime SLA</div>
            </div>
        </div>
        <a href="https://github.com/Tongyi-MAI/Z-Image" target="_blank" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
            </svg>
            Get Started with Open Source Now
        </a>
    </div>
</section>
```

This shows your API is coming without requiring form setup!

---

**Ready to go live!** 🚀

