(function () {
  const grid = document.getElementById("project-grid");
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = modal.querySelector(".modal-close");

  function escapeHtml(value = "") {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  function fallback(item, label) {
    return `<div class="media-fallback" style="background:${item.fallback || "linear-gradient(135deg, #334155, #0f172a)"}"><span>${escapeHtml(label)}</span></div>`;
  }

  function image(src, alt, className = "") {
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="${className}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />`;
  }

  function sectionHeading(number, kicker, title, count) {
    return `<div class="category-heading"><div><span class="section-kicker">${number} / ${kicker}</span><h3>${title}</h3></div><span>${count} 项</span></div>`;
  }

  function renderWebCard(project) {
    return `<article class="project-card web-card" data-id="${escapeHtml(project.id)}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(project.title)} 详情">
      <div class="card-cover">${image(project.cover, project.title, "card-cover-img")}${fallback(project, project.title)}</div>
      <div class="card-body"><h3 class="card-title">${escapeHtml(project.title)}</h3><p class="card-subtitle">${escapeHtml(project.subtitle)}</p><div class="card-tags">${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div></div><div class="card-arrow" aria-hidden="true">→</div>
    </article>`;
  }

  function renderWeb() {
    return `<section class="portfolio-section"><div class="category-heading"><div><span class="section-kicker">01 / DEVELOPMENT</span><h3>Web 开发</h3></div><span>04 项</span></div><div class="project-grid">${WEB_PROJECTS.map(renderWebCard).join("")}</div></section>`;
  }

  function renderWechat() {
    return `<section class="portfolio-section"><div class="category-heading"><div><span class="section-kicker">02 / CONTENT</span><h3>公众号文章</h3></div><span>${String(WECHAT_PROJECTS.length).padStart(2, "0")} 项</span></div><div class="wechat-list">${WECHAT_PROJECTS.map((item, index) => `<a class="wechat-item" href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer"><span class="wechat-index">${String(index + 1).padStart(2, "0")}</span><span class="wechat-title">${escapeHtml(item.title)}</span><span class="wechat-source">${escapeHtml(item.source)}</span><span class="wechat-link">查看链接 ↗</span></a>`).join("")}</div></section>`;
  }

  function renderCreativeCard(item) {
    const media = item.type === "video" ? `<video class="creative-media" controls preload="metadata" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><source src="${escapeHtml(item.src)}" type="video/mp4" /></video>${fallback(item, "视频素材待补充")}` : `${image(item.src, item.title, "creative-media")}${fallback(item, "图片素材待补充")}`;
    return `<article class="creative-card"><div class="creative-frame">${media}</div><h4>${escapeHtml(item.title)}</h4></article>`;
  }

  function renderCreative() {
    return `<section class="portfolio-section"><div class="category-heading"><div><span class="section-kicker">03 / CREATIVE AI</span><h3>AIGC 与智能体</h3></div><span>02 项</span></div><div class="creative-grid">${CREATIVE_PROJECTS.map(renderCreativeCard).join("")}</div></section>`;
  }

  function renderPythonCard(item) {
    return `<article class="python-card"><div class="python-frame">${image(item.src, item.title, "python-media")}${fallback(item, "图片素材待补充")}</div><div class="python-caption"><h4>${escapeHtml(item.title)}</h4>${item.subtitle ? `<span>${escapeHtml(item.subtitle)}</span>` : ""}</div></article>`;
  }

  function renderPython() {
    return `<section class="portfolio-section"><div class="category-heading"><div><span class="section-kicker">04 / PROGRAMMING</span><h3>Python 程序设计</h3></div><span>03 项</span></div><div class="python-grid">${PYTHON_PROJECTS.map(renderPythonCard).join("")}</div></section>`;
  }

  function renderImages(images) {
    return (images || []).map((item) => `<figure class="showcase-figure">${image(item.src, item.alt)}${fallback({}, "截图加载中") }<figcaption>${escapeHtml(item.alt)}</figcaption></figure>`).join("");
  }

  function renderModal(project) {
    modalContent.innerHTML = `<header class="modal-header"><div class="modal-cover" style="background:${project.coverFallback}"></div><div class="modal-header-text"><h2 class="modal-title">${escapeHtml(project.title)}</h2><p>${escapeHtml(project.subtitle)}</p><div class="card-tags">${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div></div></header><div class="modal-sections"><section class="modal-section modal-section--showcase"><h3>作品展示</h3><p class="showcase-desc">${escapeHtml(project.description)}</p>${project.link ? `<div class="showcase-actions"><a href="${escapeHtml(project.link)}" class="showcase-link" target="_blank" rel="noopener noreferrer">${escapeHtml(project.linkLabel)} ↗</a></div>` : ""}<div class="showcase-gallery">${renderImages(project.images)}</div></section></div>`;
  }

  grid.innerHTML = renderWeb() + renderWechat() + renderCreative() + renderPython();

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".web-card");
    if (!card) return;
    const project = WEB_PROJECTS.find((item) => item.id === card.dataset.id);
    if (project) { renderModal(project); modal.showModal(); document.body.style.overflow = "hidden"; }
  });
  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".web-card");
    if (!card) return;
    event.preventDefault();
    const project = WEB_PROJECTS.find((item) => item.id === card.dataset.id);
    if (project) { renderModal(project); modal.showModal(); document.body.style.overflow = "hidden"; }
  });
  function closeModal() { modal.close(); document.body.style.overflow = ""; }
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  modal.addEventListener("cancel", () => { document.body.style.overflow = ""; });
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", (event) => { const id = link.getAttribute("href"); if (id === "#") return; event.preventDefault(); document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); }));
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 20), { passive: true });
})();
