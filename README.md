# St. Paul's Pediatrics Question Bank and Exam Maker

---

Mobile-friendly, offline study tools for St. Paul's Hospital of Iloilo, using the saved institutional palette and original hospital logo. Both tools contain the same 6,700 Nelson Textbook of Pediatrics, 21st-edition questions across 33 sections.

## Download and use

Download the [complete offline package](20261006_PED_StPaulsNelsonsTools_v1.0.zip), extract it, and open either HTML file in a compatible browser. Alternatively, download the repository ZIP, extract it, and open `index.html` to choose a tool. GitHub's HTML source view does not run the tools.

- [Question bank HTML](20261006_PED_StPaulsQuestionBank_v1.0.html): section exams, scoring, timed attempts, flags, explanations, references, and saved progress with backup/import.
- [Exam maker HTML](20261006_PED_StPaulsExamMaker_v1.0.html): question count, subject sections or specific topics, difficulty, and matching PDF exports.
- [Usage guide](20261006_PED_StPaulsToolsGuide_v1.0.md).
- [Sample exam and blank answer sheet](20261006_PED_StPaulsSampleExam_v1.0.pdf).
- [Sample answer key with explanations](20261006_PED_StPaulsSampleExam_v1.0_AnswerKey.pdf).

Each tool is self-contained, with its questions, software, styles, and assets embedded. Keep both HTML files together to use the links between them. On mobile, prepare a PDF, then tap its **Save or open** link. Desktop downloads start directly. The credit `/jstiosin 2026` appears in the HTML footers and on every generated PDF page, including blank answer sheets and compact keys.

The HTML files contain answer keys. Share the question bank for self-study; distribute the generated question-paper PDF to examinees when withholding answers.

## Verification

Release v1.0 was built and checked October 6, 2026:

- 60 mobile exam-maker checks and 32 browser regression checks passed offline.
- 65 question-bank checks passed, including scoring, filters, saved progress, backup/import, and navigation between tools.
- 629 PDF checks passed, including content and answer parity, margins, fonts, page numbering, institutional headers, and the exact credit on every page.
- All 41 pages of the sample paper, detailed key, and compact test key were rendered and visually inspected.
- Mobile layouts were tested at 320, 360, 390, 430, 768, and 932 px; desktop at 1440 px. No horizontal overflow, runtime errors, or network requests occurred in the tested workflows.

Testing used Chrome desktop and touch emulation. Physical phones and Safari were not tested. A local-file previewer that does not execute JavaScript cannot operate the tools. Large draws can take longer on mobile devices.

The two application HTML files, sample PDFs, guide, and offline ZIP in this repository are byte-identical to the tested deliverables.

## Tests

With Node.js, Playwright, and its Chromium browser installed, run from the repository root:

```sh
node tests/mobile.cjs
node tests/regression.cjs
node tests/study.cjs
```

Optionally set `BROWSER_PATH` to an installed Chrome/Edge executable and `PLAYWRIGHT_MODULE` to an existing Playwright package location. After the regression suite creates its sample PDFs, run the PDF checks with Python, PyMuPDF, and Pillow installed:

```sh
python tests/inspect_pdfs.py
```

Test evidence is written under the ignored `.tmp/` directory. Test tooling is not required to use the HTML apps.

## Content and design provenance

This edition preserves the legacy CMC question content, with the corrected September 29, 2026 Respiratory System section. Section 34, Laboratory Medicine, remains pending. This presentation adaptation did not conduct a fresh clinical source review; difficulty labels are editorial estimates.

The saved September 13, 2026 St. Paul's palette uses hospital greens, light green surfaces, and restrained gold accents. It is an operational visual system derived from the hospital's existing materials, not a claim of a published official brand manual. The logo is preserved without alteration. PDFs use A4 pages and embedded Calibri fonts.

PDF generation embeds [pdf-lib](https://pdf-lib.js.org/) and [fontkit](https://github.com/Hopding/fontkit); attribution information is included in the exam maker. This repository grants no additional rights to third-party references, fonts, software, or institutional marks.
