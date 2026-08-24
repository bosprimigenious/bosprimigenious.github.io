import { writeFileSync, mkdirSync, rmSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const projectsDir = join(root, "_projects");

const categoryMap = {
  "au-admin-dashboard": { category: "flagship", importance: 1 },
  agentUniverse: { category: "flagship", importance: 2, fork: true },
  Nexus: { category: "flagship", importance: 3 },
  StudyQR: { category: "fullstack", importance: 4 },
  ModelingPaperKit: { category: "research", importance: 5 },
  Unveil: { category: "flagship", importance: 6 },
  BUPT_UWE: { category: "fullstack", importance: 7 },
  "BUPT-UWE-BACKEND": { category: "fullstack", importance: 8 },
  PersonaScope: { category: "fullstack", importance: 12 },
  Breast_Cancer_Early_Screening_System: { category: "fullstack", importance: 13 },
  byrteam_vue_copy: { category: "fullstack", importance: 14 },
  vueshop_test: { category: "fullstack", importance: 15 },
  "Notification.Assistant": { category: "fullstack", importance: 16 },
  Stat_Inegrity_Checker: { category: "research", importance: 20 },
  Kaiyuanzhixia: { category: "research", importance: 21 },
  "Typst-Matrix": { category: "tools", importance: 22 },
  "DNS-Relay-Server": { category: "systems", importance: 30 },
  "DataLink-Layer-Lab": { category: "systems", importance: 31 },
  "NFA-to-DFA": { category: "course", importance: 32 },
  smart_car_raspberry_pi: { category: "course", importance: 33 },
  Big_data_applications: { category: "course", importance: 34 },
  My_Cuda_Expriences: { category: "course", importance: 35 },
  bos_css_lib: { category: "tools", importance: 40 },
  Allright_CodeClub: { category: "course", importance: 41 },
  bosprimigenious: { category: "other", importance: 50 },
  "github-readme-stats": { category: "fork", importance: 60, fork: true },
};

const extraDescriptions = {
  StudyQR: "在线上传二维码图片，解析并修改二维码内容的前端应用。",
  vueshop_test: "测试用 Vue 构建的前端商城能力。",
  "Notification.Assistant": "为大学生提供一站式信息获取平台。",
  Allright_CodeClub: "组织代码俱乐部活动的项目。",
  BUPT_UWE: "北邮 UWE 选课平台前端，Markdown 文档与深浅色主题。",
  "BUPT-UWE-BACKEND": "北邮 UWE 选课平台后端 API。",
};

const res = await fetch(
  "https://api.github.com/users/bosprimigenious/repos?per_page=100&type=owner",
);
const repos = (await res.json()).filter((r) => !r.private);

const names = new Set(repos.map((r) => r.name));
for (const name of Object.keys(categoryMap)) {
  if (!names.has(name) && !["vueshop_test", "Notification.Assistant"].includes(name)) {
    repos.push({
      name,
      description: extraDescriptions[name] || "",
      html_url: `https://github.com/bosprimigenious/${name}`,
      fork: categoryMap[name]?.fork || false,
    });
  }
}

for (const name of ["vueshop_test", "Notification.Assistant"]) {
  if (!names.has(name)) {
    repos.push({
      name,
      description: extraDescriptions[name] || "",
      html_url: `https://github.com/bosprimigenious/${name}`,
      fork: false,
    });
  }
}

repos.sort((a, b) => {
  const ia = categoryMap[a.name]?.importance ?? 99;
  const ib = categoryMap[b.name]?.importance ?? 99;
  return ia - ib || a.name.localeCompare(b.name);
});

for (const f of readdirSync(projectsDir)) {
  if (f.endsWith(".md")) rmSync(join(projectsDir, f));
}

for (const repo of repos) {
  const meta = categoryMap[repo.name] || { category: "other", importance: 90 };
  const desc =
    extraDescriptions[repo.name] ||
    repo.description ||
    `Open-source project maintained on GitHub.`;
  const forkNote = repo.fork || meta.fork ? " *(Fork)*" : "";
  const slug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const body = `---
layout: page
title: ${repo.name}
description: ${desc.replace(/\n/g, " ").slice(0, 200)}
importance: ${meta.importance}
category: ${meta.category}
---

${desc}${forkNote}

[View on GitHub](${repo.html_url})
`;

  writeFileSync(join(projectsDir, `${String(meta.importance).padStart(2, "0")}-${slug}.md`), body);
}

console.log(`Generated ${repos.length} projects`);
