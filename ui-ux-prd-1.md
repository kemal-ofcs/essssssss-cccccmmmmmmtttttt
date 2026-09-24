kode ini untuk SCR-01: CS/CRM Core Workspace di prd-1.md

<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface-variant": "#d3e4fe", "outline-variant": "#c6c6cd", "on-primary": "#ffffff", "on-error-container": "#93000a", "error-container": "#ffdad6", "on-tertiary-fixed": "#2f1500", "surface-tint": "#565e74", "surface-dim": "#cbdbf5", "on-secondary-container": "#fefcff", "surface-container-high": "#dce9ff", "inverse-primary": "#bec6e0", "on-surface": "#0b1c30", "surface-bright": "#f8f9ff", "background": "#f8f9ff", "outline": "#76777d", "tertiary-container": "#2f1500", "surface-container-highest": "#d3e4fe", "tertiary-fixed-dim": "#ffb77d", "on-tertiary": "#ffffff", "on-secondary-fixed-variant": "#003ea8", "inverse-on-surface": "#eaf1ff", "on-surface-variant": "#45464d", "tertiary": "#000000", "secondary-container": "#316bf3", "on-background": "#0b1c30", "inverse-surface": "#213145", "on-secondary-fixed": "#00174b", "on-tertiary-fixed-variant": "#6e3900", "on-secondary": "#ffffff", "error": "#ba1a1a", "primary-fixed": "#dae2fd", "surface": "#f8f9ff", "primary-fixed-dim": "#bec6e0", "surface-container-low": "#eff4ff", "on-error": "#ffffff", "surface-container-lowest": "#ffffff", "on-primary-container": "#7c839b", "on-primary-fixed": "#131b2e", "primary": "#000000", "primary-container": "#131b2e", "secondary": "#0051d5", "tertiary-fixed": "#ffdcc3", "secondary-fixed": "#dbe1ff", "on-tertiary-container": "#c76c00", "surface-container": "#e5eeff", "on-primary-fixed-variant": "#3f465c", "secondary-fixed-dim": "#b4c5ff" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "gutter-dense": "0.375rem", "gutter": "0.75rem", "space-md": "0.5rem", "margin": "1rem", "space-lg": "0.75rem", "space-sm": "0.25rem", "space-xs": "0.125rem", "space-xl": "1rem" }, "fontFamily": { "body-md": [ "Plus Jakarta Sans" ], "headline-xl": [ "Plus Jakarta Sans" ], "headline-lg": [ "Plus Jakarta Sans" ], "label-caps": [ "JetBrains Mono" ], "code-md": [ "JetBrains Mono" ], "code-sm": [ "JetBrains Mono" ], "body-sm": [ "Plus Jakarta Sans" ], "headline-md": [ "Plus Jakarta Sans" ], "code-lg": [ "JetBrains Mono" ] }, "fontSize": { "body-md": [ "13px", { "lineHeight": "18px", "letterSpacing": "0em", "fontWeight": "400" } ], "headline-xl": [ "24px", { "lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "700" } ], "headline-lg": [ "18px", { "lineHeight": "24px", "letterSpacing": "-0.015em", "fontWeight": "600" } ], "label-caps": [ "10px", { "lineHeight": "12px", "letterSpacing": "0.08em", "fontWeight": "600" } ], "code-md": [ "12px", { "lineHeight": "16px", "letterSpacing": "0em", "fontWeight": "500" } ], "code-sm": [ "11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" } ], "body-sm": [ "12px", { "lineHeight": "16px", "letterSpacing": "0em", "fontWeight": "400" } ], "headline-md": [ "15px", { "lineHeight": "20px", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "code-lg": [ "13px", { "lineHeight": "18px", "letterSpacing": "-0.01em", "fontWeight": "500" } ] } } } };</script></head><body class="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col overflow-x-hidden">
<!-- HEADER BAR -->
<header class="sticky top-0 z-50 w-full min-h-14 bg-surface-container-lowest flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.04)] gap-2">
<div class="flex items-center gap-space-lg flex-wrap">
<div class="flex items-center gap-space-sm pl-space-xs shrink-0">
<span class="material-symbols-outlined text-secondary text-[20px]">precision_manufacturing</span>
<span class="font-headline-md text-headline-md tracking-tight text-on-surface font-bold">MaklonOS</span>
<span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-on-surface-variant uppercase">Core v2.4</span>
</div>
<div class="hidden sm:block h-4 w-[1px] bg-surface-container"></div>
<button class="flex items-center gap-space-md bg-surface-container-low hover:bg-surface-container px-space-lg py-space-xs rounded text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" type="button">
<span class="material-symbols-outlined text-[16px]">search</span>
<span class="font-body-sm text-body-sm">Cari Client, Batch, SPK...</span>
<span class="font-label-caps text-label-caps bg-surface-container-lowest px-space-xs rounded text-on-surface-variant border border-surface-container hidden md:inline">CTRL+K</span>
</button>
</div>
<div class="flex items-center gap-space-md sm:gap-space-lg flex-wrap ml-auto">
<div class="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-0.5 rounded border border-surface-container">
<span class="h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
<span class="font-code-sm text-code-sm text-on-surface-variant">SQLite Sync: <span class="text-on-surface font-semibold">0 pending txns</span></span>
</div>
<div class="hidden md:flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm">
<span class="material-symbols-outlined text-[16px]">schedule</span>
<span>14:32:08 WIB</span>
</div>
<div class="hidden sm:block h-4 w-[1px] bg-surface-container"></div>
<div class="flex items-center gap-space-md">
<div class="text-right hidden sm:block">
<div class="font-headline-md text-headline-md text-on-surface leading-none">Rian CS Head</div>
<div class="font-label-caps text-label-caps text-secondary uppercase">Lead Dispatcher</div>
</div>
<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-on-primary text-[18px]">person</span>
</div>
<button class="p-space-xs text-error hover:bg-error-container hover:text-on-error-container rounded transition-colors" title="Force Logout" type="button">
<span class="material-symbols-outlined text-[18px]">power_settings_new</span>
</button>
</div>
</div>
</header>
<!-- MAIN OUTER WRAPPER (SHELL & NAVIGATION) -->
<div class="min-h-[calc(100vh-3.5rem)] w-full flex flex-col md:flex-row overflow-x-hidden flex-1">
<!-- RESPONSIVE SIDEBAR -->
<aside class="w-full md:w-64 shrink-0 max-w-full bg-surface-container-lowest border-b md:border-b-0 md:border-r border-surface-container flex flex-col justify-between overflow-y-auto z-40">
<div class="p-space-md">
<div class="font-label-caps text-label-caps text-on-surface-variant px-space-sm mb-space-sm tracking-wider uppercase">Siklus Operasional Maklon</div>
<nav class="flex flex-col gap-0.5" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded">
<a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="cs-crm-core" href="#">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-[18px]">support_agent</span>
<span>CS &amp; CRM Core</span>
</div>
<span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M1</span>
</a>
<a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="lead-intake-segmentasi" href="#">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-[18px]">filter_alt</span>
<span>Lead Intake &amp; Segmentasi</span>
</div>
<span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M2</span>
</a>
<a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="sample-tracker-revision-counter" href="#">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-[18px]">science</span>
<span>Sample Tracker &amp; Rev</span>
</div>
<span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M3</span>
</a>
<a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="katalog-formulasi-moq" href="#">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-[18px]">inventory_2</span>
<span>Katalog Formulasi &amp; MOQ</span>
</div>
<span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M4</span>
</a>
<div class="my-space-sm border-t border-surface-container"></div>
<div class="font-label-caps text-label-caps text-on-surface-variant px-space-sm mb-space-xs tracking-wider uppercase">Lanjutan Pipeline</div>
<a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="rnd-lab-sample-queue" href="#">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-[18px]">biotech</span>
<span>RnD Lab &amp; Queue (Fase 2)</span>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant">v2</span>
</a>
<a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="ppic-lantai-produksi" href="#">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-[18px]">factory</span>
<span>PPIC &amp; Produksi (Fase 3)</span>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant">v3</span>
</a>
<a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="audit-log-device-sessions" href="#">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-[18px]">security</span>
<span>Audit Log &amp; Sessions</span>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant">REC</span>
</a>
</nav>
</div>
<div class="p-space-md border-t border-surface-container bg-surface-container-low">
<div class="flex items-center justify-between text-on-surface-variant">
<span class="font-label-caps text-label-caps uppercase">Terminal ID</span>
<span class="font-code-sm text-code-sm font-semibold text-on-surface">WS-SBY-048</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant mt-0.5">
<span class="font-label-caps text-label-caps uppercase">Engine Cache</span>
<span class="font-code-sm text-code-sm text-secondary font-semibold">WAL 64MB OK</span>
</div>
</div>
</aside>
<!-- FLUID MAIN CONTENT AREA -->
<main class="flex-1 min-w-0 p-3 sm:p-4 md:p-6 overflow-y-auto overflow-x-hidden bg-background">
<div class="flex flex-col w-full gap-space-lg pb-16">
<!-- FORENSIC GATE LOCK BANNER -->
<section class="w-full bg-error-container text-on-error-container rounded p-space-md shadow-sm relative overflow-hidden break-words">
<div class="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)] pointer-events-none"></div>
<div class="relative flex flex-wrap items-center justify-between gap-3">
<div class="flex items-center gap-space-md min-w-0 flex-1">
<div class="w-8 h-8 rounded bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">lock</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-sm flex-wrap">
<span class="font-label-caps text-label-caps uppercase bg-error text-on-error px-space-xs py-0.5 rounded font-bold">Hard Gate: Finance Lock</span>
<span class="font-code-sm text-code-sm font-bold text-error tracking-tight">ERR-SEC-DP50-092</span>
<span class="text-on-error-container font-label-caps text-label-caps uppercase bg-surface-container-lowest px-space-xs py-0.5 rounded">Maklon Ledger Gating</span>
</div>
<p class="font-body-md text-body-md text-on-error-container font-medium mt-0.5 break-words">
                FINANCIAL GATE ACTIVE: 3 sample formulations are locked from production dispatch until 50% R&amp;D DP is verified by Finance.
              </p>
</div>
</div>
<div class="flex items-center gap-space-sm shrink-0 flex-wrap">
<button class="flex items-center gap-space-xs bg-surface-container-lowest text-on-surface hover:bg-surface-container-high px-space-md py-space-xs rounded font-body-sm text-body-sm font-semibold shadow-sm transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">receipt_long</span>
<span>View Ledger</span>
</button>
<button class="flex items-center gap-space-xs bg-error text-on-error hover:bg-on-error-container px-space-md py-space-xs rounded font-body-sm text-body-sm font-semibold shadow-sm transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">key</span>
<span>Override with Superadmin Token</span>
</button>
</div>
</div>
</section>
<!-- RESPONSIVE TOP KPI METRICS GRID -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
<!-- Card 1: Active Leads -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between text-on-surface-variant">
<span class="font-label-caps text-label-caps uppercase tracking-wider">Active Pipeline &amp; Intake</span>
<span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-secondary font-semibold">STAGE 01-04</span>
</div>
<div class="my-space-sm flex items-baseline justify-between">
<span class="font-code-lg text-headline-xl font-bold text-on-surface">142</span>
<div class="flex items-center gap-0.5 text-secondary font-code-sm text-code-sm bg-surface-container-high px-space-xs py-0.5 rounded font-semibold">
<span class="material-symbols-outlined text-[14px]">trending_up</span>
<span>+18.4% WoW</span>
</div>
</div>
<div class="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>26 awaiting initial CS audit</span>
<span class="font-code-sm text-code-sm text-on-surface">94 Qualified</span>
</div>
</div>
<!-- Card 2: Sample Prototypes In-Queue -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between text-on-surface-variant">
<span class="font-label-caps text-label-caps uppercase tracking-wider">Lab Prototypes Queue</span>
<span class="font-label-caps text-label-caps bg-tertiary-fixed text-on-tertiary-fixed px-space-xs py-0.5 rounded font-semibold">RnD BATCH 28</span>
</div>
<div class="my-space-sm flex items-baseline justify-between">
<span class="font-code-lg text-headline-xl font-bold text-on-surface">38</span>
<span class="font-code-sm text-code-sm text-on-tertiary-container bg-tertiary-fixed px-space-xs py-0.5 rounded font-semibold">4 Rev-Exhausted</span>
</div>
<div class="w-full bg-surface-container h-1.5 rounded overflow-hidden flex">
<div class="bg-secondary h-full" style="width: 68%;"></div>
<div class="bg-tertiary-container h-full" style="width: 22%;"></div>
<div class="bg-error h-full" style="width: 10%;"></div>
</div>
<div class="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm mt-1">
<span>Avg. Turnaround: 4.2d</span>
<span class="font-code-sm text-code-sm text-error font-semibold">2 Critical SLA</span>
</div>
</div>
<!-- Card 3: GateLock Alerts -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between text-on-surface-variant">
<span class="font-label-caps text-label-caps uppercase tracking-wider">GateLock Dispatch Blocker</span>
<span class="font-label-caps text-label-caps bg-error-container text-on-error-container px-space-xs py-0.5 rounded font-bold">3 STRICT LOCKS</span>
</div>
<div class="my-space-sm flex items-baseline justify-between">
<span class="font-code-lg text-headline-xl font-bold text-error">03</span>
<span class="font-code-sm text-code-sm text-error bg-error-container px-space-xs py-0.5 rounded font-semibold">Rp 148.500.000</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Pending DP reconciliation</span>
<span class="font-label-caps text-label-caps text-error underline cursor-pointer">Auto-Halt Active</span>
</div>
</div>
<!-- Card 4: Local SQLite State -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between text-on-surface-variant">
<span class="font-label-caps text-label-caps uppercase tracking-wider">Local SQLite Storage</span>
<span class="flex items-center gap-1 font-label-caps text-label-caps text-secondary font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
              OPFS WASM
            </span>
</div>
<div class="my-space-sm flex items-baseline justify-between">
<span class="font-code-lg text-headline-xl font-bold text-on-surface">100%</span>
<span class="font-code-sm text-code-sm bg-surface-container-high text-secondary px-space-xs py-0.5 rounded font-semibold">Latency 4ms</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span class="font-code-sm text-code-sm">IndexedDB/VFS Mirror</span>
<span class="font-code-sm text-code-sm text-on-surface font-semibold">0 unsynced txns</span>
</div>
</div>
</section>
<!-- TWO-COLUMN RESPONSIVE DASHBOARD BODY -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 items-start">
<!-- PRIMARY TABLE / INTAKE PIPELINE MATRIX (xl:col-span-8) -->
<div class="xl:col-span-8 flex flex-col gap-space-md bg-surface-container-lowest p-3 sm:p-4 rounded shadow-sm min-w-0">
<!-- Grid Header & Filters -->
<div class="flex flex-col gap-space-sm">
<div class="flex items-center justify-between flex-wrap gap-space-sm">
<div>
<h2 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Active Intake Pipeline Matrix</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">Real-time maklon client queue with automatic SLA triggers and staged formulation checks</p>
</div>
<div class="flex items-center gap-space-xs flex-wrap">
<span class="font-code-sm text-code-sm bg-surface-container px-space-sm py-1 rounded text-on-surface-variant">
                  Showing <span class="font-bold text-on-surface">6 of 142</span> records
                </span>
<button class="bg-primary text-on-primary hover:bg-on-primary-fixed-variant px-space-md py-1 rounded font-body-sm text-body-sm flex items-center gap-space-xs font-semibold shadow-sm transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">add_circle</span>
<span>New Lead Intake</span>
<kbd class="font-code-sm text-label-caps bg-primary-container text-on-primary-container px-1 py-0.2 rounded ml-1 hidden sm:inline">Ctrl+N</kbd>
</button>
</div>
</div>
<!-- Inline Filters Strip -->
<div class="flex items-center justify-between flex-wrap gap-space-sm bg-surface-container-low p-space-sm rounded">
<div class="flex items-center gap-space-sm flex-wrap">
<!-- Filter: Category -->
<div class="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded shadow-sm">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Category:</span>
<select class="bg-transparent font-code-sm text-code-sm text-on-surface font-semibold focus:outline-none cursor-pointer">
<option>All Formats (142)</option>
<option selected="">Skincare (64)</option>
<option>Bodycare (31)</option>
<option>Haircare (28)</option>
<option>Perfumery (19)</option>
</select>
</div>
<!-- Filter: Segment -->
<div class="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded shadow-sm">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Client Tier:</span>
<select class="bg-transparent font-code-sm text-code-sm text-on-surface font-semibold focus:outline-none cursor-pointer">
<option selected="">All Tiers</option>
<option>Enterprise (MOQ &gt; 10k)</option>
<option>Beauty Clinic / Medis</option>
<option>Indie Brand / Startup</option>
</select>
</div>
<!-- Filter: MOQ Range -->
<div class="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded shadow-sm">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Target MOQ:</span>
<span class="font-code-sm text-code-sm text-on-surface font-semibold">&gt;= 5.000 pcs</span>
</div>
</div>
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">filter_list</span>
<button class="font-code-sm text-code-sm text-secondary hover:underline font-semibold">Reset Filters</button>
</div>
</div>
</div>
<!-- DEDICATED OVERFLOW WRAPPER FOR TABLE -->
<div class="w-full overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
<table class="w-full text-left border-collapse min-w-[640px]">
<thead>
<tr class="bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps uppercase">
<th class="py-space-sm px-space-sm">ID &amp; Client Brand</th>
<th class="py-space-sm px-space-sm">Category / SKU Concept</th>
<th class="py-space-sm px-space-sm text-right">Target MOQ</th>
<th class="py-space-sm px-space-sm">Stage Progression Pipeline</th>
<th class="py-space-sm px-space-sm text-center">Rev Cycle</th>
<th class="py-space-sm px-space-sm text-center">Gate Clearance</th>
<th class="py-space-sm px-space-sm text-right">Action</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container text-body-sm font-body-sm">
<!-- Row 1: Active Locked -->
<tr class="hover:bg-surface-container-low transition-colors bg-error-container/10">
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-code-md text-code-md font-bold text-on-surface">LEAD-2024-0891</span>
<span class="font-label-caps text-label-caps bg-surface-container-highest px-space-xs py-0.5 rounded text-on-surface font-semibold">CLINIC</span>
</div>
<span class="font-headline-md text-headline-md text-on-surface font-semibold">Esthetique Derma Clinic</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Dr. Nadya Sp.KK • Surabaya</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<span class="font-code-sm text-code-sm font-bold text-secondary">SKIN-SRM-TXA3</span>
<span class="text-on-surface font-medium">Tranexamic 3% Liposome Serum</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Base: Nano-Emulsion Hydrosol</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-right">
<div class="flex flex-col items-end">
<span class="font-code-md text-code-md font-bold text-on-surface">15.000</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Est. Rp 345M</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col gap-1 w-48">
<div class="flex items-center justify-between font-label-caps text-label-caps">
<span class="font-bold text-on-surface">Sample Dev</span>
<span class="text-secondary font-code-sm">Step 3 of 5</span>
</div>
<div class="grid grid-cols-5 gap-1 h-2 rounded bg-surface-container overflow-hidden">
<div class="bg-secondary h-full"></div>
<div class="bg-secondary h-full"></div>
<div class="bg-secondary h-full animate-pulse"></div>
<div class="bg-surface-container h-full"></div>
<div class="bg-surface-container h-full"></div>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant truncate">Lab Formula S-02 on Stability</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-code-sm text-code-sm bg-tertiary-fixed text-on-tertiary-fixed px-space-sm py-0.5 rounded font-bold">REV 02/03</span>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-label-caps text-label-caps uppercase bg-error text-on-error px-space-xs py-0.5 rounded font-bold inline-flex items-center gap-0.5">
<span class="material-symbols-outlined text-[12px]">lock</span>
                      NO DP
                    </span>
