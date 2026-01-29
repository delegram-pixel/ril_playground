'use client'

import Select from 'react-select'

const techOptions = [
  { value: 'React', label: 'React', category: 'frontend' },
  { value: 'Next.js', label: 'Next.js', category: 'frontend' },
  { value: 'Vue', label: 'Vue', category: 'frontend' },
  { value: 'Angular', label: 'Angular', category: 'frontend' },
  { value: 'Node.js', label: 'Node.js', category: 'backend' },
  { value: 'Python', label: 'Python', category: 'backend' },
  { value: 'Django', label: 'Django', category: 'backend' },
  { value: 'FastAPI', label: 'FastAPI', category: 'backend' },
  { value: 'Express', label: 'Express', category: 'backend' },
  { value: 'PostgreSQL', label: 'PostgreSQL', category: 'database' },
  { value: 'MongoDB', label: 'MongoDB', category: 'database' },
  { value: 'MySQL', label: 'MySQL', category: 'database' },
  { value: 'Redis', label: 'Redis', category: 'database' },
  { value: 'AWS', label: 'AWS', category: 'infrastructure' },
  { value: 'Google Cloud', label: 'Google Cloud', category: 'infrastructure' },
  { value: 'Azure', label: 'Azure', category: 'infrastructure' },
  { value: 'Docker', label: 'Docker', category: 'infrastructure' },
  { value: 'Kubernetes', label: 'Kubernetes', category: 'infrastructure' },
  { value: 'TensorFlow', label: 'TensorFlow', category: 'ai/ml' },
  { value: 'PyTorch', label: 'PyTorch', category: 'ai/ml' },
  { value: 'OpenAI', label: 'OpenAI', category: 'ai/ml' },
  { value: 'Hugging Face', label: 'Hugging Face', category: 'ai/ml' },
]

export default function TechStackFilter({ selectedTech = [], onChange }) {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#e7e5e4',
      '&:hover': {
        borderColor: '#0d9488',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#ccfbf1',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#115e59',
      fontWeight: 500,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#0d9488',
      '&:hover': {
        backgroundColor: '#0d9488',
        color: 'white',
      },
    }),
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Technology Stack
      </label>
      <Select
        isMulti
        options={techOptions}
        value={selectedTech}
        onChange={onChange}
        placeholder="Select technologies..."
        styles={customStyles}
        className="text-sm"
      />
    </div>
  )
}
