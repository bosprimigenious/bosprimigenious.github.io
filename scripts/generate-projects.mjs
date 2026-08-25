import { writeFileSync, mkdirSync, rmSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const projectsDir = join(root, "_projects");

/** Skip profile chrome, unmodified forks, and dead names. */
const skip = new Set([
  "bosprimigenious",
  "github-readme-stats",
  "city-transfer-hub",
  "lab-cover-generator",
]);

const categoryMap = {
  ModelingPaperKit: { category: "research", importance: 1 },
  "agentic-rubric-runner": { category: "flagship", importance: 2 },
  Unveil: { category: "flagship", importance: 3 },
  LoopPilot: { category: "flagship", importance: 4 },
  "au-admin-dashboard": { category: "flagship", importance: 5 },
  StudyQR: { category: "fullstack", importance: 6 },
  Stat_Inegrity_Checker: { category: "research", importance: 7 },
  FloatBalance: { category: "fullstack", importance: 8 },
  Nexus: { category: "flagship", importance: 9 },
  SmartMole_Pro: { category: "systems", importance: 10 },
  "Typst-Matrix": { category: "tools", importance: 11 },
  BUPT_UWE: { category: "fullstack", importance: 12 },
  "BUPT-UWE-BACKEND": { category: "fullstack", importance: 13 },
  PersonaScope: { category: "fullstack", importance: 14 },
  Breast_Cancer_Early_Screening_System: { category: "fullstack", importance: 15 },
  Notification_Assistant: { category: "fullstack", importance: 16 },
  byrteam_vue_copy: { category: "fullstack", importance: 17 },
  "DNS-Relay-Server": { category: "systems", importance: 20 },
  "DataLink-Layer-Lab": { category: "systems", importance: 21 },
  "Protocol-Capture-Lab": { category: "systems", importance: 22 },
  "wireshark-protocol-analysis": { category: "course", importance: 23 },
  "NFA-to-DFA": { category: "course", importance: 24 },
  smart_car_raspberry_pi: { category: "course", importance: 25 },
  Big_data_applications: { category: "course", importance: 26 },
  My_Cuda_Expriences: { category: "course", importance: 27 },
  bos_css_lib: { category: "tools", importance: 30 },
  Allright_CodeClub: { category: "course", importance: 31 },
  "bosprimigenious.github.io": { category: "other", importance: 40 },
  agentUniverse: { category: "fork", importance: 60, fork: true },
};

const extraDescriptions = {
  ModelingPaperKit: "国赛 / MCM 论文零配置工程套件，把写作、图表和复现流程收成一条流水线。",
  "agentic-rubric-runner": "可审计的文档 PDF 生成与量表评分 Agent 流水线。",
  Unveil: "揭棋对弈程序：网络真人对弈 + AI 博弈，Java 多模块。",
  LoopPilot: "受控 AI 工作闭环运行时，默认 fail-closed，产物可审计。",
  "au-admin-dashboard": "agentUniverse 管理台。Vue 3 + Tailwind v4，做多智能体可观测与资源管理。",
  StudyQR: "上传二维码图片，解析并改写内容的前端工具。",
  Stat_Inegrity_Checker: "学术论文统计完整性审计：把「数据看起来不对」变成可复核的检查项。",
  FloatBalance: "跨平台桌面悬浮球，看中转站 / 模型余额和服务错误状态。",
  Nexus: "Nexus Studio：React 多智能体协作工作站。",
  SmartMole_Pro: "OpenVela 上的多模态打地鼠：触屏、实体键、超声手势和 AI 难度。",
  "Typst-Matrix": "Typst 工作区：TOML 分数据与视图，自动出简历、报告和幻灯。",
  BUPT_UWE: "北邮 UWE 选课平台前端，Markdown 文档与深浅色主题。",
  "BUPT-UWE-BACKEND": "北邮 UWE 选课平台后端 API。",
  PersonaScope: "多模态心理健康评估：视觉、语音、文本，React + MindSpore。",
  Breast_Cancer_Early_Screening_System: "乳腺癌早期筛查与风险评估 Web 应用。",
  Notification_Assistant: "给大学生的一站式信息台，按标签和热搜做个性化推荐。",
  byrteam_vue_copy: "北邮人团队招新页复刻，Vue 3 + 视差交互。",
  "DNS-Relay-Server": "高性能并行 DNS 中继，C + Socket，计网课设。",
  "DataLink-Layer-Lab": "数据链路层滑动窗口协议，仿真卫星信道上的全双工通信。",
  "Protocol-Capture-Lab": "Wireshark 抓包实验：IP / ICMP / ARP / DHCP / TCP。",
  "wireshark-protocol-analysis": "协议分析实验报告与抓包笔记。",
  "NFA-to-DFA": "子集构造法：NFA 转 DFA。",
  smart_car_raspberry_pi: "树莓派智能车。",
  Big_data_applications: "大数据应用课程练习。",
  My_Cuda_Expriences: "CUDA 入门示例。",
  bos_css_lib: "轻量可定制的 CSS 组件库。",
  Allright_CodeClub: "代码俱乐部活动仓库。",
  "bosprimigenious.github.io": "本站。al-folio 个人页。",
  agentUniverse: "LLM 多智能体框架（Fork）。",
};

function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

const headers = {};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const res = await fetch(
  "https://api.github.com/users/bosprimigenious/repos?per_page=100&type=owner&sort=updated",
  { headers },
);
if (!res.ok) {
  throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
}

const repos = (await res.json()).filter((r) => !r.private && !skip.has(r.name));

repos.sort((a, b) => {
  const ia = categoryMap[a.name]?.importance ?? 80;
  const ib = categoryMap[b.name]?.importance ?? 80;
  return ia - ib || a.name.localeCompare(b.name);
});

mkdirSync(projectsDir, { recursive: true });
for (const f of readdirSync(projectsDir)) {
  if (f.endsWith(".md")) rmSync(join(projectsDir, f));
}

for (const repo of repos) {
  const meta = categoryMap[repo.name] || { category: "other", importance: 80 };
  const desc =
    extraDescriptions[repo.name] ||
    repo.description ||
    "GitHub 公开仓库。";
  const forkNote = repo.fork || meta.fork ? " *(Fork)*" : "";
  const slug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const body = `---
layout: page
title: ${yamlQuote(repo.name)}
description: ${yamlQuote(desc.replace(/\n/g, " ").slice(0, 200))}
importance: ${meta.importance}
category: ${meta.category}
---

${desc}${forkNote}

[View on GitHub](${repo.html_url})
`;

  writeFileSync(join(projectsDir, `${String(meta.importance).padStart(2, "0")}-${slug}.md`), body);
}

console.log(`Generated ${repos.length} projects`);
for (const repo of repos) {
  const meta = categoryMap[repo.name] || { category: "other", importance: 80 };
  console.log(`  ${String(meta.importance).padStart(2, "0")}  ${repo.name}`);
}