</td>
<td class="py-space-sm px-space-sm text-right">
<button class="bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary px-space-sm py-1 rounded font-code-sm text-code-sm font-semibold transition-colors" type="button">
                      Inspect
                    </button>
</td>
</tr>
<!-- Row 2: In Queue Normal -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-code-md text-code-md font-bold text-on-surface">LEAD-2024-0894</span>
<span class="font-label-caps text-label-caps bg-primary text-on-primary px-space-xs py-0.5 rounded font-semibold">ENTERPRISE</span>
</div>
<span class="font-headline-md text-headline-md text-on-surface font-semibold">PT Lumina Beaute Nusantara</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Procurement: Kevin S. • JKT</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<span class="font-code-sm text-code-sm font-bold text-secondary">BODY-SCR-COF1</span>
<span class="text-on-surface font-medium">Volcanic Exfoliating Body Scrub</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Aerosol / Jar 250gr Pack</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-right">
<div class="flex flex-col items-end">
<span class="font-code-md text-code-md font-bold text-on-surface">50.000</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Est. Rp 1.12B</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col gap-1 w-48">
<div class="flex items-center justify-between font-label-caps text-label-caps">
<span class="font-bold text-on-surface">Feasibility Pass</span>
<span class="text-secondary font-code-sm">Step 2 of 5</span>
</div>
<div class="grid grid-cols-5 gap-1 h-2 rounded bg-surface-container overflow-hidden">
<div class="bg-secondary h-full"></div>
<div class="bg-secondary h-full"></div>
<div class="bg-surface-container h-full"></div>
<div class="bg-surface-container h-full"></div>
<div class="bg-surface-container h-full"></div>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant truncate">Costing approved: Rp 22.400/pc</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-code-sm text-code-sm bg-surface-container text-on-surface px-space-sm py-0.5 rounded font-bold">REV 01/03</span>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-label-caps text-label-caps uppercase bg-surface-container-high text-secondary px-space-xs py-0.5 rounded font-bold inline-flex items-center gap-0.5">
<span class="material-symbols-outlined text-[12px]">check_circle</span>
                      CLEARED
                    </span>
</td>
<td class="py-space-sm px-space-sm text-right">
<button class="bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant px-space-sm py-1 rounded font-code-sm text-code-sm font-semibold transition-colors shadow-sm" type="button">
                      Advance
                    </button>
</td>
</tr>
<!-- Row 3: Rev Limit Exhausted -->
<tr class="hover:bg-surface-container-low transition-colors bg-tertiary-fixed/20">
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-code-md text-code-md font-bold text-on-surface">LEAD-2024-0877</span>
<span class="font-label-caps text-label-caps bg-surface-variant text-on-surface-variant px-space-xs py-0.5 rounded font-semibold">INDIE BRAND</span>
</div>
<span class="font-headline-md text-headline-md text-on-surface font-semibold">Velvet Glow Botanicals</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Owner: Sarah Amalia • BDG</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<span class="font-code-sm text-code-sm font-bold text-secondary">SKIN-CLN-OAT0</span>
<span class="text-on-surface font-medium">Gentle Oat Cleansing Balm</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Fragrance-Free / PE-Wax Free</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-right">
<div class="flex flex-col items-end">
<span class="font-code-md text-code-md font-bold text-on-surface">5.000</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Est. Rp 115M</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col gap-1 w-48">
<div class="flex items-center justify-between font-label-caps text-label-caps">
<span class="font-bold text-on-surface">Sample Dev</span>
<span class="text-error font-code-sm">Step 3 of 5</span>
</div>
<div class="grid grid-cols-5 gap-1 h-2 rounded bg-surface-container overflow-hidden">
<div class="bg-secondary h-full"></div>
<div class="bg-secondary h-full"></div>
<div class="bg-tertiary-container h-full animate-pulse"></div>
<div class="bg-surface-container h-full"></div>
<div class="bg-surface-container h-full"></div>
</div>
<span class="font-code-sm text-code-sm text-error font-semibold truncate">3 Free Revisions Consumed</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-code-sm text-code-sm bg-error text-on-error px-space-sm py-0.5 rounded font-bold">REV 03/03 MAX</span>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-label-caps text-label-caps uppercase bg-tertiary-fixed text-on-tertiary-fixed px-space-xs py-0.5 rounded font-bold inline-flex items-center gap-0.5">
<span class="material-symbols-outlined text-[12px]">attach_money</span>
                      EXTRA FEE
                    </span>
</td>
<td class="py-space-sm px-space-sm text-right">
<button class="bg-tertiary-container text-on-tertiary hover:bg-primary px-space-sm py-1 rounded font-code-sm text-code-sm font-semibold transition-colors" type="button">
                      Invoice Rev
                    </button>
</td>
</tr>
<!-- Row 4: Perfumery Lead -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-code-md text-code-md font-bold text-on-surface">LEAD-2024-0902</span>
<span class="font-label-caps text-label-caps bg-surface-variant text-on-surface-variant px-space-xs py-0.5 rounded font-semibold">INDIE BRAND</span>
</div>
<span class="font-headline-md text-headline-md text-on-surface font-semibold">Nusa Scents Artisan</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Creative Dir: Farhan • BALI</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<span class="font-code-sm text-code-sm font-bold text-secondary">FRAG-EDP-OUD9</span>
<span class="text-on-surface font-medium">Santal Amber Extrait 30%</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Alcohol Grade: Fine Sugar Cane</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-right">
<div class="flex flex-col items-end">
<span class="font-code-md text-code-md font-bold text-on-surface">3.000</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Est. Rp 180M</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col gap-1 w-48">
<div class="flex items-center justify-between font-label-caps text-label-caps">
<span class="font-bold text-on-surface">Lead Intake</span>
<span class="text-secondary font-code-sm">Step 1 of 5</span>
</div>
<div class="grid grid-cols-5 gap-1 h-2 rounded bg-surface-container overflow-hidden">
<div class="bg-secondary h-full animate-pulse"></div>
<div class="bg-surface-container h-full"></div>
<div class="bg-surface-container h-full"></div>
<div class="bg-surface-container h-full"></div>
<div class="bg-surface-container h-full"></div>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant truncate">Olfactory brief received</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-code-sm text-code-sm bg-surface-container text-on-surface px-space-sm py-0.5 rounded font-bold">REV 00/03</span>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-label-caps text-label-caps uppercase bg-surface-container text-on-surface-variant px-space-xs py-0.5 rounded font-semibold inline-flex items-center gap-0.5">
<span class="material-symbols-outlined text-[12px]">hourglass_empty</span>
                      PENDING
                    </span>
</td>
<td class="py-space-sm px-space-sm text-right">
<button class="bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary px-space-sm py-1 rounded font-code-sm text-code-sm font-semibold transition-colors" type="button">
                      Assign CS
                    </button>
</td>
</tr>
<!-- Row 5: Haircare Contract Stage -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-code-md text-code-md font-bold text-on-surface">LEAD-2024-0850</span>
<span class="font-label-caps text-label-caps bg-primary text-on-primary px-space-xs py-0.5 rounded font-semibold">ENTERPRISE</span>
</div>
<span class="font-headline-md text-headline-md text-on-surface font-semibold">DermoHair Solutions ID</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Legal Counsel • Semarang</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col">
<span class="font-code-sm text-code-sm font-bold text-secondary">HAIR-TON-BTO1</span>
<span class="text-on-surface font-medium">Biotin Peptide Anti-Loss Tonic</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Amber Glass Pipette 100ml</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-right">
<div class="flex flex-col items-end">
<span class="font-code-md text-code-md font-bold text-on-surface">25.000</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Est. Rp 625M</span>
</div>
</td>
<td class="py-space-sm px-space-sm">
<div class="flex flex-col gap-1 w-48">
<div class="flex items-center justify-between font-label-caps text-label-caps">
<span class="font-bold text-on-surface">Legal Contract</span>
<span class="text-secondary font-code-sm">Step 4 of 5</span>
</div>
<div class="grid grid-cols-5 gap-1 h-2 rounded bg-surface-container overflow-hidden">
<div class="bg-secondary h-full"></div>
<div class="bg-secondary h-full"></div>
<div class="bg-secondary h-full"></div>
<div class="bg-secondary h-full animate-pulse"></div>
<div class="bg-surface-container h-full"></div>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant truncate">SPK &amp; HPP Final Drafted</span>
</div>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-code-sm text-code-sm bg-surface-container-high text-secondary px-space-sm py-0.5 rounded font-bold">REV 02/03 OK</span>
</td>
<td class="py-space-sm px-space-sm text-center">
<span class="font-label-caps text-label-caps uppercase bg-surface-container-high text-secondary px-space-xs py-0.5 rounded font-bold inline-flex items-center gap-0.5">
<span class="material-symbols-outlined text-[12px]">verified</span>
                      CLEARED
                    </span>
</td>
<td class="py-space-sm px-space-sm text-right">
<button class="bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant px-space-sm py-1 rounded font-code-sm text-code-sm font-semibold transition-colors shadow-sm" type="button">
                      Issue SPK
                    </button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Footer Metadata & SQLite Persistence Heartbeat -->
<div class="flex items-center justify-between flex-wrap gap-2 pt-space-sm border-t border-surface-container text-on-surface-variant font-code-sm text-code-sm">
<div class="flex items-center gap-space-md flex-wrap">
<span class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span>Transaction State: Committed to Local WAL</span>
</span>
<span class="text-outline-variant hidden sm:inline">|</span>
<span>Indexed Key: `lead_uuid_v4`</span>
</div>
<div class="flex items-center gap-space-xs">
<kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface font-code-sm border border-surface-container">Ctrl+Enter</kbd>
<span>Advance Highlighted Stage</span>
</div>
</div>
</div>
<!-- SECONDARY WATCHDOG PANEL (xl:col-span-4) -->
<div class="xl:col-span-4 flex flex-col gap-space-md w-full min-w-0">
<!-- Watchdog Container Card -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col gap-space-md">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs text-on-tertiary-container font-label-caps text-label-caps uppercase font-bold">
<span class="material-symbols-outlined text-[18px]">warning</span>
<span>RnD Policy Enforcement</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold">Revision Budget Watchdog</h3>
</div>
<span class="font-code-sm text-code-sm bg-tertiary-fixed text-on-tertiary-fixed px-space-xs py-0.5 rounded font-bold shrink-0">MAX 3 REVS</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
              Maklon SLA terms: maximum 3 free sample iterations per signed brief. Any additional iteration automatically invokes billing surcharge voucher (Rp 2.500.000/variant).
            </p>
<!-- Account Revision Meters List -->
<div class="flex flex-col gap-space-sm">
<!-- Client Watchdog 1: At limit -->
<div class="p-space-sm rounded bg-error-container/20 flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="font-headline-md text-headline-md text-on-surface font-semibold truncate">Velvet Glow Botanicals</span>
<span class="font-code-sm text-code-sm bg-error text-on-error font-bold px-space-xs py-0.5 rounded shrink-0">3/3 EXHAUSTED</span>
</div>
<div class="flex items-center justify-between font-code-sm text-code-sm text-on-surface-variant">
<span>Formula: Oat Balm Base</span>
<span class="text-error font-bold">+Surcharge Active</span>
</div>
<div class="w-full bg-surface-container h-2 rounded overflow-hidden flex">
<div class="bg-error w-full h-full"></div>
</div>
<div class="flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps pt-0.5">
<span>Rev 1: 04 Mar</span>
<span>Rev 2: 12 Mar</span>
<span class="font-bold text-error">Rev 3: 18 Mar (FINAL)</span>
</div>
<button class="mt-1 w-full bg-error text-on-error hover:bg-on-error-container py-1 rounded font-body-sm text-body-sm font-semibold transition-colors flex items-center justify-center gap-1" type="button">
<span class="material-symbols-outlined text-[16px]">receipt</span>
<span>Trigger Rp 2.5M Addendum Invoice</span>
</button>
</div>
<!-- Client Watchdog 2: Approaching limit -->
<div class="p-space-sm rounded bg-tertiary-fixed/20 flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="font-headline-md text-headline-md text-on-surface font-semibold truncate">Esthetique Derma Clinic</span>
<span class="font-code-sm text-code-sm bg-tertiary-container text-on-tertiary font-bold px-space-xs py-0.5 rounded shrink-0">2/3 AT RISK</span>
</div>
<div class="flex items-center justify-between font-code-sm text-code-sm text-on-surface-variant">
<span>Formula: TXA 3% Serum</span>
<span class="text-on-tertiary-container font-semibold">1 Rev Remaining</span>
</div>
<div class="w-full bg-surface-container h-2 rounded overflow-hidden flex">
<div class="bg-secondary w-2/3 h-full"></div>
<div class="bg-surface-container w-1/3 h-full"></div>
</div>
<div class="flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps pt-0.5">
<span>Rev 1: Passed</span>
<span class="font-bold text-on-tertiary-container">Rev 2: Testing Now</span>
<span>Rev 3: Free</span>
</div>
</div>
<!-- Client Watchdog 3: Approaching limit -->
<div class="p-space-sm rounded bg-surface-container-low flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="font-headline-md text-headline-md text-on-surface font-semibold truncate">DermoHair Solutions ID</span>
<span class="font-code-sm text-code-sm bg-surface-container-high text-secondary font-bold px-space-xs py-0.5 rounded shrink-0">2/3 WARNED</span>
</div>
<div class="flex items-center justify-between font-code-sm text-code-sm text-on-surface-variant">
<span>Formula: Biotin Tonic</span>
<span class="text-secondary font-semibold">Viscosity adjust pending</span>
</div>
<div class="w-full bg-surface-container h-2 rounded overflow-hidden flex">
<div class="bg-secondary w-2/3 h-full"></div>
<div class="bg-surface-container w-1/3 h-full"></div>
</div>
</div>
</div>
<!-- RnD Lab Queue Quick Telemetry -->
<div class="border-t border-surface-container pt-space-sm flex flex-col gap-space-xs">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Formulator Workload Capacity</span>
<div class="flex items-center justify-between font-body-sm text-body-sm">
<span class="font-semibold text-on-surface">Lab Bench Alpha (Skincare)</span>
<span class="font-code-sm text-code-sm text-error font-bold">92% Utilized</span>
</div>
<div class="flex items-center justify-between font-body-sm text-body-sm">
<span class="font-semibold text-on-surface">Lab Bench Beta (Body &amp; Fragrance)</span>
<span class="font-code-sm text-code-sm text-secondary font-bold">64% Utilized</span>
</div>
</div>
</div>
<!-- CS SLA Audit Mini-Widget -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-on-surface-variant font-bold">CS Dispatch Velocity</span>
<span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-on-surface font-semibold">TARGET: &lt; 2h</span>
</div>
<div class="flex items-center justify-between">
<div>
<div class="font-code-lg text-headline-lg font-bold text-on-surface">42m</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Average First Contact</div>
</div>
<div class="text-right">
<div class="font-code-lg text-headline-lg font-bold text-secondary">98.2%</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">SLA Compliance Rate</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
<!-- FLOATING HOTKEY ASSIST BAR -->
<div class="fixed bottom-12 right-4 sm:right-6 z-40 bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-lg shadow-xl flex items-center gap-space-md border border-outline-variant/30 max-w-[calc(100vw-2rem)] overflow-x-auto">
<div class="flex items-center gap-space-xs shrink-0">
<span class="material-symbols-outlined text-[18px] text-secondary-fixed">keyboard</span>
<span class="font-label-caps text-label-caps uppercase tracking-wider text-inverse-on-surface">Command Assist:</span>
</div>
<div class="flex items-center gap-space-md shrink-0">
<div class="flex items-center gap-space-xs font-code-sm text-code-sm">
<kbd class="bg-surface-container-highest/20 px-1.5 py-0.5 rounded text-inverse-on-surface font-bold">Ctrl+Enter</kbd>
<span class="text-surface-variant">Advance Stage</span>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm">
<kbd class="bg-surface-container-highest/20 px-1.5 py-0.5 rounded text-inverse-on-surface font-bold">Alt+R</kbd>
<span class="text-surface-variant">Log Rev</span>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm">
<kbd class="bg-surface-container-highest/20 px-1.5 py-0.5 rounded text-inverse-on-surface font-bold">Alt+F</kbd>
<span class="text-surface-variant">Override Lock</span>
</div>
</div>
</div>
<!-- RESPONSIVE BOTTOM STATUS / SHORTCUT FOOTER BAR -->
<footer class="sticky bottom-0 left-0 right-0 min-h-8 bg-surface-container-lowest border-t border-surface-container z-50 flex flex-wrap items-center justify-between gap-2 p-2 sm:p-3 text-xs">
<div class="flex flex-wrap items-center gap-space-md sm:gap-space-lg">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Shortcuts:</span>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm">
<kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Ctrl+N</kbd>
<span class="text-on-surface-variant">New Lead</span>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm">
<kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Alt+A</kbd>
<span class="text-on-surface-variant">Quick Approval</span>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm">
<kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Esc</kbd>
<span class="text-on-surface-variant">Cancel / Dismiss</span>
</div>
</div>
<div class="flex flex-wrap items-center gap-space-md ml-auto">
<span class="font-code-sm text-code-sm text-on-surface-variant">Local Cache: <span class="text-on-surface font-semibold">SQLite 3.44.0 (In-Memory WAL)</span></span>
<div class="hidden sm:block h-3 w-[1px] bg-surface-container"></div>
<span class="font-code-sm text-code-sm text-secondary font-semibold">ENCRYPTED SECURE SESSION</span>
</div>
</footer>
<script>
  // Keyboard Shortcut listener for Quick Actions
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      // Emulate rapid stage advance trigger for highest priority pending lead
      const activeAdvanceBtn = document.querySelector('tbody tr:nth-child(2) button');
      if (activeAdvanceBtn) {
        activeAdvanceBtn.classList.add('scale-95');
        setTimeout(() => activeAdvanceBtn.classList.remove('scale-95'), 150);
      }
    }
  });
