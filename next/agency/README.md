https://github.com/bcms/starters/assets/15079459/ceed3ea4-c6c6-40f7-9e18-746874015120

<h1 align="center">Conference with Next.js and BCMS</h1>
<p align="center"><a href="https://conference-starter.thebcms.com/">See this conference in action ⤴</a></p>
<p align="center">Spin up a fully functional conference with Next.js, Tailwind, and <a href="https://github.com/bcms/cms">BCMS</a> - in a few minutes.<br/>
Everything from submitting conference, over listing and searching them, to getting applications. All within the same codebase.</p>

---

<p align="center">
  <span>If you like the project, hit that ⭐ button</span>
</p>

---

<p align="center">Whether you are looking to build a conference for your company or a stand-alone conference website - this starter will save you weeks. You can clone this folder, connect it with your own BCMS instance, and give it a go!</p>
<br/>

<h2 align="center">How it works</h2>
<br/>

<h3 align="center">Step 1: Clone the repo</h3>
<p align="center">This repository contains a lot of starters. Enter <code>conference</code>, but make sure to check other starters too, later.</p>

```bash
git clone https://github.com/bcms/starters.git
```

<br/>
<h3 align="center">Step 2: Start BCMS (Backend)</h3>
<p align="center">This step will make sure that you are running BCMS locally and in the background, which is required before starting the Next.js development server.</p>

```bash
cd starters/cms/conference
```

<p>Run <code>docker-compose build</code> command, followed with <code>docker-compose up</code>.</p>
<p>Your BCMS instance is now up and running, and can be inspected by visiting <code>http://localhost:8080</code>.</p>

<br/>
<h3 align="center">Step 3: Start Next.js (Frontend)</h3>
<p align="center">After this step you will be able to edit the Frontend side of your starter, everything from styles, content, pages structure and much more.</p>

```bash
cd starters/next/conference
```

<p>Before anything, make sure to install node packages ( <code>npm install</code> ).</p>
<p>Run <code>npm run dev</code> command to start the local frontend development server. This will pull the data from the BCMS which is running in the background.</p>
<p>Your Next app is now up and running and can be inspected by visiting <code>http://localhost:3000</code>.</p>

---

<br>
<br>

<h2>FAQs</h2>
<h3>
  Is this Next.js starter template compatible with the latest version of
  Next.js?
</h3>
<p>
  Yes, the template is designed to be compatible with the latest version of
  Next.js. Make sure to regularly check for updates to ensure compatibility.
</p>

<h3>
  Can I integrate other headless CMS platforms besides BCMS with this starter?
</h3>
<p>
  Absolutely! While it's optimized for BCMS, the structure allows for
  integration with other headless CMS platforms. You might need to make some
  adjustments based on your chosen CMS.
</p>

<h3>How customizable is the design? Can I change the theme or colors?</h3>
<p>
  The design is highly customizable. We used Tailwind for that very reason Just
  go to [tailwind.config.js](/tailwind.config.js). There, you can easily change
  the theme, colors, fonts, and other design elements to match your brand.
</p>

<h3>Is there any built-in SEO optimization with this starter?</h3>
<p>Yes, the starter follows the SEO best practices.</p>
<img width="631" alt="image" src="https://github.com/bcms/starters/assets/15079459/1011ce99-10a7-465f-9671-cdd2792d4a34">

<h3>
  How is the performance of the website? Does it support lazy loading for
  images?
</h3>
<p>
  The website is optimized for performance. It supports lazy loading for images
  to ensure faster page loads, especially with a large number of recipes.
</p>
<img width="743" alt="image" src="https://github.com/bcms/starters/assets/15079459/3d2a47a6-d47d-41e9-86f5-ec038c1bc1a6">

<h3>Are there any pre-configured analytics or tracking tools integrated?</h3>
<p>
  The starter doesn't come with pre-configured analytics tools, but it's
  straightforward to integrate tools like Google Analytics or other tracking
  solutions.
</p>

<h3>
  I'm new to Next.js. Do you provide documentation or support for setting up the
  starter?
</h3>

Yes, the starter comes with detailed documentation to help you get started. A few useful resources:

- [BCMS documentation](https://docs.thebcms.com/integrations/next-js)
- [Official Next.js documentation](https://nextjs.org/docs)
- [Sign up to BCMS](https://cloud.thebcms.com/)

<h2>Support ❤️</h2>
<p>
  If you like the project, hit that ⭐ button !!1
</p>
