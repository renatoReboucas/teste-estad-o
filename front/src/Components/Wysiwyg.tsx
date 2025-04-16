'use client'
import Editor from 'react-simple-wysiwyg';

interface WysiwygProps {
  html?: string
  onChange?: (html: string) => void
}

const Wysiwyg = ({html, onChange}: WysiwygProps) => {

return <Editor 
  value={html} 
  onChange={(e) => onChange?.(e.target.value)} 
/>
}

export default Wysiwyg