</script>
</body></html>

kode ini untuk SCR-02: Lead Intake & Segmentasi di prd-1.md

<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface-variant": "#d3e4fe", "outline-variant": "#c6c6cd", "on-primary": "#ffffff", "on-error-container": "#93000a", "error-container": "#ffdad6", "on-tertiary-fixed": "#2f1500", "surface-tint": "#565e74", "surface-dim": "#cbdbf5", "on-secondary-container": "#fefcff", "surface-container-high": "#dce9ff", "inverse-primary": "#bec6e0", "on-surface": "#0b1c30", "surface-bright": "#f8f9ff", "background": "#f8f9ff", "outline": "#76777d", "tertiary-container": "#2f1500", "surface-container-highest": "#d3e4fe", "tertiary-fixed-dim": "#ffb77d", "on-tertiary": "#ffffff", "on-secondary-fixed-variant": "#003ea8", "inverse-on-surface": "#eaf1ff", "on-surface-variant": "#45464d", "tertiary": "#000000", "secondary-container": "#316bf3", "on-background": "#0b1c30", "inverse-surface": "#213145", "on-secondary-fixed": "#00174b", "on-tertiary-fixed-variant": "#6e3900", "on-secondary": "#ffffff", "error": "#ba1a1a", "primary-fixed": "#dae2fd", "surface": "#f8f9ff", "primary-fixed-dim": "#bec6e0", "surface-container-low": "#eff4ff", "on-error": "#ffffff", "surface-container-lowest": "#ffffff", "on-primary-container": "#7c839b", "on-primary-fixed": "#131b2e", "primary": "#000000", "primary-container": "#131b2e", "secondary": "#0051d5", "tertiary-fixed": "#ffdcc3", "secondary-fixed": "#dbe1ff", "on-tertiary-container": "#c76c00", "surface-container": "#e5eeff", "on-primary-fixed-variant": "#3f465c", "secondary-fixed-dim": "#b4c5ff" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "gutter-dense": "0.375rem", "gutter": "0.75rem", "space-md": "0.5rem", "margin": "1rem", "space-lg": "0.75rem", "space-sm": "0.25rem", "space-xs": "0.125rem", "space-xl": "1rem" }, "fontFamily": { "body-md": [ "Plus Jakarta Sans" ], "headline-xl": [ "Plus Jakarta Sans" ], "headline-lg": [ "Plus Jakarta Sans" ], "label-caps": [ "JetBrains Mono" ], "code-md": [ "JetBrains Mono" ], "code-sm": [ "JetBrains Mono" ], "body-sm": [ "Plus Jakarta Sans" ], "headline-md": [ "Plus Jakarta Sans" ], "code-lg": [ "JetBrains Mono" ] }, "fontSize": { "body-md": [ "13px", { "lineHeight": "18px", "letterSpacing": "0em", "fontWeight": "400" } ], "headline-xl": [ "24px", { "lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "700" } ], "headline-lg": [ "18px", { "lineHeight": "24px", "letterSpacing": "-0.015em", "fontWeight": "600" } ], "label-caps": [ "10px", { "lineHeight": "12px", "letterSpacing": "0.08em", "fontWeight": "600" } ], "code-md": [ "12px", { "lineHeight": "16px", "letterSpacing": "0em", "fontWeight": "500" } ], "code-sm": [ "11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" } ], "body-sm": [ "12px", { "lineHeight": "16px", "letterSpacing": "0em", "fontWeight": "400" } ], "headline-md": [ "15px", { "lineHeight": "20px", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "code-lg": [ "13px", { "lineHeight": "18px", "letterSpacing": "-0.01em", "fontWeight": "500" } ] } } } };</script></head><body class="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen"><header class="fixed top-0 left-0 right-0 h-14 bg-surface-container-lowest z-50 flex items-center justify-between px-gutter-dense border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-sm pl-space-xs"><span class="material-symbols-outlined text-secondary text-[20px]">precision_manufacturing</span><span class="font-headline-md text-headline-md tracking-tight text-on-surface font-bold">MaklonOS</span><span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-on-surface-variant uppercase">Core v2.4</span></div><div class="h-4 w-[1px] bg-surface-container"></div><button class="flex items-center gap-space-md bg-surface-container-low hover:bg-surface-container px-space-lg py-space-xs rounded text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" type="button"><span class="material-symbols-outlined text-[16px]">search</span><span class="font-body-sm text-body-sm">Cari Client, Batch, SPK...</span><span class="font-label-caps text-label-caps bg-surface-container-lowest px-space-xs rounded text-on-surface-variant border border-surface-container">CTRL+K</span></button></div><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-0.5 rounded border border-surface-container"><span class="h-2 w-2 rounded-full bg-secondary animate-pulse"></span><span class="font-code-sm text-code-sm text-on-surface-variant">SQLite Sync: <span class="text-on-surface font-semibold">0 pending txns</span></span></div><div class="flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm"><span class="material-symbols-outlined text-[16px]">schedule</span><span>14:32:08 WIB</span></div><div class="h-4 w-[1px] bg-surface-container"></div><div class="flex items-center gap-space-md"><div class="text-right"><div class="font-headline-md text-headline-md text-on-surface leading-none">Rian CS Head</div><div class="font-label-caps text-label-caps text-secondary uppercase">Lead Dispatcher</div></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><button class="p-space-xs text-error hover:bg-error-container hover:text-on-error-container rounded transition-colors" title="Force Logout" type="button"><span class="material-symbols-outlined text-[18px]">power_settings_new</span></button></div></div></header><aside class="fixed left-0 top-14 bottom-8 w-64 bg-surface-container-lowest border-r border-surface-container z-40 flex flex-col justify-between overflow-y-auto"><div class="p-space-md"><div class="font-label-caps text-label-caps text-on-surface-variant px-space-sm mb-space-sm tracking-wider uppercase">Siklus Operasional Maklon</div><nav class="flex flex-col gap-0.5" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded"><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="cs-crm-core" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">support_agent</span><span>CS &amp; CRM Core</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M1</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="lead-intake-segmentasi" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">filter_alt</span><span>Lead Intake &amp; Segmentasi</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M2</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="sample-tracker-revision-counter" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">science</span><span>Sample Tracker &amp; Rev</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M3</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="katalog-formulasi-moq" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">inventory_2</span><span>Katalog Formulasi &amp; MOQ</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M4</span></a><div class="my-space-sm border-t border-surface-container"></div><div class="font-label-caps text-label-caps text-on-surface-variant px-space-sm mb-space-xs tracking-wider uppercase">Lanjutan Pipeline</div><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="rnd-lab-sample-queue" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">biotech</span><span>RnD Lab &amp; Queue (Fase 2)</span></div><span class="font-code-sm text-code-sm text-on-surface-variant">v2</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="ppic-lantai-produksi" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">factory</span><span>PPIC &amp; Produksi (Fase 3)</span></div><span class="font-code-sm text-code-sm text-on-surface-variant">v3</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="audit-log-device-sessions" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">security</span><span>Audit Log &amp; Sessions</span></div><span class="font-code-sm text-code-sm text-on-surface-variant">REC</span></a></nav></div><div class="p-space-md border-t border-surface-container bg-surface-container-low"><div class="flex items-center justify-between text-on-surface-variant"><span class="font-label-caps text-label-caps uppercase">Terminal ID</span><span class="font-code-sm text-code-sm font-semibold text-on-surface">WS-SBY-048</span></div><div class="flex items-center justify-between text-on-surface-variant mt-0.5"><span class="font-label-caps text-label-caps uppercase">Engine Cache</span><span class="font-code-sm text-code-sm text-secondary font-semibold">WAL 64MB OK</span></div></div></aside><div class="pl-64"><main class="pt-14 pb-8 min-h-screen bg-background w-full px-space-lg"><div class="flex flex-col w-full">
<div class="flex flex-col gap-space-md py-space-sm">
<div class="flex flex-wrap items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded shadow-sm min-w-0 w-full">
<div class="flex flex-wrap items-center gap-space-md min-w-0">
<div class="flex items-center gap-space-xs">
<span class="font-code-sm text-code-sm text-on-surface-variant">REQ-UUID:</span>
<span class="font-code-md text-code-md font-bold text-on-surface bg-surface-container px-space-sm py-0.5 rounded">INTK-2024-08992</span>
</div>
<div class="hidden sm:block h-4 w-px bg-surface-variant"></div>
<div class="flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">database</span>
<span>SQLite Ingest Status: <strong class="text-on-surface">LOCAL_JOURNAL_ACK</strong></span>
</div>
<div class="flex items-center gap-space-xs bg-surface-container-high text-on-surface px-space-sm py-0.5 rounded font-label-caps text-label-caps uppercase">
<span class="material-symbols-outlined text-[14px] text-secondary">tune</span>
          Pipeline Stage: M2 Intake
        </div>
</div>
<div class="flex flex-wrap items-center gap-space-md">
<span class="font-label-caps text-label-caps uppercase text-on-surface-variant">Dispatcher Lock:</span>
<span class="bg-surface-container px-space-sm py-0.5 rounded font-code-sm text-code-sm font-semibold text-secondary">CS_TEAM_AUTO_ALLOC</span>
<button class="flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface px-space-md py-1 rounded transition-colors text-body-sm font-body-sm" type="button">
<span class="material-symbols-outlined text-[16px]">history</span>
<span>Audit Snapshots</span>
</button>
</div>
</div>
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start">
<div class="xl:col-span-8 flex flex-col gap-space-md min-w-0">
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-4 bg-secondary rounded-sm"></span>
<h2 class="font-headline-md text-headline-md font-bold text-on-surface tracking-tight uppercase">Section 1: Company &amp; Legal Entity Identity</h2>
</div>
<span class="font-label-caps text-label-caps bg-surface-container text-on-surface-variant px-space-sm py-0.5 rounded uppercase">CRITICAL_VERIFIED</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-space-md min-w-0">
<div class="md:col-span-4 flex flex-col gap-1 min-w-0">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Brand Name</label>
<input class="h-8 px-space-sm bg-surface-container-lowest text-on-surface font-headline-md text-headline-md font-semibold focus:outline-none focus:bg-surface-container-low transition-colors rounded shadow-sm w-full" id="brandInput" placeholder="e.g. Lumina Botanics" type="text" value="AURA LUMINA SKIN"/>
</div>
<div class="md:col-span-4 flex flex-col gap-1 min-w-0">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Legal Entity Structure</label>
<select class="h-8 px-space-sm bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none rounded shadow-sm w-full">
<option value="PT">PT (Perseroan Terbatas)</option>
<option value="CV">CV (Commanditaire Vennootschap)</option>
<option value="UD">UD / Perorangan Dagang</option>
<option value="FOREIGN">PMA Foreign Direct Entity</option>
</select>
</div>
<div class="md:col-span-4 flex flex-col gap-1 min-w-0">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Registered Legal Name</label>
<input class="h-8 px-space-sm bg-surface-container-lowest text-on-surface font-code-md text-code-md focus:outline-none rounded shadow-sm w-full" type="text" value="PT LUMINA DERMA NUSANTARA"/>
</div>
<div class="md:col-span-4 flex flex-col gap-1 min-w-0">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Key Account PIC</label>
<div class="relative w-full">
<input class="w-full h-8 pl-space-sm pr-7 bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none rounded shadow-sm" type="text" value="Clarissa Stephanie, S.Farm"/>
<span class="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2 top-2">badge</span>
</div>
</div>
<div class="md:col-span-4 flex flex-col gap-1 min-w-0">
<div class="flex items-center justify-between">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">PIC WhatsApp Endpoint</label>
<span class="font-code-sm text-code-sm text-secondary font-bold flex items-center gap-0.5">
<span class="material-symbols-outlined text-[13px]">verified</span> WA_API_VALID
                </span>
</div>
<div class="flex w-full">
<span class="h-8 px-space-sm bg-surface-container font-code-md text-code-md flex items-center text-on-surface-variant rounded-l flex-shrink-0">+62</span>
<input class="h-8 w-full px-space-sm bg-surface-container-lowest text-on-surface font-code-md text-code-md focus:outline-none rounded-r shadow-sm min-w-0" type="text" value="812-9844-3200"/>
</div>
</div>
<div class="md:col-span-4 flex flex-col gap-1 min-w-0">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">BPOM Compliance Route</label>
<div class="grid grid-cols-2 gap-space-xs h-8 w-full">
<label class="flex items-center justify-center gap-1 bg-surface-container-high text-on-surface px-space-xs rounded cursor-pointer text-code-sm font-code-sm font-semibold shadow-sm truncate">
<input checked="" class="hidden" name="bpom_route" type="radio"/>
<span class="material-symbols-outlined text-[14px] text-secondary flex-shrink-0">check_circle</span>
<span class="truncate">Maklon BPOM</span>
</label>
<label class="flex items-center justify-center gap-1 bg-surface-container text-on-surface-variant hover:text-on-surface px-space-xs rounded cursor-pointer text-code-sm font-code-sm truncate">
<input class="hidden" name="bpom_route" type="radio"/>
<span class="truncate">Client Mandiri</span>
</label>
</div>
</div>
</div>
</div>
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-4 bg-secondary rounded-sm"></span>
<h2 class="font-headline-md text-headline-md font-bold text-on-surface tracking-tight uppercase">Section 2: Formulation Spec Brief &amp; Benchmark Target</h2>
</div>
<div class="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-0.5 rounded text-on-surface font-code-sm text-code-sm">
<span>Target R&amp;D Code:</span>
<span class="font-bold text-secondary">FML-2024-HYB</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-space-md">
<div class="md:col-span-6 flex flex-col gap-1">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Primary Product Category</label>
<div class="grid grid-cols-2 gap-space-xs">
<button class="flex items-center justify-between p-space-sm bg-surface-container-high text-on-surface rounded text-left font-body-sm text-body-sm font-bold shadow-sm" type="button">
<span>Sunscreen SPF 50+ PA++++</span>
<span class="material-symbols-outlined text-[16px] text-secondary">wb_sunny</span>
</button>
<button class="flex items-center justify-between p-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface rounded text-left font-body-sm text-body-sm transition-colors" type="button">
<span>Intense Barrier Serum</span>
<span class="material-symbols-outlined text-[16px]">water_drop</span>
</button>
<button class="flex items-center justify-between p-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface rounded text-left font-body-sm text-body-sm transition-colors" type="button">
<span>Dewy Glow Cushion</span>
<span class="material-symbols-outlined text-[16px]">face</span>
</button>
<button class="flex items-center justify-between p-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface rounded text-left font-body-sm text-body-sm transition-colors" type="button">
<span>Plumping Lip Tint</span>
<span class="material-symbols-outlined text-[16px]">brush</span>
</button>
</div>
</div>
<div class="md:col-span-6 flex flex-col gap-1">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Competitor / Formulation Benchmark</label>
<div class="flex flex-col gap-space-xs">
<input class="h-8 px-space-sm bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none rounded shadow-sm" type="text" value="Beauty of Joseon Relief Sun Rice + Probiotics"/>
<div class="p-space-sm bg-surface-container-low rounded flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[18px]">verified</span>
<span class="font-code-sm text-code-sm text-on-surface">Lab Index Matches: <strong>BOJ-RF-09 (Korean Texture Spec)</strong></span>
</div>
<span class="font-label-caps text-label-caps uppercase bg-surface-container px-space-xs py-0.5 rounded text-on-surface">94.8% Match</span>
</div>
</div>
</div>
<div class="md:col-span-12 flex flex-col gap-1">
<div class="flex items-center justify-between">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Hero Actives &amp; Key Claims Requested</label>
<span class="font-code-sm text-code-sm text-on-surface-variant">Maximum 6 Actives for Optimal Stability</span>
</div>
<div class="flex flex-wrap gap-space-xs p-space-sm bg-surface-container-low rounded min-h-[44px] items-center">
<span class="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded shadow-sm text-on-surface font-code-sm text-code-sm">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Niacinamide 5.0%
                  <button class="text-on-surface-variant hover:text-error ml-1" type="button"><span class="material-symbols-outlined text-[14px]">close</span></button>
</span>
<span class="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded shadow-sm text-on-surface font-code-sm text-code-sm">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Ceramide NP + EOP Complex 1.2%
                  <button class="text-on-surface-variant hover:text-error ml-1" type="button"><span class="material-symbols-outlined text-[14px]">close</span></button>
</span>
<span class="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded shadow-sm text-on-surface font-code-sm text-code-sm">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Centella Asiatica Leaf Extract 3.0%
                  <button class="text-on-surface-variant hover:text-error ml-1" type="button"><span class="material-symbols-outlined text-[14px]">close</span></button>
</span>
<span class="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded shadow-sm text-on-surface font-code-sm text-code-sm">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Hyaluronic Acid Multi-Molecular 1.0%
                  <button class="text-on-surface-variant hover:text-error ml-1" type="button"><span class="material-symbols-outlined text-[14px]">close</span></button>
