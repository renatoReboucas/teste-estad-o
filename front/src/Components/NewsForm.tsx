import { News } from '@/types/News';
import { useState, FormEvent, ChangeEvent } from 'react';
import Wysiwyg from './Wysiwyg';
import { newsApi } from '@/server/api-server';
import { getUrlPart } from '@/utils/urlHelper';

type NewsFormProps = {
  initialData?: News;
  onSuccess: () => void;
};

export default function NewsForm({ initialData, onSuccess }: NewsFormProps) {
  const [formData, setFormData] = useState<Partial<News>>(initialData || {});
  const [errors, setErrors] = useState<Record<string, boolean>>({
    editoria: false,
    titulo: false,
    subtitulo: false,
    conteudo: false,
    url: false,
    imagem: false,
    imagem_thumb: false
  });
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemThumb, setImagemThumb] = useState<File | null>(null);

  const isEdit = !!initialData?.id;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (e.target.files && e.target.files.length > 0) {
      if (name === 'imagem') {
        setImagem(e.target.files[0]);
      } else if (name === 'imagem_thumb') {
        setImagemThumb(e.target.files[0]);
      }
    }
  };

  const handleWysiwygChange = (html: string) => {
    setFormData(prev => ({ ...prev, conteudo: html }));
    
    // Limpa o erro quando o usuário digita
    if (errors.conteudo) {
      setErrors(prev => ({ ...prev, conteudo: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      editoria: !formData.editoria,
      titulo: !formData.titulo,
      subtitulo: !formData.subtitulo,
      conteudo: !formData.conteudo,
      url: !formData.url,
      imagem:!imagem && !formData.imagem,
      imagem_thumb:!imagemThumb && !formData.imagem_thumb
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const submitFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitFormData.append(key, value.toString());
    });
    if (imagem) {
      submitFormData.append('imagem', imagem);
    } else if (formData.imagem) {
      submitFormData.append('imagem', formData.imagem.toString());
    }
    
    if (imagemThumb) {
      submitFormData.append('imagem_thumb', imagemThumb);
    } else if (formData.imagem_thumb) {
      submitFormData.append('imagem_thumb', formData.imagem_thumb.toString());
    }

    // Log para debug
    console.log("Enviando dados:", Object.fromEntries(submitFormData));

    try {
      let response = null;
      if (isEdit && initialData?.id) {
         response = await newsApi.updateNews(initialData.id, submitFormData);
      } else {
        response = await newsApi.createNews(submitFormData);
      }
      console.log(response);
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar notícia:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Editoria</label>
        <input
          name="editoria"
          value={formData.editoria || ''}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.editoria ? 'border-red-500' : ''}`}
          placeholder='nome da editoria ex: "editoria teste"'
        />
        {errors.editoria && <span className="text-red-500">Campo obrigatório</span>}
      </div>

      <div>
        <label>URL</label>
        <input
          name="url"
          value={getUrlPart(formData.url ?? '') || ''}
          onChange={handleInputChange}
          className="w-full p-2 border"
          placeholder='nome da url ex: "noticia teste"'
        />
        {errors.url && <span className="text-red-500">Campo obrigatório</span>}
      </div>

      <div>
        <label>Título</label>
        <input
          name="titulo"
          value={formData.titulo || ''}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.titulo ? 'border-red-500' : ''}`}
          placeholder='nome do titulo ex: "titulo teste"'
        />
        {errors.titulo && <span className="text-red-500">Campo obrigatório</span>}
      </div>

      <div>
        <label>Subtítulo</label>
        <input
          name="subtitulo"
          value={formData.subtitulo || ''}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.subtitulo ? 'border-red-500' : ''}`}
          placeholder='nome do subtitulo ex: "subtitulo teste"'
        />
        {errors.subtitulo && <span className="text-red-500">Campo obrigatório</span>}
      </div>

      <div>
        <label>Data e Hora de Publicação</label>
        <input
          type="datetime-local"
          name="data_hora_publicacao"
          value={formData.data_hora_publicacao || ''}
          onChange={handleInputChange}
          className="w-full p-2 border"
        />
      </div>

      <div>
        <label>Imagem Principal</label>
        <input
          type="file"
          name="imagem"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border"
        />
         {errors.imagem && <span className="text-red-500">Campo obrigatório</span>}
        {isEdit && formData.imagem && (
          <div className="mt-2">
            <p>Imagem atual: {formData.imagem}</p>
          </div>
        )}
      </div>

      <div>
        <label>Imagem Thumbnail</label>
        <input
          type="file"
          name="imagem_thumb"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border"
        />
         {errors.imagem_thumb && <span className="text-red-500">Campo obrigatório</span>}

        {isEdit && formData.imagem_thumb && (
          <div className="mt-2">
            <p>Thumbnail atual: {formData.imagem_thumb}</p>
          </div>
        )}
      </div>

      <div>
        <label>Conteúdo</label>
        <Wysiwyg
          html={formData.conteudo}
          onChange={handleWysiwygChange}
        />
        {errors.conteudo && <span className="text-red-500">Campo obrigatório</span>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isEdit ? 'Atualizar Notícia' : 'Criar Notícia'}
      </button>
    </form>
  );
}