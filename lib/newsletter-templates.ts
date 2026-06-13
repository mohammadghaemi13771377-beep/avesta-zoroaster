import { newsletterEditions, type NewsletterEdition } from "@/lib/newsletter-editions";
import { newsletterTopics } from "@/lib/newsletter";

export type NewsletterEmailPreview = {
  editionId: string;
  subject: string;
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  topicLabels: string[];
  links: NewsletterEdition["links"];
  cta: NewsletterEdition["cta"];
  footerNote: string;
};

export type NewsletterHtmlExport = {
  editionId: string;
  subject: string;
  preheader: string;
  html: string;
};

export function buildNewsletterEmailPreview(edition: NewsletterEdition): NewsletterEmailPreview {
  const topicLabels = edition.topics.map((topicId) => {
    const topic = newsletterTopics.find((item) => item.id === topicId);
    return topic?.label ?? topicId;
  });

  return {
    editionId: edition.id,
    subject: `${edition.title} | ${edition.subtitle}`,
    preheader: `${edition.intro} ${edition.cta.label}`,
    eyebrow: `AVESTA-ZOROASTER / ${edition.dateLabel}`,
    title: edition.title,
    intro: edition.intro,
    topicLabels,
    links: edition.links,
    cta: edition.cta,
  footerNote: "شما این پیش‌نمایش را از نسخه محلی پروژه می‌بینید؛ در production به unsubscribe، preferences و analytics وصل می‌شود. مسیر تنظیمات: https://avesta-zoroaster.com/newsletter/preferences",
  };
}

export function getNewsletterEmailPreviews(editions: NewsletterEdition[] = newsletterEditions) {
  return editions.map((edition) => buildNewsletterEmailPreview(edition));
}

export function getNewsletterTemplateSummary(editions: NewsletterEdition[] = newsletterEditions) {
  const previews = getNewsletterEmailPreviews(editions);
  const totalLinks = previews.reduce((sum, preview) => sum + preview.links.length, 0);

  return {
    total: previews.length,
    totalLinks,
    averageLinks: Math.round(totalLinks / previews.length),
    nextPreview: previews[0],
  };
}

export function renderNewsletterEmailHtml(edition: NewsletterEdition): NewsletterHtmlExport {
  const preview = buildNewsletterEmailPreview(edition);
  const linkRows = preview.links
    .map(
      (link) => `
        <tr>
          <td style="padding: 8px 0;">
            <a href="${absoluteEmailUrl(link.href)}" style="display:block;border:1px solid rgba(214,168,79,0.22);border-radius:16px;background:#071521;padding:14px 16px;color:#FFF8EA;text-decoration:none;font-weight:700;">
              ${escapeHtml(link.label)}
            </a>
          </td>
        </tr>`
    )
    .join("");
  const topicBadges = preview.topicLabels
    .map(
      (label) =>
        `<span style="display:inline-block;margin:0 0 8px 8px;border:1px solid rgba(214,168,79,0.24);border-radius:999px;background:rgba(214,168,79,0.10);padding:7px 11px;color:#F2D58A;font-size:12px;font-weight:700;">${escapeHtml(label)}</span>`
    )
    .join("");

  return {
    editionId: preview.editionId,
    subject: preview.subject,
    preheader: preview.preheader,
    html: `<!doctype html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(preview.subject)}</title>
  </head>
  <body style="margin:0;background:#05080D;color:#FFF8EA;font-family:Tahoma,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview.preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#05080D;margin:0;padding:0;">
      <tr>
        <td align="center" style="padding:28px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border:1px solid rgba(214,168,79,0.22);border-radius:28px;background:#071521;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 18px;border-bottom:1px solid rgba(214,168,79,0.14);">
                <p style="margin:0;color:#F2D58A;font-size:12px;font-weight:700;letter-spacing:2px;">${escapeHtml(preview.eyebrow)}</p>
                <h1 style="margin:14px 0 0;color:#FFF8EA;font-size:34px;line-height:1.4;font-weight:900;">${escapeHtml(preview.title)}</h1>
                <p style="margin:10px 0 0;color:#D6A84F;font-size:18px;line-height:1.8;font-weight:700;">${escapeHtml(preview.subject)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 18px;color:#B9B9B9;font-size:16px;line-height:2;">${escapeHtml(preview.intro)}</p>
                <div style="margin:0 0 18px;">${topicBadges}</div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${linkRows}</table>
                <a href="${absoluteEmailUrl(preview.cta.href)}" style="display:block;margin:24px 0 0;border-radius:999px;background:#D6A84F;padding:16px 24px;color:#05080D;text-align:center;text-decoration:none;font-weight:900;">
                  ${escapeHtml(preview.cta.label)}
                </a>
                <p style="margin:24px 0 0;border-top:1px solid rgba(214,168,79,0.14);padding-top:18px;color:#B9B9B9;font-size:12px;line-height:1.9;">
                  ${escapeHtml(preview.footerNote)}
                  <br>
                  <a href="https://avesta-zoroaster.com/newsletter/preferences" style="color:#F2D58A;text-decoration:underline;">مدیریت تنظیمات یا لغو عضویت</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

export function getNewsletterHtmlExports(editions: NewsletterEdition[] = newsletterEditions) {
  return editions.map((edition) => renderNewsletterEmailHtml(edition));
}

function absoluteEmailUrl(href: string) {
  return href.startsWith("http") ? href : `https://avesta-zoroaster.com${href}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