</span>
<input class="bg-transparent border-none outline-none font-code-sm text-code-sm text-on-surface placeholder:text-outline-variant px-space-xs" placeholder="+ Add active agent..." type="text"/>
</div>
</div>
</div>
</div>
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-4 bg-secondary rounded-sm"></span>
<h2 class="font-headline-md text-headline-md font-bold text-on-surface tracking-tight uppercase">Section 3: Commercial Boundaries &amp; Unit Economics</h2>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant">CURRENCY BASE: IDR (Rupiah)</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div class="flex flex-col gap-1 p-space-md bg-surface-container-low rounded">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Target Retail Selling Price (HET)</label>
<div class="flex items-baseline gap-space-xs mt-1">
<span class="font-code-lg text-code-lg text-secondary font-bold">Rp</span>
<input class="w-full bg-surface-container-lowest px-space-sm py-1 rounded text-on-surface font-code-lg text-code-lg font-bold shadow-sm" type="text" value="119.000"/>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant mt-1">Acceptable window: Rp 95.000 - 135.000</span>
</div>
<div class="flex flex-col gap-1 p-space-md bg-surface-container-low rounded">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Target Packaging Specification</label>
<div class="mt-1">
<select class="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded shadow-sm">
<option selected="">Airless Pump Bottle 30ml (PP Matte)</option>
<option>Dropper Pipette Glass 20ml (Amber)</option>
<option>Airless Tube 50ml w/ Silicone Tip</option>
<option>Compact Cushion Case (Magnetic Lock)</option>
</select>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant mt-1">Est. Packaging Cost: ~Rp 7.800/unit</span>
</div>
<div class="flex flex-col gap-1 p-space-md bg-surface-container-low rounded">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant">Planned Initial Batch MOQ</label>
<div class="grid grid-cols-3 gap-1 mt-1">
<button class="py-1 px-space-xs bg-surface-container text-on-surface-variant hover:text-on-surface rounded font-code-sm text-code-sm font-semibold transition-colors" type="button">5.000</button>
<button class="py-1 px-space-xs bg-secondary text-on-secondary rounded font-code-sm text-code-sm font-bold shadow-sm" type="button">10.000</button>
<button class="py-1 px-space-xs bg-surface-container text-on-surface-variant hover:text-on-surface rounded font-code-sm text-code-sm font-semibold transition-colors" type="button">20.000</button>
</div>
<div class="flex items-center justify-between text-on-surface-variant font-code-sm text-code-sm mt-1">
<span>Total Target Batch Vol:</span>
<span class="text-on-surface font-bold">300.000 mL</span>
</div>
</div>
</div>
</div>
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-4 bg-secondary rounded-sm"></span>
<h2 class="font-headline-md text-headline-md font-bold text-on-surface tracking-tight uppercase">Section 4: ImageCompressor Dropzone (Client Benchmark / CoA)</h2>
</div>
<span class="font-label-caps text-label-caps bg-surface-container text-on-surface-variant px-space-sm py-0.5 rounded uppercase">WebP ≤ 300KB Client-Side</span>
</div>
<div class="bg-surface-container-low p-space-lg rounded flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-surface-container text-center relative group min-h-[140px]">
<input class="absolute inset-0 opacity-0 cursor-pointer" multiple="" type="file"/>
<div class="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm mb-space-sm group-hover:scale-105 transition-transform">
<span class="material-symbols-outlined text-secondary text-[22px]">cloud_upload</span>
</div>
<div class="font-headline-md text-headline-md font-bold text-on-surface">Drop Moodboard, Benchmark Packaging, or CoA Document</div>
<div class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Instant hardware canvas conversion to WebP 80% quality. Zero latency pipeline upload.</div>
<div class="flex items-center gap-space-md mt-space-sm font-code-sm text-code-sm text-on-surface-variant">
<span>Accepted: JPG, PNG, WEBP, PDF</span>
<span>•</span>
<span>Memory limit: 25MB before quantization</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div class="flex items-center gap-space-md p-space-sm bg-surface-container-low rounded">
<div class="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-surface-container">
<img class="w-full h-full object-cover" data-alt="A studio photograph of a minimal modern white cosmetic sunscreen bottle with frosted finish, soft dramatic studio rim lighting, clean beauty product aesthetic on crisp light slate background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnyH6Ak-TGdp_iV0M-xDsLfeOpfv3XvyhHbmrqGakxksEGRdU39LKJ6Bmw1BswUXnKJ48Z-JqxzpnJyeaNze1LPxXF_jDM4VknT2LQFPkAs2RNimWQ01qq7ctGiEGu2a4prapYSOW4b0-9DIOlsVXKr0qOzMGN_lthpu2RggqGZcr39MV1_GqbYwycGjpaj505kCXh3WkpU4oHZu9wRIxrwTIkWa4BhDJNyvkN3RVXwh9hS4pPqoz1hA"/>
</div>
<div class="flex flex-col min-w-0 flex-1">
<div class="font-headline-md text-headline-md font-semibold text-on-surface truncate">Benchmark_Matte_Sunscreen_30ml.png</div>
<div class="flex items-center gap-space-md font-code-sm text-code-sm text-on-surface-variant">
<span class="line-through">1.8 MB</span>
<span class="material-symbols-outlined text-[12px] text-secondary">arrow_forward</span>
<span class="text-secondary font-bold">142 KB (WebP)</span>
</div>
</div>
<span class="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
</div>
<div class="flex items-center gap-space-md p-space-sm bg-surface-container-low rounded">
<div class="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-surface-container">
<img class="w-full h-full object-cover" data-alt="A clean technical lab certificate of analysis document macro view with stamped chemical purity scores and HPLC chromatogram charts on laboratory desk." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn3xpYjWLSlAVUo1mhTA0Yz-ggGQk5gr1FHKmfGqAtsMfzzznCUsYtinHrzGPFiGxnlm0meH2BenbDUjti0yEg4Q0NGCYJGkfKUX2VM73gV5WwjdLM03BfQSnvUEjO27b0Nn2uXRAJzumH3atC2zZHUqSLO4D5osVg57qVWnONAZWkbrYiD1NzODntbCWL0Sj-g__HX94v4RJNAQbcir2ICEtAvTQwOzluCvhnwqy6R2_4gO6o2L2iFg"/>
</div>
<div class="flex flex-col min-w-0 flex-1">
<div class="font-headline-md text-headline-md font-semibold text-on-surface truncate">CoA_Active_Niacinamide_USP.pdf</div>
<div class="flex items-center gap-space-md font-code-sm text-code-sm text-on-surface-variant">
<span class="line-through">3.4 MB</span>
<span class="material-symbols-outlined text-[12px] text-secondary">arrow_forward</span>
<span class="text-secondary font-bold">288 KB (Rasterized)</span>
</div>
</div>
<span class="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
</div>
</div>
</div>
</div>
<div class="xl:col-span-4 flex flex-col gap-space-md sticky top-16 min-w-0">
<div class="bg-primary text-on-primary p-space-lg rounded shadow-md relative overflow-hidden">
<div class="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-secondary opacity-20 blur-xl"></div>
<div class="flex items-center justify-between mb-space-sm">
<span class="font-label-caps text-label-caps uppercase tracking-wider text-surface-variant">AI Diagnostic Engine</span>
<span class="font-code-sm text-code-sm text-secondary-fixed bg-secondary/30 px-space-sm py-0.5 rounded font-bold">CONFIDENCE 98.2%</span>
</div>
<div class="flex flex-col gap-space-xs my-space-sm">
<span class="font-label-caps text-label-caps uppercase text-outline-variant">Automated Segmentation Result</span>
<div class="font-headline-xl text-headline-xl font-bold tracking-tight text-on-primary">
              TIER-A ENTERPRISE
            </div>
<div class="font-body-sm text-body-sm text-surface-variant">
              High Volume Potential • Multi-Branch Retail Qualified
            </div>
</div>
<div class="grid grid-cols-2 gap-space-sm mt-space-md pt-space-md border-t border-surface-container/20">
<div>
<div class="font-label-caps text-label-caps uppercase text-outline-variant">Projected PO Value</div>
<div class="font-code-lg text-code-lg font-bold text-on-primary">Rp 480.000.000</div>
</div>
<div>
<div class="font-label-caps text-label-caps uppercase text-outline-variant">Margin Efficiency</div>
<div class="font-code-lg text-code-lg font-bold text-secondary-fixed">64.2% Estimated</div>
</div>
</div>
</div>
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<span class="font-headline-md text-headline-md font-bold text-on-surface uppercase">Distribution Channels</span>
<span class="font-code-sm text-code-sm text-secondary font-bold">3 Verified</span>
</div>
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between p-space-sm bg-surface-container-low rounded">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[18px]">storefront</span>
<div>
<div class="font-headline-md text-headline-md font-semibold text-on-surface">Guardian &amp; Watsons Indonesia</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Modern Health &amp; Beauty Chains</div>
</div>
</div>
<span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-on-surface">450+ OUTLETS</span>
</div>
<div class="flex items-center justify-between p-space-sm bg-surface-container-low rounded">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[18px]">shopping_bag</span>
<div>
<div class="font-headline-md text-headline-md font-semibold text-on-surface">Shopee Mall &amp; TikTok Shop</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Direct-to-Consumer Official Store</div>
</div>
</div>
<span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-on-surface">TOP 10% GMV</span>
</div>
</div>
<div class="flex flex-col gap-space-xs pt-space-sm">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-on-surface-variant">Commercial Credit Metric</span>
<span class="font-code-sm text-code-sm text-on-surface font-bold">AA- Rating</span>
</div>
<div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary" style="width: 88%;"></div>
</div>
<div class="flex items-center justify-between font-code-sm text-code-sm text-on-surface-variant">
<span>Risk Scoring: Low Exposure</span>
<span>DP Term: 50% / 50% Net 14</span>
</div>
</div>
</div>
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[20px]">timer</span>
<span class="font-headline-md text-headline-md font-bold text-on-surface uppercase">Lead SLA Counter</span>
</div>
<span class="font-label-caps text-label-caps bg-surface-container-high text-on-surface px-space-sm py-0.5 rounded font-bold uppercase">Within SLA</span>
</div>
<div class="p-space-md bg-surface-container-low rounded flex items-center justify-between">
<div>
<div class="font-label-caps text-label-caps uppercase text-on-surface-variant">Elapsed Dispatch Time</div>
<div class="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight" id="slaTimer">
                00:14:42
              </div>
