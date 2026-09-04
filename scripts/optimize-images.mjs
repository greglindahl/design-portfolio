import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const srcDir = path.join(
  root,
  'media_library_export-greg_lindahl-2026_09_04_15_33_36',
);
const publicDir = path.join(root, 'public');

const copies = [
  ['favicon.png', 'favicon.png'],
];

/** source filename -> dest relative to public/, max width */
const images = [
  ['ProfilePic.png', 'images/about/portrait.webp', 640],
  ['chain_ts_live.png', 'images/work/trustshare/hero.webp', 1600],
  ['chain_ts_old_live.png', 'images/work/trustshare/old-portal.webp', 1400],
  ['chain_xd.png', 'images/work/trustshare/early.webp', 1400],
  ['pp2.png', 'images/work/trustshare/findings.webp', 1400],
  ['ts_compliance_admin.png', 'images/work/trustshare/persona.webp', 1000],
  ['safebase.png', 'images/work/trustshare/safebase.webp', 1200],
  ['drata.png', 'images/work/trustshare/drata.webp', 1200],
  ['sitemap.png', 'images/work/trustshare/sitemap.webp', 1400],
  ['ts_home_lo-fid.png', 'images/work/trustshare/lofi-1.webp', 1400],
  ['ts_low.png', 'images/work/trustshare/lofi-2.webp', 1400],
  ['chain_ts_branding.png', 'images/work/trustshare/branding.webp', 1400],
  ['chain_ts_admin_companies_list.png', 'images/work/trustshare/companies-list.webp', 1400],
  ['chain_ts_admin_companies.png', 'images/work/trustshare/company.webp', 1400],
  ['chain_ts_admin_companies_invite.png', 'images/work/trustshare/invite.webp', 1400],
  ['chain_ts_admin_companies_invited.png', 'images/work/trustshare/invited.webp', 1400],
  ['chain_ts_admin_documents.png', 'images/work/trustshare/documents.webp', 1400],
  ['chain_ts_admin_policy.png', 'images/work/trustshare/policy-admin.webp', 1400],
  ['chain_ts_live_policy_details.png', 'images/work/trustshare/policy-live.webp', 1400],
  ['chain_ts_live_control_details.png', 'images/work/trustshare/control.webp', 1400],
  ['chain_ts_admin_bi.png', 'images/work/trustshare/reporting.webp', 1400],
  ['chain_ts_live_no_fill.png', 'images/work/trustshare/portal-alt.webp', 1600],
  ['FV-S16-Form-4.png', 'images/work/section-16/hero.webp', 1600],
  ['Thumb-S16.png', 'images/work/section-16/thumb.webp', 1600],
  ['WSD-Dashboard.png', 'images/work/section-16/dashboard.webp', 1400],
  ['S16-footnotes.png', 'images/work/section-16/footnotes.webp', 1400],
  ['S16-form-preview.png', 'images/work/section-16/preview.webp', 1400],
  ['Section-16-User-Testing-Form-Info-T1.png', 'images/work/section-16/form.webp', 1400],
  ['Section-16-User-Testing-Form-T2-RHP.png', 'images/work/section-16/panel.webp', 1400],
  ['Image-2021-10-22-at-11.23.11-AM-scaled.jpg', 'images/work/section-16/plan.webp', 1400],
  ['Image-2021-10-25-at-11.40.06-AM-scaled.jpg', 'images/work/section-16/workflow.webp', 1400],
  ['Image-2021-10-25-at-12.13.34-PM-scaled.jpg', 'images/work/section-16/personas.webp', 1400],
  ['Image-2021-10-25-at-2.11.29-PM-scaled.jpg', 'images/work/section-16/lofi-form.webp', 1400],
  ['Image-2021-10-26-at-4.06.44-PM-scaled.jpg', 'images/work/section-16/mui.webp', 1400],
  ['Elem-Catalog-MacBook@2x.png', 'images/work/api-integration/hero.webp', 1600],
  ['Elements-Catalog-Macbook@2x.png', 'images/work/api-integration/catalog-device.webp', 1400],
  ['BRENDA-PERSONA-GSI@2x.png', 'images/work/api-integration/persona.webp', 1200],
  ['CE-SITEMAP-Two.png', 'images/work/api-integration/sitemap.webp', 1400],
  ['Elements-Catalog.png', 'images/work/api-integration/catalog.webp', 1400],
  ['SFDC-Connect.png', 'images/work/api-integration/connect.webp', 1400],
  ['SFDC-MAP.png', 'images/work/api-integration/map.webp', 1400],
  ['SFDC-FORMULA.png', 'images/work/api-integration/formula-lofi.webp', 1400],
  ['Elem-API-Docs-MacBook@2x.png', 'images/work/api-integration/api-docs.webp', 1400],
  ['VDROverviewMacbook@2x.png', 'images/work/api-integration/vdr-overview.webp', 1400],
  ['VDRMappingsMacbook@2x.png', 'images/work/api-integration/vdr-map.webp', 1400],
  ['VDRTestMacbook@2x.png', 'images/work/api-integration/vdr-test.webp', 1400],
  ['Formulas-MacBook@2x.png', 'images/work/api-integration/formulas.webp', 1400],
  ['Formulas-Logs-MacBook@2x.png', 'images/work/api-integration/formula-logs.webp', 1400],
  ['Formulas-Debug-MacBook@2x.png', 'images/work/api-integration/formula-debug.webp', 1400],
  ['Logs-MacBook@2x.png', 'images/work/api-integration/logs.webp', 1400],
  ['Branding-MacBook@2x.png', 'images/work/api-integration/branding.webp', 1400],
  ['CEDS-BUTTON-MACBOOK@2x.png', 'images/work/api-integration/ds-button.webp', 1000],
  ['CEDS-INPUT-MACBOOK@2x.png', 'images/work/api-integration/ds-input.webp', 1000],
  ['CEDS-TABS-MACBOOK@2x.png', 'images/work/api-integration/ds-tabs.webp', 1000],
  ['CEDS-DROPDOWN-MACBOOK@2x.png', 'images/work/api-integration/ds-dropdown.webp', 1000],
  ['Docs-Center-Hero.png', 'images/work/help-center/hero.webp', 1600],
  ['Home-MacBook.png', 'images/work/help-center/home.webp', 1400],
  ['Search-MacBook.png', 'images/work/help-center/search.webp', 1400],
  ['Catalog-MacBook.png', 'images/work/help-center/catalog.webp', 1400],
  ['Elements-Description-MacBook.png', 'images/work/help-center/guide.webp', 1400],
  ['Elements-Salesforce-MacBook.png', 'images/work/help-center/element.webp', 1400],
  ['LeanUX.jpeg', 'images/work/help-center/lean.webp', 1400],
  ['ERIC-PERSONA-DEVELOPER@2x.png', 'images/work/help-center/persona.webp', 1200],
  ['Docs-Site-Map.png', 'images/work/help-center/sitemap.webp', 1400],
  ['DropboxWire.png', 'images/work/help-center/wire.webp', 1400],
  ['DropboxUI.png', 'images/work/help-center/ui.webp', 1400],
  ['Help-Center-Thumbnail@2x.png', 'images/work/help-center/thumb.webp', 1400],
  ['MacBook-02-Hero@2x.png', 'images/work/data-modeler/hero.webp', 1600],
  ['MacBook-02-Data-Modeler-Home-Angle@2x.png', 'images/work/data-modeler/home.webp', 1400],
  ['Data-Mapping-Implementation.png', 'images/work/data-modeler/mapping.webp', 1400],
  ['Detailed-Map-One.png', 'images/work/data-modeler/detail.webp', 1400],
  ['MacBook-02-Validations-Angle@2x.png', 'images/work/data-modeler/validation.webp', 1400],
  ['MacBook-02-Comments-Angle@2x.png', 'images/work/data-modeler/comments.webp', 1400],
  ['MacBook-02-History-Angle@2x.png', 'images/work/data-modeler/history.webp', 1400],
  ['Implementation-Journey.jpg', 'images/work/data-modeler/journey.webp', 1400],
  ['Journey_Map_Nora_Knows.png', 'images/work/data-modeler/journey-map.webp', 1400],
  ['Home@2x.png', 'images/work/reading-record/hero.webp', 1400],
  ['RR-Logo@2x.png', 'images/work/reading-record/logo.webp', 800],
  ['Options@2x.png', 'images/work/reading-record/options.webp', 1200],
  ['Students.png', 'images/work/reading-record/students.webp', 1200],
  ['StudentsScan.png', 'images/work/reading-record/scan.webp', 1200],
  ['Artboard-1@2x.png', 'images/work/reading-record/test-1.webp', 1200],
  ['Artboard-2@2x.png', 'images/work/reading-record/test-2.webp', 1200],
  ['Artboard-3@2x.png', 'images/work/reading-record/test-3.webp', 1200],
  ['Artboard-5@2x.png', 'images/work/reading-record/test-5.webp', 1200],
  ['Artboard-7@2x.png', 'images/work/reading-record/test-7.webp', 1200],
  ['MELISSA-PERSONA-TEACHER@2x.png', 'images/work/reading-record/persona.webp', 1200],
  ['RRSketch@2x.png', 'images/work/reading-record/sketch.webp', 1400],
  ['RRcurrent2.jpg', 'images/work/reading-record/current.webp', 1400],
  ['RRUXMap1.jpg', 'images/work/reading-record/journey.webp', 1400],
  ['designchat.jpg', 'images/work/reading-record/research.webp', 1400],
];

async function ensureDir(filePath) {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
}

for (const [from, to] of copies) {
  const dest = path.join(publicDir, to);
  await ensureDir(dest);
  await fs.promises.copyFile(path.join(srcDir, from), dest);
}

for (const [from, to, width] of images) {
  const dest = path.join(publicDir, to);
  await ensureDir(dest);
  await sharp(path.join(srcDir, from))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(dest);
  const stat = await fs.promises.stat(dest);
  console.log(`${to} (${Math.round(stat.size / 1024)}kb)`);
}
