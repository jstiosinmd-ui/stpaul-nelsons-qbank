# St. Paul's Pediatrics Question Bank and Exam Maker

---

Two self-contained HTML tools use the St. Paul's Hospital of Iloilo palette and original hospital logo. Both contain the same 6,700 Nelson Textbook of Pediatrics, 21st-edition questions across 33 sections. The credit `/jstiosin 2026` appears in both HTML footers and on every generated PDF page, including blank answer-sheet pages and compact answer keys.

## Open the tools

- [Question bank](20261006_PED_StPaulsQuestionBank_v1.0.html): section practice, scoring, answer explanations, flags, review filters, timers, and progress backup/import.
- [Exam maker](20261006_PED_StPaulsExamMaker_v1.0.html): choose the question count, sections or specific topics, difficulty, and exam details; generate a matching question paper and answer key.

Extract the ZIP before opening the HTML files. Keep both HTML files in the same folder to use the links between them. Each tool also works independently: its questions, styles, scripts, and images are embedded. The exam maker additionally embeds its PDF libraries and fonts. No account, server, or internet connection is required when the browser supports local HTML apps.

## Self-study question bank

1. Search or filter the sections, then open a section exam.
2. Select answers, use Next and Previous, and flag questions for review. The timer starts with the first answer and continues while the file is closed.
3. Choose **Questions, timer, and scoring** on mobile to reach the question map and finish controls.
4. Select **Finish and score**, then confirm. Review correct, incorrect, unanswered, or flagged questions and read the explanations and references.
5. Download a progress backup before moving the HTML file or changing browsers. Import the backup to restore your attempt. Progress is stored separately from the CMC edition.

## Generate PDFs

1. Set the exam title, number of questions, duration, date, and difficulty. Choose Easy, Average, Difficult, Mixed, or a custom percentage mix.
2. Select sections or specific topics. The count must allow at least one question for every selected group.
3. Choose whether the key should include rationales and references. Traditional single-best-answer questions are selected by default; the optional legacy Type K setting retains the 40% cap.
4. Tap **Generate exam**. Review five questions at a time with Previous and Next.
5. On mobile, tap **Prepare exam PDF** or **Prepare answer key PDF**, then tap the corresponding **Save or open** link. If the browser opens a PDF preview, use its Save or Share control. Desktop downloads start directly.

The question-paper PDF includes a blank answer sheet. The answer-key PDF contains the matching answer grid and, when selected, explanations and references. Changing settings clears the old draw and its PDF links. Download PDFs and the optional exam record before closing the tab.

## Sample files

The samples use 50 traditional questions across all 33 sections: 10 Easy, 15 Average, and 25 Difficult. Seed `20261006`; exam code `143YVH2`.

- [Sample exam and blank answer sheet, 12 pages](20261006_PED_StPaulsSampleExam_v1.0.pdf)
- [Sample answer key and explanations, 28 pages](20261006_PED_StPaulsSampleExam_v1.0_AnswerKey.pdf)

## Scope and verification

The inherited bank covers 33 sections. Section 34, Laboratory Medicine, remains pending. Both tools use the corrected September 29, 2026 Respiratory System source. All 6,700 stems, options, keys, rationales, distractor explanations, and references match the current CMC exam-maker bank. This work changes presentation and institutional branding; it does not perform a fresh clinical source review. Difficulty labels remain editorial estimates.

Checks completed for this edition:

- 60 exam-maker mobile checks and 32 browser regression checks passed offline.
- 65 question-bank checks passed, including scoring, flags, review filters, reload restoration, backup/import, keyboard use, and links between the two tools.
- 629 PDF checks passed, including question/key parity, page size, margins, embedded fonts, page numbering, St. Paul's headers, and the exact credit on every page.
- All 41 pages of the sample paper, detailed key, and compact test key were rendered and visually inspected. Separate mobile PDF downloads also retained the credit on every page.
- Phone and tablet layouts were tested at 320, 360, 390, 430, 768, and 932 px. Desktop was tested at 1440 px. No horizontal overflow, browser runtime errors, or network requests occurred in the tested workflows.

Testing used Chrome desktop and touch emulation. Physical phones, Safari, and mobile operating-system file viewers were not tested. A file previewer that does not run JavaScript cannot operate the HTML tools; open them in a compatible browser. Large draws may take longer on mobile devices.

## Design and sharing

The saved September 13, 2026 SPHI palette supplies Deep Green `#005229`, Hospital Green `#006132`, Action Green `#007D42`, Legacy Gold `#FAAE1C`, Hospital Paper `#F0F3F0`, and Care Wash `#E8F4EB`. The original hospital logo is preserved without alteration. PDFs retain A4 pages and embedded Calibri fonts. The palette is the previously created operational design system, not a claim of an official published hospital brand manual.

Share the question-bank HTML for self-study. Keep the examiner tool and answer-key PDFs with the examiner when distributing an exam paper. Both HTML files contain all answer keys. No additional rights to third-party references, fonts, libraries, or institutional marks are granted by this package.

Build and test scripts, screenshots, checks, and source hashes are retained in this output folder's `.tmp/` directory. The original CMC tools and source question files were not changed.