</div>
<div class="text-right">
<div class="font-label-caps text-label-caps uppercase text-on-surface-variant">Max Response Target</div>
<div class="font-code-lg text-code-lg font-bold text-error">01:00:00</div>
</div>
</div>
<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary transition-all" style="width: 24.5%;"></div>
</div>
<div class="flex items-center justify-between font-code-sm text-code-sm text-on-surface-variant">
<span>SLA Ceiling: 60 mins</span>
<span class="text-secondary font-semibold">45m 18s remaining</span>
</div>
</div>
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<span class="font-headline-md text-headline-md font-bold text-on-surface uppercase">Quick Operational Dispatch</span>
<span class="font-label-caps text-label-caps bg-surface-container text-on-surface-variant px-space-xs py-0.5 rounded">HOTKEYS READY</span>
</div>
<div class="flex flex-col gap-space-sm">
<button class="w-full h-10 bg-primary hover:bg-surface-tint active:bg-primary text-on-primary font-headline-md text-headline-md font-bold rounded flex items-center justify-between px-space-md shadow-md transition-all" id="btnApprove" type="button">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-[20px]">science</span>
<span>Approve to R&amp;D Queue</span>
</div>
<kbd class="font-code-sm text-code-sm bg-surface-container-lowest/20 px-space-xs py-0.5 rounded border border-white/20">Alt+A</kbd>
</button>
<div class="grid grid-cols-2 gap-space-sm">
<button class="h-9 bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm font-semibold rounded flex items-center justify-center gap-space-xs transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-secondary">person_add</span>
<span>Assign AM</span>
</button>
<button class="h-9 bg-surface-container-lowest hover:bg-error-container text-error font-body-sm text-body-sm font-semibold rounded flex items-center justify-center gap-space-xs transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">cancel</span>
<span>Reject Lead</span>
</button>
</div>
</div>
<div class="flex items-center gap-space-xs p-space-xs bg-surface-container-low rounded text-on-surface-variant font-code-sm text-code-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">info</span>
<span>Approval will generate sample order batch in <strong>RnD Lab Queue (Fase 2)</strong>.</span>
</div>
</div>
<div class="p-space-md bg-surface-container-low rounded flex items-center gap-space-md">
<div class="w-10 h-10 rounded bg-surface-container-lowest flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
</div>
<div>
<div class="font-headline-md text-headline-md font-bold text-on-surface">Maklon Quality Assurance Standard</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">CPKB Type A Certified Facility • ISO 22716 Verified</div>
</div>
</div>
</div>
</div>
</div>
</div>
<script>
  (function initLeadIntake() {
    let seconds = 882;
    const timerElem = document.getElementById('slaTimer');
    if (timerElem) {
      setInterval(() => {
        seconds++;
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerElem.textContent = `${hrs}:${mins}:${secs}`;
      }, 1000);
    }

    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        const approveBtn = document.getElementById('btnApprove');
        if (approveBtn) {
          approveBtn.click();
        }
      }
    });

    const approveBtn = document.getElementById('btnApprove');
    if (approveBtn) {
      approveBtn.addEventListener('click', () => {
        const originalText = approveBtn.innerHTML;
        approveBtn.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined animate-spin text-[20px]">sync</span>
            <span>Committed to R&D Lab...</span>
          </div>
          <span class="font-code-sm text-code-sm text-surface-variant">OK</span>
        `;
        setTimeout(() => {
          approveBtn.innerHTML = originalText;
        }, 1800);
      });
    }
  })();
</script></main></div><footer class="fixed bottom-0 left-0 right-0 min-h-[32px] py-1 bg-surface-container-lowest border-t border-surface-container z-50 flex flex-wrap items-center justify-between px-gutter-dense gap-space-md"><div class="flex flex-wrap items-center gap-space-md min-w-0"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Shortcuts:</span><div class="flex items-center gap-space-xs font-code-sm text-code-sm"><kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Ctrl+N</kbd><span class="text-on-surface-variant">New Lead</span></div><div class="flex items-center gap-space-xs font-code-sm text-code-sm"><kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Alt+A</kbd><span class="text-on-surface-variant">Quick Approval</span></div><div class="flex items-center gap-space-xs font-code-sm text-code-sm"><kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Esc</kbd><span class="text-on-surface-variant">Cancel / Dismiss</span></div></div><div class="flex flex-wrap items-center gap-space-md min-w-0"><span class="font-code-sm text-code-sm text-on-surface-variant">Local Cache: <span class="text-on-surface font-semibold">SQLite 3.44.0 (In-Memory WAL)</span></span><div class="hidden sm:block h-3 w-[1px] bg-surface-container"></div><span class="font-code-sm text-code-sm text-secondary font-semibold">ENCRYPTED SECURE SESSION</span></div></footer></body></html>

kode ini untuk SCR-03: Sample Tracker & Revision Counter

<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface-variant": "#d3e4fe", "outline-variant": "#c6c6cd", "on-primary": "#ffffff", "on-error-container": "#93000a", "error-container": "#ffdad6", "on-tertiary-fixed": "#2f1500", "surface-tint": "#565e74", "surface-dim": "#cbdbf5", "on-secondary-container": "#fefcff", "surface-container-high": "#dce9ff", "inverse-primary": "#bec6e0", "on-surface": "#0b1c30", "surface-bright": "#f8f9ff", "background": "#f8f9ff", "outline": "#76777d", "tertiary-container": "#2f1500", "surface-container-highest": "#d3e4fe", "tertiary-fixed-dim": "#ffb77d", "on-tertiary": "#ffffff", "on-secondary-fixed-variant": "#003ea8", "inverse-on-surface": "#eaf1ff", "on-surface-variant": "#45464d", "tertiary": "#000000", "secondary-container": "#316bf3", "on-background": "#0b1c30", "inverse-surface": "#213145", "on-secondary-fixed": "#00174b", "on-tertiary-fixed-variant": "#6e3900", "on-secondary": "#ffffff", "error": "#ba1a1a", "primary-fixed": "#dae2fd", "surface": "#f8f9ff", "primary-fixed-dim": "#bec6e0", "surface-container-low": "#eff4ff", "on-error": "#ffffff", "surface-container-lowest": "#ffffff", "on-primary-container": "#7c839b", "on-primary-fixed": "#131b2e", "primary": "#000000", "primary-container": "#131b2e", "secondary": "#0051d5", "tertiary-fixed": "#ffdcc3", "secondary-fixed": "#dbe1ff", "on-tertiary-container": "#c76c00", "surface-container": "#e5eeff", "on-primary-fixed-variant": "#3f465c", "secondary-fixed-dim": "#b4c5ff" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "gutter-dense": "0.375rem", "gutter": "0.75rem", "space-md": "0.5rem", "margin": "1rem", "space-lg": "0.75rem", "space-sm": "0.25rem", "space-xs": "0.125rem", "space-xl": "1rem" }, "fontFamily": { "body-md": [ "Plus Jakarta Sans" ], "headline-xl": [ "Plus Jakarta Sans" ], "headline-lg": [ "Plus Jakarta Sans" ], "label-caps": [ "JetBrains Mono" ], "code-md": [ "JetBrains Mono" ], "code-sm": [ "JetBrains Mono" ], "body-sm": [ "Plus Jakarta Sans" ], "headline-md": [ "Plus Jakarta Sans" ], "code-lg": [ "JetBrains Mono" ] }, "fontSize": { "body-md": [ "13px", { "lineHeight": "18px", "letterSpacing": "0em", "fontWeight": "400" } ], "headline-xl": [ "24px", { "lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "700" } ], "headline-lg": [ "18px", { "lineHeight": "24px", "letterSpacing": "-0.015em", "fontWeight": "600" } ], "label-caps": [ "10px", { "lineHeight": "12px", "letterSpacing": "0.08em", "fontWeight": "600" } ], "code-md": [ "12px", { "lineHeight": "16px", "letterSpacing": "0em", "fontWeight": "500" } ], "code-sm": [ "11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" } ], "body-sm": [ "12px", { "lineHeight": "16px", "letterSpacing": "0em", "fontWeight": "400" } ], "headline-md": [ "15px", { "lineHeight": "20px", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "code-lg": [ "13px", { "lineHeight": "18px", "letterSpacing": "-0.01em", "fontWeight": "500" } ] } } } };</script></head><body class="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen"><header class="fixed top-0 left-0 right-0 h-14 bg-surface-container-lowest z-50 flex items-center justify-between px-gutter-dense border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-sm pl-space-xs"><span class="material-symbols-outlined text-secondary text-[20px]">precision_manufacturing</span><span class="font-headline-md text-headline-md tracking-tight text-on-surface font-bold">MaklonOS</span><span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-on-surface-variant uppercase">Core v2.4</span></div><div class="h-4 w-[1px] bg-surface-container"></div><button class="flex items-center gap-space-md bg-surface-container-low hover:bg-surface-container px-space-lg py-space-xs rounded text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" type="button"><span class="material-symbols-outlined text-[16px]">search</span><span class="font-body-sm text-body-sm">Cari Client, Batch, SPK...</span><span class="font-label-caps text-label-caps bg-surface-container-lowest px-space-xs rounded text-on-surface-variant border border-surface-container">CTRL+K</span></button></div><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-0.5 rounded border border-surface-container"><span class="h-2 w-2 rounded-full bg-secondary animate-pulse"></span><span class="font-code-sm text-code-sm text-on-surface-variant">SQLite Sync: <span class="text-on-surface font-semibold">0 pending txns</span></span></div><div class="flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm"><span class="material-symbols-outlined text-[16px]">schedule</span><span>14:32:08 WIB</span></div><div class="h-4 w-[1px] bg-surface-container"></div><div class="flex items-center gap-space-md"><div class="text-right"><div class="font-headline-md text-headline-md text-on-surface leading-none">Rian CS Head</div><div class="font-label-caps text-label-caps text-secondary uppercase">Lead Dispatcher</div></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><button class="p-space-xs text-error hover:bg-error-container hover:text-on-error-container rounded transition-colors" title="Force Logout" type="button"><span class="material-symbols-outlined text-[18px]">power_settings_new</span></button></div></div></header><aside class="fixed left-0 top-14 bottom-8 w-64 bg-surface-container-lowest border-r border-surface-container z-40 flex flex-col justify-between overflow-y-auto"><div class="p-space-md"><div class="font-label-caps text-label-caps text-on-surface-variant px-space-sm mb-space-sm tracking-wider uppercase">Siklus Operasional Maklon</div><nav class="flex flex-col gap-0.5" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded"><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="cs-crm-core" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">support_agent</span><span>CS &amp; CRM Core</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M1</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="lead-intake-segmentasi" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">filter_alt</span><span>Lead Intake &amp; Segmentasi</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M2</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded bg-primary-container text-on-primary-container" data-path="sample-tracker-revision-counter" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">science</span><span>Sample Tracker &amp; Rev</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M3</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="katalog-formulasi-moq" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">inventory_2</span><span>Katalog Formulasi &amp; MOQ</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M4</span></a><div class="my-space-sm border-t border-surface-container"></div><div class="font-label-caps text-label-caps text-on-surface-variant px-space-sm mb-space-xs tracking-wider uppercase">Lanjutan Pipeline</div><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="rnd-lab-sample-queue" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">biotech</span><span>RnD Lab &amp; Queue (Fase 2)</span></div><span class="font-code-sm text-code-sm text-on-surface-variant">v2</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="ppic-lantai-produksi" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">factory</span><span>PPIC &amp; Produksi (Fase 3)</span></div><span class="font-code-sm text-code-sm text-on-surface-variant">v3</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="audit-log-device-sessions" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">security</span><span>Audit Log &amp; Sessions</span></div><span class="font-code-sm text-code-sm text-on-surface-variant">REC</span></a></nav></div><div class="p-space-md border-t border-surface-container bg-surface-container-low"><div class="flex items-center justify-between text-on-surface-variant"><span class="font-label-caps text-label-caps uppercase">Terminal ID</span><span class="font-code-sm text-code-sm font-semibold text-on-surface">WS-SBY-048</span></div><div class="flex items-center justify-between text-on-surface-variant mt-0.5"><span class="font-label-caps text-label-caps uppercase">Engine Cache</span><span class="font-code-sm text-code-sm text-secondary font-semibold">WAL 64MB OK</span></div></div></aside><div class="pl-64 min-w-0"><main class="pt-14 pb-8 min-h-screen bg-background w-full px-space-lg"><div class="flex flex-col w-full gap-space-lg pb-12 min-w-0">
<!-- FORENSIC GATE LOCK BANNER -->
<div class="w-full bg-error-container text-on-error-container px-space-md py-space-sm rounded shadow-sm flex items-center justify-between">
<div class="flex items-center gap-space-md">
<div class="w-8 h-8 rounded bg-error text-on-error flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">lock_clock</span>
</div>
<div>
<div class="flex items-center gap-space-sm">
<span class="font-label-caps text-label-caps uppercase bg-error text-on-error px-space-xs rounded font-bold">Policy Enforced</span>
<span class="font-headline-md text-headline-md tracking-tight font-bold">REVISION HARD LOCK: Quota Exhaustion Mechanism</span>
</div>
<p class="font-body-sm text-body-sm opacity-90">
          After Sample V3, an automatic add-on charge of <span class="font-code-sm text-code-sm font-bold underline">Rp 2.500.000 / sample variant</span> will be injected into client invoice ledger and require Finance Clearance.
        </p>
</div>
</div>
<div class="flex items-center gap-space-md shrink-0">
<div class="text-right">
<div class="font-label-caps text-label-caps uppercase text-on-error-container opacity-80">Ledger Auto-Hook</div>
<div class="font-code-sm text-code-sm font-bold">ACC-REV-SURCHARGE-04</div>
</div>
<div class="h-6 w-px bg-error/20"></div>
<span class="material-symbols-outlined text-[20px] text-error cursor-help" title="Rules enforced under Contract #MKL-2025-AG-099">info</span>
</div>
</div>
<!-- PROJECT HEADER & REVISION QUOTA METER -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-md min-w-0">
<!-- Project Master Identity Card -->
<div class="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between pb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="font-label-caps text-label-caps bg-primary text-on-primary px-space-xs py-0.5 rounded uppercase">Client Account</span>
<span class="font-code-sm text-code-sm font-semibold text-secondary">CLT-ID-4402 (AURA COSMETICS CORP)</span>
</div>
<div class="flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm">
<span class="material-symbols-outlined text-[15px]">inventory</span>
<span>Batch REF: <strong class="text-on-surface font-semibold">SMP-2025-0819</strong></span>
</div>
</div>
<div class="mt-space-xs">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Target Commercial SKU</span>
<h1 class="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
            AURA GLOW — Niacinamide Brightening Barrier Serum 30ml
          </h1>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Dermocosmetic formulation targeting skin hydration retention, TEWL reduction, and dark spot attenuation. Target shelf life: 24 Months.
          </p>
</div>
</div>
<!-- Quick KPI Chips -->
<div class="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-md mt-space-md">
<div class="bg-surface-container-low p-space-sm rounded">
<div class="font-label-caps text-label-caps text-on-surface-variant uppercase">R&amp;D Lead Chemist</div>
<div class="font-headline-md text-headline-md text-on-surface">apt. Maya P., S.Farm</div>
<div class="font-code-sm text-code-sm text-secondary">Lab Spec: Derma-02</div>
</div>
<div class="bg-surface-container-low p-space-sm rounded">
<div class="font-label-caps text-label-caps text-on-surface-variant uppercase">Packaging Type</div>
<div class="font-headline-md text-headline-md text-on-surface">Frosted Amber Dropper</div>
<div class="font-code-sm text-code-sm text-on-surface-variant">DIN 18/415 Pipette</div>
</div>
<div class="bg-surface-container-low p-space-sm rounded">
<div class="font-label-caps text-label-caps text-on-surface-variant uppercase">Primary Active</div>
<div class="font-headline-md text-headline-md text-on-surface">5.0% Pure Niacinamide</div>
<div class="font-code-sm text-code-sm text-on-surface-variant">USP Grade / Low Nicotinic</div>
</div>
<div class="bg-surface-container-low p-space-sm rounded">
<div class="font-label-caps text-label-caps text-on-surface-variant uppercase">Production MOQ</div>
<div class="font-headline-md text-headline-md text-on-surface">5,000 Units</div>
<div class="font-code-sm text-code-sm text-on-surface-variant">Scale tier: Standard</div>
</div>
</div>
</div>
<!-- DepletionCountdownBadge & Revision Quota Meter -->
<div class="lg:col-span-4 bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Iteration Lifecycle</span>
<span class="font-code-sm text-code-sm bg-tertiary-fixed text-on-tertiary-fixed font-bold px-space-xs py-0.5 rounded flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-on-tertiary-fixed animate-ping"></span>
            STATUS: ACTIVE TRIAL
          </span>
</div>
<div class="mt-space-md">
<div class="flex items-baseline justify-between">
<span class="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">Rev 2 of 3</span>
<span class="font-code-sm text-code-sm font-semibold text-error">1 Complimentary Left</span>
</div>
<!-- Segmented Quota Bar -->
<div class="grid grid-cols-3 gap-1.5 mt-space-sm">
<div class="h-2 rounded bg-primary"></div>
<div class="h-2 rounded bg-primary"></div>
<div class="h-2 rounded bg-surface-container"></div>
</div>
<div class="flex justify-between font-label-caps text-label-caps text-on-surface-variant mt-1">
<span>V1 COMPLETED</span>
<span>V2 UNDER REVIEW</span>
<span>V3 AVAILABLE</span>
</div>
</div>
<!-- Iteration Log Timeline -->
<div class="mt-space-md flex flex-col gap-space-xs">
<div class="flex items-start gap-space-sm bg-surface-container-low p-space-xs rounded">
<span class="font-code-sm text-code-sm bg-surface-container-highest px-1 py-0.5 rounded font-bold">V1</span>
<div class="min-w-0 flex-1">
<div class="font-body-sm text-body-sm font-semibold text-on-surface">Base Formulation Trial</div>
<div class="font-code-sm text-code-sm text-on-surface-variant truncate">Feedback: Tekstur awal terlalu lengket (Glycerin overload)</div>
</div>
<span class="material-symbols-outlined text-[16px] text-primary">check_circle</span>
</div>
<div class="flex items-start gap-space-sm bg-surface-container-low p-space-xs rounded">
<span class="font-code-sm text-code-sm bg-secondary text-on-secondary px-1 py-0.5 rounded font-bold">V2</span>
<div class="min-w-0 flex-1">
<div class="font-body-sm text-body-sm font-semibold text-on-surface">Viscosity &amp; Fragrance Tuned</div>
<div class="font-code-sm text-code-sm text-secondary truncate">Current Active Prototype (Rosewood botanical)</div>
</div>
<span class="material-symbols-outlined text-[16px] text-secondary animate-pulse">radio_button_checked</span>
</div>
<div class="flex items-start gap-space-sm bg-surface-container-low p-space-xs rounded opacity-60">
<span class="font-code-sm text-code-sm bg-surface-container px-1 py-0.5 rounded font-bold">V3</span>
<div class="min-w-0 flex-1">
<div class="font-body-sm text-body-sm text-on-surface">Final Iteration Reserve</div>
<div class="font-code-sm text-code-sm text-on-surface-variant">Pending feedback on current trial batch</div>
</div>
<span class="material-symbols-outlined text-[16px] text-outline">lock</span>
</div>
</div>
</div>
<div class="pt-space-sm mt-space-sm flex items-center justify-between text-on-surface-variant">
<span class="font-label-caps text-label-caps uppercase">Dispatch Date (V2)</span>
<span class="font-code-sm text-code-sm text-on-surface font-semibold">2025-02-18 10:14 WIB</span>
</div>
</div>
</div>
<!-- FORENSIC COMPARATOR INTERFACE -->
<div class="flex flex-col gap-space-sm">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[22px]">compare</span>
<div>
<h2 class="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">Forensic Lab Proof Comparator</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">Diff inspection comparing prototype baseline against latest chemical revision</p>
</div>
</div>
<div class="flex items-center gap-space-xs">
<span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-1 rounded text-on-surface font-semibold">Mode: Forensic Side-by-Side</span>
<button class="font-code-sm text-code-sm bg-surface-container-low hover:bg-surface-container px-space-sm py-1 rounded text-on-surface font-semibold flex items-center gap-1 transition-colors" type="button">
<span class="material-symbols-outlined text-[15px]">swap_horiz</span> Invert View
        </button>
</div>
</div>
<!-- DUAL PHYSICAL / RHEOLOGY SPEC COMPARISON CARDS -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<!-- Left Card: Version 1.0 Baseline -->
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between pb-space-sm">
<div class="flex items-center gap-space-sm">
<span class="font-code-sm text-code-sm bg-surface-container-highest px-2 py-0.5 rounded font-bold">V 1.0</span>
<span class="font-label-caps text-label-caps uppercase text-on-surface-variant">Initial Formulation Sample</span>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant">LOT: LAB-SMP-0941</span>
</div>
<!-- Product Spec Image Visual Placeholder -->
<div class="relative w-full h-44 rounded bg-surface-container-low overflow-hidden my-space-sm">
<img class="w-full h-full object-cover" data-alt="Technical laboratory inspection macro shot of prototype cosmetic serum V1.0 in a glass beaker with a digital viscometer probe inserted, amber backlighting in a sterile cleanroom environment with sharp scientific precision" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjEyYjSb87KDiuOmjUpwzKi1Eb7M5XpjnIwH56ytvC5yOgMoM45HszYERlWi10p7jffyB8ZCmS9C0uBZT6KwvIDxbSsNIKMPnmdp_hb-WhIFFsCzv2k0X_YabZS0abbmz3VjfQSd9BrFd7Q7DUGk5r5XuwA1DgMkvBxHO23bgRgpeg51yCONMJYKMx7egbAdZYikyQIJI6gd4FCyovNZwGkEPw7HOr-dWSdCCQdQUD8-DoqWbYMb-65A"/>
<div class="absolute top-2 left-2 bg-surface-container-lowest/90 px-space-xs py-0.5 rounded font-label-caps text-label-caps uppercase text-on-surface font-bold">
              Archived Baseline
            </div>
<div class="absolute bottom-2 right-2 bg-surface-container-lowest/90 px-space-xs py-0.5 rounded font-code-sm text-code-sm text-error font-semibold flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">cancel</span> Client Rejected
            </div>
</div>
<!-- Metrics Matrix -->
<div class="grid grid-cols-2 gap-space-xs mt-space-sm font-code-sm text-code-sm">
<div class="bg-surface-container-low p-space-xs rounded">
<span class="font-label-caps text-label-caps text-on-surface-variant block uppercase">Brookfield Viscosity</span>
<span class="text-on-surface font-bold text-headline-md font-headline-md">3.200 <span class="text-xs font-normal">cPs</span></span>
<span class="text-error block text-[10px]">Over target range (+33%)</span>
</div>
<div class="bg-surface-container-low p-space-xs rounded">
<span class="font-label-caps text-label-caps text-on-surface-variant block uppercase">Potentiometric pH</span>
<span class="text-on-surface font-bold text-headline-md font-headline-md">5.40 <span class="text-xs font-normal">pH</span></span>
<span class="text-on-surface-variant block text-[10px]">Optimal stability tier</span>
</div>
<div class="bg-surface-container-low p-space-xs rounded">
<span class="font-label-caps text-label-caps text-on-surface-variant block uppercase">Thermal Stability 45°C</span>
<span class="text-on-surface font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-secondary text-[16px]">verified</span> Passed (30 Hari)
              </span>
<span class="text-on-surface-variant block text-[10px]">No separation / precipitate</span>
</div>
<div class="bg-surface-container-low p-space-xs rounded">
<span class="font-label-caps text-label-caps text-on-surface-variant block uppercase">Aroma &amp; Olfactory</span>
<span class="text-on-surface font-semibold truncate block">Unscented Raw Chemical</span>
<span class="text-on-surface-variant block text-[10px]">Noticeable active odor</span>
</div>
</div>
<!-- Client Feedback Quote Box -->
<div class="mt-space-md p-space-sm bg-surface-container-low rounded">
<div class="flex items-center gap-space-xs font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">
<span class="material-symbols-outlined text-[14px]">format_quote</span>
              Client Official Evaluation (2025-02-12):
            </div>
<p class="font-body-md text-body-md italic text-on-surface">
              “Tekstur terasa berat dan lengket saat layering dengan sunscreen. Aroma raw material agak tajam, mohon distabilkan dan tambahkan aroma subtle alami.”
            </p>
</div>
</div>
<div class="pt-space-md mt-space-md flex items-center justify-between text-on-surface-variant font-code-sm text-code-sm">
<span>Sign-off: S. Indrawati (Brand Manager)</span>
<span class="bg-surface-container px-space-xs rounded">ID: REV-01-EXP</span>
</div>
</div>
<!-- Right Card: Version 2.0 Adjusted Variant -->
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between pb-space-sm">
<div class="flex items-center gap-space-sm">
<span class="font-code-sm text-code-sm bg-secondary text-on-secondary px-2 py-0.5 rounded font-bold">V 2.0</span>
<span class="font-label-caps text-label-caps uppercase text-secondary font-bold">Active Physical Prototype</span>
</div>
<span class="font-code-sm text-code-sm text-secondary font-semibold">LOT: LAB-SMP-0978</span>
</div>
<!-- Product Spec Image Visual Placeholder -->
<div class="relative w-full h-44 rounded bg-surface-container-low overflow-hidden my-space-sm">
<img class="w-full h-full object-cover" data-alt="Macro photography of cosmetic serum droplet V2.0 placed on clean textured glass surface with perfect smooth surface tension, clear lightweight finish, illuminated by soft blue clinical lab backlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRuRt_lilnz2V54z4uWXVqcxgyyxHO6qrUXHtts7h4-UdGic125LNbVv8mffeWPtzTdI7wzt0C9aUOM7ChlXGYUjrSZ9x9a2uhXUNDbTsQ0LknqZSg2F-01JcCbzEqb7huGEpEVK5rCDkw3b6OgAXY9xBpEzWLOyG9xE-ipM9WcdmeSNytYUCfkjED8Gur2LTzeVOAPQXXqtTimvd8m2Ddyb9r-WwFtYweOPF0OH_ehQ8_lF-y9B_HKA"/>
<div class="absolute top-2 left-2 bg-secondary text-on-secondary px-space-xs py-0.5 rounded font-label-caps text-label-caps uppercase font-bold">
              Adjusted Variant
            </div>
<div class="absolute bottom-2 right-2 bg-surface-container-lowest/90 px-space-xs py-0.5 rounded font-code-sm text-code-sm text-secondary font-semibold flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">hourglass_top</span> Client Sensory Trial
            </div>
</div>
<!-- Metrics Matrix -->
<div class="grid grid-cols-2 gap-space-xs mt-space-sm font-code-sm text-code-sm">
<div class="bg-surface-container-low p-space-xs rounded">
<span class="font-label-caps text-label-caps text-on-surface-variant block uppercase">Brookfield Viscosity</span>
<span class="text-on-surface font-bold text-headline-md font-headline-md">2.400 <span class="text-xs font-normal">cPs</span></span>
<span class="text-secondary font-semibold block text-[10px]">−800 cPs (Target Match)</span>
</div>
<div class="bg-surface-container-low p-space-xs rounded">
<span class="font-label-caps text-label-caps text-on-surface-variant block uppercase">Potentiometric pH</span>
<span class="text-on-surface font-bold text-headline-md font-headline-md">5.60 <span class="text-xs font-normal">pH</span></span>
<span class="text-secondary font-semibold block text-[10px]">+0.20 buffered safe shift</span>
</div>
<div class="bg-surface-container-low p-space-xs rounded">
<span class="font-label-caps text-label-caps text-on-surface-variant block uppercase">Thermal Stability 45°C</span>
<span class="text-on-surface font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-secondary text-[16px]">sync</span> Testing Day 14 / 30
              </span>
<span class="text-secondary font-semibold block text-[10px]">Zero syneresis recorded</span>
</div>
<div class="bg-surface-container-low p-space-xs rounded">
<span class="font-label-caps text-label-caps text-on-surface-variant block uppercase">Aroma &amp; Olfactory</span>
<span class="text-on-surface font-semibold truncate block">Rosewood Botanical 0.08%</span>
<span class="text-secondary font-semibold block text-[10px]">IFRA Safe for Facial Care</span>
</div>
</div>
<!-- Client Feedback Quote Box -->
<div class="mt-space-md p-space-sm bg-surface-container-low rounded">
<div class="flex items-center gap-space-xs font-label-caps text-label-caps text-secondary uppercase mb-1">
<span class="material-symbols-outlined text-[14px]">format_quote</span>
              Client Verbal Feedback — WhatsApp Call (2025-02-20):
            </div>
<p class="font-body-md text-body-md italic text-on-surface font-medium">
              “Tekstur ideal, penyerapan cepat di bawah 15 detik. Aroma rosewood sangat disukai tim direksi. Menunggu uji layering final tim R&amp;D internal hari ini.”
            </p>
</div>
</div>
<div class="pt-space-md mt-space-md flex items-center justify-between text-on-surface-variant font-code-sm text-code-sm">
<span>Sign-off: dr. Kevin Santoso (Medical Dir.)</span>
<span class="bg-secondary text-on-secondary px-space-xs rounded font-bold">STATUS: CONDITIONAL PASS</span>
</div>
</div>
</div>
</div>
<!-- LAB FORMULATION RECIPE DIFF TABLE -->
<div class="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div>
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[20px]">science</span>
<h3 class="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">Lab Master Formulation Recipe Diff</h3>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Delta breakdown of chemical composition per 100g bulk solution batch</p>
</div>
<div class="flex items-center gap-space-sm">
<span class="font-code-sm text-code-sm bg-surface-container px-space-sm py-1 rounded text-on-surface font-semibold">
          Tolerance Gate: ±0.05%
        </span>
<button class="bg-surface-container-low hover:bg-surface-container p-1 rounded transition-colors text-on-surface-variant hover:text-on-surface" title="Export CSV Table" type="button">
<span class="material-symbols-outlined text-[18px]">download</span>
</button>
</div>
</div>
<!-- Table Responsive Wrap -->
<div class="overflow-x-auto w-full"><div class="min-w-[680px] overflow-hidden border border-surface-container rounded"><table class="w-full text-left"><thead><tr class="bg-surface-container-low font-label-caps text-label-caps text-on-surface-variant uppercase"><th class="py-2.5 px-space-md rounded-l">INCI Nomenclature / CAS Code</th><th class="py-2.5 px-space-md">Functional Phase</th><th class="py-2.5 px-space-md text-right">V1.0 Base (%)</th><th class="py-2.5 px-space-md text-right">V2.0 Adjusted (%)</th><th class="py-2.5 px-space-md text-right">Delta Variance</th><th class="py-2.5 px-space-md text-center">Formulation Impact Note</th><th class="py-2.5 px-space-md rounded-r text-center">Safety Lock</th></tr></thead><tbody class="font-code-sm text-code-sm"><tr class="hover:bg-surface-container-low/50"><td class="py-2 px-space-md font-medium text-on-surface">Aqua / Demineralized Water<span class="block text-[10px] text-on-surface-variant font-normal">CAS: 7732-18-5 • EP Grade</span></td><td class="py-2 px-space-md text-on-surface-variant">Phase A (Solvent Base)</td><td class="py-2 px-space-md text-right text-on-surface">76.35%</td><td class="py-2 px-space-md text-right text-on-surface font-semibold">77.77%</td><td class="py-2 px-space-md text-right text-secondary font-bold">+1.42%</td><td class="py-2 px-space-md text-center text-body-sm text-on-surface-variant">Compensates humectant drop</td><td class="py-2 px-space-md text-center"><span class="material-symbols-outlined text-secondary text-[16px]">verified_user</span></td></tr><tr class="hover:bg-surface-container-low/50"><td class="py-2 px-space-md font-medium text-on-surface">Niacinamide (Vitamin B3)<span class="block text-[10px] text-on-surface-variant font-normal">CAS: 98-92-0 • Purity ≥99.5%</span></td><td class="py-2 px-space-md text-on-surface-variant">Phase B (Key Active)</td><td class="py-2 px-space-md text-right text-on-surface">5.00%</td><td class="py-2 px-space-md text-right text-on-surface font-semibold">5.00%</td><td class="py-2 px-space-md text-right text-on-surface-variant font-medium">0.00% (Locked)</td><td class="py-2 px-space-md text-center text-body-sm text-on-surface-variant">Marketing claim preserved</td><td class="py-2 px-space-md text-center"><span class="material-symbols-outlined text-secondary text-[16px]">lock</span></td></tr><tr class="bg-surface-container-low/70"><td class="py-2 px-space-md font-semibold text-on-surface">Glycerin (Vegetable USP)<span class="block text-[10px] text-on-surface-variant font-normal">CAS: 56-81-5 • Kosher Certified</span></td><td class="py-2 px-space-md text-on-surface-variant">Phase A (Humectant)</td><td class="py-2 px-space-md text-right text-on-surface">6.50%</td><td class="py-2 px-space-md text-right text-error font-bold">4.50%</td><td class="py-2 px-space-md text-right"><span class="bg-error-container text-on-error-container px-space-xs py-0.5 rounded font-bold">−2.00%</span></td><td class="py-2 px-space-md text-center text-body-sm font-semibold text-error">Drastically reduces residual tackiness on skin</td><td class="py-2 px-space-md text-center"><span class="material-symbols-outlined text-secondary text-[16px]">verified</span></td></tr><tr class="bg-surface-container-low/70"><td class="py-2 px-space-md font-semibold text-on-surface">Hyaluronic Multi-Molecular Complex<span class="block text-[10px] text-on-surface-variant font-normal">CAS: 9067-32-7 • 4-Tier Dalton weights</span></td><td class="py-2 px-space-md text-on-surface-variant">Phase B (Film Former / Active)</td><td class="py-2 px-space-md text-right text-on-surface">0.50%</td><td class="py-2 px-space-md text-right text-secondary font-bold">1.00%</td><td class="py-2 px-space-md text-right"><span class="bg-secondary-fixed text-on-secondary-fixed font-bold px-space-xs py-0.5 rounded">+0.50%</span></td><td class="py-2 px-space-md text-center text-body-sm font-semibold text-secondary">Added for silky glide &amp; deep-layer hydration</td><td class="py-2 px-space-md text-center"><span class="material-symbols-outlined text-secondary text-[16px]">verified</span></td></tr><tr class="hover:bg-surface-container-low/50"><td class="py-2 px-space-md font-medium text-on-surface">Ceramide NP &amp; Hydrogenated Lecithin<span class="block text-[10px] text-on-surface-variant font-normal">CAS: 100403-19-8 • Liposome delivery</span></td><td class="py-2 px-space-md text-on-surface-variant">Phase C (Barrier Complex)</td><td class="py-2 px-space-md text-right text-on-surface">1.20%</td><td class="py-2 px-space-md text-right text-on-surface font-semibold">1.20%</td><td class="py-2 px-space-md text-right text-on-surface-variant font-medium">0.00% (Locked)</td><td class="py-2 px-space-md text-center text-body-sm text-on-surface-variant">Unchanged barrier integrity test</td><td class="py-2 px-space-md text-center"><span class="material-symbols-outlined text-secondary text-[16px]">lock</span></td></tr><tr class="hover:bg-surface-container-low/50"><td class="py-2 px-space-md font-medium text-on-surface">Acrylates/C10-30 Alkyl Acrylate Crosspolymer<span class="block text-[10px] text-on-surface-variant font-normal">CAS: 176429-87-1 • Polymer gel</span></td><td class="py-2 px-space-md text-on-surface-variant">Phase A (Thickener)</td><td class="py-2 px-space-md text-right text-on-surface">0.45%</td><td class="py-2 px-space-md text-right text-on-surface font-semibold">0.35%</td><td class="py-2 px-space-md text-right text-secondary font-bold">−0.10%</td><td class="py-2 px-space-md text-center text-body-sm text-on-surface-variant">Lowers pump dispensing shear tension</td><td class="py-2 px-space-md text-center"><span class="material-symbols-outlined text-secondary text-[16px]">verified</span></td></tr><tr class="bg-surface-container-low/70"><td class="py-2 px-space-md font-semibold text-on-surface">Aniba Rosaeodora (Rosewood) Essential Extract<span class="block text-[10px] text-on-surface-variant font-normal">CAS: 83863-32-5 • Distilled Pure Fragrance</span></td><td class="py-2 px-space-md text-on-surface-variant">Phase D (Olfactory Accent)</td><td class="py-2 px-space-md text-right text-on-surface">0.00%</td><td class="py-2 px-space-md text-right text-secondary font-bold">0.08%</td><td class="py-2 px-space-md text-right"><span class="bg-secondary-fixed text-on-secondary-fixed font-bold px-space-xs py-0.5 rounded">+0.08%</span></td><td class="py-2 px-space-md text-center text-body-sm font-semibold text-secondary">Introduced to mask raw active odor cleanly</td><td class="py-2 px-space-md text-center"><span class="material-symbols-outlined text-secondary text-[16px]">verified</span></td></tr><tr class="hover:bg-surface-container-low/50"><td class="py-2 px-space-md font-medium text-on-surface">Phenoxyethanol &amp; Ethylhexylglycerin<span class="block text-[10px] text-on-surface-variant font-normal">CAS: 122-99-6 / 70445-33-9</span></td><td class="py-2 px-space-md text-on-surface-variant">Phase D (Broad Spectrum Preservative)</td><td class="py-2 px-space-md text-right text-on-surface">1.00%</td><td class="py-2 px-space-md text-right text-on-surface font-semibold">1.00%</td><td class="py-2 px-space-md text-right text-on-surface-variant font-medium">0.00% (Locked)</td><td class="py-2 px-space-md text-center text-body-sm text-on-surface-variant">Meets challenge test USP 51</td><td class="py-2 px-space-md text-center"><span class="material-symbols-outlined text-secondary text-[16px]">lock</span></td></tr></tbody></table></div></div>
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs border-t border-surface-container-high font-code-sm text-code-sm text-on-surface-variant">
<div class="flex items-center gap-space-md">
<span>Total Net Mass: <strong class="text-on-surface">100.000% w/w</strong></span>
<span>Lab Scale: <strong class="text-on-surface">5,000.00 g Test Batch</strong></span>
</div>
<div>
<span>SQLite Cryptographic Hash: <code class="text-on-surface font-bold">sha256:4a88f7...c13e</code></span>
</div>
</div>
</div>
<!-- ACTION DOCK / DISPATCH BAR -->
<div class="sticky bottom-10 z-30 bg-surface-container-lowest p-space-md rounded shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md flex-wrap">
<div class="flex items-center gap-space-md">
<div class="w-10 h-10 rounded bg-primary flex items-center justify-center text-on-primary shrink-0">
<span class="material-symbols-outlined text-[22px]">gavel</span>
</div>
<div>
<div class="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Stage Gate Decision Authority</div>
<div class="font-code-sm text-code-sm text-on-surface-variant">
          Dispatcher: <span class="text-on-surface font-semibold">Rian CS Head</span> • Client Authorized Signatory: Active
        </div>
</div>
</div>
<!-- Action Buttons -->
<div class="flex flex-wrap items-center gap-space-sm">
<!-- Generate Client Spec Sheet PDF -->
<button class="h-9 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-code-sm text-code-sm font-semibold flex items-center gap-space-xs transition-colors" id="btnGeneratePdf" onclick="generateSpecPdf()" type="button">
<span class="material-symbols-outlined text-[17px]">picture_as_pdf</span>
<span>Generate Spec Sheet PDF</span>
<kbd class="bg-surface-container-lowest px-1 py-0.5 rounded border border-surface-container text-[10px]">Alt+P</kbd>
</button>
<!-- Request Sample V3 (Trigger Add-on Warning if clicked) -->
<button class="h-9 px-space-md bg-surface-container-highest hover:bg-surface-container text-on-surface rounded font-code-sm text-code-sm font-semibold flex items-center gap-space-xs transition-colors" id="btnRequestV3" onclick="triggerV3Modal()" type="button">
<span class="material-symbols-outlined text-[17px]">science</span>
<span>Request Sample V3 to R&amp;D</span>
<span class="font-label-caps text-label-caps bg-surface-container px-1 rounded text-error font-bold">1 Left</span>
</button>
<!-- Lock Formulation & Proceed to BPOM -->
<button class="h-9 px-space-lg bg-primary hover:bg-primary-container text-on-primary rounded font-code-sm text-code-sm font-bold flex items-center gap-space-xs transition-colors" id="btnLockProceed" onclick="confirmProceedBpom()" type="button">
<span class="material-symbols-outlined text-[18px]">verified</span>
<span>Lock Formulation &amp; Proceed to BPOM</span>
<kbd class="bg-surface-container-highest/30 px-1 py-0.5 rounded text-[10px] text-on-primary">Ctrl+Enter</kbd>
</button>
</div>
</div>
<!-- INTERACTIVE MODAL / DIALOG (Hidden by default) -->
<div class="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm hidden flex items-center justify-center p-space-md" id="decisionModal">
<div class="bg-surface-container-lowest rounded max-w-lg w-full p-space-lg shadow-2xl flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<div class="w-8 h-8 rounded bg-secondary flex items-center justify-center text-on-secondary">
<span class="material-symbols-outlined text-[20px]">verified</span>
</div>
<div>
<h3 class="font-headline-lg text-headline-lg font-bold text-on-surface">Lock V2.0 Formulation Master</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Official transition to regulatory compliance dossier</p>
</div>
</div>
<button class="text-on-surface-variant hover:text-on-surface" onclick="closeDecisionModal()" type="button">
<span class="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<div class="bg-surface-container-low p-space-sm rounded flex flex-col gap-1 font-code-sm text-code-sm">
<div class="flex justify-between">
<span class="text-on-surface-variant">Batch Record REF:</span>
<span class="font-bold text-on-surface">SMP-2025-0819</span>
</div>
<div class="flex justify-between">
<span class="text-on-surface-variant">Selected Prototype:</span>
<span class="font-bold text-secondary">Version 2.0 (Adjusted Rosewood)</span>
</div>
<div class="flex justify-between">
<span class="text-on-surface-variant">Next Pipeline Milestone:</span>
<span class="font-bold text-on-surface">BPOM Notifikasi &amp; CPKB Micro Testing</span>
</div>
<div class="flex justify-between">
<span class="text-on-surface-variant">Remaining Revision Quota:</span>
<span class="text-error font-bold">1 Revision will be archived as unused</span>
</div>
</div>
<p class="font-body-sm text-body-sm text-on-surface">
        Upon confirmation, this chemical formula will be cryptographically locked in SQLite WAL. No further viscosity or ingredient alterations can be made without generating an Engineering Change Order (ECO).
      </p>
<div class="flex items-center justify-end gap-space-sm pt-space-xs">
<button class="h-8 px-space-md bg-surface-container hover:bg-surface-container-high text-on-surface rounded font-code-sm text-code-sm font-semibold transition-colors" onclick="closeDecisionModal()" type="button">
          Cancel / Return
        </button>
<button class="h-8 px-space-lg bg-primary hover:bg-primary-container text-on-primary rounded font-code-sm text-code-sm font-bold flex items-center gap-1 transition-colors" onclick="executeBpomSubmission()" type="button">
<span class="material-symbols-outlined text-[16px]">send</span>
          Dispatch to Regulatory Dossier
        </button>
</div>
</div>
</div>
<!-- TOAST NOTIFICATION STACK -->
<div class="fixed top-16 right-4 z-50 transform translate-y-[-200%] transition-transform duration-300 bg-surface-container-lowest text-on-surface shadow-xl rounded p-space-md flex items-center gap-space-sm" id="toastNotification">
<span class="material-symbols-outlined text-secondary text-[22px]" id="toastIcon">check_circle</span>
<div>
<div class="font-headline-md text-headline-md font-bold leading-tight" id="toastTitle">Action Dispatched</div>
<div class="font-code-sm text-code-sm text-on-surface-variant leading-tight" id="toastMessage">SQLite record updated synchronously.</div>
</div>
</div>
</div>
<script>
  function showToast(title, message, iconName = 'check_circle', isError = false) {
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    toastTitle.textContent = title;
    toastMsg.textContent = message;
    toastIcon.textContent = iconName;

    if (isError) {
      toastIcon.className = "material-symbols-outlined text-error text-[22px]";
    } else {
      toastIcon.className = "material-symbols-outlined text-secondary text-[22px]";
    }

    toast.classList.remove('translate-y-[-200%]');
    toast.classList.add('translate-y-0');

    setTimeout(() => {
      toast.classList.remove('translate-y-0');
      toast.classList.add('translate-y-[-200%]');
    }, 3800);
  }

  function generateSpecPdf() {
    showToast('Spec Sheet PDF Generated', 'Exported: AURA-GLOW-REV02-SPEC-2025.pdf (142 KB)', 'picture_as_pdf');
  }

  function triggerV3Modal() {
    showToast('R&D Ticket Initialized', 'Sample V3 drafting queue opened. Quota will reach [3/3 USED].', 'science');
  }

  function confirmProceedBpom() {
    const modal = document.getElementById('decisionModal');
    modal.classList.remove('hidden');
  }

  function closeDecisionModal() {
    const modal = document.getElementById('decisionModal');
    modal.classList.add('hidden');
  }

  function executeBpomSubmission() {
    closeDecisionModal();
    showToast('Formulation Master Sealed', 'V2.0 transmitted to BPOM Regulatory Queue. SPK draft triggered.', 'verified');
    const lockBtn = document.getElementById('btnLockProceed');
    if (lockBtn) {
      lockBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">lock</span><span>FORMULATION LOCKED (BPOM DISPATCHED)</span>';
      lockBtn.classList.add('opacity-70', 'pointer-events-none');
    }
  }

  // Keyboard shortcut affordance listener
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      confirmProceedBpom();
    }
    if (e.altKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      generateSpecPdf();
    }
    if (e.key === 'Escape') {
      closeDecisionModal();
    }
  });
</script></main></div><footer class="fixed bottom-0 left-0 right-0 h-8 bg-surface-container-lowest border-t border-surface-container z-50 flex items-center justify-between px-gutter-dense"><div class="flex items-center gap-space-lg"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Shortcuts:</span><div class="flex items-center gap-space-xs font-code-sm text-code-sm"><kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Ctrl+N</kbd><span class="text-on-surface-variant">New Lead</span></div><div class="flex items-center gap-space-xs font-code-sm text-code-sm"><kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Alt+A</kbd><span class="text-on-surface-variant">Quick Approval</span></div><div class="flex items-center gap-space-xs font-code-sm text-code-sm"><kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Esc</kbd><span class="text-on-surface-variant">Cancel / Dismiss</span></div></div><div class="flex items-center gap-space-md"><span class="font-code-sm text-code-sm text-on-surface-variant">Local Cache: <span class="text-on-surface font-semibold">SQLite 3.44.0 (In-Memory WAL)</span></span><div class="h-3 w-[1px] bg-surface-container"></div><span class="font-code-sm text-code-sm text-secondary font-semibold">ENCRYPTED SECURE SESSION</span></div></footer></body></html>

kode ini untuk SCR-07: Audit Log & Security Sessions

<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface-variant": "#d3e4fe", "outline-variant": "#c6c6cd", "on-primary": "#ffffff", "on-error-container": "#93000a", "error-container": "#ffdad6", "on-tertiary-fixed": "#2f1500", "surface-tint": "#565e74", "surface-dim": "#cbdbf5", "on-secondary-container": "#fefcff", "surface-container-high": "#dce9ff", "inverse-primary": "#bec6e0", "on-surface": "#0b1c30", "surface-bright": "#f8f9ff", "background": "#f8f9ff", "outline": "#76777d", "tertiary-container": "#2f1500", "surface-container-highest": "#d3e4fe", "tertiary-fixed-dim": "#ffb77d", "on-tertiary": "#ffffff", "on-secondary-fixed-variant": "#003ea8", "inverse-on-surface": "#eaf1ff", "on-surface-variant": "#45464d", "tertiary": "#000000", "secondary-container": "#316bf3", "on-background": "#0b1c30", "inverse-surface": "#213145", "on-secondary-fixed": "#00174b", "on-tertiary-fixed-variant": "#6e3900", "on-secondary": "#ffffff", "error": "#ba1a1a", "primary-fixed": "#dae2fd", "surface": "#f8f9ff", "primary-fixed-dim": "#bec6e0", "surface-container-low": "#eff4ff", "on-error": "#ffffff", "surface-container-lowest": "#ffffff", "on-primary-container": "#7c839b", "on-primary-fixed": "#131b2e", "primary": "#000000", "primary-container": "#131b2e", "secondary": "#0051d5", "tertiary-fixed": "#ffdcc3", "secondary-fixed": "#dbe1ff", "on-tertiary-container": "#c76c00", "surface-container": "#e5eeff", "on-primary-fixed-variant": "#3f465c", "secondary-fixed-dim": "#b4c5ff" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "gutter-dense": "0.375rem", "gutter": "0.75rem", "space-md": "0.5rem", "margin": "1rem", "space-lg": "0.75rem", "space-sm": "0.25rem", "space-xs": "0.125rem", "space-xl": "1rem" }, "fontFamily": { "body-md": [ "Plus Jakarta Sans" ], "headline-xl": [ "Plus Jakarta Sans" ], "headline-lg": [ "Plus Jakarta Sans" ], "label-caps": [ "JetBrains Mono" ], "code-md": [ "JetBrains Mono" ], "code-sm": [ "JetBrains Mono" ], "body-sm": [ "Plus Jakarta Sans" ], "headline-md": [ "Plus Jakarta Sans" ], "code-lg": [ "JetBrains Mono" ] }, "fontSize": { "body-md": [ "13px", { "lineHeight": "18px", "letterSpacing": "0em", "fontWeight": "400" } ], "headline-xl": [ "24px", { "lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "700" } ], "headline-lg": [ "18px", { "lineHeight": "24px", "letterSpacing": "-0.015em", "fontWeight": "600" } ], "label-caps": [ "10px", { "lineHeight": "12px", "letterSpacing": "0.08em", "fontWeight": "600" } ], "code-md": [ "12px", { "lineHeight": "16px", "letterSpacing": "0em", "fontWeight": "500" } ], "code-sm": [ "11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" } ], "body-sm": [ "12px", { "lineHeight": "16px", "letterSpacing": "0em", "fontWeight": "400" } ], "headline-md": [ "15px", { "lineHeight": "20px", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "code-lg": [ "13px", { "lineHeight": "18px", "letterSpacing": "-0.01em", "fontWeight": "500" } ] } } } };</script></head><body class="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen"><header class="fixed top-0 left-0 right-0 h-14 bg-surface-container-lowest z-50 flex items-center justify-between px-gutter-dense border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-sm pl-space-xs"><span class="material-symbols-outlined text-secondary text-[20px]">precision_manufacturing</span><span class="font-headline-md text-headline-md tracking-tight text-on-surface font-bold">MaklonOS</span><span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-on-surface-variant uppercase">Core v2.4</span></div><div class="h-4 w-[1px] bg-surface-container"></div><button class="flex items-center gap-space-md bg-surface-container-low hover:bg-surface-container px-space-lg py-space-xs rounded text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" type="button"><span class="material-symbols-outlined text-[16px]">search</span><span class="font-body-sm text-body-sm">Cari Client, Batch, SPK...</span><span class="font-label-caps text-label-caps bg-surface-container-lowest px-space-xs rounded text-on-surface-variant border border-surface-container">CTRL+K</span></button></div><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-0.5 rounded border border-surface-container"><span class="h-2 w-2 rounded-full bg-secondary animate-pulse"></span><span class="font-code-sm text-code-sm text-on-surface-variant">SQLite Sync: <span class="text-on-surface font-semibold">0 pending txns</span></span></div><div class="flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm"><span class="material-symbols-outlined text-[16px]">schedule</span><span>14:32:08 WIB</span></div><div class="h-4 w-[1px] bg-surface-container"></div><div class="flex items-center gap-space-md"><div class="text-right"><div class="font-headline-md text-headline-md text-on-surface leading-none">Rian CS Head</div><div class="font-label-caps text-label-caps text-secondary uppercase">Lead Dispatcher</div></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><button class="p-space-xs text-error hover:bg-error-container hover:text-on-error-container rounded transition-colors" title="Force Logout" type="button"><span class="material-symbols-outlined text-[18px]">power_settings_new</span></button></div></div></header><aside class="fixed left-0 top-14 bottom-8 w-64 bg-surface-container-lowest border-r border-surface-container z-40 flex flex-col justify-between overflow-y-auto"><div class="p-space-md"><div class="font-label-caps text-label-caps text-on-surface-variant px-space-sm mb-space-sm tracking-wider uppercase">Siklus Operasional Maklon</div><nav class="flex flex-col gap-0.5" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded"><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="cs-crm-core" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">support_agent</span><span>CS &amp; CRM Core</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M1</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="lead-intake-segmentasi" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">filter_alt</span><span>Lead Intake &amp; Segmentasi</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M2</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="sample-tracker-revision-counter" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">science</span><span>Sample Tracker &amp; Rev</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M3</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="katalog-formulasi-moq" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">inventory_2</span><span>Katalog Formulasi &amp; MOQ</span></div><span class="font-code-sm text-code-sm bg-surface-container px-space-xs rounded">M4</span></a><div class="my-space-sm border-t border-surface-container"></div><div class="font-label-caps text-label-caps text-on-surface-variant px-space-sm mb-space-xs tracking-wider uppercase">Lanjutan Pipeline</div><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="rnd-lab-sample-queue" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">biotech</span><span>RnD Lab &amp; Queue (Fase 2)</span></div><span class="font-code-sm text-code-sm text-on-surface-variant">v2</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="ppic-lantai-produksi" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">factory</span><span>PPIC &amp; Produksi (Fase 3)</span></div><span class="font-code-sm text-code-sm text-on-surface-variant">v3</span></a><a class="flex items-center justify-between px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-body-sm transition-colors rounded" data-path="audit-log-device-sessions" href="#"><div class="flex items-center gap-space-md"><span class="material-symbols-outlined text-[18px]">security</span><span>Audit Log &amp; Sessions</span></div><span class="font-code-sm text-code-sm text-on-surface-variant">REC</span></a></nav></div><div class="p-space-md border-t border-surface-container bg-surface-container-low"><div class="flex items-center justify-between text-on-surface-variant"><span class="font-label-caps text-label-caps uppercase">Terminal ID</span><span class="font-code-sm text-code-sm font-semibold text-on-surface">WS-SBY-048</span></div><div class="flex items-center justify-between text-on-surface-variant mt-0.5"><span class="font-label-caps text-label-caps uppercase">Engine Cache</span><span class="font-code-sm text-code-sm text-secondary font-semibold">WAL 64MB OK</span></div></div></aside><div class="pl-64"><main class="pt-14 pb-8 min-h-screen bg-background w-full px-space-lg"><div class="flex flex-col w-full">
<!-- Gate Alert / Security Anomaly Strip -->
<div class="mb-gutter rounded bg-error text-on-error p-space-md shadow-md flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-[24px] text-white">gpp_maybe</span>
<div>
<div class="flex items-center gap-space-sm">
<span class="font-label-caps text-label-caps uppercase bg-white/20 px-space-xs py-0.5 rounded font-bold tracking-wider">Gate Intercept Alert</span>
<span class="font-code-sm text-code-sm text-white/90">SEC-ID: ANOMALY-8841-EXT</span>
</div>
<p class="font-body-sm text-body-sm text-white/90 mt-0.5">
          Unrecognized subnet connection intercepted on <span class="font-code-sm text-code-sm font-bold underline">103.147.9.22</span> targeting endpoint <code class="font-code-sm text-code-sm bg-black/30 px-space-xs rounded">/api/v2/formula/export-moq</code> with elevated CS token credentials.
        </p>
</div>
</div>
<div class="flex items-center gap-space-sm shrink-0">
<button class="px-space-md py-space-xs rounded bg-white text-error font-code-sm text-code-sm font-semibold hover:bg-surface-bright transition-colors shadow-sm" onclick="triggerQuarantine('103.147.9.22')" type="button">
        Quarantine IP &amp; Flush Token
      </button>
<button class="px-space-sm py-space-xs rounded bg-black/20 hover:bg-black/30 text-white font-code-sm text-code-sm" type="button">
        Dismiss
      </button>
</div>
</div>
<!-- KPI Metrics Quartet -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-gutter">
<!-- Card 1 -->
<div class="rounded bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between">
<div class="flex items-start justify-between">
<div>
<span class="font-label-caps text-label-caps uppercase text-on-surface-variant">Fleet Connectivity</span>
<div class="font-headline-xl text-headline-xl text-on-surface mt-space-xs tracking-tight">16 Nodes</div>
</div>
<div class="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]">devices</span>
</div>
</div>
<div class="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant">
<span class="font-code-sm text-code-sm"><span class="text-on-surface font-semibold">14</span> Workstations (WS)</span>
<span class="font-code-sm text-code-sm"><span class="text-secondary font-semibold">2</span> Sales Tablets</span>
</div>
<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"></div>
</div>
<!-- Card 2 -->
<div class="rounded bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between">
<div class="flex items-start justify-between">
<div>
<span class="font-label-caps text-label-caps uppercase text-on-surface-variant">Local SQLite CRDT</span>
<div class="font-headline-xl text-headline-xl text-on-surface mt-space-xs tracking-tight flex items-baseline gap-space-xs">
<span>0</span>
<span class="font-code-sm text-code-sm text-on-surface-variant font-normal">conflicts</span>
</div>
</div>
<div class="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center text-on-surface">
<span class="material-symbols-outlined text-[20px]">dataset</span>
</div>
</div>
<div class="mt-space-md pt-space-xs flex items-center justify-between">
<span class="font-code-sm text-code-sm text-on-surface-variant">CRDT Replay Log: <span class="font-semibold text-on-surface">Zero Drift</span></span>
<span class="font-label-caps text-label-caps text-secondary uppercase bg-surface-container-high px-space-xs rounded">Healthy</span>
</div>
<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-container"></div>
</div>
<!-- Card 3 -->
<div class="rounded bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between">
<div class="flex items-start justify-between">
<div>
<span class="font-label-caps text-label-caps uppercase text-on-surface-variant">HS256 Session Leases</span>
<div class="font-headline-xl text-headline-xl text-on-surface mt-space-xs tracking-tight font-code-lg">
            08:00:00
          </div>
</div>
<div class="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[20px]">key</span>
</div>
</div>
<div class="mt-space-md pt-space-xs flex items-center justify-between">
<span class="font-code-sm text-code-sm text-on-surface-variant">Hard Key Rotation</span>
<span class="font-code-sm text-code-sm text-secondary font-semibold">T-04h 27m</span>
</div>
<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
</div>
<!-- Card 4 -->
<div class="rounded bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between">
<div class="flex items-start justify-between">
<div>
<span class="font-label-caps text-label-caps uppercase text-on-surface-variant">Forensic Audit Velocity</span>
<div class="font-headline-xl text-headline-xl text-on-surface mt-space-xs tracking-tight flex items-baseline gap-space-xs">
<span>42</span>
<span class="font-code-sm text-code-sm text-on-surface-variant font-normal">/ 24h</span>
</div>
</div>
<div class="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-on-surface">
<span class="material-symbols-outlined text-[20px]">policy</span>
</div>
</div>
<div class="mt-space-md pt-space-xs flex items-center justify-between">
<span class="font-code-sm text-code-sm text-on-surface-variant">High-Risk Gated</span>
<span class="font-code-sm text-code-sm font-bold text-error">3 Critical</span>
</div>
<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-error"></div>
</div>
</div>
<!-- Operational Workspace Split View: Left (Audit Trail 70%) / Right (Security Relays & Diagnostics 30%) -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-5 w-full min-w-0">
<!-- Left Main Column: Forensic Audit Trail & Table (Col 8) -->
<section class="xl:col-span-8 min-w-0 flex flex-col gap-5">
<!-- Table Controls Bar -->
<div class="bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
<h2 class="font-headline-md text-headline-md text-on-surface">Live Ledger Trail</h2>
</div>
<span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-on-surface-variant uppercase">
            IMMUTABLE HASH PIPE
          </span>
</div>
<div class="flex items-center gap-space-xs flex-wrap">
<div class="flex items-center bg-surface-container-low px-space-sm py-space-xs rounded">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant mr-1">filter_list</span>
<select class="bg-transparent font-code-sm text-code-sm text-on-surface outline-none cursor-pointer" id="filterSeverity">
<option value="ALL">All Risk Levels</option>
<option value="CRITICAL">Critical Gate (High-Risk)</option>
<option value="WARNING">Operational Warning</option>
<option value="INFO">Informational Log</option>
</select>
</div>
<button class="px-space-md py-space-xs rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-code-sm text-code-sm flex items-center gap-1 transition-colors" onclick="exportAuditLedger()" type="button">
<span class="material-symbols-outlined text-[14px]">download</span>
<span>CSV Dump</span>
</button>
<button class="p-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" onclick="refreshLedger()" title="Force Sync Re-read" type="button">
<span class="material-symbols-outlined text-[16px]">refresh</span>
</button>
</div>
</div>
<!-- Main Audit Data Table -->
<div class="bg-surface-container-lowest rounded shadow-sm overflow-hidden flex flex-col">
<div class="overflow-x-auto">
<div class="overflow-x-auto w-full"><div class="min-w-[680px]"><table class="w-full text-left" id="auditTable"><thead><tr class="bg-surface-container-low font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider h-8"><th class="px-space-md py-space-xs">Timestamp</th><th class="px-space-md py-space-xs">Operator &amp; Role</th><th class="px-space-md py-space-xs">Node / IP Address</th><th class="px-space-md py-space-xs">Executed Action</th><th class="px-space-md py-space-xs">Security State</th><th class="px-space-md py-space-xs font-right">Hash Signature</th></tr></thead><tbody class="divide-y-0 text-on-surface font-body-sm text-body-sm"><tr class="hover:bg-surface-container-low/50 transition-colors h-9" data-severity="CRITICAL"><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">14:31:54.028</td><td class="px-space-md py-space-xs whitespace-nowrap"><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-error"></span><span class="font-semibold text-on-surface">Budi Darmawan</span><span class="font-code-sm text-code-sm text-on-surface-variant">(R&amp;D Lab)</span></div></td><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">WS-SBY-012 <span class="text-outline">/ 192.168.4.110</span></td><td class="px-space-md py-space-xs font-semibold text-error whitespace-nowrap flex items-center gap-1 mt-1"><span class="material-symbols-outlined text-[15px]">lock_open</span>Override Sample Gate Lock (REV-03.1)</td><td class="px-space-md py-space-xs whitespace-nowrap"><span class="inline-flex items-center px-space-xs py-0.5 rounded font-label-caps text-label-caps font-bold bg-error text-on-error uppercase">Critical High-Risk</span></td><td class="px-space-md py-space-xs font-code-sm text-code-sm text-on-surface-variant font-mono"><span class="bg-surface-container px-space-xs py-0.5 rounded" title="Full SHA256: 0x9a8f2761bc994012ae44">0x9a8f...4012</span></td></tr><tr class="hover:bg-surface-container-low/50 transition-colors h-9 bg-surface-container-lowest" data-severity="WARNING"><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">14:28:11.902</td><td class="px-space-md py-space-xs whitespace-nowrap"><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-secondary"></span><span class="font-semibold text-on-surface">Citra Ayu</span><span class="font-code-sm text-code-sm text-on-surface-variant">(Sales Ops)</span></div></td><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">TAB-FLD-002 <span class="text-outline">/ 10.200.1.44</span></td><td class="px-space-md py-space-xs whitespace-nowrap text-on-surface">Export Formulation Recipe [MKL-SRM-500]</td><td class="px-space-md py-space-xs whitespace-nowrap"><span class="inline-flex items-center px-space-xs py-0.5 rounded font-label-caps text-label-caps font-semibold bg-tertiary-fixed text-on-tertiary-fixed uppercase">Warning Guard</span></td><td class="px-space-md py-space-xs font-code-sm text-code-sm text-on-surface-variant font-mono"><span class="bg-surface-container px-space-xs py-0.5 rounded">0x3b1c...99e1</span></td></tr><tr class="hover:bg-surface-container-low/50 transition-colors h-9 bg-surface-container-lowest" data-severity="WARNING"><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">14:15:02.441</td><td class="px-space-md py-space-xs whitespace-nowrap"><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-secondary"></span><span class="font-semibold text-on-surface">Rian CS Head</span><span class="font-code-sm text-code-sm text-on-surface-variant">(Dispatcher)</span></div></td><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">WS-SBY-048 <span class="text-outline">/ 192.168.4.102</span></td><td class="px-space-md py-space-xs whitespace-nowrap text-on-surface">Update Client Tier: PT Kosmetika Utama (Tier-C → Tier-A)</td><td class="px-space-md py-space-xs whitespace-nowrap"><span class="inline-flex items-center px-space-xs py-0.5 rounded font-label-caps text-label-caps font-semibold bg-tertiary-fixed text-on-tertiary-fixed uppercase">Warning Guard</span></td><td class="px-space-md py-space-xs font-code-sm text-code-sm text-on-surface-variant font-mono"><span class="bg-surface-container px-space-xs py-0.5 rounded">0x77c2...fa10</span></td></tr><tr class="hover:bg-surface-container-low/50 transition-colors h-9 bg-surface-container-lowest" data-severity="CRITICAL"><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">13:58:49.120</td><td class="px-space-md py-space-xs whitespace-nowrap"><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-error"></span><span class="font-semibold text-on-surface">Agus Finance</span><span class="font-code-sm text-code-sm text-on-surface-variant">(Billing)</span></div></td><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">WS-SBY-004 <span class="text-outline">/ 192.168.4.15</span></td><td class="px-space-md py-space-xs font-semibold text-error whitespace-nowrap flex items-center gap-1 mt-1"><span class="material-symbols-outlined text-[15px]">verified</span>Batch Dispatch Approval: SPK-B24-8891 (MOQ: 10,000)</td><td class="px-space-md py-space-xs whitespace-nowrap"><span class="inline-flex items-center px-space-xs py-0.5 rounded font-label-caps text-label-caps font-bold bg-error text-on-error uppercase">Critical High-Risk</span></td><td class="px-space-md py-space-xs font-code-sm text-code-sm text-on-surface-variant font-mono"><span class="bg-surface-container px-space-xs py-0.5 rounded">0x11b9...c55d</span></td></tr><tr class="hover:bg-surface-container-low/50 transition-colors h-9 bg-surface-container-lowest" data-severity="INFO"><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">13:45:10.005</td><td class="px-space-md py-space-xs whitespace-nowrap"><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-outline"></span><span class="font-semibold text-on-surface">Dewi Admin</span><span class="font-code-sm text-code-sm text-on-surface-variant">(Intake)</span></div></td><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">WS-SBY-021 <span class="text-outline">/ 192.168.4.88</span></td><td class="px-space-md py-space-xs whitespace-nowrap text-on-surface-variant">Create Lead Entity: CV Sinar Cantik Mandiri</td><td class="px-space-md py-space-xs whitespace-nowrap"><span class="inline-flex items-center px-space-xs py-0.5 rounded font-label-caps text-label-caps bg-surface-container text-on-surface-variant uppercase">Informational</span></td><td class="px-space-md py-space-xs font-code-sm text-code-sm text-on-surface-variant font-mono"><span class="bg-surface-container px-space-xs py-0.5 rounded">0x44fa...7e29</span></td></tr><tr class="hover:bg-surface-container-low/50 transition-colors h-9 bg-surface-container-lowest" data-severity="INFO"><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">13:22:15.819</td><td class="px-space-md py-space-xs whitespace-nowrap"><div class="flex items-center gap-space-xs"><span class="w-2 h-2 rounded-full bg-outline"></span><span class="font-semibold text-on-surface">Siti PPIC</span><span class="font-code-sm text-code-sm text-on-surface-variant">(Sched)</span></div></td><td class="px-space-md py-space-xs font-code-sm text-code-sm whitespace-nowrap text-on-surface-variant">WS-SBY-009 <span class="text-outline">/ 192.168.4.45</span></td><td class="px-space-md py-space-xs whitespace-nowrap text-on-surface-variant">Queue Batch Slot: Reactor Kettle #4 (Sunscreen SPF30)</td><td class="px-space-md py-space-xs whitespace-nowrap"><span class="inline-flex items-center px-space-xs py-0.5 rounded font-label-caps text-label-caps bg-surface-container text-on-surface-variant uppercase">Informational</span></td><td class="px-space-md py-space-xs font-code-sm text-code-sm text-on-surface-variant font-mono"><span class="bg-surface-container px-space-xs py-0.5 rounded">0xee01...884a</span></td></tr></tbody></table></div></div>
</div>
<!-- Table Footer / Telemetry Pagination -->
<div class="p-space-sm bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-sm font-code-sm text-code-sm text-on-surface-variant">
<div class="flex items-center gap-space-md">
<span>Showing <span class="font-semibold text-on-surface">6 of 42</span> audited actions</span>
<span class="text-outline">•</span>
<span>Integrity: <span class="text-secondary font-semibold">Merkle Root Verified [2048-bit]</span></span>
</div>
<div class="flex items-center gap-space-xs">
<button class="px-space-sm py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface">Prev</button>
<span class="px-space-xs">1 / 7</span>
<button class="px-space-sm py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface">Next</button>
</div>
</div>
</div>
<!-- Real-Time Activity Hash Flow Graph Visual -->
<div class="bg-surface-container-lowest rounded p-space-md shadow-sm">
<div class="flex items-center justify-between mb-space-sm">
<div>
<h3 class="font-headline-md text-headline-md text-on-surface">Audit Velocity &amp; Anomaly Spike Spectrum</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">24-hour ingestion profile of cryptographic audit nodes across Maklon subnets</p>
</div>
<span class="font-code-sm text-code-sm bg-surface-container px-space-sm py-0.5 rounded text-on-surface">
            Mean: 1.75 ops/min
          </span>
</div>
<!-- Inline Metric SVG Waveform -->
<div class="w-full h-24 bg-surface-container-low rounded p-space-xs relative overflow-hidden flex items-end min-w-0">
<svg class="w-full h-full text-secondary" fill="none" preserveaspectratio="none" viewbox="0 0 500 100">
<defs>
<lineargradient id="auditWaveGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="currentColor" stop-opacity="0.3"></stop>
<stop offset="100%" stop-color="currentColor" stop-opacity="0.0"></stop>
</lineargradient>
</defs>
<path d="M0,80 L20,75 L45,82 L70,60 L95,65 L120,40 L145,55 L170,30 L195,60 L220,70 L245,25 L270,15 L295,45 L320,50 L345,20 L370,65 L395,70 L420,35 L445,40 L470,25 L500,30 L500,100 L0,100 Z" fill="url(#auditWaveGrad)"></path>
<path d="M0,80 L20,75 L45,82 L70,60 L95,65 L120,40 L145,55 L170,30 L195,60 L220,70 L245,25 L270,15 L295,45 L320,50 L345,20 L370,65 L395,70 L420,35 L445,40 L470,25 L500,30" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
<!-- High Alert Pin -->
<circle class="fill-error stroke-white" cx="270" cy="15" r="4"></circle>
</svg>
<div class="absolute top-2 left-3 font-code-sm text-code-sm text-on-surface-variant flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-error animate-ping"></span>
<span>Peak Gate Violation: 14:31 WIB (Sample Lock Bypass)</span>
</div>
</div>
</div>
</section>
<!-- Right Side Column: Session Controller & Local DB Diagnostics (Col 4) -->
<aside class="xl:col-span-4 min-w-0 flex flex-col gap-5">
<!-- Device Sessions & Force Terminate Panel -->
<div class="bg-surface-container-lowest rounded p-space-md shadow-sm">
<div class="flex items-center justify-between pb-space-sm">
<div>
<h3 class="font-headline-md text-headline-md text-on-surface">Active Terminals</h3>
<span class="font-code-sm text-code-sm text-on-surface-variant">16 Authenticated Workstations</span>
</div>
<button class="px-space-sm py-space-xs rounded bg-error hover:bg-error/90 text-on-error font-code-sm text-code-sm font-semibold flex items-center gap-1 shadow-sm transition-colors" onclick="openGlobalKillModal()" type="button">
<span class="material-symbols-outlined text-[15px]">power_settings_new</span>
<span>Revoke All</span>
</button>
</div>
<!-- Terminal List -->
<div class="space-y-space-xs mt-space-sm">
<!-- Session Item 1: Current -->
<div class="p-space-sm rounded bg-surface-container-low flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<div>
<div class="font-code-sm text-code-sm font-bold text-on-surface flex items-center gap-1">
                  WS-SBY-048
                  <span class="font-label-caps text-label-caps bg-secondary text-on-secondary px-space-xs rounded">THIS DEVICE</span>
</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Rian CS Head • 192.168.4.102</div>
</div>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant">Active now</span>
</div>
<!-- Session Item 2: Lab Workstation -->
<div class="p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-low flex items-center justify-between transition-colors">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<div>
<div class="font-code-sm text-code-sm font-bold text-on-surface">WS-SBY-012</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Budi Darmawan • RnD Lab Desk</div>
</div>
</div>
<button class="px-space-xs py-0.5 rounded bg-error-container hover:bg-error text-on-error-container hover:text-on-error font-code-sm text-code-sm transition-colors" onclick="terminateSession('WS-SBY-012', 'Budi Darmawan')" title="Force Logout Operator" type="button">
              Kill
            </button>
</div>
<!-- Session Item 3: PPIC Floor Terminal -->
<div class="p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-low flex items-center justify-between transition-colors">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<div>
<div class="font-code-sm text-code-sm font-bold text-on-surface">WS-SBY-009</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Siti PPIC • Kettle Control 1</div>
</div>
</div>
<button class="px-space-xs py-0.5 rounded bg-error-container hover:bg-error text-on-error-container hover:text-on-error font-code-sm text-code-sm transition-colors" onclick="terminateSession('WS-SBY-009', 'Siti PPIC')" title="Force Logout Operator" type="button">
              Kill
            </button>
</div>
<!-- Session Item 4: Mobile Sales Tablet -->
<div class="p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-low flex items-center justify-between transition-colors">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
<div>
<div class="font-code-sm text-code-sm font-bold text-on-surface">TAB-FLD-002</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Citra Ayu • Outdoor Cellular</div>
</div>
</div>
<button class="px-space-xs py-0.5 rounded bg-error-container hover:bg-error text-on-error-container hover:text-on-error font-code-sm text-code-sm transition-colors" onclick="terminateSession('TAB-FLD-002', 'Citra Ayu')" title="Force Logout Operator" type="button">
              Kill
            </button>
</div>
</div>
</div>
<!-- Local-First SQLite Database Engine & OPFS Health Panel -->
<div class="bg-surface-container-lowest rounded p-space-md shadow-sm">
<div class="flex items-center justify-between pb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[20px]">storage</span>
<h3 class="font-headline-md text-headline-md text-on-surface">Local-First Storage Engine</h3>
</div>
<span class="font-label-caps text-label-caps bg-surface-container-high px-space-xs py-0.5 rounded text-secondary font-bold uppercase">
            OPFS WAL
          </span>
</div>
<div class="space-y-space-md mt-space-xs">
<!-- OPFS Quota Gauge -->
<div>
<div class="flex justify-between font-code-sm text-code-sm mb-1 text-on-surface">
<span>Browser Storage Allotted</span>
<span class="font-semibold">42.8 MB / 2,048.0 MB</span>
</div>
<div class="w-full bg-surface-container h-2 rounded overflow-hidden">
<div class="bg-secondary h-full rounded" style="width: 2.1%;"></div>
</div>
<div class="flex justify-between font-label-caps text-label-caps text-on-surface-variant mt-1">
<span>maklon_local_v24.db</span>
<span>2.1% Consumed</span>
</div>
</div>
<!-- Pending Write Buffer -->
<div class="p-space-sm rounded bg-surface-container-low flex items-center justify-between">
<div>
<div class="font-label-caps text-label-caps uppercase text-on-surface-variant">Outbox Queue Mutations</div>
<div class="font-code-lg text-code-lg font-bold text-on-surface mt-0.5">0 Pending Txns</div>
</div>
<div class="text-right">
<span class="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded text-secondary font-bold">ACK OK</span>
<div class="font-code-sm text-code-sm text-on-surface-variant mt-0.5">Latency 14ms</div>
</div>
</div>
<!-- Maintenance Operations -->
<div class="flex flex-col gap-space-xs pt-space-xs">
<button class="w-full py-space-xs px-space-md rounded bg-primary hover:bg-on-surface-variant text-on-primary font-code-sm text-code-sm font-semibold flex items-center justify-center gap-space-xs transition-colors shadow-sm" id="btnSyncFlush" onclick="triggerManualSync()" type="button">
<span class="material-symbols-outlined text-[16px]">sync</span>
<span>Force Local DB Flush to Cloud</span>
</button>
<button class="w-full py-space-xs px-space-md rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm flex items-center justify-center gap-space-xs transition-colors" onclick="runIntegrityCheck()" type="button">
<span class="material-symbols-outlined text-[16px]">fact_check</span>
<span>Run PRAGMA Integrity_Check</span>
</button>
</div>
</div>
</div>
<!-- Hard Crypto Key Envelope -->
<div class="bg-surface-container-lowest rounded p-space-md shadow-sm">
<h3 class="font-headline-md text-headline-md text-on-surface mb-space-xs">Cryptographic Guard Details</h3>
<dl class="space-y-space-xs font-code-sm text-code-sm">
<div class="flex justify-between py-1 bg-surface-container-low px-space-xs rounded">
<dt class="text-on-surface-variant">Token Cipher</dt>
<dd class="text-on-surface font-semibold">ECDSA P-256 (SHA256)</dd>
</div>
<div class="flex justify-between py-1 bg-surface-container-low px-space-xs rounded">
<dt class="text-on-surface-variant">Client Device Fingerprint</dt>
<dd class="text-on-surface font-semibold">FP-990-21A-X64</dd>
</div>
<div class="flex justify-between py-1 bg-surface-container-low px-space-xs rounded">
<dt class="text-on-surface-variant">Database Encryption</dt>
<dd class="text-secondary font-semibold">SQLCipher 256-bit AES</dd>
</div>
</dl>
</div>
</aside>
</div>
<!-- Emergency Global Kill Reason Modal Dialog (Hidden by Default) -->
<div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-space-md" id="globalKillModal">
<div class="bg-surface-container-lowest rounded shadow-xl max-w-lg w-full p-space-lg flex flex-col gap-space-md">
<div class="flex items-center gap-space-sm text-error">
<span class="material-symbols-outlined text-[28px]">crisis_alert</span>
<div>
<h3 class="font-headline-lg text-headline-lg font-bold text-on-surface leading-tight">Emergency Global Session Revocation</h3>
<span class="font-label-caps text-label-caps uppercase text-error font-bold">Hard Security Invalidation Protocol</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
        This action will immediately destroy all 16 active workstation and field tablet bearer tokens across all subnets. All connected operators will be forcefully ejected to the terminal authentication gate.
      </p>
<div class="bg-surface-container-low p-space-md rounded flex flex-col gap-space-xs">
<label class="font-label-caps text-label-caps uppercase text-on-surface-variant font-bold">Mandatory Incident Reason Code</label>
<select class="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm p-space-xs rounded outline-none" id="revocationReason">
<option value="EXPLOIT">Potential Credential Compromise / Data Leak</option>
<option value="CRITICAL_MAINT">Immediate Database Partition Maintenance</option>
<option value="POLICY_BREACH">Operational Policy Breach Under Investigation</option>
<option value="ROUTINE">Scheduled High-Security Shift Handover</option>
</select>
</div>
<div class="flex items-center justify-end gap-space-sm pt-space-xs">
<button class="px-space-md py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm" onclick="closeGlobalKillModal()" type="button">
          Abort Action
        </button>
<button class="px-space-lg py-space-xs rounded bg-error hover:bg-error/90 text-on-error font-code-sm text-code-sm font-bold shadow-sm" onclick="executeGlobalRevoke()" type="button">
          Confirm Immediate Revocation
        </button>
</div>
</div>
</div>
<!-- Notification Toast Container -->
<div class="fixed bottom-12 right-6 z-50 flex flex-col gap-space-xs pointer-events-none" id="toastContainer"></div>
</div>
<script>
  // Filter Audit Ledger by Severity
  const filterSelect = document.getElementById('filterSeverity');
  if (filterSelect) {
    filterSelect.addEventListener('change', function(e) {
      const selected = e.target.value;
      const rows = document.querySelectorAll('#auditTable tbody tr');
      rows.forEach(row => {
        const severity = row.getAttribute('data-severity');
        if (selected === 'ALL' || severity === selected) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // Toast Dispatcher Helper
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    const isError = type === 'error';
    const isSuccess = type === 'success';
    
    toast.className = `p-space-sm rounded shadow-lg text-white font-code-sm text-code-sm flex items-center gap-space-sm pointer-events-auto transition-all transform translate-y-2 ${
      isError ? 'bg-error text-on-error' : isSuccess ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'
    }`;
    
    toast.innerHTML = `
      <span class="material-symbols-outlined text-[16px]">${isError ? 'error' : isSuccess ? 'check_circle' : 'info'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-x-4');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Single Session Termination
  function terminateSession(deviceId, operatorName) {
    if (confirm(`Terminate authenticated session for ${operatorName} (${deviceId})?`)) {
      showToast(`Terminated ${deviceId} [${operatorName}]. Token revoked in Redis & local cache.`, 'error');
    }
  }

  // Global Kill Modal Controls
  function openGlobalKillModal() {
    document.getElementById('globalKillModal').classList.remove('hidden');
  }

  function closeGlobalKillModal() {
    document.getElementById('globalKillModal').classList.add('hidden');
  }

  function executeGlobalRevoke() {
    const reason = document.getElementById('revocationReason').value;
    closeGlobalKillModal();
    showToast(`GLOBAL REVOCATION EXECUTED: All 16 sessions purged [Reason: ${reason}]`, 'error');
  }

  // Quarantine IP Action
  function triggerQuarantine(ip) {
    showToast(`Quarantine rule enforced on subnet ${ip}. Access blocked at firewall.`, 'error');
  }

  // SQLite Diagnostics Triggers
  function triggerManualSync() {
    const btn = document.getElementById('btnSyncFlush');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Flushing OPFS WAL...</span>`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      showToast('OPFS SQLite WAL flushed cleanly to Cloud Primary: 0 conflicts detected.', 'success');
    }, 1200);
  }

  function runIntegrityCheck() {
    showToast('PRAGMA integrity_check: OK. Zero orphaned B-tree pages.', 'success');
  }

  function exportAuditLedger() {
    showToast('Ledger dump generated: maklon_audit_24h_signed.csv', 'info');
  }

  function refreshLedger() {
    showToast('Ledger re-read complete. Latest hash tree synced.', 'info');
  }
</script></main></div><footer class="fixed bottom-0 left-0 right-0 min-h-8 py-1 bg-surface-container-lowest border-t border-surface-container z-50 flex flex-wrap items-center justify-between px-gutter-dense gap-2"><div class="flex items-center gap-space-lg"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Shortcuts:</span><div class="flex items-center gap-space-xs font-code-sm text-code-sm"><kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Ctrl+N</kbd><span class="text-on-surface-variant">New Lead</span></div><div class="flex items-center gap-space-xs font-code-sm text-code-sm"><kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Alt+A</kbd><span class="text-on-surface-variant">Quick Approval</span></div><div class="flex items-center gap-space-xs font-code-sm text-code-sm"><kbd class="bg-surface-container px-space-xs py-0.5 rounded text-on-surface border border-surface-container font-code-sm text-code-sm">Esc</kbd><span class="text-on-surface-variant">Cancel / Dismiss</span></div></div><div class="flex items-center gap-space-md"><span class="font-code-sm text-code-sm text-on-surface-variant">Local Cache: <span class="text-on-surface font-semibold">SQLite 3.44.0 (In-Memory WAL)</span></span><div class="h-3 w-[1px] bg-surface-container"></div><span class="font-code-sm text-code-sm text-secondary font-semibold">ENCRYPTED SECURE SESSION</span></div></footer></body></html>