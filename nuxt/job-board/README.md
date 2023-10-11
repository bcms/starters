https://github.com/bcms/starters/assets/15079459/87b9145c-084f-47b0-b3b9-9f4a30ab21d9

<h1 align="center">Job board with Nuxt.js and BCMS</h1>
<p align="center">Spin up a fully functional job board with Nuxt.js, Tailwind, and <a href="https://github.com/bcms/cms">BCMS</a> - in a few minutes.<br/>
Everything from submitting jobs, over listing and searching them, to getting applications. All within the same codebase.</p>

---

<p align="center">Whether you are looking to build a job board for your company or a stand-alone job board website - this starter will save you weeks. You can clone this folder, connect it with your own BCMS instance, and give it a go!</p>
<br/>

<h2 align="center">How it works</h2>
<br/>

<h3 align="center">Step 1: Clone the repo</h3>
<p align="center">This repository contains a lot of starters. Enter <code>job-board</code>, but make sure to check other starters too, later.</p>

```bash
git clone https://github.com/bcms/starters.git
```

<br/>
<h3 align="center">Step 2: Start the CMS (Backend)</h3>
<p align="center">This step will make sure that you are running CMS locally and in the background, which is required before starting the Nuxt.js development server.</p>

```bash
cd starters/cms/job-board
```

<p>Run <code>docker-compose build</code> command, followed with <code>docker-compose up</code>.</p>
<p>Your CMS instance is now up and running, and can be inspected by visiting <code>http://localhost:8080</code>.</p>

<br/>
<h3 align="center">Step 3: Start Nuxt.js (Frontend)</h3>
<p align="center">After this step you will be able to edit the Frontend side of your starter, everything from styles, content, pages structure and much more.</p>

```bash
cd starters/nuxt/job-board
```

<p>Before anything, make sure to install node packages ( <code>npm install</code> ).</p>
<p>Run <code>npm run dev</code> command to start the local frontend development server. This will pull the data from the CMS which is running in the background.</p>
<p>Your Nuxt app is now up and running and can be inspected by visiting <code>http://localhost:3000</code>.</p>

---

<br/>
<br/>

<h2 align="center">Features</h2>
<p>Here are some of the nice features of this job board starter</p>

...
