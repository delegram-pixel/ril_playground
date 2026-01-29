'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Loader } from 'lucide-react'
import { jsPDF } from 'jspdf'

export default function PDFExport({ product }) {
  const [generating, setGenerating] = useState(false)

  const generatePDF = async () => {
    setGenerating(true)

    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 20
      let yPosition = 20

      // Title
      doc.setFontSize(20)
      doc.setTextColor(13, 148, 136) // teal color
      doc.text(product.name, margin, yPosition)
      yPosition += 10

      // Codename
      if (product.codename) {
        doc.setFontSize(12)
        doc.setTextColor(100, 100, 100)
        doc.text(product.codename, margin, yPosition)
        yPosition += 8
      }

      // Tagline
      doc.setFontSize(14)
      doc.setTextColor(60, 60, 60)
      const taglineLines = doc.splitTextToSize(product.tagline, pageWidth - 2 * margin)
      doc.text(taglineLines, margin, yPosition)
      yPosition += taglineLines.length * 7 + 10

      // Status & Category
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(`Status: ${product.status} | Category: ${product.category}`, margin, yPosition)
      yPosition += 15

      // Problem Statement
      doc.setFontSize(14)
      doc.setTextColor(13, 148, 136)
      doc.text('Problem Statement', margin, yPosition)
      yPosition += 7
      doc.setFontSize(10)
      doc.setTextColor(60, 60, 60)
      const problemLines = doc.splitTextToSize(
        product.problemStatement,
        pageWidth - 2 * margin
      )
      doc.text(problemLines, margin, yPosition)
      yPosition += problemLines.length * 5 + 10

      // Target Users
      doc.setFontSize(14)
      doc.setTextColor(13, 148, 136)
      doc.text('Target Users', margin, yPosition)
      yPosition += 7
      doc.setFontSize(10)
      doc.setTextColor(60, 60, 60)
      const targetLines = doc.splitTextToSize(product.targetUsers, pageWidth - 2 * margin)
      doc.text(targetLines, margin, yPosition)
      yPosition += targetLines.length * 5 + 10

      // Solution Overview
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      doc.setFontSize(14)
      doc.setTextColor(13, 148, 136)
      doc.text('Solution Overview', margin, yPosition)
      yPosition += 7
      doc.setFontSize(10)
      doc.setTextColor(60, 60, 60)
      const solutionLines = doc.splitTextToSize(
        product.solutionOverview,
        pageWidth - 2 * margin
      )
      doc.text(solutionLines, margin, yPosition)
      yPosition += solutionLines.length * 5 + 10

      // Key Differentiators
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      doc.setFontSize(14)
      doc.setTextColor(13, 148, 136)
      doc.text('Key Differentiators', margin, yPosition)
      yPosition += 7
      doc.setFontSize(10)
      doc.setTextColor(60, 60, 60)
      const diffLines = doc.splitTextToSize(
        product.keyDifferentiators,
        pageWidth - 2 * margin
      )
      doc.text(diffLines, margin, yPosition)
      yPosition += diffLines.length * 5 + 10

      // Metrics
      if (product.usersReached || product.problemsSolved) {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 20
        }
        doc.setFontSize(14)
        doc.setTextColor(13, 148, 136)
        doc.text('Impact Metrics', margin, yPosition)
        yPosition += 7
        doc.setFontSize(10)
        doc.setTextColor(60, 60, 60)
        if (product.usersReached) {
          doc.text(`Users Reached: ${product.usersReached.toLocaleString()}`, margin, yPosition)
          yPosition += 6
        }
        if (product.problemsSolved) {
          doc.text(
            `Problems Solved: ${product.problemsSolved.toLocaleString()}`,
            margin,
            yPosition
          )
          yPosition += 6
        }
        if (product.geographicReach) {
          doc.text(`Geographic Reach: ${product.geographicReach}`, margin, yPosition)
          yPosition += 6
        }
      }

      // Footer
      const pageCount = doc.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(
          `Renaissance HAVEN - ${product.name} | Page ${i} of ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        )
      }

      // Save the PDF
      doc.save(`${product.name.replace(/\s+/g, '-')}-profile.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <motion.button
      onClick={generatePDF}
      disabled={generating}
      className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: generating ? 1 : 1.05 }}
      whileTap={{ scale: generating ? 1 : 0.95 }}
    >
      {generating ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Export as PDF
        </>
      )}
    </motion.button>
  )
}
