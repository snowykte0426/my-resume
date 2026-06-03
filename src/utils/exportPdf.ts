let exporting = false

export async function exportResumePdf(): Promise<void> {
  if (exporting) return
  const element = document.querySelector<HTMLElement>('.mdx-content')
  if (!element) return

  exporting = true

  const root = document.documentElement
  const backgroundColor =
    getComputedStyle(root).backgroundColor ||
    getComputedStyle(document.body).backgroundColor ||
    '#242424'
  root.classList.add('pdf-exporting')

  try {
    const { default: html2pdf } = await import('html2pdf.js')

    const options = {
      margin: 0,
      filename: '김태은-이력서.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        backgroundColor,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' as const },
      pagebreak: { mode: ['css', 'legacy'] },
    }

    await html2pdf().set(options).from(element).save()
  } finally {
    root.classList.remove('pdf-exporting')
    exporting = false
  }
}